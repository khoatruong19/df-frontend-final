'use client';

import ResumeReview from '@/components/edit-resume/ResumeReview';
import React, { useEffect, useState } from 'react';
import { Id } from '../../../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import LoadingSpinner from '@/components/core/LoadingSpinner';

type ResumePreviewPageProps = {
  params: {
    id: Id<'resume'>;
  };
};

const ResumePreviewPage = ({ params: { id } }: ResumePreviewPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const resume = useQuery(api.resume.getById, {
    id,
  });

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <main className="min-h-screen w-screen flex items-center justify-center ">
      {isLoading && <LoadingSpinner />}
      {!isLoading && resume && (
        <ResumeReview resume={resume} downScale={false} />
      )}
      {!isLoading && !resume && (
        <h2 className="text-xl font-semibold">Not found</h2>
      )}
    </main>
  );
};

export default ResumePreviewPage;
