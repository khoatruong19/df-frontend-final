import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce';
import { SocialLink } from '@/utils/types';
import { useMutation } from 'convex/react';
import { ChevronDown, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import FieldControl from '../form/FieldControl';

type SocialLinkCardProps = {
  resumeId: Id<'resume'>;
  socialLink: SocialLink;
};

const SocialLinkCard = ({ resumeId, socialLink }: SocialLinkCardProps) => {
  const [link, setLink] = useState(socialLink.link ?? '');

  const debouncedValues = useDebounce(link, 1000);

  const updateSocialLink = useMutation(api.resume.updateSocialLink);

  const deleteSocialLink = useMutation(api.resume.deleteSocialLink);

  const deleteSocialLinkOnClick = () =>
    deleteSocialLink({ resumeId, id: socialLink.id });

  useEffect(() => {
    updateSocialLink({ resumeId, id: socialLink.id, link });
  }, [debouncedValues]);

  return (
    <Collapsible className="group relative border-2 cursor-pointer px-5 py-2">
      <CollapsibleTrigger asChild>
        <div className=" relative text-base min-h-[56px] flex items-center justify-between hover:opacity-60">
          {!!!link && <p>&#40;Not specified&#41;</p>}
          {!!link && (
            <div className="flex items-center gap-2">
              <SocialIcon url={link} bgColor="transparent" />
              <p className="text-sm text-gray-400">{link}</p>
            </div>
          )}
          <ChevronDown />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="w-full mt-3">
          <FieldControl value={link} setValue={setLink} label="Link" />
        </div>
      </CollapsibleContent>
      <button
        onClick={deleteSocialLinkOnClick}
        className="hidden group-hover:flex absolute top-5 right-[-40px] px-2 py-1 justify-end hover:opacity-80 text-red-500"
      >
        <Trash />
      </button>
    </Collapsible>
  );
};

export default SocialLinkCard;
