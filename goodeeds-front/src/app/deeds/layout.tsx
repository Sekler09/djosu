'use client';
import { PropsWithChildren } from 'react';
import DeedsNavbar from '@/components/deeds-navbar';
import { Separator } from '@/components/ui/separator';

const DeedsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-1 flex-col gap-5 px-8 py-10 sm:px-14'>
      <DeedsNavbar />
      <Separator className=''/>
      {children}
    </div>
  );
};

export default DeedsLayout;
