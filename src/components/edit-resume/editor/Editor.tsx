import React from 'react';
import EditorMenuBar from './EditorMenuBar';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import {
  Editor as TipTapEditor,
  EditorContent,
  useEditor,
} from '@tiptap/react';

type EditorProps = {
  value: string;
  setValue: (value: string) => void;
};

const Editor = ({ value, setValue }: EditorProps) => {
  const handleOnChangeContent = ({ editor }: any) => {
    if (!editor) return;
    setValue((editor as TipTapEditor).getHTML());
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline, BulletList, ListItem, OrderedList],
    onUpdate: handleOnChangeContent,
    editorProps: {
      attributes: {
        class: 'prose text-base text-gray-500 outline-none min-h-[250px]',
      },
    },
    content: value,
    editable: true,
  });

  return (
    <div className="border-2 bg-slate-200 px-2 z-[999999]">
      <EditorMenuBar editor={editor} />
      <hr className="w-full h-1 bg-black/20 my-1" />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
