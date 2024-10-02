import { Tag } from "@/app/api/notion";
import { Card, Inset, Text, Flex, Skeleton, Heading, Box, Badge } from "@radix-ui/themes";
import { getDate, getTags, getPageCoverImageBlobUrl, getPageTitle } from "@/app/api/notion";
import React, { Suspense } from "react";
import PageEmoji from "../../_components/PageEmoji";
import Link from "next/link";
import Image from "next/image";
import BadgeMono from "../../_components/BadgeMono";
import { sf_mono, new_york_small } from "@/app/fonts";


interface ArticleThumbnailViewProps {
    title: string;
    coverImageUrl: string;
    tags: Tag[];
    date: Date;
    emoji: React.ReactNode;
    href?: string;
}

const gap = '2';


function ArticleThumbnailView({ title, coverImageUrl, tags, date, emoji, href }: ArticleThumbnailViewProps) {
    return (
        <Card asChild>
            <Link href={href || '#'}> 
                <Flex direction='column' height='100%' justify='between' gap={gap}>


                    <Flex direction='column'>
                        <Inset clip="padding-box" side="top" pb="current">
                            <Box position='relative' height='100px' width='100%'>
                                <Image
                                    src={coverImageUrl}
                                    alt='Cover image' 
                                    fill={true}
                                    sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw" }
                                    quality={80}
                                    style={{ objectFit: 'cover'}}
                                />
                            </Box>
                        </Inset>


                            <Heading as='h2' size='5'>
                                <span>{emoji}</span>{' '}{title}
                            </Heading>
                            


                    </Flex>



                    <Flex gap={gap} align='end' wrap='wrap' justify='between'>
                        <Flex gap={gap} align='center' wrap='wrap'>
                            {tags.map(tag => (
                                <BadgeMono key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</BadgeMono>
                            ))}
                        </Flex>

                        <Text as='p' size='1' color='gray' className={sf_mono.className}>{date.toDateString()}</Text>
                    </Flex>

                    
                </Flex>
            </Link>
        </Card>
    )
}

function ArticleThumbnailSkeleton() {
    return (
        <Card asChild>
            <Flex direction='column' height='100%' justify='between' gap={gap}>

                <Flex direction='column'>
                    <Inset clip="padding-box" side="top" pb="current">
                        <Skeleton height='100px' width='100%' />
                    </Inset>

                    <Flex gap={gap} align='baseline' >
                        <Skeleton><Heading as='h2' size='5'>Mock title</Heading></Skeleton>
                    </Flex>

                </Flex>

                <Flex gap={gap} align='end' wrap='wrap' justify='between'>

                    <Flex gap={gap} align='center' wrap='wrap'>
                        <Skeleton><Badge variant='surface' radius='full'>Tag 11</Badge></Skeleton>
                        <Skeleton><Badge variant='surface' radius='full'>Tag 1</Badge></Skeleton>
                        <Skeleton><Badge variant='surface' radius='full'>Tag 111</Badge></Skeleton>
                    </Flex>

                    <Text as='p' size='1' color='gray' className={sf_mono.className}>{new Date().toDateString()}</Text>

                </Flex>

            </Flex>
        </Card>
    )
}

async function ArticleThumbnailS({ article_id }: { article_id: string }) {
    const title = await getPageTitle(article_id);
    const coverImageUrl = await getPageCoverImageBlobUrl(article_id) || 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500';
    const tags = await getTags({ pageId: article_id, property: 'Tags' });
    const date = await getDate(article_id);
    const emoji = <PageEmoji page_id={article_id} />;

    return <ArticleThumbnailView title={title} coverImageUrl={coverImageUrl} tags={tags} date={date} emoji={emoji} href={`/${article_id}`} />
}




export default function ArticleThumbnail({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleThumbnailSkeleton />}>
            <ArticleThumbnailS article_id={article_id} />
        </Suspense>
    )
}