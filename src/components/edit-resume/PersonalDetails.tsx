'use client';

import React, { useState } from 'react';
import FieldControl from './FieldControl';

type Props = {};

const PersonalDetails = (props: Props) => {
  const [jobTitle, setJobTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  return (
    <section>
      <h3 className="mb-3 text-xl">Personal Details</h3>

      <div className="grid grid-cols-2 gap-4">
        <FieldControl
          value={jobTitle}
          setValue={setJobTitle}
          label="Job Title"
        />
        <FieldControl
          value={jobTitle}
          setValue={setJobTitle}
          label="Job Title"
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
