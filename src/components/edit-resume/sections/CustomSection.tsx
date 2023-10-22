import { useDebounce } from '@/hooks/useDebounce';
import { useMutation } from 'convex/react';
import { PlusIcon, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Doc } from '../../../../convex/_generated/dataModel';
import CustomSectionItemCard from '../cards/CustomSectionItemCard';

type CustomSectionProps = {
  customSection: Doc<'customSection'>;
};

const CustomSection = ({ customSection }: CustomSectionProps) => {
  const [title, setTitle] = useState(customSection.title);

  const debouncedValues = useDebounce(title, 1000);

  const addItem = useMutation(api.customSection.addSectionItem);

  const updateSectionTitle = useMutation(api.customSection.updateTitle);
  const deleteSection = useMutation(api.customSection.deleteOne);

  const addMoreItem = () => {
    addItem({ customSectionId: customSection._id });
  };

  const deleteSectionOnClick = () => deleteSection({ id: customSection._id });

  useEffect(() => {
    updateSectionTitle({ id: customSection._id, title: debouncedValues });
  }, [debouncedValues]);

  return (
    <section className="relative group">
      <div className="mb-3">
        <input
          className="mb-2 text-xl outline-none bg-transparent "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        {customSection.items.map((item) => (
          <CustomSectionItemCard
            customSectionId={customSection._id}
            item={item}
            key={item.id}
          />
        ))}

        <button
          onClick={addMoreItem}
          className="py-2 px-5 hover:bg-white flex items-center gap-2 text-base cursor-pointer duration-100"
        >
          <PlusIcon size={15} />
          <span>
            {customSection.items.length > 0 ? 'Add one more item' : 'Add item'}
          </span>
        </button>
      </div>

      <button
        onClick={deleteSectionOnClick}
        className="absolute right-0 top-0 hover:opacity-50 hidden group-hover:block"
      >
        <Trash color="red" />
      </button>
    </section>
  );
};

export default CustomSection;
