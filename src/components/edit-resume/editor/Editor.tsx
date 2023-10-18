import { Editor as TipTapEditor } from '@tiptap/react';
import { useMemo } from 'react';
import { Editor as NovelEditor } from 'novel';

type EditorProps = {
  value: string;
  setValue: (value: string) => void;
};

const Editor = ({ value, setValue }: EditorProps) => {
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
  }, []);

  return (
    <div className="border-2 bg-slate-200 px-2 z-[999999]">
      <NovelEditor
        disableLocalStorage={true}
        defaultValue={defaultValue}
        className="min-h-[300px] prose text-base text-gray-500 w-full"
        onUpdate={handleOnChangeContent}
      />
    </div>
  );
};

export default Editor;
