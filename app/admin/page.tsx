'use client'
import { Container, Section, TextField, Button, Flex } from "@radix-ui/themes"
import { revalidate } from "../api/revalidate/action"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsPending(true)
        const formData = new FormData(event.currentTarget)
        const path = formData.get('path') as string
        const password = formData.get('password') as string
        const { error } = await revalidate({ path, password })
        if (error) {
            alert(error)
        } else {
            router.push(path)
        }
        setIsPending(false)
    }


    return (
        <Container>
            <Section>
                <form method="post" onSubmit={onSubmit}>
                    <Flex gap='3' direction='column' maxWidth='300px' mx='auto'>
                        <TextField.Root placeholder='path' name='path' />
                        <TextField.Root placeholder='password' name='password' type="password" />
                        <Button type="submit" loading={isPending}>Revalidate</Button>
                    </Flex>
                </form>
            </Section>
        </Container>
    )
}