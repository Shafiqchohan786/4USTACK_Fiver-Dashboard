export const metadata = {
  title: "4USTACK – Fiverr Dashboard",
  description: "Upload Fiverr data and track progress.",
};

import './globals.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
