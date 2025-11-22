import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  isLastStep?: boolean;
}

export const StepNavigation = ({
  currentStep,
  onNext,
  onBack,
  canProceed,
  isLastStep,
}: StepNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between pt-8 border-t border-border">
      {currentStep > 1 ? (
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      ) : (
        <div />
      )}

      <Button onClick={onNext} disabled={!canProceed} size="lg">
        {isLastStep ? 'Create Bounty' : 'Next Step'}
        {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
      </Button>
    </div>
  );
};
