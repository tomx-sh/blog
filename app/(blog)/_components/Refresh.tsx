'use client'
import { Tooltip, IconButton } from "@radix-ui/themes";
import { RefreshCcw } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { clearCache } from "@/app/_actions/notion";


export default function Refresh() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = async () => {
        console.log('Refreshing cache for', pathname);
        clearCache(pathname).then(() => {
            router.refresh();
            console.log('Router refreshed');
        })
    }

    return (
        <Tooltip content='Refresh cache'>
            <IconButton
                variant='ghost'
                size='1'
                onClick={handleClick}
            >
                <RefreshCcw size='16' />
            </IconButton>
        </Tooltip>
    );
}