import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Upskill Radar | Know What to Learn Next',
  description:
    'AI-powered career intelligence. Scan your skills against real market demand, pinpoint gaps, and get a daily 15-minute learning plan tailored to your career.',
  keywords: [
    'career development',
    'skill gap analysis',
    'upskilling',
    'AI career tools',
    'learning path',
    'career intelligence',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-0 text-neutral-200 antialiased font-sans noise-bg">
        {children}
      </body>
    </html>
  );
}
