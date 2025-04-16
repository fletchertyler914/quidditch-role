import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share Quidditch Role Results - Quidditch Quiz',
  description:
    'Share your Quidditch position with friends! See which role you got in the Quidditch Quiz and challenge others to discover theirs.',
  openGraph: {
    title: 'Share Quidditch Role Results - Quidditch Quiz',
    description:
      'Share your Quidditch position with friends! See which role you got in the Quidditch Quiz and challenge others to discover theirs.',
    images: [
      {
        url: '/hogwarts-logo.jpg',
        width: 600,
        height: 600,
        alt: 'Share Quidditch Quiz Results',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share Quidditch Role Results - Quidditch Quiz',
    description:
      'Share your Quidditch position with friends! See which role you got in the Quidditch Quiz and challenge others to discover theirs.',
    images: ['/hogwarts-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
