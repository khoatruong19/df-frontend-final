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
        'relative w-full py-6 bg-black/5 cursor-pointer hover:bg-black/10 group flex flex-col items-center justify-center gap-2',
        {
          'border-2 border-black': isSelected,
        }
      )}
    >
      <div className="relative w-full h-[200px]">
        <Image src={template.coverImage} alt="" fill objectFit="contain" />
      </div>
      <h3 className="absolute bottom-0 font-semibold text-appMainTextColor">
        {template.name}
      </h3>
    </div>
  );
};

export default ResumeTemplateCard;
