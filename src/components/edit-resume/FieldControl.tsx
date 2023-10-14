import React from 'react';

type FieldControlProps = {
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
};

const FieldControl = (props: FieldControlProps) => {
  const { label, placeholder = '' } = props;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        placeholder={placeholder}
        className="px-3 py-2.5 outline-none bg-slate-200"
      />
    </div>
  );
};

export default FieldControl;
