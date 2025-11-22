import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  onFileChange?: (file: File | null) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, label, error, onFileChange, ...props }, ref) => {
    const [fileName, setFileName] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setFileName(file?.name || '');
      onFileChange?.(file);
    };

    const handleClear = () => {
      setFileName('');
      onFileChange?.(null);
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div
          className={cn(
            'relative flex items-center gap-3 h-11 w-full rounded-lg border border-input bg-background px-4 py-2',
            'transition-colors cursor-pointer hover:bg-muted/50',
            error && 'border-destructive',
            className
          )}
        >
          <input
            ref={ref}
            type="file"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            {...props}
          />
          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-muted-foreground flex-1 truncate">
            {fileName || 'Choose file or drag here'}
          </span>
          {fileName && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="flex-shrink-0 p-1 hover:bg-muted rounded"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          )}
        </div>
        {error && <p className="text-sm text-destructive mt-1.5">{error}</p>}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
