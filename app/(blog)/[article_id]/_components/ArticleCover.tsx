import { getPageCoverImageUrl } from "@/app/_notion/actions";
import { Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";


async function ArticleCoverS({ article_id }: Readonly<{ article_id: string }>) {
    const coverImageUrl = await getPageCoverImageUrl(article_id);

    return (
        <>
            { coverImageUrl && 
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImageUrl} alt='Cover image' width={'100%'} height={200} 
                    style={{
                        objectFit:'cover',
                        borderRadius: 'var(--radius-2)',
                        //filter: 'grayscale(100%)',
                    }}
                />
            }
        </>
    )
}


function ArticleCoverSkeleton() {
    return (
        <Skeleton width='100%' height='200px' />
    )
}


export default function ArticleCover({ article_id }: Readonly<{ article_id: string }>) {
    return (
        <Suspense fallback={<ArticleCoverSkeleton />}>
            <ArticleCoverS article_id={article_id} />
        </Suspense>
    )
}