'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { RoutePath } from '@/routes';
import DeedItem from '@/components/deed-item';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useGetUserDeedsQuery } from '@/store/slices/api/deeds';

const STEP = 2;

const MyDeedsPage = () => {
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [limit, setLimit] = useState(STEP);

  const { data, error, isLoading } = useGetUserDeedsQuery({ limit });

  useEffect(() => {
    if (data && !error) {
      setCanLoadMore(data.totalPages > 1);
    }
  }, [data, error]);

  const handleLoadMore = useCallback(() => {
    setLimit((prevLimit) => prevLimit + STEP);
  }, [setLimit]);

  const nextItemsLabel = useMemo(() => {
    const count = data?.totalCount;
    if (!count) return STEP;
    return count > limit + STEP ? STEP : count % limit;
  }, [data, limit]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Button className="text-white" asChild>
        <Link href={RoutePath.AddDeed}>Add new deed</Link>
      </Button>
      <h2 className="text-xl font-bold leading-normal">Your deeds</h2>
      <div className="flex flex-col gap-4">
        {isLoading && <Spinner size={40} className="mx-auto" />}
        {!isLoading && !error && !data?.totalCount && <div>You do not have any deeds posted</div>}
        {data?.items?.map((deed) => <DeedItem deed={deed} key={deed.id} />)}
      </div>
      <Button onClick={handleLoadMore} disabled={isLoading || !canLoadMore}>
        {canLoadMore ? `Show next ${nextItemsLabel}` : 'No more deeds'}
      </Button>
    </div>
  );
};

export default MyDeedsPage;
