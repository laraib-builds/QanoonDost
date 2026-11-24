import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'قانون دوست | QanoonDost - پاکستانی شہریوں کا باوقار قانونی رہنما',
  description: 'پاکستانی قانون، بنیادی حقوق، ایف آئی آر، عائلی قوانین، سائبر کرائم، کرایہ داری اور وراثت کے مستند قانونی حوالہ جات اور سادہ اردو رہنمائی۔',
  keywords: [
    'QanoonDost',
    'Pakistan Law',
    'Pakistani Legal Advice',
    'FIR CrPC 154',
    'Family Court Khula',
    'Cybercrime PECA 2016',
    'Urdu Legal Voice Assistant',
    'قانون دوست',
    'پاکستانی قوانین',
    'ایف آئی آر کا طریقہ',
    'نان و نفقہ',
    'سائبر کرائم'
  ],
  authors: [{ name: 'QanoonDost Legal Team' }]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B2545',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-gold-200 selection:text-royal-950">
        {children}
      </body>
    </html>
  );
}
