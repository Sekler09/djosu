import { FC, memo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SignUpForm from './signup-form';

interface SignUpButtonProps {}

const SignUpButton: FC<SignUpButtonProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="font-bol" variant="secondary">
          Sign up
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col items-center">
        <SheetHeader>
          <SheetTitle className="text-center">Sign Up</SheetTitle>
          <SheetDescription>
            Sign up to start you travel in the world of good people.
          </SheetDescription>
        </SheetHeader>
        <SignUpForm />
      </SheetContent>
    </Sheet>
  );
};

export default memo(SignUpButton);
