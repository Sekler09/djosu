'use client';
import { FC, memo, useCallback } from 'react';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useSignOutMutation } from '@/store/slices/api/auth';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import ResponsiveDialog from './responsive-dialog';

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = () => {
  const [signOut, { isLoading }] = useSignOutMutation();
  const { isOpen, open, onChange } = useDisclosure();

  const handleSignOut = useCallback(async () => {
    signOut();
  }, [signOut]);

  return (
    <>
      <Button variant="outline" onClick={open}>
        Sign out
      </Button>
      <ResponsiveDialog isOpen={isOpen} setIsOpen={onChange} title="Are you absolutely sure?">
        <Button onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? <Spinner size={10} /> : 'Leave'}
        </Button>
      </ResponsiveDialog>
    </>
  );
};

export default memo(SignOutButton);
