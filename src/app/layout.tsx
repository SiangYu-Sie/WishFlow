import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Wish Platform | 接案許願平台',
  description: 'Make a wish for your custom software project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body>
        <Providers>
          <Navbar />
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
