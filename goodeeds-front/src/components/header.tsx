'use client';
import { FC, memo } from 'react';
import { selectUser } from '@/store/selectors/user';
import SignInButton from './signin-button';
import SignUpButton from './signup-button';
import { useSelector } from 'react-redux';
import SignOutButton from './signout-button';
import Navbar from './navbar';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const user = useSelector(selectUser);

  return (
    <header className="fixed z-[1] flex w-full flex-wrap items-center justify-center gap-2 border-b border-solid border-b-white bg-background px-10 py-3 h-[6.5rem] sm:h-[3.75rem] sm:flex-nowrap sm:justify-stretch sm:gap-8">
      <div className="flex items-center gap-4">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight">Good Deeds</h2>
      </div>
      {user && (
        <>
          <Navbar />
          <div className="ml-auto">
            <SignOutButton />
          </div>
        </>
      )}
      {!user && (
        <div className="sm:ml-auto flex gap-2">
          <SignInButton />
          <SignUpButton />
        </div>
      )}
    </header>
  );
};

export default memo(Header);
