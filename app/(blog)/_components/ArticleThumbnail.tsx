import { Tag } from "@/app/api/notion";
import { Card, Inset, Text, Badge, Flex, Skeleton, Heading, Box } from "@radix-ui/themes";
import { getDate, getTags, getPageCoverImageUrl, getPageTitle } from "@/app/api/notion";
import React, { Suspense } from "react";
import ArticleEmoji from "../[article_id]/_components/ArticleEmoji";
import Link from "next/link";
import Image from "next/image";


interface ArticleThumbnailViewProps {
    title: string;
    coverImageUrl: string;
    tags: Tag[];
    date: Date;
    emoji: React.ReactNode;
    href?: string;
}


function ArticleThumbnailView({ title, coverImageUrl, tags, date, emoji, href }: ArticleThumbnailViewProps) {
    return (
        <Card asChild>
            <Link href={href || '#'}> 
                <Flex direction='column' height='100%' justify='between' gap='2'>


                    <Flex direction='column'>
                        <Inset clip="padding-box" side="top" pb="current">
                            <Box position='relative' height='100px' width='100%'>
                                <Image
                                    src={coverImageUrl}
                                    alt='Cover image' 
                                    fill={true}
                                    sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw" }
                                    quality={80}
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                        </Inset>

                        <Flex gap='2' align='baseline' >
                            {emoji}
                            <Heading as='h2' size='3'>{title}</Heading>
                        </Flex>
                    </Flex>



                    <Flex gap='2' align='end' wrap='wrap' justify='between'>
                        <Flex gap='2' align='center' wrap='wrap'>
                            {tags.map(tag => (
                                <Badge key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</Badge>
                            ))}
                        </Flex>

                        <Text as='p' size='1' color='gray'>{date.toDateString()}</Text>
                    </Flex>

                    
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
    const coverImageUrl = await getPageCoverImageUrl(article_id) || 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500';
    const tags = await getTags(article_id);
    const date = await getDate(article_id);
    const emoji = <ArticleEmoji article_id={article_id} />;

    return <ArticleThumbnailView title={title} coverImageUrl={coverImageUrl} tags={tags} date={date} emoji={emoji} href={`/${article_id}`} />
}




export default function ArticleThumbnail({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleThumbnailSkeleton />}>
            <ArticleThumbnailS article_id={article_id} />
        </Suspense>
    )
}