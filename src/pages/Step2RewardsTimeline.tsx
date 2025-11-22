import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { validateStep2 } from '../utils/validation';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Toggle } from '../components/ui/Toggle.tsx';
import { Textarea } from '../components/ui/Textarea';
import { DatePicker } from '../components/ui/DatePicker';
import { MultiSelect } from '../components/ui/MultiSelect';
import { StepNavigation } from '../components/StepNavigation';

const currencyOptions = [
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

const sdgOptions = [
  { value: 'SDG1', label: 'No Poverty' },
  { value: 'SDG2', label: 'Zero Hunger' },
  { value: 'SDG3', label: 'Good Health and Well-being' },
  { value: 'SDG4', label: 'Quality Education' },
  { value: 'SDG5', label: 'Gender Equality' },
  { value: 'SDG6', label: 'Clean Water and Sanitation' },
  { value: 'SDG7', label: 'Affordable and Clean Energy' },
  { value: 'SDG8', label: 'Decent Work and Economic Growth' },
  { value: 'SDG9', label: 'Industry, Innovation and Infrastructure' },
  { value: 'SDG10', label: 'Reduced Inequalities' },
  { value: 'SDG11', label: 'Sustainable Cities and Communities' },
  { value: 'SDG12', label: 'Responsible Consumption and Production' },
  { value: 'SDG13', label: 'Climate Action' },
  { value: 'SDG14', label: 'Life Below Water' },
  { value: 'SDG15', label: 'Life on Land' },
  { value: 'SDG16', label: 'Peace, Justice and Strong Institutions' },
  { value: 'SDG17', label: 'Partnerships for the Goals' },
];

export default function Step2RewardsTimeline() {
  const navigate = useNavigate();
  const { formData, updateStep2 } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const data = formData.step2;

  const handleRewardChange = (field: string, value: string | number) => {
    updateStep2({
      reward: { ...data.reward, [field]: value },
    });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleTimelineChange = (field: string, value: string | number) => {
    if (field === 'expiration_date') {
      updateStep2({
        timeline: { ...data.timeline, expiration_date: value as string },
      });
    } else {
      updateStep2({
        timeline: {
          ...data.timeline,
          estimated_completion: {
            ...data.timeline.estimated_completion,
            [field]: parseInt(value as string) || 0,
          },
        },
      });
    }
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImpactToggle = (checked: boolean) => {
    updateStep2({ hasImpactCertificate: checked });
  };

  const handleImpactMessageChange = (value: string) => {
    updateStep2({ impactBriefMessage: value });
    if (errors.impactBriefMessage) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.impactBriefMessage;
        return newErrors;
      });
    }
  };

  const handleSDGChange = (value: string[]) => {
    updateStep2({ sdgs: value });
    if (errors.sdgs) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.sdgs;
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const validation = validateStep2(data);
    if (validation.isValid) {
      navigate('/step/3');
    } else {
      setErrors(validation.errors);
    }
  };

  const handleBack = () => {
    navigate('/step/1');
  };

  return (
    <div className="max-w-3xl w-full">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Rewards & Timeline</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Define the reward structure and project timeline
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Bounty Reward</h3>
          <div className="space-y-4">
            <Select
              label="What is your budget for this bounty?"
              value={data.reward.currency}
              onValueChange={(value) => handleRewardChange('currency', value)}
              options={currencyOptions}
              required
              error={errors.currency}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Reward Amount"
                type="number"
                value={data.reward.amount || ''}
                onChange={(e) => handleRewardChange('amount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
                error={errors.amount}
              />

              <Input
                label="Number of Winners"
                type="number"
                min="1"
                value={data.reward.winners || ''}
                onChange={(e) => handleRewardChange('winners', parseInt(e.target.value) || 1)}
                placeholder="1"
                required
                error={errors.winners}
              />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Timeline</h3>
          <div className="space-y-4">
            <DatePicker
              label="Expiration Date"
              value={data.timeline.expiration_date}
              onChange={(e) => handleTimelineChange('expiration_date', e.target.value)}
              required
              error={errors.expiration_date}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Estimated Completion Time
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Days"
                  type="number"
                  min="0"
                  value={data.timeline.estimated_completion.days || ''}
                  onChange={(e) => handleTimelineChange('days', e.target.value)}
                  placeholder="0"
                />
                <Input
                  label="Hours"
                  type="number"
                  min="0"
                  max="23"
                  value={data.timeline.estimated_completion.hours || ''}
                  onChange={(e) => handleTimelineChange('hours', e.target.value)}
                  placeholder="0"
                />
                <Input
                  label="Minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={data.timeline.estimated_completion.minutes || ''}
                  onChange={(e) => handleTimelineChange('minutes', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Impact & SDGs</h3>
          <div className="space-y-4">
            <MultiSelect
              label="Sustainable Development Goals (SDGs)"
              options={sdgOptions}
              value={data.sdgs}
              onChange={handleSDGChange}
              placeholder="Select SDGs"
              required
              error={errors.sdgs}
            />

            <Toggle
              label="Include Impact Certificate"
              description="Provide an impact certificate for contributors"
              pressed={data.hasImpactCertificate}
              onPressedChange={handleImpactToggle}
            />

            {data.hasImpactCertificate && (
              <Textarea
                label="Impact Brief Message"
                value={data.impactBriefMessage}
                onChange={(e) => handleImpactMessageChange(e.target.value)}
                placeholder="Describe the expected impact..."
                required
                error={errors.impactBriefMessage}
              />
            )}
          </div>
        </div>
      </div>

      <StepNavigation
        currentStep={2}
        onNext={handleNext}
        onBack={handleBack}
        canProceed={true}
      />
    </div>
  );
}