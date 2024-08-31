'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RoutePath } from '@/routes';
import { useGetUserDeedsQuery } from '@/store/slices/api/deeds';
import { selectUser } from '@/store/selectors/user';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import UpdateUsernameForm from '@/components/update-username-form';
import UpdatePasswordForm from '@/components/update-password-form';
import DeleteAccountButton from '@/components/delete-account-button';
import DeedItem from '@/components/deed-item';
import { Spinner } from '@/components/ui/spinner';

interface EditAccountItem {
  value: string;
  title: string;
  content: ReactNode;
}

const editAccountItems: EditAccountItem[] = [
  {
    value: 'change-username',
    title: 'Change Username',
    content: <UpdateUsernameForm />,
  },
  {
    value: 'change-password',
    title: 'Change Password',
    content: <UpdatePasswordForm />,
  },
  {
    value: 'delete-account',
    title: 'Delete Account',
    content: (
      <div className="flex flex-col items-start gap-4">
        <div>You can delete account if you want no longer use this app.</div>
        <DeleteAccountButton />
      </div>
    ),
  },
];

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const { data, isLoading, isError } = useGetUserDeedsQuery({ limit: 3 });

  return (
    <div className="flex flex-1 flex-col gap-10 px-8 py-10 sm:px-14">
      <h2 className="text-4xl font-bold">Hello, {user?.username}</h2>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Good Deeds</h2>
        {isLoading && <Spinner size={40} className="mx-auto" />}
        {!isLoading && !isError && !data?.totalCount && <div>You do not have any deeds posted</div>}
        {data?.items.map((deed) => <DeedItem deed={deed} key={deed.id} />)}
        {data && data.totalPages > 1 && (
          <Link href={RoutePath.MyDeeds} className="text-blue-500">
            See more...
          </Link>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold">Account</h2>
        <Accordion type="single" collapsible>
          {editAccountItems.map(({ value, title, content }) => (
            <AccordionItem value={value} key={value} className="border-0">
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ProfilePage;
