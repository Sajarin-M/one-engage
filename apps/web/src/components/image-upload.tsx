import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Image, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import FileButton, { FileButtonProps } from './file-button';
import { Button, ButtonProps } from './ui/button';

function Preview({ src, className, ...rest }: ComponentPropsWithoutRef<'img'>) {
  return (
    <div
      {...rest}
      className={cn(
        'dark:bg-dark-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-sm border border-input',
        className,
      )}
    >
      {src ? (
        <img
          className={'h-full w-full object-cover'}
          src={src}
          onLoad={() => {
            if (src.startsWith('blob:')) {
              URL.revokeObjectURL(src);
            }
          }}
        />
      ) : (
        <Image size='3.2rem' />
      )}
    </div>
  );
}

function SelectButton(props: Omit<FileButtonProps, 'children'>) {
  return (
    <FileButton accept='image/*' {...props}>
      {(props) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' {...props}>
                <Upload />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>Select</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </FileButton>
  );
}

function ClearButton(props: ButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline' size='icon' {...props}>
            <X />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <p>Clear</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type WrapperProps = {
  preview: ReactNode;
  select: ReactNode;
  clear: ReactNode;
};

function Wrapper({ clear, preview, select }: WrapperProps) {
  return (
    <div className='mt-2 flex gap-4'>
      {preview}
      <div className='flex flex-col justify-center gap-3'>
        {select}
        {clear}
      </div>
    </div>
  );
}

export { ClearButton, Preview, SelectButton, Wrapper };
