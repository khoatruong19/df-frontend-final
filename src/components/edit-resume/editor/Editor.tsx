import React from 'react';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import { Editor as TipTapEditor, generateJSON } from '@tiptap/react';

import { Editor as NovelEditor } from 'novel';
import Bold from '@tiptap/extension-bold';

type EditorProps = {
  value: string;
  setValue: (value: string) => void;
};

const Editor = ({ value, setValue }: EditorProps) => {
  const handleOnChangeContent = ({ editor }: any) => {
    if (!editor) return;
    if ((editor as TipTapEditor).getHTML() === '<p></p>') {
      if (value === '') return;
      setValue('');
      return;
    }
    setValue((editor as TipTapEditor).getHTML());
  };
  return (
    <div className="border-2 bg-slate-200 px-2 z-[999999]">
      <NovelEditor
        disableLocalStorage={true}
        extensions={[Bold]}
        defaultValue={generateJSON(value, [
          StarterKit,
          Underline,
          BulletList,
          ListItem,
          OrderedList,
        ])}
        className="min-h-[300px] prose text-base text-gray-500"
        onUpdate={handleOnChangeContent}
      />
    </div>
  );
};

export default Editor;
