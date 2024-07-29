import { Link as RadixLink, LinkProps } from "@radix-ui/themes";
import NextLink from "next/link";


export default function Link({href, children, ...props}: LinkProps) {
    return (
        <RadixLink asChild {...props}>
            <NextLink href={href || ''}>
                {children}
            </NextLink>
        </RadixLink>
    );
}