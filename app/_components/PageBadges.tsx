import { getTags } from "@/app/api/notion";
import {  Flex, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";
import BadgeMono from "@/app/_components/BadgeMono";
import { TagProperty } from "@/app/api/notion";

interface PageBadgesProps {
    page_id: string
    tagsProperty?: TagProperty
}



async function PageBadgesS({ page_id, tagsProperty='Tags'}: PageBadgesProps) {
    const tags = await getTags({ pageId: page_id, property: tagsProperty });

    return (
        <Flex gap='2' align='center' wrap='wrap'>
            {tags.map(tag => (
                // color={tag.color as any}
                <BadgeMono key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</BadgeMono>
            ))}
        </Flex>
    )
}


function PageBadgesSkeleton() {
    return (
        <Flex gap='2' align='center' wrap='wrap'>
            <Skeleton>
                <BadgeMono variant='outline' radius='full'>Tag</BadgeMono>
            </Skeleton>

            <Skeleton>
                <BadgeMono variant='outline' radius='full'>Tag</BadgeMono>
            </Skeleton>

            <Skeleton>
                <BadgeMono variant='outline' radius='full'>Tag</BadgeMono>
            </Skeleton>
        </Flex>
    )
}


export default function PageBadges({ page_id, tagsProperty }: PageBadgesProps) {
    return (
        <Suspense fallback={<PageBadgesSkeleton />}>
            <PageBadgesS page_id={page_id} tagsProperty={tagsProperty} />
        </Suspense>
    )
}