/* eslint-disable react/display-name */
import { Editor as TipTapEditor } from '@tiptap/react';
import React, { useMemo } from 'react';
import { Editor as NovelEditor } from 'novel';
import LoadingSpinner from '@/components/core/LoadingSpinner';

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
    <div className="border-2 bg-white px-2 z-[999999] min-h-[300px] ">
      {isRefresh && (
        <div className="mt-8 w-fit mx-auto">
          <LoadingSpinner />
        </div>
      )}
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
