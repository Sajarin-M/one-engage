import { PropsWithChildren } from 'react';

export default function HomeScreenCard({ children }: PropsWithChildren) {
  return (
    <div className='rounded-2xl bg-white p-8 shadow-[1px_1px_10px_0px_#00000017]'>{children}</div>
  );
}
