import { FC, memo, useCallback } from 'react';
import { DeedWithUser } from '@/types';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useDeleteDeedMutation } from '@/store/slices/api/deeds';
import ResponsiveDialog from './responsive-dialog';
import EditDeedForm from './edit-deed-form';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface DeedItemDropdownProps {
  deed: DeedWithUser;
}

const DeedItemDropdown: FC<DeedItemDropdownProps> = ({ deed }) => {
  const [deleteDeed, { isLoading }] = useDeleteDeedMutation();
  const { toast } = useToast();
  const {
    isOpen: isEditOpen,
    open: onOpenEdit,
    close: onCloseEdit,
    onChange: setIsEditOpen,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    open: onOpenDelete,
    close: onCloseDelete,
    onChange: setIsDeleteOpen,
  } = useDisclosure();

  const handleEditDeed = useCallback(() => {
    onCloseEdit();
    toast({
      title: 'Successfully edited deed',
      variant: 'success',
    });
  }, [onCloseEdit, toast]);

  const handleDeleteDeed = useCallback(async () => {
    try {
      await deleteDeed(deed.id).unwrap();
      toast({
        title: 'Successfully deleted deed',
        variant: 'success',
      });
    } catch (e) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      onCloseDelete();
    }
  }, [toast, deed.id, deleteDeed, onCloseDelete]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onOpenEdit}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onOpenDelete} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ResponsiveDialog isOpen={isEditOpen} setIsOpen={setIsEditOpen} title="Edit deed">
        <EditDeedForm deed={deed} onEditDeed={handleEditDeed} />
      </ResponsiveDialog>
      <ResponsiveDialog isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} title="Delete deed">
        <Button onClick={handleDeleteDeed} disabled={isLoading} variant="destructive">
          {isLoading ? <Spinner size={20} /> : 'Delete'}
        </Button>
      </ResponsiveDialog>
    </>
  );
};

export default memo(DeedItemDropdown);
