import { generateHTMLFromJSON } from '@/utils/generateHTMLFromJSON';
import { getSkillProgress } from '@/utils/helpers';
import { BadgeCheck, Briefcase, School, Star, User } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { SocialIcon } from 'react-social-icons';
import { Doc } from '../../../convex/_generated/dataModel';

type DublinProps = {
  resume: Doc<'resume'>;
  customSections: Doc<'customSection'>[];
};

const Dublin = ({ resume, customSections }: DublinProps) => {
  const {
    firstName,
    lastName,
    jobTitle,
    profileImage,
    dateOfBirth,
    title: detailsTitle,
    ...details
  } = resume.personalDetails;
  const personalDetailsInArray = Object.entries(details);

  const sectionRef = useRef<HTMLElement | null>(null);

  const profileSummaryHTML = generateHTMLFromJSON(resume.profileSummary ?? '');

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white aspect-[12/16] rounded-md overflow-auto scrollbar-none"
    >
      <div className="font-diblin h-full flex items-start">
        <div className="py-12 w-1/3 h-full flex flex-col gap-5 bg-emerald-900">
          {/* Profile Image */}
          <div className="flex flex-col items-center justify-start text-white ">
            {profileImage && (
              <Image
                src={profileImage.url}
                alt=""
                width={44}
                height={44}
                className="object-cover rounded-full mb-1"
              />
            )}

            <h2 className="text-lg font-bold mb-2">
              {firstName} {lastName}
            </h2>
            {jobTitle && (
              <>
                <div className="h-0.5 w-3 bg-slate-500 mb-2"></div>
                <p className="text-xxs font-medium tracking-widest text-slate-300">
                  {jobTitle}
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col gap-5 pl-10 pr-8 text-white">
            {/* Details */}
            {personalDetailsInArray.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-0.5">{detailsTitle}</h3>
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
            {dateOfBirth && (
              <div>
                <h3 className="text-xxs font-semibold mb-0.5 text-slate-400">
                  Date of birth
                </h3>
                <p className="text-xxs">{dateOfBirth}</p>
              </div>
            )}

            {/* Links */}
            {resume?.socialLinks?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-0.5">
                  {resume.socialLinksTitle}
                </h3>
                {resume?.socialLinks?.map((socialLink) => (
                  <p
                    key={socialLink.id}
                    className="text-xxs break-all h-2 mb-1 leading-3 underline"
                  >
                    {socialLink.link}
                  </p>
                ))}
              </div>
            )}

            {/* Skills */}
            {resume?.skills?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-0.5">
                  {resume.skillsTitle}
                </h3>
                {resume?.skills.map((skill) => (
                  <div key={skill.id} className="mb-2">
                    <p className="text-xxs break-all">{skill.skill}</p>
                    <span
                      style={{ width: getSkillProgress(skill?.level ?? '') }}
                      className="block h-1 bg-white mt-1.5"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Hobbies */}
            {resume?.hobbies?.content && (
              <div>
                <h3 className="text-sm font-semibold mb-0.5">
                  {resume?.hobbies.title}
                </h3>
                <p className="text-xxs whitespace-pre-wrap">
                  {resume?.hobbies.content}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-2/3 pl-6 py-12 flex flex-col gap-4">
          {/* Profile Summary */}
          {profileSummaryHTML && profileSummaryHTML.length > 0 && (
            <div className="flex">
              <div className="max-w-[90%]">
                <h2 className=" font-semibold mb-1">
                  {resume.profileSummaryTitle}
                </h2>
                <div
                  className="text-xs break-words prose"
                  dangerouslySetInnerHTML={{
                    __html: profileSummaryHTML,
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Employment History */}
          {resume?.employmentHistory.length > 0 && (
            <div className="flex">
              <div className="max-w-[90%]">
                <h2 className="font-semibold mb-1">
                  {resume.employmentHistoryTitle}
                </h2>
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
                        <p className="text-xxs tracking-widest font-semibold text-slate-400">
                          {startDate} - {endDate}
                        </p>
                      )}
                      {description && (
                        <div
                          className="mt-1.5 text-xs break-words prose"
                          dangerouslySetInnerHTML={{
                            __html: generateHTMLFromJSON(description),
                          }}
                        ></div>
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
              <div className="max-w-[90%]">
                <h2 className="mb-1 font-semibold">{resume.educationTitle}</h2>
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
                        <p className="text-xxs tracking-widest font-semibold text-slate-400">
                          {startDate} - {endDate}
                        </p>
                      )}
                      {description && (
                        <div
                          className="mt-1.5 text-xs break-words prose"
                          dangerouslySetInnerHTML={{
                            __html: generateHTMLFromJSON(description),
                          }}
                        ></div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Courses */}
          {resume?.courses && resume.courses.length > 0 && (
            <div className="flex">
              <div className="max-w-[90%]">
                <h2 className="mb-1 font-semibold">{resume.coursesTitle}</h2>
                {resume.courses.map(
                  ({ id, course, institution, endDate, startDate }) => (
                    <div key={id} className="mb-1">
                      {(course || institution) && (
                        <h3 className="text-xs font-semibold">
                          {course} - {institution}
                        </h3>
                      )}
                      {(startDate || endDate) && (
                        <p className="text-xxs tracking-widest font-semibold text-slate-400">
                          {startDate} - {endDate}
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
                          <p className="text-xxs tracking-widest font-semibold text-slate-400">
                            {startDate} - {endDate}
                          </p>
                        )}
                        {description && (
                          <div
                            className="mt-1.5 text-xs break-words prose"
                            dangerouslySetInnerHTML={{
                              __html: generateHTMLFromJSON(description),
                            }}
                          ></div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Dublin;
