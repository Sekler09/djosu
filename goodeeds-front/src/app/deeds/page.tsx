'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DeedWithUser } from '@/types';
import { filterDuplicatesById } from '@/lib/utils';
import DeedItem from '@/components/deed-item';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useGetFriendsDeedsQuery } from '@/store/slices/api/deeds';

const LIMIT = 2;

const DeedsPage = () => {
  const [page, setPage] = useState(1);
  const [deeds, setDeeds] = useState<DeedWithUser[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const { data, error, isLoading } = useGetFriendsDeedsQuery({ page, limit: LIMIT });

  useEffect(() => {
    if (data && !error) {
      setDeeds((prevDeeds) => filterDuplicatesById([...prevDeeds, ...data.items]));
      setCanLoadMore(data.totalPages > page);
    }
  }, [data, error, page]);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, [setPage]);

  const nextItemsLabel = useMemo(() => {
    if (data && page === data.totalPages - 1) return data.totalCount % LIMIT || LIMIT;
    return LIMIT;
  }, [data, page]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold leading-normal">Friends deeds</h2>
      <div className="flex flex-col gap-4">
        {isLoading && <Spinner size={40} className="mx-auto" />}
        {!isLoading && !error && !data?.totalCount && <div>Add more friends to see more deeds</div>}
        {deeds.map((deed) => (
          <DeedItem deed={deed} key={deed.id} />
        ))}
      </div>
      <Button onClick={handleLoadMore} disabled={isLoading || !canLoadMore}>
        {canLoadMore ? `Show next ${nextItemsLabel}` : 'No more deeds'}
      </Button>
    </div>
  );
};

export default DeedsPage;
