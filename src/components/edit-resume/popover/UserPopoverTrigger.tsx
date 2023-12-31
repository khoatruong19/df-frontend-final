import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import UserPopoverContent from '../../core/UserPopoverContent';
import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';
import ThemeSwitch from '@/components/core/ThemeSwitch';

type UserPopoverTriggerProps = {
  className?: string;
};

const UserPopoverTrigger = ({ className = '' }: UserPopoverTriggerProps) => {
  const { user } = useUser();
  return (
    <aside className={className}>
      <Popover>
        <PopoverTrigger>
          <Image
            alt=""
            src={user?.imageUrl ?? ''}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        </PopoverTrigger>
        <UserPopoverContent />
      </Popover>
      <ThemeSwitch className="absolute bottom-3 right-12" />
    </aside>
  );
};

export default UserPopoverTrigger;
