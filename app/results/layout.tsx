import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Quidditch Role Results - Quidditch Quiz',
  description:
    'Discover which Quidditch position you are! See your results and learn about your perfect role on the field.',
  openGraph: {
    title: 'Your Quidditch Role Results - Quidditch Quiz',
    description:
      'Discover which Quidditch position you are! See your results and learn about your perfect role on the field.',
    images: [
      {
        url: '/hogwarts-logo.jpg',
        width: 600,
        height: 600,
        alt: 'Quidditch Quiz Results',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Quidditch Role Results - Quidditch Quiz',
    description:
      'Discover which Quidditch position you are! See your results and learn about your perfect role on the field.',
    images: ['/hogwarts-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResultsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
