import { cn } from '@/lib/utils';
import { ResumeTemplate } from '@/utils/types';
import Image from 'next/image';
import React from 'react';

type ResumeTemplateCardProps = {
  template: ResumeTemplate;
  isSelected: boolean;
  selectTemplate: () => void;
};

const ResumeTemplateCard = ({
  template,
  isSelected,
  selectTemplate,
}: ResumeTemplateCardProps) => {
  return (
    <div
      onClick={selectTemplate}
      className={cn(
        'relative w-full py-5 bg-black/5 cursor-pointer hover:bg-black/10 group',
        {
          'border-2 border-black': isSelected,
        }
      )}
    >
      <div className="relative w-full h-[200px]">
        <Image src={template.coverImage} alt="" fill objectFit="contain" />
      </div>
    </div>
  );
};

export default ResumeTemplateCard;
