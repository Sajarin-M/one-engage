import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type VisibilityButtonProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  value: boolean;
  onChange: (value: boolean) => void;
  isLoading?: boolean;
};

export default function VisibilityButton({
  className,
  value,
  onChange,
  isLoading,
  ...rest
}: VisibilityButtonProps) {
  return (
    <div
      className={cn('relative flex h-9 w-[10rem] rounded-3xl bg-[#F4F4F4] text-sm', className)}
      {...rest}
    >
      <div
        className={cn(
          'z-10 flex w-1/2 items-center justify-center transition-colors',
          !value && !isLoading && 'text-primary-foreground',
        )}
        onClick={() => {
          onChange(false);
        }}
      >
        Hide
      </div>
      <div
        className={cn(
          'z-10 flex w-1/2 items-center justify-center transition-colors',
          value && !isLoading && 'text-primary-foreground',
        )}
        onClick={() => {
          onChange(true);
        }}
      >
        Show
      </div>
      {!isLoading && (
        <div
          className={cn(
            'bg-primary-3 absolute left-0 top-0 h-full w-1/2 rounded-3xl bg-primary transition-transform',
            value && 'translate-x-full',
          )}
        />
      )}
    </div>
  );
}
