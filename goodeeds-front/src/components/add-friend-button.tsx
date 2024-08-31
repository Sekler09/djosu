'use client';
import React, { FC, memo, useCallback } from 'react';
import { AddFriendFormData } from '@/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import { Button } from '@/components/ui/button';
import ResponsiveDialog from './responsive-dialog';
import AddFriendForm from './add-friend-form';
import { useToast } from '@/components/ui/use-toast';

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = () => {
  const { isOpen, onChange, open, close } = useDisclosure();
  const { toast } = useToast();
  const handleAddFriend = useCallback((data: AddFriendFormData) => {
    close();
    toast({
      title: 'Requst sent.',
      description: `Request to ${data.username} was sent`,
      variant: 'success',
    });
  }, [close, toast]);
  return (
    <>
      <Button className="text-white" onClick={open}>
        Add new friend
      </Button>
      <ResponsiveDialog isOpen={isOpen} setIsOpen={onChange} title="Add new friend">
        <AddFriendForm onAddFriend={handleAddFriend} />
      </ResponsiveDialog>
    </>
  );
};

export default memo(AddFriendButton);
