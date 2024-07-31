'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEditNoMattersMutation, useNoMattersQuery } from '@/lib/queries/no-matters';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { NoMattersVm } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export type EditNoMattersFormProps = {
  data?: NoMattersVm;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
});

type FormValues = z.infer<typeof formSchema>;

function EditNoMattersForm({ data, onOpenChange }: EditNoMattersFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          title: data.title,
          subtitle: data.subtitle,
        }
      : {
          title: '',
          subtitle: '',
        },
  });

  const { mutateAsync: editNoMatters } = useEditNoMattersMutation();

  async function onSubmit(values: FormValues) {
    try {
      const updatedData = await editNoMatters(values);
      toast.success('No matters section updated successfully');
      queryClient.setQueryData(useNoMattersQuery.getKey(), updatedData);
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
            <DialogTitle>Edit No Matters</DialogTitle>
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

export default function EditNoMatters({ data, open, onOpenChange }: EditNoMattersFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && <EditNoMattersForm data={data} open={open} onOpenChange={onOpenChange} />}
    </Dialog>
  );
}
