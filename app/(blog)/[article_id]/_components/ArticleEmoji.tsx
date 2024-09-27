import { getPageEmoji } from "@/app/api/notion";
import { Skeleton, Text, TextProps } from "@radix-ui/themes";
import { Suspense } from "react";


interface ArticleEmojiProps {
    article_id: string;
    size?: TextProps['size'];
}


async function ArticleEmojiS({ article_id, size='5' }: ArticleEmojiProps) {
    const emoji = await getPageEmoji(article_id);
    return <>{emoji && <Text size={size}>{emoji}</Text>}</>;
}


function ArticleEmojiSkeleton({ size }: { size?: TextProps['size'] }) {
    return <Skeleton width={size} height={size} />
}


export default function ArticleEmoji({ article_id, size }: ArticleEmojiProps) {
    return (
        <Suspense fallback={<ArticleEmojiSkeleton size={size} />}>
            <ArticleEmojiS article_id={article_id} size={size} />
        </Suspense>
    )
}