import { getDate } from "@/app/_actions/notion";
import { Text, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";

async function ArticleDateS({ article_id }: { article_id: string }) {
    const date = await getDate(article_id);

    return (
        <Text asChild size='2' color='gray'>
            <time>
                {date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
        </Text>
    )
}

function ArticleDateSkeleton() {
    return (
        <Skeleton>
            <Text asChild size='3' color='gray'>
                <time>1 janvier 1970</time>
            </Text>
        </Skeleton>
    )
}


export default function ArticleDate({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleDateSkeleton />}>
            <ArticleDateS article_id={article_id} />
        </Suspense>
    )
}