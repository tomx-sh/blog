import { getDate } from "@/app/api/notion";
import { Text, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";
import { sf_mono } from "@/app/fonts";

async function ArticleDateS({ article_id }: { article_id: string }) {
    const date = await getDate(article_id);

    return (
        <Text asChild size='2' color='gray' className={sf_mono.className}>
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