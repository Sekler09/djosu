import Link from 'next/link';
import { RoutePath } from '@/routes';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold leading-normal">Page not found</h1>
      <Button asChild className="text-white">
        <Link href={RoutePath.Deeds}>To main page</Link>
      </Button>
    </div>
  );
};

export default NotFound;
