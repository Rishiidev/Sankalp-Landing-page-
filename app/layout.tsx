import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Divine Sadhana | Sankalp',
  description: 'A dedicated platform for your spiritual Sadhana and daily vows.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-50 selection:bg-orange-500/30 selection:text-orange-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
