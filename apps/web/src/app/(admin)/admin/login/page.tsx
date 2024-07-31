'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { useLoginMutation } from '@/lib/queries/auth';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import loginPageImage from '@/assets/login-page-image.svg';
import companyLogo from '@/assets/logo.svg';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Please enter your password').max(100, 'Password is too long'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const { auth, authLoading, setToken } = useAuth();

  useEffect(() => {
    if (!authLoading && auth) {
      redirect('/admin');
    }
  }, [auth, authLoading]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: login } = useLoginMutation();

  async function onSubmit(values: FormValues) {
    try {
      const { token } = await login(values);
      setToken(token, true);
    } catch (error) {
      console.log(error);
    }
  }

  if (authLoading || auth) {
    return null;
  }

  return (
    <div className='flex h-screen'>
      <div className='flex grow items-center py-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='ml-auto mr-8 h-full w-[78%] rounded-[20px] px-10 py-20 shadow-[0px_19px_40px_0px_#0000000D]'
          >
            <Image src={companyLogo} alt='One Engage Logo' className='h-[2.15rem] w-auto' />
            <h1 className='mt-8 text-3xl'>Welcome back !</h1>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='mt-14'>
                  <FormLabel className='text-base font-light'>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className='border-none bg-secondary/50' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='mt-7'>
                  <div className='flex justify-between'>
                    <FormLabel className='text-base font-light'>Password</FormLabel>
                    <a href='#' className='text-gray-500'>
                      Forgot Password ?
                    </a>
                  </div>
                  <FormControl>
                    <Input {...field} type='password' className='border-none bg-secondary/50' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-12 flex justify-center'>
              <Button type='submit' className='inline-block px-10 font-semibold'>
                LOG IN
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div
        className='flex w-[52%] items-center justify-center'
        style={{
          background:
            'linear-gradient(180deg, rgba(247, 97, 16, 0.17) 0.5%, rgba(249, 141, 22, 0.107015) 38.5%, rgba(250, 180, 28, 0.17) 100%)',
        }}
      >
        <Image src={loginPageImage} alt='Login Page Shape' className='-ml-28' />
      </div>
    </div>
  );
}
