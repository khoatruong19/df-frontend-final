/* eslint-disable react/display-name */
import { Editor as TipTapEditor } from '@tiptap/react';
import React, { useMemo } from 'react';
import { Editor as NovelEditor } from 'novel';

type EditorProps = {
  value: string;
  setValue: (value: string) => void;
  isRefresh?: boolean;
};

const Editor = (props: EditorProps) => {
  const { setValue, value, isRefresh = false } = props;
  const handleOnChangeContent = (editor: any) => {
    if (!editor) return;

    if ((editor as TipTapEditor).getHTML() === '<p></p>') {
      if (value === '') return;
      setValue('');
      return;
    }
    setValue(JSON.stringify((editor as TipTapEditor).getJSON()));
  };

  const defaultValue = useMemo(() => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return '';
    }
  }, [value]);

  return (
    <div className="border-2 bg-slate-200 px-2 z-[999999] min-h-[300px] ">
      {isRefresh && 'Refreshing....'}
      {!isRefresh && (
        <NovelEditor
          disableLocalStorage={true}
          defaultValue={defaultValue}
          className="min-h-[300px] prose text-base text-gray-500 w-full"
          onUpdate={handleOnChangeContent}
        />
      )}
    </div>
  );
};

export default Editor;
