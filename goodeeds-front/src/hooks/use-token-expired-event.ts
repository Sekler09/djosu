import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { RoutePath } from '@/routes';

export const useTokenExpiredEvent = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.has('status')) {
      if (searchParams.get('status') === 'token-expired') {
        toast({
          title: 'Seession expired',
          description: 'Your seesion expired, please log in again',
        });
        push(RoutePath.Landing);
      }
    }
  }, [searchParams, push]);
};
