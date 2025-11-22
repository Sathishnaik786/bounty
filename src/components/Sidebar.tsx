import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

interface SidebarProps {
  canNavigateToStep: (step: number) => boolean;
}

const steps = [
  { number: 1, title: 'Basic Details', path: '/step/1' },
  { number: 2, title: 'Rewards & Timeline', path: '/step/2' },
  { number: 3, title: 'Backer Information', path: '/step/3' },
];

export const Sidebar = ({ canNavigateToStep }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const currentStep = steps.find((s) => location.pathname === s.path)?.number || 1;

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  const handleStepClick = (step: typeof steps[0]) => {
    if (step.number < currentStep || canNavigateToStep(step.number)) {
      navigate(step.path);
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  // For mobile, we'll show a hamburger menu button
  if (isMobile) {
    return (
      <>
        {/* Mobile header with menu button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border p-4 flex items-center justify-between md:hidden">
          <h1 className="text-xl font-bold text-foreground">Create Bounty</h1>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-sidebar-accent text-sidebar-foreground"
          >
            <div className="w-6 h-0.5 bg-sidebar-foreground mb-1.5"></div>
            <div className="w-6 h-0.5 bg-sidebar-foreground mb-1.5"></div>
            <div className="w-6 h-0.5 bg-sidebar-foreground"></div>
          </button>
        </div>

        {/* Mobile sidebar overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Mobile sidebar */}
        <aside 
          className={cn(
            "fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border p-4 z-50 transition-transform duration-300 ease-in-out md:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="pt-16 pb-4">
            <h1 className="text-2xl font-bold text-foreground mb-6">Create Bounty</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Complete all steps to create your bounty
            </p>
            
            <nav className="flex-1">
              <ol className="space-y-6 relative">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.number;
                  const isComplete = currentStep > step.number;
                  const canNavigate = step.number < currentStep || canNavigateToStep(step.number);

                  return (
                    <li key={step.number} className="relative">
                      {index !== steps.length - 1 && (
                        <div
                          className={cn(
                            'absolute left-[15px] top-8 w-0.5 h-8 transition-colors',
                            isComplete ? 'bg-step-complete' : 'bg-step-inactive'
                          )}
                        />
                      )}

                      <button
                        onClick={() => handleStepClick(step)}
                        disabled={!canNavigate && step.number > currentStep}
                        className={cn(
                          'flex items-start gap-4 w-full text-left transition-all',
                          canNavigate ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                        )}
                      >
                        <div
                          className={cn(
                            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
                            isComplete &&
                              'bg-step-complete text-success-foreground',
                            isActive &&
                              'bg-step-active text-primary-foreground ring-4 ring-primary/20',
                            !isActive &&
                              !isComplete &&
                              'bg-step-inactive text-muted-foreground'
                          )}
                        >
                          {isComplete ? (
                            <Check className="w-5 h-5" strokeWidth={3} />
                          ) : (
                            step.number
                          )}
                        </div>

                        <div className="flex-1 pt-0.5">
                          <p
                            className={cn(
                              'text-sm font-medium transition-colors',
                              isActive && 'text-primary',
                              isComplete && 'text-success',
                              !isActive && !isComplete && 'text-muted-foreground'
                            )}
                          >
                            Step {step.number}
                          </p>
                          <p
                            className={cn(
                              'text-sm mt-0.5 transition-colors',
                              isActive && 'text-foreground font-medium',
                              !isActive && 'text-muted-foreground'
                            )}
                          >
                            {step.title}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="mt-auto pt-8 border-t border-sidebar-border">
              <p className="text-xs text-muted-foreground">
                Step {currentStep} of {steps.length}
              </p>
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar (existing implementation with responsive padding)
  return (
    <aside className="hidden md:block w-64 lg:w-80 bg-sidebar border-r border-sidebar-border p-6 lg:p-8 flex flex-col">
      <div className="mb-8 lg:mb-12">
        <h1 className="text-xl lg:text-2xl font-bold text-foreground">Create Bounty</h1>
        <p className="text-xs lg:text-sm text-muted-foreground mt-2">
          Complete all steps to create your bounty
        </p>
      </div>

      <nav className="flex-1">
        <ol className="space-y-6 lg:space-y-8 relative">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isComplete = currentStep > step.number;
            const canNavigate = step.number < currentStep || canNavigateToStep(step.number);

            return (
              <li key={step.number} className="relative">
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute left-[15px] top-8 w-0.5 h-8 transition-colors',
                      isComplete ? 'bg-step-complete' : 'bg-step-inactive'
                    )}
                  />
                )}

                <button
                  onClick={() => handleStepClick(step)}
                  disabled={!canNavigate && step.number > currentStep}
                  className={cn(
                    'flex items-start gap-4 w-full text-left transition-all',
                    canNavigate ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  )}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
                      isComplete &&
                        'bg-step-complete text-success-foreground',
                      isActive &&
                        'bg-step-active text-primary-foreground ring-4 ring-primary/20',
                      !isActive &&
                        !isComplete &&
                        'bg-step-inactive text-muted-foreground'
                    )}
                  >
                    {isComplete ? (
                      <Check className="w-5 h-5" strokeWidth={3} />
                    ) : (
                      step.number
                    )}
                  </div>

                  <div className="flex-1 pt-0.5">
                    <p
                      className={cn(
                        'text-sm font-medium transition-colors',
                        isActive && 'text-primary',
                        isComplete && 'text-success',
                        !isActive && !isComplete && 'text-muted-foreground'
                      )}
                    >
                      Step {step.number}
                    </p>
                    <p
                      className={cn(
                        'text-xs lg:text-sm mt-0.5 transition-colors',
                        isActive && 'text-foreground font-medium',
                        !isActive && 'text-muted-foreground'
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-auto pt-6 lg:pt-8 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">
          Step {currentStep} of {steps.length}
        </p>
      </div>
    </aside>
  );
};