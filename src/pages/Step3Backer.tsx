import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { validateStep3 } from '../utils/validation';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Toggle } from '../components/ui/Toggle.tsx';
import { Checkbox } from '../components/ui/Checkbox.tsx';
import { FileUpload } from '../components/ui/FileUpload';
import { StepNavigation } from '../components/StepNavigation';
import { generatePayload } from '../utils/generatePayload';

export default function Step3Backer() {
  const navigate = useNavigate();
  const { formData, updateStep3 } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = formData.step3;

  const handleBackerToggle = (checked: boolean) => {
    updateStep3({ has_backer: checked });
  };

  const handleBackerChange = (field: string, value: string) => {
    updateStep3({
      backer: { ...data.backer, [field]: value },
    });
    if (errors[`backer_${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`backer_${field}`];
        return newErrors;
      });
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleBackerChange('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      handleBackerChange('logo', '');
    }
  };

  const handleTermsChange = (checked: boolean) => {
    updateStep3({ terms_accepted: checked });
    if (errors.terms_accepted) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.terms_accepted;
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const validation = validateStep3(data);
    if (validation.isValid) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const payload = generatePayload(formData);
        console.log('Bounty Payload:', payload);
        navigate('/confirmation');
      }, 1500);
    } else {
      setErrors(validation.errors);
    }
  };

  const handleBack = () => {
    navigate('/step/2');
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Backer Information</h2>
        <p className="text-muted-foreground">
          Optional backer details and final confirmation
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <Toggle
            label="Include Backer Information"
            description="Add details about the organization or individual backing this bounty"
            pressed={data.has_backer}
            onPressedChange={handleBackerToggle}
          />

          {data.has_backer && (
            <div className="mt-6 space-y-4 pt-6 border-t border-border">
              <Input
                label="Backer Name"
                value={data.backer.name}
                onChange={(e) => handleBackerChange('name', e.target.value)}
                placeholder="Organization or individual name"
                required
                error={errors.backer_name}
              />

              <FileUpload
                label="Backer Logo"
                onFileChange={handleFileChange}
                accept="image/*"
              />

              <Textarea
                label="Backer Message"
                value={data.backer.message}
                onChange={(e) => handleBackerChange('message', e.target.value)}
                placeholder="Optional message from the backer..."
              />
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Terms & Conditions</h3>
          <Checkbox
            label="I agree to the terms and conditions for creating a bounty. I understand that all information provided is accurate and will be publicly visible."
            checked={data.terms_accepted}
            onCheckedChange={handleTermsChange}
            error={errors.terms_accepted}
          />
        </div>

        {isSubmitting && (
          <div className="bg-primary/10 border border-primary rounded-xl p-4 text-center">
            <p className="text-primary font-medium">Creating your bounty...</p>
          </div>
        )}
      </div>

      <StepNavigation
        currentStep={3}
        onNext={handleSubmit}
        onBack={handleBack}
        canProceed={data.terms_accepted && !isSubmitting}
        isLastStep
      />
    </div>
  );
}
