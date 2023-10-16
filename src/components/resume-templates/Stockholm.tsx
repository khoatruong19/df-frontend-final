import { User, Briefcase, School, Star } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Doc } from '../../../convex/_generated/dataModel';
import { SocialIcon } from 'react-social-icons';
import { getSkillProgress } from '@/utils/helpers';

type StockholmProps = {
  resume: Doc<'resume'>;
  customSections: Doc<'customSection'>[];
};

const Stockholm = ({ resume, customSections }: StockholmProps) => {
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
      className="min-h-screen py-9 px-12 bg-white aspect-[12/16] rounded-md overflow-hidden"
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
                <User
                  fill="#000"
                  className="mt-0.5"
                  size={15}
                  strokeWidth={3}
                />
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
                <Briefcase className="mt-1" size={13} strokeWidth={3} />
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
                    <div key={id} className="mb-1">
                      {(jobTitle || company || city) && (
                        <h3 className="text-xs font-semibold">
                          {jobTitle} - {company} {city && `, ${city}`}
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
          {resume?.education.length > 0 && (
            <div className="flex">
              <div className="w-6">
                <School className="mt-0.5" size={15} strokeWidth={3} />
              </div>
              <div className="max-w-[90%]">
                <h2 className=" font-semibold">Education</h2>
                {resume?.education.map(
                  ({
                    id,
                    city,
                    degree,
                    description,
                    school,
                    endDate,
                    startDate,
                  }) => (
                    <div key={id} className="mb-1">
                      {(school || degree || city) && (
                        <h3 className="text-xs font-semibold">
                          {school} - {degree} {city && `, ${city}`}
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

          {customSections.length > 0 &&
            customSections.map((section) => (
              <div key={section._id} className="flex">
                <div className="w-6">
                  <Star
                    fill="#000"
                    className="mt-1"
                    size={13}
                    strokeWidth={3}
                  />
                </div>
                <div className="max-w-[90%]">
                  <h2 className=" font-semibold">{section.title}</h2>
                  {section?.items.map(
                    ({
                      id,
                      content,
                      city,
                      description,
                      endDate,
                      startDate,
                    }) => (
                      <div key={id} className="mb-1">
                        {(content || city) && (
                          <h3 className="text-xs font-semibold">
                            {content} {city && `, ${city}`}
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
            ))}
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
          {resume?.socialLinks?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">Links</h3>
              {resume?.socialLinks?.map((socialLink) => (
                <div key={socialLink.id} className="flex mb-3">
                  <span>
                    <SocialIcon
                      style={{ height: 15, width: 15 }}
                      color="red"
                      url={socialLink.link}
                      as="span"
                    />
                  </span>

                  <p className="text-xxs text-blue-500 break-all ml-1 h-2 ">
                    {socialLink.link}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resume?.skills?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">Skills</h3>
              {resume?.skills.map((skill) => (
                <div key={skill.id} className="mb-2">
                  <p className="text-xs">{skill.skill}</p>
                  <span
                    style={{ width: getSkillProgress(skill?.level ?? '') }}
                    className="block h-0.5 bg-blue-400 mt-0.5"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Stockholm;
