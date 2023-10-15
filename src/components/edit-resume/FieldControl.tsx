import React from 'react';

type FieldControlProps = {
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
};

const FieldControl = (props: FieldControlProps) => {
  const { label, placeholder = '', value, setValue } = props;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2.5 outline-none bg-slate-200 text-lg font-medium"
      />
    </div>
  );
};

export default FieldControl;
