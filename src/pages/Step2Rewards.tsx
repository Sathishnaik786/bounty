import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { validateStep2 } from '../utils/validation';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Toggle } from '../components/ui/Toggle';
import { Textarea } from '../components/ui/Textarea';
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

export default function Step2Rewards() {
  const navigate = useNavigate();
  const { formData, updateStep2 } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [perWinnerAmount, setPerWinnerAmount] = useState<number>(0);
  const [maxImpactPoints, setMaxImpactPoints] = useState<number>(0);

  const data = formData.step2;

  // Calculate per winner amount and max impact points
  useEffect(() => {
    if (data.reward.amount && data.reward.winners) {
      setPerWinnerAmount(data.reward.amount / data.reward.winners);
    } else {
      setPerWinnerAmount(0);
    }
    
    // Calculate max impact points (winners * failureThreshold)
    const points = (data.reward.winners || 0) * (data.failureThreshold || 0);
    setMaxImpactPoints(points);
  }, [data.reward.amount, data.reward.winners, data.failureThreshold]);

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

  const handleImpactToggle = (pressed: boolean) => {
    updateStep2({ hasImpactCertificate: pressed });
  };

  const handleImpactMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
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
    // Limit to 4 SDGs
    if (value.length <= 4) {
      updateStep2({ sdgs: value });
      if (errors.sdgs) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.sdgs;
          return newErrors;
        });
      }
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Bounty Reward</h1>
        <p className="text-muted-foreground">
          Define the reward structure for your bounty
        </p>
      </div>

      <div className="space-y-8">
        {/* Bounty Reward Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Bounty Reward</h2>
          
          <div className="space-y-6">
            <Select
              label="What is your budget for this bounty?"
              value={data.reward.currency}
              onValueChange={(value) => handleRewardChange('currency', value)}
              options={currencyOptions}
              required
              error={errors.currency}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Per-winner amount</p>
              <p className="text-lg font-semibold text-foreground">
                {data.reward.currency} {perWinnerAmount.toFixed(2)}
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Note:</span> {data.reward.winners || 0} winners will be awarded
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Maximum impact points allocated</p>
              <p className="text-lg font-semibold text-foreground">
                {maxImpactPoints} points
              </p>
            </div>
          </div>
        </div>
        
        {/* Impact Points Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Impact Points</h2>
          
          <div className="space-y-6">
            <Input
              label="Failure threshold"
              type="number"
              value={data.failureThreshold || ''}
              onChange={(e) => updateStep2({ failureThreshold: parseInt(e.target.value) || 0 })}
              placeholder="e.g. 5"
              required
              error={errors.failureThreshold}
            />
          </div>
        </div>
        
        {/* Impact Certificate Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Impact Certificate</h2>
          
          <div className="space-y-6">
            <Toggle
              label="Include Impact Certificate"
              description="Provide an impact certificate for contributors"
              pressed={data.hasImpactCertificate}
              onPressedChange={handleImpactToggle}
            />
            
            {data.hasImpactCertificate && (
              <Textarea
                label="Impact Certificate Brief"
                value={data.impactBriefMessage}
                onChange={handleImpactMessageChange}
                placeholder="Describe the expected impact..."
                required
                error={errors.impactBriefMessage}
              />
            )}
          </div>
        </div>
        
        {/* SDG Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Sustainable Development Goals (SDGs)</h2>
          
          <div className="space-y-4">
            <MultiSelect
              label="Select SDGs related to your bounty"
              options={sdgOptions}
              value={data.sdgs}
              onChange={handleSDGChange}
              placeholder="Choose up to 4 SDGs"
              required
              error={errors.sdgs}
            />
            <p className="text-sm text-muted-foreground">
              {4 - data.sdgs.length} selections remaining
            </p>
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