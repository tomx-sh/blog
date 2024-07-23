'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"
import React from "react"


export default function HomeButton() {
    const pathname = usePathname()

    if (pathname === "/") {
        return null
    } else {
        return (
            <RadixLink asChild size='2'>
                <Link href='/'>
                    See all posts
                </Link>
            </RadixLink>
        )
    }
}