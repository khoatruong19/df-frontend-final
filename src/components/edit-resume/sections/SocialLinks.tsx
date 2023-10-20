import React, { useEffect, useState } from 'react';
import { Id } from '../../../../convex/_generated/dataModel';
import { SocialLink } from '@/utils/types';
import SocialLinkCard from '../cards/SocialLinkCard';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { PlusIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import SectionTitleInput from '../SectionTitleInput';

type SocialLinksProps = {
  resumeId: Id<'resume'>;
  socialLinksTitle: string;
  socialLinks: SocialLink[];
};

const SocialLinks = ({
  resumeId,
  socialLinksTitle,
  socialLinks,
}: SocialLinksProps) => {
  const [title, setTitle] = useState(socialLinksTitle);

  const debouncedTitle = useDebounce(title, 500);

  const updateSocialLinksTitle = useMutation(api.resume.updateSocialLinksTitle);
  const addSocialLink = useMutation(api.resume.addSocialLink);

  const addMoreSocialLink = () => {
    addSocialLink({ id: resumeId });
  };

  useEffect(() => {
    updateSocialLinksTitle({ id: resumeId, socialLinksTitle: title });
  }, [debouncedTitle]);

  useEffect(() => {
    if (title !== socialLinksTitle) setTitle(socialLinksTitle);
  }, [socialLinksTitle]);

  return (
    <section>
      <div className="mb-3">
        <SectionTitleInput value={title} setValue={setTitle} />
        <p className="text-sm text-gray-400">
          You can add links to websites you want hiring managers to see! Perhaps
          It will be a link to your portfolio, LinkedIn profile, or personal
          website
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {socialLinks.map((socialLink) => (
          <SocialLinkCard
            resumeId={resumeId}
            socialLink={socialLink}
            key={socialLink.id}
          />
        ))}

        <button
          onClick={addMoreSocialLink}
          className="py-2 px-5 hover:bg-slate-200 flex items-center gap-2 text-base cursor-pointer duration-100"
        >
          <PlusIcon size={15} />
          <span>
            {socialLinks.length === 0
              ? 'Add one social link'
              : 'Add one more social link'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default SocialLinks;
