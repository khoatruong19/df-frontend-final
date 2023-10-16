import MainLayout from '@/components/layouts/MainLayout';
import ResumeCard from '@/components/resume-templates/cards/ResumeCard';
import { Button } from '@/components/ui/button';
import { APP_ROUTES, RESUME_TEMPLATES } from '@/utils/constants';
import Link from 'next/link';

export default function ResumeTemplatesPage() {
  return (
    <MainLayout>
      <div className="font-display text-center flex-1 w-full max-w-6xl mx-auto flex flex-col gap-6 items-center justify-center">
        <h1 className="text-5xl font-semibold max-w-xl italic">
          Job-winning resume templates
        </h1>
        <p className="max-w-2xl text-lg ">
          Each resume template is expertly designed and follows the exact
          “resume rules” hiring managers look for. Stand out and get hired
          faster with field-tested resume templates.
        </p>

        <Link href={APP_ROUTES.CHOOSE_TEMPLATE.path}>
          <Button size={'lg'} textSize={'xl'} className="h-14">
            Create My Resume
          </Button>
        </Link>

        <section className="w-full grid grid-cols-3 pt-5 border-t-2 gap-x-4">
          {RESUME_TEMPLATES.map((template) => (
            <ResumeCard
              key={`${template.name + Math.random() * 1}`}
              template={template}
            />
          ))}
        </section>
      </div>
    </MainLayout>
  );
}
