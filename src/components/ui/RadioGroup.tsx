import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ className, label, error, options, value, onValueChange, name, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-3">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className={cn('flex gap-4', className)}>
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                'flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg border-2 transition-all',
                'hover:bg-muted/50',
                value === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background'
              )}
            >
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onValueChange?.(e.target.value)}
                className={cn(
                  'h-4 w-4 text-primary border-input',
                  'focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  'cursor-pointer'
                )}
                {...props}
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-sm text-destructive mt-1.5">{error}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
