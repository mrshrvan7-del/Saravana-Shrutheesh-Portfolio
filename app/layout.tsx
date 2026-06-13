import type { Metadata } from 'next';
import { Instrument_Serif, DM_Sans } from 'next/font/google';
import './globals.css';
import MainWrapper from '@/components/MainWrapper';

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Saravana Shrutheesh | Business Analyst & Operations Strategist',
  description:
    'Business Analyst at Walmart Global Tech. Specializing in process optimization, data analytics, and AI-augmented operations.',
  keywords: [
    'Business Analyst',
    'Process Improvement',
    'Operations Analytics',
    'Data-Driven Decision Making',
    'SQL',
    'BigQuery',
    'Power BI',
    'Stakeholder Management',
    'SLA Management',
    'Root Cause Analysis',
    'Workflow Automation',
    'AI-Augmented Operations',
    'KPI Reporting',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saravana.me',
    siteName: 'Saravana Shrutheesh Portfolio',
    title: 'Saravana Shrutheesh | Business Analyst & Operations Strategist',
    description:
      'I turn operational complexity into executive-ready clarity — powered by data and AI.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrument.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
