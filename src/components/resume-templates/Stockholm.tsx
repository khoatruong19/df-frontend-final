import { generateHTMLFromJSON } from '@/utils/generateHTMLFromJSON';
import { getSkillProgress } from '@/utils/helpers';
import { BadgeCheck, Briefcase, School, Star, User } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { SocialIcon } from 'react-social-icons';
import { Doc } from '../../../convex/_generated/dataModel';

type StockholmProps = {
  resume: Doc<'resume'>;
  customSections: Doc<'customSection'>[];
};

const Stockholm = ({ resume, customSections }: StockholmProps) => {
  const {
    firstName,
    lastName,
    jobTitle,
    profileImage,
    title: detailsTitle,
    ...details
  } = resume.personalDetails;
  const personalDetailsInArray = Object.entries(details);

  const sectionRef = useRef<HTMLElement | null>(null);

  const profileSummaryHTML = generateHTMLFromJSON(resume.profileSummary ?? '');

  // useEffect(() => {
  //   if (!sectionRef || !sectionRef.current) return;

  //   const element = sectionRef.current;
  //   const hasOverflowingChildren =
  //     element.offsetHeight < element.scrollHeight ||
  //     element.offsetWidth < element.scrollWidth;

  //   // if (hasOverflowingChildren) printImage();
  // }, [resume]);
  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-9 px-12 bg-white aspect-[12/16] rounded-md overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-neutral-400"
    >
      <div className="flex items-center gap-5 justify-start ">
        {profileImage && (
          <Image
            src={profileImage.url}
            alt=""
            width={56}
            height={56}
            className="object-cover rounded-md"
          />
        )}

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
          {profileSummaryHTML && profileSummaryHTML.length > 0 && (
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
                <h2 className=" font-semibold">{resume.profileSummaryTitle}</h2>
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
              <div className="w-6">
                <Briefcase className="mt-1" size={13} strokeWidth={3} />
              </div>
              <div className="max-w-[90%]">
                <h2 className=" font-semibold">
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
                        <p className="text-xxs">
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
              <div className="w-6">
                <School className="mt-0.5" size={15} strokeWidth={3} />
              </div>
              <div className="max-w-[90%]">
                <h2 className=" font-semibold">{resume.educationTitle}</h2>
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
              <div className="w-6">
                <BadgeCheck className="mt-0.5" size={15} strokeWidth={3} />
              </div>
              <div className="max-w-[90%]">
                <h2 className=" font-semibold">{resume.coursesTitle}</h2>
                {resume.courses.map(
                  ({ id, course, institution, endDate, startDate }) => (
                    <div key={id} className="mb-1">
                      {(course || institution) && (
                        <h3 className="text-xs font-semibold">
                          {course} - {institution}
                        </h3>
                      )}
                      {(startDate || endDate) && (
                        <p className="text-xxs">
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

        <div className="w-1/3 pl-6 flex flex-col gap-4">
          {/* Details */}
          {personalDetailsInArray.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">{detailsTitle}</h3>
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
          {details?.dateOfBirth && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">Date of birth</h3>
              <p className="text-xxs">{details?.dateOfBirth}</p>
            </div>
          )}

          {/* Links */}
          {resume?.socialLinks?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">
                {resume.socialLinksTitle}
              </h3>
              {resume?.socialLinks?.map((socialLink) => (
                <div key={socialLink.id} className="flex items-center mb-2">
                  <span>
                    <SocialIcon
                      style={{ height: 15, width: 15 }}
                      color="red"
                      url={socialLink.link}
                      as="span"
                    />
                  </span>

                  <p className="text-xxs text-blue-500 break-all ml-1 h-2 mb-1 leading-3">
                    {socialLink.link}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resume?.skills?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">
                {resume.skillsTitle}
              </h3>
              {resume?.skills.map((skill) => (
                <div key={skill.id} className="mb-2">
                  <p className="text-xs break-all">{skill.skill}</p>
                  <span
                    style={{ width: getSkillProgress(skill?.level ?? '') }}
                    className="block h-0.5 bg-blue-400 mt-0.5"
                  />
                </div>
              ))}
            </div>
          )}

          {resume?.hobbies?.content && (
            <div>
              <h3 className="text-xs font-semibold mb-0.5">
                {resume?.hobbies.title}
              </h3>
              <p className="text-xxs whitespace-pre-wrap">
                {resume?.hobbies.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Stockholm;
