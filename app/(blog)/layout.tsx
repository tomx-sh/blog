import { Separator, Flex, Text, Strong, Tooltip } from "@radix-ui/themes";
import ThemeSwitch from "./_components/ThemeSwitch";
import Link from "./_components/Link";


export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <header>
                <Flex align='center' justify='between' px='5' py='3' gap='3'>

                    <Tooltip content='see all posts'>
                        <Link href='/' size='3' highContrast underline='hover'>
                            <Text><Strong>TOMX</Strong> blog</Text>
                        </Link>
                    </Tooltip>

                    <ThemeSwitch />
                    
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