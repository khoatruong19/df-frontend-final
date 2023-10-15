import React from 'react';
import { Id } from '../../../convex/_generated/dataModel';
import { SocialLink } from '@/utils/types';
import SocialLinkCard from './SocialLinkCard';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { PlusIcon } from 'lucide-react';

type SocialLinksProps = {
  resumeId: Id<'resume'>;
  socialLinks: SocialLink[];
};

const SocialLinks = ({ resumeId, socialLinks }: SocialLinksProps) => {
  const addSocialLink = useMutation(api.resume.addSocialLink);

  const addMoreSocialLink = () => {
    addSocialLink({ id: resumeId });
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Social Links</h3>
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
          <span>Add one more social link</span>
        </button>
      </div>
    </section>
  );
};

export default SocialLinks;
