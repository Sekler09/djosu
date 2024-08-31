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
import SignInForm from './signin-form';

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="font-bold text-white">Sign in</Button>
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col items-center">
        <SheetHeader>
          <SheetTitle className="text-center">Sign In</SheetTitle>
          <SheetDescription>Sign in to your account to see friends deeds.</SheetDescription>
        </SheetHeader>
        <SignInForm />
      </SheetContent>
    </Sheet>
  );
};

export default memo(SignInButton);
