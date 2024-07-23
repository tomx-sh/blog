import type { Metadata } from "next";
import { inter } from "./fonts";
import './globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes'


export const metadata: Metadata = {
    title: "blog",
    description: "tomx personal blog",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class">
                    <Theme accentColor="gray" grayColor="slate">
                        {children}
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    );
}
