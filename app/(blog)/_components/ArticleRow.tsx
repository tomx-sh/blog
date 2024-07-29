import { Tag } from "@/app/_notion/actions";
import { Card, Inset, Text, Badge, Flex, Skeleton, Heading, Box, Grid, Link as RadixLink, Separator } from "@radix-ui/themes";
import { getDate, getTags, getPageCoverImageUrl, getPageTitle } from "@/app/_notion/actions";
import React, { Suspense } from "react";
import ArticleEmoji from "../[article_id]/_components/ArticleEmoji";
import Link from "next/link";


interface ArticleRowProps {
    title: string;
    coverImageUrl?: string;
    tags: Tag[];
    date: Date;
    emoji: React.ReactNode;
    href?: string;
}


function ArticleRowA({ title, coverImageUrl, tags, date, emoji, href }: ArticleRowProps) {
    return (
        <Flex gap='2' align='center' maxWidth='100%' overflow='hidden'>

            <Box maxWidth='100%'>
                <RadixLink asChild highContrast underline='hover'>
                    <Link href={href || '#'}>
                        <Heading as='h2' size='2' wrap='nowrap' truncate>{title}</Heading>
                    </Link>
                </RadixLink>
            </Box>


            <Separator size='4'/>

            <Flex gap='3' align='center'>
                <Flex gap='2' wrap='nowrap' display={{initial:'none', sm:'flex'}}>
                    {tags.map(tag => (
                        <Badge key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</Badge>
                    ))}
                </Flex>

                <Text as='p' size='1' color='gray' wrap='nowrap'>{date.getFullYear()}</Text>
                
            </Flex>

        </Flex>

    )
}

function ArticleRowSkeleton() {
    return (
        <Card>
            <Inset clip="padding-box" side="top" pb="current">
                <Skeleton width={'100%'} height='100px' />
            </Inset>

            <Flex gap='2' align='baseline' >
                <Skeleton width='25px' height='28px' />
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

async function ArticleRowS({ article_id }: { article_id: string }) {
    const title = await getPageTitle(article_id);
    const coverImageUrl = await getPageCoverImageUrl(article_id);
    const tags = await getTags(article_id);
    const date = await getDate(article_id);
    const emoji = <ArticleEmoji article_id={article_id} />;

    return <ArticleRowA title={title} coverImageUrl={coverImageUrl} tags={tags} date={date} emoji={emoji} href={`/${article_id}`} />
}




export default function ArticleRow({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleRowSkeleton />}>
            <ArticleRowS article_id={article_id} />
        </Suspense>
    )
}