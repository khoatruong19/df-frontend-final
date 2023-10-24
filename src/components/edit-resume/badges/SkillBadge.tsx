import { Plus } from 'lucide-react';
import React from 'react';

type SkillBadgeProps = {
  content: string;
  clickHandler: (name: string) => void;
};

const SkillBadge = ({ content, clickHandler }: SkillBadgeProps) => {
  return (
    <button
      onClick={() => clickHandler(content)}
      className="px-2 py-1 flex items-center gap-2 text-sm bg-appSecondary text-appMainTextColor hover:opacity-75 shadow-md rounded-sm"
    >
      <span>{content}</span>
      <Plus size={16} />
    </button>
  );
};

export default SkillBadge;
