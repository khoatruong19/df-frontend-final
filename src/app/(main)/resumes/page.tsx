'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { useQuery } from 'convex/react';
import Link from 'next/link';
import { api } from '../../../../convex/_generated/api';

export default function ResumePage() {
  const resumes = useQuery(api.resume.getAll);

  return (
    <MainLayout>
      <div className="font-display flex-1 w-full  flex flex-col gap-6">
        <h1 className="text-5xl font-semibold italic text-center">
          Your Resumes
        </h1>

        <div className="max-w-6xl mx-auto mt-5 flex gap-4">
          {resumes &&
            resumes.map((resume) => (
              <Link key={resume._id} href={`/edit-resume/${resume._id}`}>
                <div>
                  <img
                    alt=""
                    src={resume?.coverImage?.url}
                    className="w-48 
                   object-contain"
                  />
                  <h1 className="font-semibold text-lg text-center">
                    {resume.title}
                  </h1>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
