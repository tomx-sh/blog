import { Tag } from "@/app/_notion/actions";
import { Card, Inset, Text, Badge, Flex, Skeleton, Heading } from "@radix-ui/themes";
import { getDate, getTags, getPageCoverImageUrl, getPageTitle } from "@/app/_notion/actions";
import React, { Suspense } from "react";
import ArticleEmoji from "../[article_id]/_components/ArticleEmoji";
import Link from "next/link";


interface ArticleThumbnailProps {
    title: string;
    coverImageUrl?: string;
    tags: Tag[];
    date: Date;
    emoji: React.ReactNode;
    href?: string;
}


function ArticleThumbnailA({ title, coverImageUrl, tags, date, emoji, href }: ArticleThumbnailProps) {
    return (
        <Card variant='classic' style={{height:'100%'}} asChild>
            <Link href={href || '#'}> 
                <Inset clip="padding-box" side="top" pb="current">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={coverImageUrl} alt='Cover image' width={'100%'} height={100} style={{objectFit: 'cover'}}/>
                </Inset>

                <Flex gap='2' align='baseline' >
                    {emoji}
                    <Heading as='h2' size='3' mb='3'>{title}</Heading>
                </Flex>

                <Flex gap='2' align='end' wrap='wrap' justify='between'>
                    <Flex gap='2' align='center' wrap='wrap'>
                        {tags.map(tag => (
                            <Badge key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</Badge>
                        ))}
                    </Flex>

                    <Text as='p' size='1' color='gray'>{date.toDateString()}</Text>
                </Flex>
                
            </Link>
        </Card>
    )
}

function ArticleThumbnailSkeleton() {
    return (
        <Card>
            <Inset clip="padding-box" side="top" pb="current">
                <Skeleton width={'100%'} height='100px'/>
            </Inset>

            <Flex gap='2' align='baseline' >
                <Skeleton width='25px' height='28px'/>
                <Skeleton><Heading as='h2' size='3' mb='3'>The big title of the article</Heading></Skeleton>
            </Flex>

            <Flex gap='2' align='end' wrap='wrap' justify='between'>
                <Flex gap='2' align='center' wrap='wrap'>
                    <Skeleton><Badge radius='full'>Tag 1</Badge></Skeleton>
                    <Skeleton><Badge radius='full'>Tag 2</Badge></Skeleton>
                    <Skeleton><Badge radius='full'>Tag 3</Badge></Skeleton>
                </Flex>

                <Skeleton><Text as='p'>{new Date().toDateString()}</Text></Skeleton>
            </Flex>
        </Card>
    )
}

async function ArticleThumbnailS({ article_id }: { article_id: string }) {
    const title = await getPageTitle(article_id);
    const coverImageUrl = await getPageCoverImageUrl(article_id);
    const tags = await getTags(article_id);
    const date = await getDate(article_id);
    const emoji = <ArticleEmoji article_id={article_id} />;

    return <ArticleThumbnailA title={title} coverImageUrl={coverImageUrl} tags={tags} date={date} emoji={emoji} href={`/${article_id}`} />
}




export default function ArticleThumbnail({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleThumbnailSkeleton />}>
            <ArticleThumbnailS article_id={article_id} />
        </Suspense>
    )
}