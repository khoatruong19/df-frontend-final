'use client';

import React from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/utils/constants';
import { Button } from '../ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import LogoImg from '@/assets/logo.png';
import { Popover, PopoverTrigger } from '../ui/popover';
import UserPopoverContent from './UserPopoverContent';

const Header = () => {
  const { user } = useUser();

  return (
    <header className="font-display p-4 flex items-center justify-between">
      <nav>
        <Link href={APP_ROUTES.HOME.path} className="flex items-center gap-2">
          <Image
            alt="logo"
            src={LogoImg}
            width={32}
            height={32}
            className="object-cover"
          />
          <h2 className="font-semibold text-xl">resume.ai</h2>
        </Link>
      </nav>
      {!user ? (
        <SignInButton mode="modal">
          <Button size={'lg'}>Log In</Button>
        </SignInButton>
      ) : (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              <Image
                alt=""
                src={user.imageUrl}
                width={40}
                height={40}
                className="object-cover rounded-full"
              />
              <span className="font-semibold">{user.fullName}</span>
            </div>
          </PopoverTrigger>
          <UserPopoverContent />
        </Popover>
      )}
    </header>
  );
};

export default Header;
