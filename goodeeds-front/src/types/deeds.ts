import { ItemsWithPagination } from './common';
import { User } from './user';

export enum DeedType {
  CHARITY = 'CHARITY',
  VOLUNTEERING = 'VOLUNTEERING',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  EDUCATION = 'EDUCATION',
  COMMUNITY = 'COMMUNITY',
  HEALTHCARE = 'HEALTHCARE',
  ANIMAL_WELFARE = 'ANIMAL_WELFARE',
  ADVOCACY = 'ADVOCACY',
  RANDOM_ACTS = 'RANDOM_ACTS',
  OTHER = 'OTHER',
}

export interface Deed {
  id: number;
  content: string;
  type: DeedType;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DeedWithUser extends Deed {
  user: Partial<User>;
}

export type DeedsWithPagination = ItemsWithPagination<DeedWithUser>;

export type CreateDeedDto = Pick<Deed, 'content' | 'type'>;
export type UpdateDeedDto = Pick<Deed, 'content' | 'type' | 'id'>;

export const DEED_TYPE_LABELS: Record<DeedType, string> = {
  [DeedType.CHARITY]: 'Charity',
  [DeedType.VOLUNTEERING]: 'Volunteering',
  [DeedType.ENVIRONMENTAL]: 'Environmental',
  [DeedType.EDUCATION]: 'Education',
  [DeedType.COMMUNITY]: 'Community Service',
  [DeedType.HEALTHCARE]: 'Healthcare',
  [DeedType.ANIMAL_WELFARE]: 'Animal Welfare',
  [DeedType.ADVOCACY]: 'Advocacy',
  [DeedType.RANDOM_ACTS]: 'Random Acts of Kindness',
  [DeedType.OTHER]: 'Other',
};
