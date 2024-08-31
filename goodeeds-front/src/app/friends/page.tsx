'use client';
import { useGetFriendsQuery, useGetPendingRequestsQuery } from '@/store/slices/api/friendship';
import AddFriendButton from '@/components/add-friend-button';
import FriendRequest from '@/components/friend-request';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

const FriendsPage = () => {
  const {
    data: friends,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
  } = useGetFriendsQuery();
  const {
    data: friendRequests,
    isLoading: isFriendRequestLoading,
    isError: isFriendRequestsError,
  } = useGetPendingRequestsQuery();

  return (
    <div className="flex flex-1 flex-col gap-5 px-8 py-10 sm:px-14">
      <AddFriendButton />
      <h2 className="text-2xl font-bold">Friend requests</h2>
      <div className="flex gap-4">
        {isFriendRequestLoading && <Spinner size={40} className="mx-auto" />}
        {!isFriendRequestLoading && !isFriendRequestsError && !friendRequests?.length && (
          <div>You do not have any incoming requests</div>
        )}
        {friendRequests?.map(({ fromUser }) => (
          <FriendRequest key={fromUser.id} friend={fromUser} />
        ))}
      </div>
      <h2 className="text-2xl font-bold">Friends</h2>
      <div className="flex gap-4">
        {isFriendsLoading && <Spinner size={40} className="mx-auto" />}
        {!isFriendsLoading && !isFriendsError && !friends?.length && (
          <div>You do not have any friends</div>
        )}
        {friends?.map(({ id, username }) => (
          <Badge className="bg-white text-xl" key={id}>
            {username}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
