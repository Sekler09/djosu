'use client';
import { useTokenExpiredEvent } from '@/hooks/use-token-expired-event';
import Hero from '@/components/hero';
import SignInButton from '@/components/signin-button';
import SignUpButton from '@/components/signup-button';
import UserReview from '@/components/user-review';

const reviews: { username: string; text: string }[] = [
  {
    text: "I love how easy it is to track my good deeds and see the impact I'm making.",
    username: 'User123',
  },
  {
    text: "I've been able to connect with other like-minded individuals and get inspired by their good deeds.",
    username: 'User456',
  },
  {
    text: "It's so rewarding to be able to share my good deeds with others and get positive feedback.",
    username: 'User789',
  },
];

const LandingPage = () => {
  useTokenExpiredEvent();

  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <div className="p-8 sm:px-14">
        <div className="flex flex-col gap-10 py-10">
          <h1 className="text-4xl font-black leading-tight">What users are saying</h1>
          <div className="flex flex-col gap-3 sm:flex-row">
            {reviews.map((review) => (
              <UserReview key={review.username} {...review} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 py-10">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-4xl font-black leading-tight">
              Ready to start making a difference?
            </h1>
            <div>Log in or sign up to join the Good Deeds community</div>
          </div>
          <div className="flex gap-3">
            <SignInButton />
            <SignUpButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
