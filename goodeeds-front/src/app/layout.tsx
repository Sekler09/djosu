import type { Metadata } from 'next';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ReduxProvider } from '@/store/redux-provider';
import Header from '@/components/header';
import AuthProvider from '@/components/auth-provider';
import { Toaster } from '@/components/ui/toaster';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Good Deeds',
  description: 'Share deeds with your friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ReduxProvider>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <Toaster />
          <AuthProvider>
            <Header />
            <main className="flex min-h-screen w-full flex-col pt-[6.5rem] sm:pt-[3.75rem]">
              {children}
            </main>
          </AuthProvider>
        </body>
      </ReduxProvider>
    </html>
  );
}
