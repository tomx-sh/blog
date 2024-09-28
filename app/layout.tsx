import type { Metadata } from "next";
//import { inter } from "./fonts";
import { sf_pro } from "./fonts";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes'
import './globals.css';


export const metadata: Metadata = {
    title: "blog",
    description: "tomx personal blog",
    metadataBase: new URL('https://blog.tomx.sh'),
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={sf_pro.className}>
                <ThemeProvider attribute="class">
                    <Theme accentColor="gray" grayColor="slate">
                        {children}
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    );
}
