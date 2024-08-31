import { FC, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DEED_TYPE_LABELS, DeedWithUser } from '@/types';
import { formatDateString } from '@/lib/utils';
import { selectUser } from '@/store/selectors/user';
import { Badge } from '@/components/ui/badge';
import DeedItemDropdown from './deed-item-dropdown';

interface DeedProps {
  deed: DeedWithUser;
}

const DeedItem: FC<DeedProps> = ({ deed }) => {
  const { user: owner, createdAt, updatedAt, type, content } = deed;
  const user = useSelector(selectUser);

  const canEdit = useMemo(() => owner.id === user?.id, [owner, user]);
  const isEdited = useMemo(() => createdAt !== updatedAt, [createdAt, updatedAt]);

  return (
    <>
      <div className="flex w-full flex-col gap-5 rounded-md border px-4 py-3">
        <div className="flex flex-1 justify-between gap-5">
          <Badge className="text-nowrap text-xl">{owner?.username ?? 'Unknown user'}</Badge>
          {canEdit && <DeedItemDropdown deed={deed} />}
        </div>
        <div className="flex flex-col items-start gap-5 text-sm font-medium leading-none sm:flex-row">
          <Badge className="text-nowrap bg-white">{DEED_TYPE_LABELS[type]}</Badge>
          <p className="text-muted-foreground">{content}</p>
        </div>
        <div className="flex gap-4 text-sm">
          <span>{formatDateString(createdAt)}</span>
          {isEdited && <span>(edited {formatDateString(updatedAt)})</span>}
        </div>
      </div>
    </>
  );
};

export default memo(DeedItem);
