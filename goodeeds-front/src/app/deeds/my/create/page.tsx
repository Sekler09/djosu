'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RoutePath } from '@/routes';
import { AddDeedFormData, DEED_TYPE_LABELS } from '@/types';
import AddDeedForm from '@/components/add-deed-form';
import { useToast } from '@/components/ui/use-toast';

const CreateDeedPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddDeed = useCallback(
    (data: AddDeedFormData) => {
      toast({
        title: 'Added new deed',
        description: `Deed type: ${DEED_TYPE_LABELS[data.type]}`,
        variant: 'success',
      });
      router.push(RoutePath.MyDeeds);
    },
    [router, toast],
  );
  return (
    <div className="flex flex-1 flex-col gap-5">
      <h1 className="text-[2rem] font-bold leading-tight">What good deed did you do?</h1>
      <AddDeedForm onAddDeed={handleAddDeed} />
    </div>
  );
};

export default CreateDeedPage;
