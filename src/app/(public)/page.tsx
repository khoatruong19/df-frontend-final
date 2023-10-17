import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_ROUTES } from '../../utils/constants';

export default function Home() {
  return (
    <MainLayout>
      <div className="font-display flex-1 w-full h-full flex flex-col gap-6 items-center justify-center">
        <h1 className="text-4xl font-medium italic">
          Build your <span className="font-semibold">resume</span> faster with{' '}
          <span className="font-semibold not-italic">AI</span>.
        </h1>
        <Link href={APP_ROUTES.RESUME_TEMPLATES.path}>
          <Button size={'lg'} textSize={'lg'}>
            Get Started
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}
