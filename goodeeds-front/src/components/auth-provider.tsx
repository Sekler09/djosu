'use client';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { RoutePath, routesConfig, ScopeType } from '@/routes';
import { useGetUser } from '@/hooks/use-get-user';
import { Spinner } from '@/components/ui/spinner';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, isLoading } = useGetUser();
  const pathname = usePathname();
  const router = useRouter();
  const scope = useMemo(() => routesConfig[pathname as RoutePath] ?? null, [pathname]);

  useEffect(() => {
    if (isLoading) return;
    if (scope === ScopeType.PRIVATE && !user) router.push(RoutePath.Landing);
    if (scope === ScopeType.PUBLIC && user) router.push(RoutePath.Deeds);
  }, [isLoading, scope, user, router]);

  if (isLoading && !user)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Spinner size={120} />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
