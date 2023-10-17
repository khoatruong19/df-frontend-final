'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/utils/constants';
import { ResumeTemplate } from '@/utils/types';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { SignInButton } from '@clerk/clerk-react';

type ResumeCardProps = {
  template: ResumeTemplate;
};

const ResumeCard = ({ template }: ResumeCardProps) => {
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();

  const createResume = useMutation(api.resume.create);
  const signInButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleCreateNewResume = () => {
    if (!isAuthenticated) {
      signInButtonRef.current?.click();
      return;
    }
    createResume().then((documentId) =>
      router.push(`${APP_ROUTES.EDIT_TEMPLATE.path + documentId}`)
    );
  };

  return (
    <div
      onClick={handleCreateNewResume}
      className="relative w-full py-5 bg-black/5 cursor-pointer hover:bg-black/10 group"
    >
      <div className="relative w-full h-[450px] ">
        <Image src={template.coverImage} alt="" fill objectFit="contain" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full hidden group-hover:grid place-items-center ">
        <Button size={'lg'} textSize={'xl'} className="shadow-md h-14">
          Use this template
        </Button>
      </div>
      <div className="absolute bottom-[-20px] opacity-0">
        <SignInButton redirectUrl={APP_ROUTES.RESUME_TEMPLATES.path}>
          <button ref={signInButtonRef}></button>
        </SignInButton>
      </div>
    </div>
  );
};

export default ResumeCard;
