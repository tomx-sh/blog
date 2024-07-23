import { getPageTitle } from "@/app/_notion/actions";
import { Heading, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";


async function ArticleTitleS({ article_id }: { article_id: string }) {
    const title = await getPageTitle(article_id);

    return (
        <Heading as='h1' size='8' weight='bold'>{title}</Heading>
    )
}


function ArticleTitleSkeleton() {
    return (
        <Skeleton>
            <Heading as='h1' size='8' weight='bold'>Title</Heading>
        </Skeleton>
    )
}


export default function ArticleTitle({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleTitleSkeleton />}>
            <ArticleTitleS article_id={article_id} />
        </Suspense>
    )
}