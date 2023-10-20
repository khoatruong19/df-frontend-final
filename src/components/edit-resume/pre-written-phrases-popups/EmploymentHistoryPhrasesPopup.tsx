import LoadingSpinner from '@/components/core/LoadingSpinner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDebounce } from '@/hooks/useDebounce';
import { useAction } from 'convex/react';
import { ChevronLeft, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { POPULAR_EMPLOYMENT_HISTORIES } from './constants';
import { findEmploymentHistories } from '../../../../convex/chat';

type EmploymentHistoryPhrasesPopupProps = {
  jobTitle?: string;
  wrapperClass?: string;
  triggerElement: React.ReactNode;
  selectPrewrittenPhrase: (phrase: string) => void;
};

const EmploymentHistoryPhrasesPopup = ({
  jobTitle = '',
  wrapperClass = '',
  triggerElement,
  selectPrewrittenPhrase,
}: EmploymentHistoryPhrasesPopupProps) => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [histories, setHistories] = useState(POPULAR_EMPLOYMENT_HISTORIES);

  const debouncedValue = useDebounce(keyword, 1000);

  const setHistoriesFromAI = async () => {
    setIsLoading(true);
    try {
      const aiHistories = await findEmploymentHistories({
        keyword: debouncedValue,
      });
      setHistories(aiHistories);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const findEmploymentHistories = useAction(api.chat.findEmploymentHistories);

  useEffect(() => {
    if (debouncedValue === '') {
      setHistories(POPULAR_EMPLOYMENT_HISTORIES);
      return;
    }
    setHistoriesFromAI();
  }, [debouncedValue]);

  useEffect(() => {
    setKeyword(jobTitle);
  }, [jobTitle]);

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
              {isLoading && (
                <div className="mt-3 w-fit mx-auto">
                  <LoadingSpinner />
                </div>
              )}
              {!isLoading &&
                histories.map((summary, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <button
                      onClick={() => selectPrewrittenPhrase(summary)}
                      className="p-1 rounded-full bg-slate-500 mt-0.5 hover:opacity-70 duration-75"
                    >
                      <ChevronLeft color="#fff" />
                    </button>
                    <p>
                      {summary.split('.').map((sentence, idx) => (
                        <span
                          onClick={() => selectPrewrittenPhrase(sentence)}
                          key={sentence}
                          className="hover:text-blue-600 cursor-pointer duration-100"
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

export default EmploymentHistoryPhrasesPopup;
