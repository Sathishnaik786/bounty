import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { validateStep1 } from '../utils/validation';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select.tsx';
import { RadioGroup } from '../components/ui/RadioGroup';
import { StepNavigation } from '../components/StepNavigation';

const typeOptions = [
  { value: 'Choose Option', label: 'Choose Category' },
  { value: 'Content', label: 'Content' },
  { value: 'Design', label: 'Design' },
  { value: 'Development', label: 'Development' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Other', label: 'Other' },
];

const dominantCoreOptions = [
  { value: 'Choose Core', label: 'Choose Core' },
  { value: 'Water', label: 'Water' },
  { value: 'Earth', label: 'Earth' },
  { value: 'Social', label: 'Social' },
  { value: 'Energy', label: 'Energy' },
];

const modeOptions = [
  { value: 'digital', label: 'Digital' },
  { value: 'physical', label: 'Physical' },
];

export default function Step1Basics() {
  const navigate = useNavigate();
  const { formData, updateStep1 } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const data = formData.step1;

  const handleChange = (field: string, value: string) => {
    updateStep1({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const validation = validateStep1(data);
    if (validation.isValid) {
      navigate('/step/2');
    } else {
      setErrors(validation.errors);
    }
  };

  return (
    <div className="max-w-3xl w-full">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Basic Details</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Let's start with the essential information about your bounty
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Input
          label="Bounty Title"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter a clear, concise title (max 40 characters)"
          maxLength={40}
          required
          error={errors.title}
        />

        <Textarea
          label="Description"
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe what you're looking for in detail..."
          required
          error={errors.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Select
            label="Bounty Type"
            value={data.type}
            onValueChange={(value) => handleChange('type', value)}
            options={typeOptions}
            required
            error={errors.type}
          />

          <Select
            label="Impact Core"
            value={data.dominant_core}
            onValueChange={(value) => handleChange('dominant_core', value)}
            options={dominantCoreOptions}
            required
            error={errors.dominant_core}
          />
        </div>

        <RadioGroup
          label="Mode"
          options={modeOptions}
          value={data.mode}
          onValueChange={(value) => handleChange('mode', value)}
          name="mode"
          required
          error={errors.mode}
        />

        {data.mode === 'physical' && (
          <Input
            label="Location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Enter the physical location"
            required
            error={errors.location}
          />
        )}
      </div>

      <StepNavigation
        currentStep={1}
        onNext={handleNext}
        onBack={() => {}}
        canProceed={true}
      />
    </div>
  );
}