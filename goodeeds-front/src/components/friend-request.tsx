import { FC, memo, useCallback } from 'react';
import { User } from '@/types';
import {
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
} from '@/store/slices/api/friendship';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FriendRequestProps {
  friend: User;
}
const FriendRequest: FC<FriendRequestProps> = ({ friend }) => {
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [rejectRequest] = useRejectFriendRequestMutation();

  const handleAcceptRequest = useCallback(async () => {
    await acceptRequest(friend.id);
  }, [acceptRequest, friend.id]);

  const handleRejectRequest = useCallback(async () => {
    await rejectRequest(friend.id);
  }, [rejectRequest, friend.id]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{friend.username}</CardTitle>
      </CardHeader>
      <CardFooter className="gap-5">
        <Button variant="success" onClick={handleAcceptRequest}>
          Accept
        </Button>
        <Button variant="destructive" onClick={handleRejectRequest}>
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(FriendRequest);
