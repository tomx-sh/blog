import { getPageTitle } from "@/app/api/notion";
import { Heading, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";
import { new_york_large } from "@/app/fonts";
import '@radix-ui/themes/styles.css';
import '@/app/globals.css';


async function ArticleTitleS({ article_id }: { article_id: string }) {
    const title = await getPageTitle(article_id);

    return (
        <Heading as='h1' size='8' className={new_york_large.className} align='center'>
            {title.toUpperCase()}
        </Heading>
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