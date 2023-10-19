import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronLeft, Search } from 'lucide-react';
import { POPULAR_SUMMARIES } from './constants';
import { useAction } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/useDebounce';

type ProfessionalSummaryPhrasesPopupProps = {
  wrapperClass?: string;
  triggerElement: React.ReactNode;
  selectPrewrittenPhrase: (phrase: string) => void;
};

const ProfessionalSummaryPhrasesPopup = ({
  wrapperClass = '',
  triggerElement,
  selectPrewrittenPhrase,
}: ProfessionalSummaryPhrasesPopupProps) => {
  const [keyword, setKeyword] = useState('');
  const [summaries, setSummaries] = useState(POPULAR_SUMMARIES);

  const debouncedValue = useDebounce(keyword, 1000);

  const setSummariesFromAI = async () => {
    const aiSummaries = await findProfessionalSummaries({
      keyword: debouncedValue,
    });
    setSummaries(aiSummaries);
  };

  const findProfessionalSummaries = useAction(
    api.chat.findProfessionalSummaries
  );

  useEffect(() => {
    if (debouncedValue === '') {
      setSummaries(POPULAR_SUMMARIES);
      return;
    }
    setSummariesFromAI();
  }, [debouncedValue]);

  return (
    <aside className={wrapperClass}>
      <Popover>
        <PopoverTrigger>{triggerElement}</PopoverTrigger>
        <div className="relative">
          <PopoverContent className="left-[40px] absolute w-[450px] shadow-md py-4 px-0 ">
            <div className="flex items-center gap-2 h-10 pb-4 border-b-2 px-3">
              <Search size={18} />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 h-full px-2 outline-none"
                placeholder="Filter phrases by keyword and jpb title"
              />
            </div>

            <div className="py-2 px-3 flex flex-col gap-3 text-sm  max-h-[50vh] overflow-auto custom-scrollbar text-gray-500">
              {summaries.map((summary, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <button
                    onClick={() => selectPrewrittenPhrase(summary)}
                    className="p-1 rounded-full bg-slate-500 mt-0.5"
                  >
                    <ChevronLeft color="#fff" />
                  </button>
                  <p>
                    {summary.split('.').map((sentence, idx) => (
                      <span
                        onClick={() => selectPrewrittenPhrase(sentence)}
                        key={sentence}
                        className="hover:text-blue-400 cursor-pointer duration-100"
                      >
                        {sentence}
                        {idx !== summary.split('.').length - 1 ? '.' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </aside>
  );
};

export default ProfessionalSummaryPhrasesPopup;
