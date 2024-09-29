'use client'
import { IconButton, IconButtonProps } from "@radix-ui/themes";


interface LinkIconButtonProps extends IconButtonProps {
    href: string;
}


export default function LinkIconButton({ href, children, ...props }: LinkIconButtonProps) {

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        window.open(href, '_blank');
    }

    return (
        <IconButton onClick={handleClick} {...props}>
            {children}
        </IconButton>
    )
}