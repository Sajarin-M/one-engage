'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { useImageUploadMutation } from '@/lib/queries/images';
import {
  useEditUnlockYourWorldMutation,
  useUnlockYourWorldQuery,
} from '@/lib/queries/unlock-your-world';
import { getImagePreviewUrl, imageSchema } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UnlockYourWorldVm } from '@/types';
import { ClearButton, Preview, SelectButton, Wrapper } from '../image-upload';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export type EditUnlockYourWorldFormProps = {
  data?: UnlockYourWorldVm;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  title: z.string().min(1, 'Required'),
  buttonLabel: z.string().min(1, 'Required'),
  buttonLink: z.string().min(1, 'Required'),
  image: imageSchema,
});

type FormValues = z.infer<typeof formSchema>;

function EditUnlockYourWorldForm({ data, onOpenChange }: EditUnlockYourWorldFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          title: data.title,
          buttonLabel: data.buttonLabel,
          buttonLink: data.buttonLink,
          image: {
            name: data.image.name,
            altText: data.image.altText,
          },
        }
      : {
          title: '',
          buttonLabel: '',
          buttonLink: '',
          image: {
            name: '',
            altText: '',
          },
        },
  });

  const { mutateAsync: uploadImage } = useImageUploadMutation();
  const { mutateAsync: editUnlockYourWorld } = useEditUnlockYourWorldMutation();

  async function onSubmit(values: FormValues) {
    try {
      const imageData = await uploadImage({
        current: values.image,
        previous: data?.image,
      });
      const updatedData = await editUnlockYourWorld({
        ...values,
        image: imageData,
      });
      toast.success('Unlock your world section updated successfully');
      queryClient.setQueryData(useUnlockYourWorldQuery.getKey(), updatedData);
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Unlock Your World</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-5'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='buttonLabel'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='buttonLink'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image.name'
              render={({ field }) => {
                const previewUrl = getImagePreviewUrl(field.value);
                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <Wrapper
                      preview={<Preview src={previewUrl} />}
                      select={
                        <SelectButton
                          onChange={(file) => {
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                        />
                      }
                      clear={<ClearButton onClick={() => field.onChange('')} />}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='image.altText'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type='submit'
              className='w-action-btn rounded-3xl'
              onClick={form.handleSubmit(onSubmit)}
              loading={form.formState.isSubmitting}
              disabled={!form.formState.isDirty}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
}

export default function EditUnlockYourWorld({
  data,
  open,
  onOpenChange,
}: EditUnlockYourWorldFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && <EditUnlockYourWorldForm data={data} open={open} onOpenChange={onOpenChange} />}
    </Dialog>
  );
}
