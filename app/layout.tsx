import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quidditch Quiz - Discover Your Quidditch Position',
  description:
    'Find out which Quidditch role you are: Seeker, Chaser, Beater, or Keeper! Take our fun personality quiz and share your results with friends.',
  keywords:
    'quidditch quiz, quidditch position, harry potter, seeker, chaser, beater, keeper, personality quiz',
  authors: [{ name: 'Quidditch Quiz Team' }],
  creator: 'Quidditch Quiz Team',
  publisher: 'Quidditch Quiz',
  openGraph: {
    type: 'website',
    title: 'Quidditch Quiz - Discover Your Quidditch Position',
    description:
      'Are you a Seeker, Chaser, Beater, or Keeper? Take our fun quiz to discover your Quidditch position and share with friends!',
    url: 'https://quidditch-quiz.vercel.app',
    siteName: 'Quidditch Quiz',
    images: [
      {
        url: '/hogwarts-logo.jpg',
        width: 600,
        height: 600,
        alt: 'Quidditch Quiz - Discover Your Quidditch Position',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quidditch Quiz - Discover Your Quidditch Position',
    description:
      "Take our fun quiz to discover if you're a Seeker, Chaser, Beater, or Keeper!",
    images: ['/hogwarts-logo.jpg'],
  },
  metadataBase: new URL('https://quidditch-quiz.vercel.app'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
