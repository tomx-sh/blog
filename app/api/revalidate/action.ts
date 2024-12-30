"use server"
import { revalidatePath } from "next/cache"




export async function revalidate(args: {
    path: string
    password: string
}): Promise<{
    error: string | null
}> {
    if (args.password !== process.env.ADMIN_PASSWORD) {
        return { error: 'Invalid password' }
    }

    revalidatePath(args.path, 'page')
    return { error: null }
}