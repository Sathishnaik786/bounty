import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, X } from 'lucide-react';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  label?: string;
  error?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

export const MultiSelect = ({
  label,
  error,
  options,
  value,
  onChange,
  placeholder = 'Choose Category',
  required,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-input bg-background px-3 py-2',
          'cursor-pointer transition-colors',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          error && 'border-destructive',
          isOpen && 'ring-2 ring-ring ring-offset-2'
        )}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedLabels.length === 0 ? (
            <span className="text-sm text-muted-foreground">{placeholder}</span>
          ) : (
            selectedLabels.map((label, index) => {
              const optValue = options.find((o) => o.label === label)?.value;
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => optValue && removeOption(optValue, e)}
                    className="hover:bg-primary/20 rounded p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-popover shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
                  'hover:bg-muted',
                  isSelected && 'bg-primary/5'
                )}
              >
                <div
                  className={cn(
                    'h-5 w-5 rounded border-2 flex items-center justify-center transition-colors',
                    isSelected ? 'bg-primary border-primary' : 'border-input'
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-sm text-destructive mt-1.5">{error}</p>}
    </div>
  );
};
