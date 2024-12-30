"use server"
import { revalidatePath } from "next/cache"


interface RevalidateArgs {
    path: string
    password: string
}

export async function revalidate({ path, password }: RevalidateArgs) {
    if (password !== process.env.ADMIN_PASSWORD) {
        throw new Error('Invalid password')
    }

    revalidatePath(path, 'page')
}