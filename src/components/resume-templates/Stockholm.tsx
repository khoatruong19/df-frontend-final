import { User, Briefcase, GraduationCap } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Doc } from '../../../convex/_generated/dataModel';

type StockholmProps = {
  resume: Doc<'resume'>;
};

const Stockholm = ({ resume }: StockholmProps) => {
  const { firstName, lastName, jobTitle, ...details } = resume.personalDetails;
  const personalDetailsInArray = Object.entries(details);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef || !sectionRef.current) return;
    const element = sectionRef.current;
    const hasOverflowingChildren =
      element.offsetHeight < element.scrollHeight ||
      element.offsetWidth < element.scrollWidth;
  }, [resume]);

  return (
    <section
      ref={sectionRef}
      className="max-h-screen py-9 px-12 bg-white aspect-[12/16] rounded-md overflow-hidden"
    >
      <div className="flex items-center gap-5 justify-start">
        <img
          src="https://avatars.githubusercontent.com/u/85026053?v=4"
          alt=""
          className="w-14 h-14 object-cover"
        />

        <div>
          <h2 className="text-2xl font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="text-xxs">{jobTitle}</p>
        </div>
      </div>

      <div className="mt-5 flex items-start">
        <div className="w-2/3 flex flex-col gap-5">
          {/* Profile Summary */}

          {resume?.profileSummary && (
            <div className="flex">
              <div className="w-6">
                <User className="mt-0.5" size={15} strokeWidth={3} />
              </div>
              <div className="max-w-[90%]">
                <h2 className=" font-semibold">Profile</h2>
                <p className="text-xs break-all">{resume?.profileSummary}</p>
              </div>
            </div>
          )}

          {/* Employment History */}
          {resume?.employmentHistory.length > 0 && (
            <div className="flex">
              <div className="w-6">
                <Briefcase className="mt-0.5" size={15} strokeWidth={3} />
              </div>
              <div className="max-w-[90%]">
                <h2 className=" font-semibold">Employment History</h2>
                {resume?.employmentHistory.map(
                  ({
                    id,
                    city,
                    company,
                    description,
                    jobTitle,
                    endDate,
                    startDate,
                  }) => (
                    <div key={id} className="mb-4">
                      {(jobTitle || company || city) && (
                        <h3 className="text-xs font-semibold">
                          {jobTitle} - {company} {city && `,${city}`}
                        </h3>
                      )}
                      {(startDate || endDate) && (
                        <p className="text-xxs">
                          {startDate} - {endDate}
                        </p>
                      )}
                      {description && (
                        <p className="mt-1.5 text-xs  break-all">
                          {description}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="flex">
            <div className="w-6">
              <GraduationCap className="mt-0.5" size={15} strokeWidth={3} />
            </div>
            <div className="max-w-[90%]">
              <h2 className="font-semibold">Education</h2>
              <div>
                <h3 className="text-xs font-semibold">Bach Khoa University</h3>
                <p className="text-xxs">February 2023 - July 2023</p>
                <p className="mt-1.5 text-xs  break-all">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam aliquam voluptates voluptatibus repudiandae? Iure
                  officiis nulla doloremque quos rem, aliquam, hic id nam itaque
                  autem, adipisci consectetur rerum tempora. Tenetur.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 pl-6 flex flex-col gap-4">
          {/* Details */}
          {personalDetailsInArray.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">Details</h3>
              {personalDetailsInArray.map(([key, value]) => (
                <p
                  key={key}
                  className={`text-xxs ${
                    key === 'email' ? 'text-blue-400' : ''
                  }`}
                >
                  {value}
                </p>
              ))}
            </div>
          )}

          {/* Date of birth */}

          {details?.email && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">Date of birth</h3>
              <p className="text-xxs">{details?.dateOfBirth}</p>
            </div>
          )}

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold mb-0.5">Links</h3>
            <p className="text-xxs text-blue-500">Github</p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-semibold mb-0.5">Skills</h3>
            <div>
              <p className="text-xxs">Teamwork</p>
              <span className="block h-0.5 w-full bg-blue-400 mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stockholm;
