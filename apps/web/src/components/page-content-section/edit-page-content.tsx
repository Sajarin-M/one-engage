'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { useImageUploadMutation } from '@/lib/queries/images';
import { useEditPageContentMutation, usePageContentQuery } from '@/lib/queries/page-content';
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
import { PageContentVm } from '@/types';
import { ClearButton, Preview, SelectButton, Wrapper } from '../image-upload';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export type EditPageContentFormProps = {
  data?: PageContentVm;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
  buttonLabel: z.string().min(1, 'Required'),
  image: imageSchema,
});

type FormValues = z.infer<typeof formSchema>;

function EditPageContentForm({ data, onOpenChange }: EditPageContentFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          title: data.title,
          subtitle: data.subtitle,
          buttonLabel: data.buttonLabel,
          image: {
            name: data.image.name,
            altText: data.image.altText,
          },
        }
      : {
          title: '',
          subtitle: '',
          buttonLabel: '',
          image: {
            name: '',
            altText: '',
          },
        },
  });

  const { mutateAsync: uploadImage } = useImageUploadMutation();
  const { mutateAsync: editPageContent } = useEditPageContentMutation();

  async function onSubmit(values: FormValues) {
    try {
      const imageData = await uploadImage({
        current: values.image,
        previous: data?.image,
      });
      const updatedData = await editPageContent({
        ...values,
        image: imageData,
      });
      toast.success('Page content updated successfully');
      queryClient.setQueryData(usePageContentQuery.getKey(), updatedData);
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
            <DialogTitle>Edit Page Content</DialogTitle>
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
              name='subtitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
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

export default function EditPageContent({ data, open, onOpenChange }: EditPageContentFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && <EditPageContentForm data={data} open={open} onOpenChange={onOpenChange} />}
    </Dialog>
  );
}
