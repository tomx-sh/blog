'use client'
import { Tooltip, IconButton } from "@radix-ui/themes";
import { RefreshCcw } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { clearCache } from "@/app/_actions/notion";
import { useState, useTransition } from "react";


export default function Refresh() {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleClick = async () => {
        setLoading(true);

        console.log('Refreshing cache for', pathname);

        clearCache(pathname).then(() => {
            console.log('Cache cleared');

            startTransition(() => {   
                console.log('Refreshing page...'); 
                router.refresh();
            });

            setLoading(false);
        })
    }

    return (
        <Tooltip content='Refresh cache'>
            <IconButton
                variant='ghost'
                size='1'
                onClick={handleClick}
                loading={loading || isPending}
            >
                <RefreshCcw size='16' />
            </IconButton>
        </Tooltip>
    );
}