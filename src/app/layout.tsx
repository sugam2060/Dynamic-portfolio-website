import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import get_metadata_section from "../../actions/metadata_section";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await get_metadata_section();

  // Fallback metadata if API fails or returns null
  if (!metadata) {
    console.warn('Using fallback metadata due to API failure');
    return {
      title: "Portfolio - Full Stack Developer",
      description: "Full Stack Developer building scalable web applications with a focus on user experience",
      keywords: ["Full Stack Developer", "Web Development", "React", "Node.js", "Portfolio"],
      authors: [{ name: "Developer" }],
      creator: "Developer",
    };
  }

  return {
    title: `${metadata.title} - ${metadata.description}`,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: metadata.authors.map((name: string) => ({ name })),
    creator: metadata.creator,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
