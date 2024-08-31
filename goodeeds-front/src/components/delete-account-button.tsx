'use client';
import { FC, memo, useCallback } from 'react';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useDeleteAccountMutation } from '@/store/slices/api/account';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import ResponsiveDialog from './responsive-dialog';

interface DeleteAccountButtonProps {}

const DeleteAccountButton: FC<DeleteAccountButtonProps> = () => {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const { isOpen, open, onChange } = useDisclosure();

  const handleDeleteAccount = useCallback(() => deleteAccount(), [deleteAccount]);

  return (
    <>
      <Button variant="destructive" onClick={open}>
        Delete Account
      </Button>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={onChange}
        title="Delete account"
        description="Are you sure you want to delete account? This action can't be undone."
      >
        <Button onClick={handleDeleteAccount} disabled={isLoading} variant="destructive">
          {isLoading ? <Spinner size={20} /> : 'Delete'}
        </Button>
      </ResponsiveDialog>
    </>
  );
};

export default memo(DeleteAccountButton);
