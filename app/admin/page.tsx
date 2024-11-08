'use client'
import { Container, Section, TextField, Button, Flex } from "@radix-ui/themes"
import { revalidate } from "../api/revalidate/action"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const path = formData.get('path') as string
        const password = formData.get('password') as string
        await revalidate({ path, password })
        router.push(path)
    }


    return (
        <Container>
            <Section>
                <form method="post" onSubmit={onSubmit}>
                    <Flex gap='3' direction='column'>
                        <TextField.Root placeholder='path' name='path' />
                        <TextField.Root placeholder='password' name='password' type="password" />
                        <Button type="submit">Revalidate</Button>
                    </Flex>
                </form>
            </Section>
        </Container>
    )
}