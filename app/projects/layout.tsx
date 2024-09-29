import { Flex, Text, Strong, Tooltip } from "@radix-ui/themes";
import ThemeSwitch from "@/app/_components/ThemeSwitch";
import Link from "@/app/_components/Link";
import Footer from "../_components/Footer";


export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <header>
                <Flex align='center' justify='between' px='5' py='3' gap='3'>

                    <Tooltip content='see all projects'>
                        <Link href='/projects' size='3' highContrast underline='hover'>
                            <Text><Strong>TOMX</Strong> projects</Text>
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