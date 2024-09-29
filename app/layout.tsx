import { sf_pro } from "./fonts";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './globals.css';
import { ThemeProvider } from 'next-themes'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "blog",
    description: "tomx personal blog",
    metadataBase: new URL('https://blog.tomx.sh'),
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sf_pro.className} font-sans`}>
                <ThemeProvider attribute="class">
                    <Theme accentColor="gray" grayColor="slate">
                        {children}
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    );
}
