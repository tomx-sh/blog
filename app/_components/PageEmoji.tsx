import { getPageEmoji } from "@/app/api/notion";
import { Skeleton, Text, TextProps } from "@radix-ui/themes";
import { Suspense } from "react";


interface PageEmojiProps {
    page_id: string;
    size?: TextProps['size'];
}


async function PageEmojiS({ page_id, size='5' }: PageEmojiProps) {
    const emoji = await getPageEmoji(page_id);
    return <>{emoji && <Text size={size}>{emoji}</Text>}</>;
}


function PageEmojiSkeleton({ size }: { size?: TextProps['size'] }) {
    return <Skeleton width={size} height={size} />
}


export default function PageEmoji({ page_id, size }: PageEmojiProps) {
    return (
        <Suspense fallback={<PageEmojiSkeleton size={size} />}>
            <PageEmojiS page_id={page_id} size={size} />
        </Suspense>
    )
}