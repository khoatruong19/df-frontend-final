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
import ProfessionalSummaryPhrasesPopup from '../popups/ProfessionalSummaryPhrasesPopup';
import SectionTitleInput from '../form/SectionTitleInput';

type ProfessionalSummaryProps = {
  resumeId: Id<'resume'>;
  profileSummaryTitle: string;
  profileSummary?: string;
};

const ProfessionalSummary = ({
  resumeId,
  profileSummaryTitle,
  profileSummary,
}: ProfessionalSummaryProps) => {
  const [summaryTitle, setSummaryTitle] = useState(profileSummaryTitle);
  const [summary, setSummary] = useState(profileSummary ?? '');
  const [openEditor, setOpenEditor] = useState(false);
  const [refreshEditor, setRefreshEditor] = useState(false);

  const debouncedSummary = useDebounce(summary, 500);
  const debouncedSummaryTitle = useDebounce(summaryTitle, 500);

  const parsedValue: { type: string; content: any[] } = useMemo(() => {
    let result = { type: 'doc', content: [] };
    try {
      result = JSON.parse(debouncedSummary);
    } catch (error) {
      console.log(error);
    }
    return result;
  }, [debouncedSummary]);

  const selectPrewrittenPhrase = (phrase: string) => {
    setRefreshEditor(true);
    const paragraph = {
      type: 'text',
      text: phrase.replaceAll(`\n`, ''),
    };
    parsedValue.content.push(paragraph);
    setSummary(JSON.stringify(parsedValue));
    setTimeout(() => {
      setRefreshEditor(false);
    }, 500);
  };

  const updateProfileSummary = useMutation(api.resume.updateProfileSummary);
  const updateProfileSummaryTitle = useMutation(
    api.resume.updateProfileSummaryTitle
  );

  useEffect(() => {
    updateProfileSummary({ id: resumeId, profileSummary: debouncedSummary });
  }, [debouncedSummary]);

  useEffect(() => {
    updateProfileSummaryTitle({
      id: resumeId,
      profileSummaryTitle: debouncedSummaryTitle,
    });
  }, [debouncedSummaryTitle]);

  useEffect(() => {
    if (summaryTitle !== profileSummaryTitle)
      setSummaryTitle(profileSummaryTitle);
  }, [profileSummaryTitle]);

  return (
    <section className="relative">
      <div className="mb-3">
        <SectionTitleInput value={summaryTitle} setValue={setSummaryTitle} />
        <p className="text-sm text-grayText font-semibold">
          Write 2-4 short & energetic sentences to interest the reader! Mention
          your role, experience & most importantly - your biggest achievements,
          best qualities and skills.
        </p>
      </div>
      <Collapsible
        open={openEditor}
        onOpenChange={(value) => setOpenEditor(value)}
        className="group relative border-2 border-white rounded-md cursor-pointer px-5 py-2"
      >
        <CollapsibleTrigger asChild>
          <div className="text-lg flex items-center justify-center gap-2 h-10 hover:opacity-60">
            {openEditor && (
              <>
                <Check size={18} />
                <span className="mb-1">Done</span>
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
          <Editor
            isRefresh={refreshEditor}
            value={summary}
            setValue={setSummary}
          />
        </CollapsibleContent>
      </Collapsible>

      {openEditor && (
        <ProfessionalSummaryPhrasesPopup
          wrapperClass="absolute top-16 right-0 z-50 "
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
