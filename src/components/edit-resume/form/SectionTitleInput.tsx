import React from 'react';

type SectionTitleInputProps = {
  value: string;
  setValue: (value: string) => void;
};

const SectionTitleInput = ({ value, setValue }: SectionTitleInputProps) => {
  return (
    <input
      className="mb-3 text-xl font-bold bg-transparent outline-none"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SectionTitleInput;
