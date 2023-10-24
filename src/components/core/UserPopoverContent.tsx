import { APP_ROUTES } from '@/utils/constants';
import { PopoverContent } from '@radix-ui/react-popover';
import { Home, LogOut } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import ThemeSwitch from './ThemeSwitch';

const UserPopoverContent = () => {
  return (
    <PopoverContent>
      <div className="w-[180px] mt-2 bg-appSecondary text-appMainTextColor mr-5 rounded-md outline-none shadow-md">
        <Link
          href={APP_ROUTES.MY_RESUMES.path}
          className="flex items-center gap-3 p-4 w-full hover:bg-black/10 duration-75"
        >
          <Home />
          <h3>My Resumes</h3>
        </Link>
        <SignOutButton>
          <button className="flex items-center gap-3 p-4 w-full hover:bg-black/10 duration-75">
            <LogOut />
            <h3>Logout</h3>
          </button>
        </SignOutButton>
      </div>
    </PopoverContent>
  );
};

export default UserPopoverContent;
