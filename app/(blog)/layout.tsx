import { Flex, Text, Strong, Tooltip } from "@radix-ui/themes";
import ThemeSwitch from "../_components/ThemeSwitch";
import Link from "@/app/_components/Link";
import Footer from "../_components/Footer";


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

            <Footer />
        </>
    );
}