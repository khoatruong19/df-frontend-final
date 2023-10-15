'use client';

import React from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/utils/constants';
import { Button } from '../ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs';

const Header = () => {
  const { user } = useUser();

  return (
    <header className="font-display p-4 flex items-center justify-between">
      <nav>
        <Link href={APP_ROUTES.HOME.path} className="flex items-center gap-2">
          <img
            className="w-8 h-8 object-cover"
            alt="logo"
            src={
              'https://www.freeiconspng.com/thumbs/resume-icon-png/resume-icon-png-15.png'
            }
          />
          <h2 className="font-semibold text-xl">resume.ai</h2>
        </Link>
      </nav>
      {!user ? (
        <SignInButton
          mode="modal"
          // redirectUrl={APP_ROUTES.RESUME_TEMPLATES.path}
        >
          <Button size={'lg'}>Log In</Button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={user.imageUrl}
            alt=""
          />
          <span className="font-semibold">{user.fullName}</span>
        </div>
      )}
    </header>
  );
};

export default Header;
