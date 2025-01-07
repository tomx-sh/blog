"use server"

import { revalidatePath } from "next/cache"

export async function revalidate(formData: FormData) {
    const path = formData.get('path') as string
    const password = formData.get('password') as string

    if (password !== process.env.ADMIN_PASSWORD) {
        return { error: 'Invalid password' }
    }

    revalidatePath(path)
    return { error: null }
}