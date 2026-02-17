import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Upskill Radar - AI Career Intelligence',
  description:
    'Stop guessing what to learn. The Upskill Radar analyzes your skills against real market demand, identifies your exact gaps, and builds a 15-minute-per-day learning path.',
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
      <body className="bg-slate-950 text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
