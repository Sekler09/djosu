import { FC, memo } from 'react';

interface UserReviewProps {
  text: string;
  username: string;
}

const UserReview: FC<UserReviewProps> = ({ text, username }) => {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-lg border border-solid border-[#334266] bg-[#1A2133] p-2 sm:p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z"></path>
      </svg>
      <div className="flex flex-1 flex-col justify-between gap-1">
        <div className="font-bold leading-tight">&quot;{text}&quot;</div>
        <div className="text-sm leading-normal text-[#91A3C7]">- {username}</div>
      </div>
    </div>
  );
};

export default memo(UserReview);
