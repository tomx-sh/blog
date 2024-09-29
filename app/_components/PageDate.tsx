import { getDate } from "@/app/api/notion";
import { Text, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";
import { sf_mono } from "@/app/fonts";


interface PageDateProps {
    page_id: string
    format?: Intl.DateTimeFormatOptions
}

async function PageDateS({ page_id, format = { year: 'numeric', month: 'long', day: 'numeric' }}: PageDateProps) {
    const date = await getDate(page_id);

    return (
        <Text asChild size='2' color='gray' className={sf_mono.className} align={'right'}>
            <time>
                {date.toLocaleDateString(undefined, format)}
            </time>
        </Text>
    )
}

function PageDateSkeleton() {
    return (
        <Skeleton>
            <Text asChild size='3' color='gray'>
                <time>1 janvier 1970</time>
            </Text>
        </Skeleton>
    )
}


export default function PageDate({ page_id, format }: PageDateProps) {
    return (
        <Suspense fallback={<PageDateSkeleton />}>
            <PageDateS page_id={page_id} format={format} />
        </Suspense>
    )
}