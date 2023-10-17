'use client';

import React, { useEffect, useMemo, useState } from 'react';
import FieldControl from '../FieldControl';
import { ResumePersonalDetails } from '@/utils/types';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/useDebounce';
import { Id } from '../../../../convex/_generated/dataModel';
import useUploadResumeCoverImg from '@/hooks/useUploadResumeCoverImg';
import ProfileImageUpload from '../ProfileImageUpload';

type PersonalDetailsProps = {
  resumeId: Id<'resume'>;
  details: ResumePersonalDetails;
};

const PersonalDetails = ({ resumeId, details }: PersonalDetailsProps) => {
  const [jobTitle, setJobTitle] = useState(details?.jobTitle ?? '');
  const [firstName, setFirstName] = useState(details?.firstName ?? '');
  const [lastName, setLastName] = useState(details?.lastName ?? '');
  const [email, setEmail] = useState(details?.email ?? '');
  const [phone, setPhone] = useState(details?.phone ?? '');
  const [country, setCountry] = useState(details?.country ?? '');
  const [city, setCity] = useState(details?.city ?? '');
  const [address, setAddress] = useState(details?.address ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(details?.dateOfBirth ?? '');

  const memoDetails = useMemo(
    () => ({
      jobTitle,
      address,
      city,
      country,
      dateOfBirth,
      email,
      firstName,
      lastName,
      phone,
    }),
    [
      jobTitle,
      address,
      city,
      country,
      dateOfBirth,
      email,
      firstName,
      lastName,
      phone,
    ]
  );

  const debouncedValues = useDebounce<
    Omit<ResumePersonalDetails, 'profileImage'>
  >(memoDetails, 500);

  const updatePersonalDetails = useMutation(api.resume.updateProfileDetail);

  useEffect(() => {
    const cleanedValues: Omit<ResumePersonalDetails, 'profileImage'> = {};

    Object.entries(debouncedValues).forEach(([key, value]) => {
      if (value.length > 0) {
        cleanedValues[
          key as keyof Omit<ResumePersonalDetails, 'profileImage'>
        ] = value;
      }
    });

    updatePersonalDetails({ id: resumeId, ...cleanedValues });
  }, [debouncedValues]);

  return (
    <section>
      <h3 className="mb-3 text-xl">Personal Details</h3>

      <div className="grid grid-cols-2 gap-y-5 gap-x-10">
        <FieldControl
          value={jobTitle}
          setValue={setJobTitle}
          label="Job Title"
        />
        <ProfileImageUpload
          resumeId={resumeId}
          profileImage={details.profileImage}
        />
        <FieldControl
          value={firstName}
          setValue={setFirstName}
          label="First Name"
        />
        <FieldControl
          value={lastName}
          setValue={setLastName}
          label="Last Name"
        />

        <FieldControl value={email} setValue={setEmail} label="Email" />
        <FieldControl value={phone} setValue={setPhone} label="Phone" />
        <FieldControl value={country} setValue={setCountry} label="Country" />
        <FieldControl value={city} setValue={setCity} label="City" />
        <FieldControl value={address} setValue={setAddress} label="Address" />
        <FieldControl
          value={dateOfBirth}
          setValue={setDateOfBirth}
          label="Date Of Birth"
        />
      </div>
    </section>
  );
};

export default PersonalDetails;
