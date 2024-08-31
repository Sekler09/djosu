import { User } from './user';

export interface Friendship {
  id: number;
  fromUserId: number;
  toUserId: number;
  isPending: boolean;
}

export interface FriendshipWithUsers extends Friendship {
  fromUser: User;
  toUser: User;
}
