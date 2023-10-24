'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useMutation, useQuery } from 'convex/react';
import Link from 'next/link';
import { api } from '../../../../convex/_generated/api';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/utils/constants';

export default function ResumePage() {
  const resumes = useQuery(api.resume.getAll);
  const deleteResume = useMutation(api.resume.deleteOne);

  return (
    <MainLayout>
      <div className="font-display flex-1 w-full  flex flex-col gap-6">
        <h1 className="text-5xl font-semibold italic text-center">
          Your Resumes
        </h1>

        <Link className="mx-auto" href={APP_ROUTES.RESUME_TEMPLATES.path}>
          <Button textSize={'lg'}>Create new one</Button>
        </Link>

        <div className="max-w-6xl mx-auto mt-5 flex gap-4">
          {resumes && resumes.length === 0 && (
            <div className="flex flex-col items-center gap-2 mt-10">
              <h2 className="text-xl">No resumes found!</h2>
            </div>
          )}
          {resumes &&
            resumes.map((resume) => (
              <div key={resume._id} className="flex flex-col items-center">
                <Link
                  href={`/edit-resume/${resume._id}`}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-[200px] h-[280px] overflow-hidden shadow-md rounded-sm">
                    <Image
                      alt=""
                      src={resume?.coverImage?.url ?? ''}
                      layout="fill"
                      className="
                   object-cover object-top"
                    />
                  </div>
                  <h1 className="font-semibold text-lg text-center mt-2">
                    {resume.title}
                  </h1>
                </Link>

                <Trash
                  onClick={() => deleteResume({ id: resume._id })}
                  className="text-red-400 hover:opacity-70 cursor-pointer mt-1"
                />
              </div>
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
