'use client'
import { Container, Section, TextField, Button, Flex } from "@radix-ui/themes"
import { revalidate } from "../api/revalidate/action"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    async function onSubmit(formData: FormData) {
        setIsPending(true)
        const { error } = await revalidate(formData)
        if (error) {
            alert(error)
        } else {
            const path = formData.get('path') as string
            router.push(path)
        }
        setIsPending(false)
    }

    return (
        <Container>
            <Section>
                <form action={onSubmit}>
                    <Flex gap='3' direction='column' maxWidth='300px' mx='auto'>
                        <TextField.Root placeholder='path' name='path' type='text' />
                        <TextField.Root placeholder='password' name='password' type="password" />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Revalidating...' : 'Revalidate'}
                        </Button>
                    </Flex>
                </form>
            </Section>
        </Container>
    )
}