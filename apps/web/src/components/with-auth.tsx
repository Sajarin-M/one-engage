import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from './auth-provider';

export default function WithAuth(Component: any) {
  return function IsAuth(props: any) {
    const { auth, authLoading } = useAuth();

    useEffect(() => {
      if (!authLoading && !auth) {
        return redirect('/admin/login');
      }
    }, [auth, authLoading]);

    if (authLoading || !auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
