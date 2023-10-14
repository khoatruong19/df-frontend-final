import React from 'react';

type Props = {};

const SocialLinks = (props: Props) => {
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

      <textarea className="w-full min-h-[200px] bg-slate-200"></textarea>
    </section>
  );
};

export default SocialLinks;
