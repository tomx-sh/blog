import { Separator, Link, Flex, Text, Strong, IconButton, Tooltip } from "@radix-ui/themes";
import { Sun, RefreshCcw } from "lucide-react";
import HomeButton from "./_components/HomeButton";
import ThemeSwitch from "./_components/ThemeSwitch";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <header>
                <Flex align='center' justify='between' p='3' gap='3'>
                    <Flex align='baseline' gap='3'>
                        <Text><Strong>TOMX</Strong> blog</Text>
                        <HomeButton />
                    </Flex>

                    <Flex gap='3'>
                        <ThemeSwitch />

                        <Tooltip content='Refresh cache'>
                            <IconButton variant='ghost' size='1'><RefreshCcw size='16'/></IconButton>
                        </Tooltip>
                    </Flex>
                    
                </Flex>
            </header>

            {children}

            <footer>
                <Separator size='4' mt='4'/>
                <Flex justify='center' p='4' gap='4'>
                    <Link href='/' size='1'>Home</Link>
                    <Link href='#' size='1'>Contact me</Link>
                    <Link href='https://www.tomx.sh' size='1'>tomx.sh</Link>
                </Flex>
            </footer>
        </>
    );
}