'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { useImageUploadMutation } from '@/lib/queries/images';
import {
  useCreateSliderMutation,
  useEditSliderMutation,
  useSlidersQuery,
} from '@/lib/queries/sliders';
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
import { SliderVm } from '@/types';
import { ClearButton, Preview, SelectButton, Wrapper } from '../image-upload';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export type EditSliderFormProps = {
  data?: SliderVm;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  title: z.string().min(1, 'Required'),
  image: imageSchema,
});

type FormValues = z.infer<typeof formSchema>;

function EditSliderForm({ data, onOpenChange }: EditSliderFormProps) {
  const isEditing = data !== undefined;

  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing
      ? {
          title: data.title,
          image: {
            name: data.image.name,
            altText: data.image.altText,
          },
        }
      : {
          title: '',
          image: {
            name: '',
            altText: '',
          },
        },
  });

  const { mutateAsync: uploadImage } = useImageUploadMutation();
  const { mutateAsync: createSlider } = useCreateSliderMutation();
  const { mutateAsync: editSlider } = useEditSliderMutation();

  async function onSubmit(values: FormValues) {
    try {
      const imageData = await uploadImage({
        current: values.image,
        previous: data?.image,
      });
      if (isEditing) {
        await editSlider({
          id: data.id,
          title: values.title,
          image: imageData,
        });
        toast.success('Slider updated successfully');
      } else {
        await createSlider({
          title: values.title,
          image: imageData,
        });
        toast.success('Slider created successfully');
      }
      queryClient.invalidateQueries({ queryKey: useSlidersQuery.getKey() });
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
            <DialogTitle>{isEditing ? 'Edit' : 'Create'} Slider</DialogTitle>
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

export default function EditSlider({ data, open, onOpenChange }: EditSliderFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && <EditSliderForm data={data} open={open} onOpenChange={onOpenChange} />}
    </Dialog>
  );
}
