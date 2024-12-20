import { Tag } from "@/app/api/notion";
import { Card, Inset, Text, Flex, Skeleton, Heading, Box, Grid, Link as RadixLink, Separator } from "@radix-ui/themes";
import BadgeMono from "@/app/_components/BadgeMono";
import { getDate, getTags, getPageCoverImageBlobUrl, getPageTitle, getProperty } from "@/app/api/notion";
import React, { Suspense } from "react";
import ArticleEmoji from "../../_components/PageEmoji";
import Link from "next/link";
import { sf_mono } from "@/app/fonts";


interface ArticleRowViewProps {
    title: string;
    tags: Tag[];
    date: Date;
    href?: string;
}


function ArticleRowView({ title, tags, date, href }: ArticleRowViewProps) {
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
                        <BadgeMono key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</BadgeMono>
                    ))}
                </Flex>

                <Text as='p' size='1' color='gray' wrap='nowrap' className={sf_mono.className}>{date.getFullYear()}</Text>
                
            </Flex>

        </Flex>

    )
}

function ArticleRowSkeleton() {
    return (
        <Flex gap='2' align='center' maxWidth='100%' overflow='hidden'>

            <Box maxWidth='100%'>
                <Skeleton>
                    <Heading as='h2' size='2' wrap='nowrap' truncate>Mock title</Heading>
                </Skeleton>
            </Box>

            <Separator size='4'/>

            <Flex gap='3' align='center'>
                <Flex gap='2' wrap='nowrap' display={{initial:'none', sm:'flex'}}>
                    <Skeleton><BadgeMono variant='surface' radius='full' color='gray'>Mock badge</BadgeMono></Skeleton>
                    <Skeleton><BadgeMono variant='surface' radius='full' color='gray'>Mock badge</BadgeMono></Skeleton>
                    <Skeleton><BadgeMono variant='surface' radius='full' color='gray'>Mock badge</BadgeMono></Skeleton>
                </Flex>

                <Text as='p' size='1' color='gray' wrap='nowrap'><Skeleton>2024</Skeleton></Text>
                
            </Flex>

        </Flex>
    )
}

async function ArticleRowS({ article_id }: { article_id: string }) {
    const slug = await getProperty({ pageId: article_id, property: 'slug' });
    const title = await getPageTitle(article_id);
    //const coverImageUrl = await getPageCoverImageBlobUrl(article_id);
    const tags = await getTags({ pageId: article_id, property: 'Tags' });
    const date = await getDate(article_id);
    //const emoji = <ArticleEmoji article_id={article_id} />;

    return <ArticleRowView title={title} tags={tags} date={date} href={`/${slug}`} />
}




export default function ArticleRow({ article_id }: { article_id: string }) {
    return (
        <Suspense fallback={<ArticleRowSkeleton />}>
            <ArticleRowS article_id={article_id} />
        </Suspense>
    )
}