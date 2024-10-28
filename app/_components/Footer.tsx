import { Separator, Flex } from "@radix-ui/themes"
import Link from "./Link"



export default function Footer() {
    return (
        <footer>
            <Separator size='4' mt='4' />
            <Flex justify='center' p='4' gap='4'>
                <Link href='/' size='1'>home</Link>
                <Link href='https://www.tomx.sh/contact' size='1'>contact me</Link>
                <Link href='https://www.tomx.sh' size='1'>tomx.sh</Link>
            </Flex>
        </footer>
    )
}