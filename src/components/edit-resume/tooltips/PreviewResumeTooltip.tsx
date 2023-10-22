import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Fullscreen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_ROUTES } from '@/utils/constants';
import { Id } from '../../../../convex/_generated/dataModel';

const PreviewResumeTooltip = ({ resumeId }: { resumeId: Id<'resume'> }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`${APP_ROUTES.RESUME_PREVIEW.path}${resumeId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button size={'icon'}>
              <Fullscreen />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>Preview</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PreviewResumeTooltip;
