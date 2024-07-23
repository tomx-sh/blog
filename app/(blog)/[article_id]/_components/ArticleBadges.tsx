import { getTags } from "@/app/_notion/actions";
import { Badge, Flex, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";


async function ArticleBadgesS({ article_id }: { article_id: string }) {
    const tags = await getTags(article_id);

    return (
        <Flex gap='2' align='center' wrap='wrap'>
            {tags.map(tag => (
                // color={tag.color as any}
                <Badge key={tag.id} variant='outline' radius='full'>{tag.name}</Badge>
            ))}
        </Flex>
    )
}


function ArticleBadgesSkeleton() {
    return (
        <Flex gap='2' align='center' wrap='wrap'>
            <Skeleton>
                <Badge variant='outline' radius='full'>Tag</Badge>
            </Skeleton>

            <Skeleton>
                <Badge variant='outline' radius='full'>Tag</Badge>
            </Skeleton>

            <Skeleton>
                <Badge variant='outline' radius='full'>Tag</Badge>
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