'use client'
import { Tooltip, IconButton } from "@radix-ui/themes";
import { RefreshCcw } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { clearCache } from "@/app/_actions/notion";
import { useState } from "react";


export default function Refresh() {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        console.log('Refreshing cache for', pathname);
        clearCache(pathname).then(() => {
            router.refresh();
            console.log('Router refreshed');
            setLoading(false);
        })
    }

    return (
        <Tooltip content='Refresh cache'>
            <IconButton
                variant='ghost'
                size='1'
                onClick={handleClick}
                loading={loading}
            >
                <RefreshCcw size='16' />
            </IconButton>
        </Tooltip>
    );
}