'use client'
import { Container, Section, TextField, Button, Flex } from "@radix-ui/themes"
import { revalidate } from "../api/revalidate/action"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"


function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Revalidating...' : 'Revalidate'}
        </Button>
    )
}

export default function Page() {
    const router = useRouter()

    async function onSubmit(formData: FormData) {
        const { error } = await revalidate(formData)
        if (error) {
            alert(error)
        } else {
            const path = formData.get('path') as string
            router.push(path)
        }
    }

    return (
        <Container>
            <Section>
                <form action={onSubmit}>
                    <Flex gap='3' direction='column' maxWidth='300px' mx='auto'>
                        <TextField.Root placeholder='path' name='path' type='text' />
                        <TextField.Root placeholder='password' name='password' type="password" />
                        <SubmitButton />
                    </Flex>
                </form>
            </Section>
        </Container>
    )
}