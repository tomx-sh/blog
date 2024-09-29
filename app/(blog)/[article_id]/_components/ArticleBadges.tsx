import { getTags } from "@/app/api/notion";
import {  Flex, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";
import BadgeMono from "@/app/_components/BadgeMono";


async function ArticleBadgesS({ article_id }: { article_id: string }) {
    const tags = await getTags({ pageId: article_id, property: 'Tags' });

    return (
        <Flex gap='2' align='center' wrap='wrap'>
            {tags.map(tag => (
                // color={tag.color as any}
                <BadgeMono key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</BadgeMono>
            ))}
        </Flex>
    )
}


function ArticleBadgesSkeleton() {
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


export default function ArticleBadges({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleBadgesSkeleton />}>
            <ArticleBadgesS article_id={article_id} />
        </Suspense>
    )
}