import { generateHTMLFromJSON } from '@/utils/generateHTMLFromJSON';
import { getSkillProgress } from '@/utils/helpers';
import { BadgeCheck, Briefcase, School, Star, User } from 'lucide-react';
import Image from 'next/image';
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
    dateOfBirth,
    ...details
  } = resume.personalDetails;
  const personalDetailsInArray = Object.entries(details);

  const profileSummaryHTML = generateHTMLFromJSON(resume.profileSummary ?? '');

  return (
    <section className="min-h-screen bg-white aspect-[12/16] rounded-md overflow-auto scrollbar-none">
      <div
        id="resume"
        className=" py-9 px-12 min-h-screen flex flex-col items-stretch"
      >
        <div className="flex items-center gap-5 justify-start ">
          {profileImage && (
            //Can't use Next Image for rendering image properly when converting to PDF so i use 'img' tag instead!
            <img
              className="w-14 h-14 rounded-md object-cover"
              src={profileImage.url}
              alt=""
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold mb-0.5">
              {firstName} {lastName}
            </h2>
            <p className="text-xxs m-0">{jobTitle}</p>
          </div>
        </div>
        <div className="mt-5 flex items-start">
          <div className="w-2/3 flex flex-col gap-4">
            {/* Profile Summary */}
            {profileSummaryHTML && profileSummaryHTML.length > 0 && (
              <div className="flex items-start">
                <div className="icon w-6 mt-0.5">
                  <User fill="#000" size={15} strokeWidth={3} />
                </div>
                <div className="max-w-[90%]">
                  <h2 className=" font-semibold mb-0.5">
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
                <div className="w-6 icon">
                  <Briefcase className="mt-1" size={13} strokeWidth={3} />
                </div>
                <div className="max-w-[90%]">
                  <h2 className=" font-semibold mb-0.5">
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
                      <div key={id} className="mb-2">
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
                <div className="w-6 icon">
                  <School className="mt-0.5" size={15} strokeWidth={3} />
                </div>
                <div className="max-w-[90%]">
                  <h2 className=" font-semibold mb-0.5">
                    {resume.educationTitle}
                  </h2>
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
                      <div key={id} className="mb-2">
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
                <div className="w-6 icon">
                  <BadgeCheck className="mt-0.5" size={15} strokeWidth={3} />
                </div>
                <div className="max-w-[90%]">
                  <h2 className=" font-semibold mb-0.5">
                    {resume.coursesTitle}
                  </h2>
                  {resume.courses.map(
                    ({ id, course, institution, endDate, startDate }) => (
                      <div key={id} className="mb-2">
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
                  <div className="w-6 icon">
                    <Star
                      fill="#000"
                      className="mt-1"
                      size={13}
                      strokeWidth={3}
                    />
                  </div>
                  <div className="max-w-[90%]">
                    <h2 className=" font-semibold mb-0.5">{section.title}</h2>
                    {section?.items.map(
                      ({
                        id,
                        content,
                        city,
                        description,
                        endDate,
                        startDate,
                      }) => (
                        <div key={id} className="mb-2">
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
            {dateOfBirth && (
              <div>
                <h3 className="text-xs font-semibold mb-0.5">Date of birth</h3>
                <p className="text-xxs">{dateOfBirth}</p>
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
                    <span className="icon">
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
                      className=" block h-0.5 bg-blue-400 mt-0.5 process"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Hobbies */}
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
      </div>
    </section>
  );
};

export default Stockholm;
