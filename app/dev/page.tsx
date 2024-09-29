import Refresh from "../(blog)/_components/Refresh"
import { sf_pro, sf_mono, new_york_small } from "../fonts"
import { Container, Section, Heading, Text, Em, Strong } from "@radix-ui/themes"

export default function Page() {
    return (
        <Container size='2'>
            <Section>
                <Heading as='h1' mb='5' size='9' className={sf_pro.className}>Titre de la Page</Heading>
                <Heading as='h2' mb='5' size='7'>Hello</Heading>
                <Heading as='h3' mb='5' size='5'>Hello again</Heading>
                <Em className={new_york_small.className}>Ceci est une citation <Strong>avec du gras</Strong></Em>
                <Text as='p' className={sf_mono.className} >Content Commodo consectetur labore magna tempor. Et qui laborum est labore sint veniam sunt magna amet labore cillum incididunt. Ad amet velit consequat eiusmod magna consectetur magna id aliquip. Magna deserunt laborum velit non duis deserunt dolor. Amet eiusmod quis reprehenderit tempor labore laborum ut aliquip qui cillum.</Text>
            </Section>

            <Section>
                <Refresh />
            </Section>
        </Container>
    )
}