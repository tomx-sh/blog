import { Link as RadixLink, LinkProps as RadixLinkProps } from "@radix-ui/themes"
import NextLink from "next/link"

export default function Link({href, children, ...props}: RadixLinkProps) {
    return (
        <RadixLink asChild {...props}>
            <NextLink href={href || '/'}>
                {children}
            </NextLink>
        </RadixLink>
    )
}