import { FC, memo } from 'react';
import SignInButton from './signin-button';
import SignUpButton from './signup-button';

interface HeroProps {}
const Hero: FC<HeroProps> = () => {
  return (
    <div className="bg-hero-image flex h-[30rem] flex-col justify-end gap-8 bg-cover bg-center bg-no-repeat p-8 sm:px-14 sm:py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black leading-tight tracking-[-2px]">
          Join a community of do-gooders
        </h1>
        <h2>
          Share your good deeds, find inspiration from others, and track your impact over time
        </h2>
      </div>
      <div className="flex gap-3">
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export default memo(Hero);
