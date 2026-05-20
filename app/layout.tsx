import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-playfair' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-dm-sans' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains' });

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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
