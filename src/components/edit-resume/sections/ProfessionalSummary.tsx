import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce';
import { useMutation } from 'convex/react';
import { Check, Pencil, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import Editor from '../editor/Editor';
import ProfessionalSummaryPhrasesPopup from '../pre-written-phrases-popups/ProfessionalSummaryPhrasesPopup';

type ProfessionalSummaryProps = {
  resumeId: Id<'resume'>;
  profileSummary?: string;
};

const ProfessionalSummary = ({
  resumeId,
  profileSummary,
}: ProfessionalSummaryProps) => {
  const [value, setValue] = useState(profileSummary ?? '');
  const [openEditor, setOpenEditor] = useState(false);
  const [refreshEditor, setRefreshEditor] = useState(false);

  const debouncedValue = useDebounce(value, 500);

  const parsedValue: { type: string; content: any[] } = useMemo(() => {
    let result = { type: 'doc', content: [] };
    try {
      result = JSON.parse(debouncedValue);
    } catch (error) {
      console.log(error);
    }
    return result;
  }, [debouncedValue]);

  const selectPrewrittenPhrase = (phrase: string) => {
    setRefreshEditor(true);
    const paragraph = {
      type: 'text',
      text: phrase.replaceAll(`\n`, ''),
    };
    parsedValue.content.push(paragraph);
    setValue(JSON.stringify(parsedValue));
    setTimeout(() => {
      setRefreshEditor(false);
    }, 500);
  };

  const updatePersonalDetails = useMutation(api.resume.updateProfileSummary);

  useEffect(() => {
    updatePersonalDetails({ id: resumeId, profileSummary: debouncedValue });
  }, [debouncedValue]);

  return (
    <section className="relative">
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Professional Summary</h3>
        <p className="text-sm text-gray-400">
          Write 2-4 short & energetic sentences to interest the reader! Mention
          your role, experience & most importantly - your biggest achievements,
          best qualities and skills.
        </p>
      </div>
      <Collapsible
        open={openEditor}
        onOpenChange={(value) => setOpenEditor(value)}
        className="group relative border-2 cursor-pointer px-5 py-2"
      >
        <CollapsibleTrigger asChild>
          <div className="text-lg flex items-center justify-center gap-2 h-10 hover:opacity-60">
            {openEditor && (
              <>
                <Check size={18} />
                <span>Done</span>
              </>
            )}
            {!openEditor && (
              <>
                <Pencil size={18} />
                <span>Edit</span>
              </>
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Editor isRefresh={refreshEditor} value={value} setValue={setValue} />
        </CollapsibleContent>
      </Collapsible>

      {openEditor && (
        <ProfessionalSummaryPhrasesPopup
          wrapperClass="absolute top-14 right-0 z-50 "
          triggerElement={
            <button className="flex items-center gap-2 hover:text-blue-400">
              <span className="text-base">Pre-written phase</span>
              <Plus size={18} />
            </button>
          }
          selectPrewrittenPhrase={selectPrewrittenPhrase}
        />
      )}
    </section>
  );
};

export default ProfessionalSummary;
