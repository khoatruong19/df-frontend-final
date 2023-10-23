import { generateHTMLFromJSON } from '@/utils/generateHTMLFromJSON';
import { getSkillProgress } from '@/utils/helpers';
import Image from 'next/image';
import { Doc } from '../../../convex/_generated/dataModel';

type MadridProps = {
  resume: Doc<'resume'>;
  customSections: Doc<'customSection'>[];
};

const Madrid = ({ resume, customSections }: MadridProps) => {
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
    <section className="min-h-screen bg-white aspect-[12/16] rounded-md overflow-auto scrollbar-none font-display">
      <div id="resume" className="min-h-screen flex flex-col items-stretch">
        <div className="flex items-center h-[148px] bg-yellow-300 ">
          {profileImage && (
            //Cant use Next Image for rendering image properly when converting to PDF so i use 'img' tag instead!
            <img
              className="w-[148px] h-[148px] object-cover"
              src={profileImage.url}
              alt=""
            />
          )}

          <div className="flex-1 px-7">
            <h2 className="text-4xl font-semibold uppercase">
              {firstName} <br /> {lastName}
            </h2>
            <p className="text-xxs mt-1 font-semibold process">{jobTitle}</p>
          </div>
        </div>

        <div className="py-5 px-14 flex flex-col gap-3">
          <div className="flex justify-between">
            {personalDetailsInArray.length > 0 && (
              <div className="w-[50%]">
                <h3 className="text-xxs font-semibold mb-2 h-5 leading tracking-widest uppercase px-2 bg-black text-white w-fit">
                  {detailsTitle}
                </h3>
                <p className="text-xs font-semibold">Contact</p>
                {personalDetailsInArray.map(([key, value]) => (
                  <p
                    key={key}
                    className={`text-xxs ${key === 'email' ? 'underline' : ''}`}
                  >
                    {value}
                  </p>
                ))}
              </div>
            )}

            {/* Date of birth */}
            {dateOfBirth && (
              <div className="w-[50%] pt-6">
                <h3 className="text-xs font-semibold mb-0.5">Date of birth</h3>
                <p className="text-xxs">{dateOfBirth}</p>
              </div>
            )}
          </div>

          {/* Profile Summary */}
          {profileSummaryHTML && profileSummaryHTML.length > 0 && (
            <div className="flex">
              <div className="max-w-[90%]">
                <h3 className="process text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                  {resume.profileSummaryTitle}
                </h3>
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
                <h3 className="text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                  {resume.employmentHistoryTitle}
                </h3>
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
                <h3 className="text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                  {resume.educationTitle}
                </h3>
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
                <h3 className="text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                  {resume.coursesTitle}
                </h3>
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
                <div className="max-w-[90%]">
                  <h3 className="text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                    {section.title}
                  </h3>
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

          {/* Links */}
          {resume?.socialLinks?.length > 0 && (
            <div>
              <h3 className="text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                {resume.socialLinksTitle}
              </h3>
              {resume?.socialLinks?.map((socialLink) => (
                <div key={socialLink.id} className="flex items-center mb-2">
                  <p className="text-xxs underline break-all h-2 mb-1 leading-3">
                    {socialLink.link}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resume?.skills?.length > 0 && (
            <div>
              <h3 className="text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                {resume.skillsTitle}
              </h3>
              <div className="grid grid-cols-2 gap-x-14 gap-y-2">
                {resume?.skills.map((skill) => (
                  <div key={skill.id} className="mb-2">
                    <p className="text-xs break-all">{skill.skill}</p>
                    <span
                      style={{ width: getSkillProgress(skill?.level ?? '') }}
                      className="block h-1 bg-black mt-1.5 process"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {resume?.hobbies?.content && (
            <div>
              <h3 className="text-xxs leading font-semibold mb-2 h-5 tracking-widest uppercase px-2 bg-black text-white w-fit">
                {resume.hobbies.title}
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

export default Madrid;
