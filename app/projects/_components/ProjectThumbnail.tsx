import { Tag } from "@/app/api/notion";
import { Card, Inset, Text, Flex, Skeleton, Heading, Box, Badge, IconButton, Tooltip } from "@radix-ui/themes";
import { getDate, getTags, getPageCoverImageUrl, getPageTitle, getProperty } from "@/app/api/notion";
import React, { Suspense } from "react";
import PageEmoji from "@/app/_components/PageEmoji";
import Link from "next/link";
import Image from "next/image";
import BadgeMono from "../../_components/BadgeMono";
import { sf_mono, new_york_small } from "@/app/fonts";
import { BriefcaseBusiness, Lightbulb, Github, ExternalLink } from "lucide-react";
import LinkIconButton from "./LinkIconButton";


interface ProjectThumbnailViewProps {
    title: string;
    description?: string;
    type: 'Pro' | 'Perso'
    coverImageUrl: string;
    features: Tag[];
    stack: Tag[];
    date: Date;
    emoji: React.ReactNode;
    href?: string;
    githubUrl?: string;
    visitUrl?: string;
}

const iconSize = 16;

function TooltipIcon({ children, content }: { children: React.ReactNode, content: string }) {
    return (
        <Tooltip content={content} side='left' align='center' style={{cursor:'unset'}}>
            {children}
        </Tooltip>
    )
}

function ProOrPersoIcon({ type }: { type: 'Pro' | 'Perso' }) {
    if (type === 'Pro') {
        return <TooltipIcon content='Professional project'><BriefcaseBusiness size={iconSize} /></TooltipIcon>
    } else {
        return <TooltipIcon content='Personal project'><Lightbulb size={iconSize} /></TooltipIcon>
    }
}

function LinkTooltipIcon({ href, content, children }: { href: string, content: string, children: React.ReactNode }) {
    return (
        <LinkIconButton href={href} aria-label={content} size='1' variant='ghost'>
            <Tooltip content={content} side='left' align='center'>
                {children}
            </Tooltip>
        </LinkIconButton>
    )
}



function ProjectThumbnailView({ title, description, type, coverImageUrl, features, stack, date, emoji, href, githubUrl, visitUrl }: ProjectThumbnailViewProps) {

    return (
        <Card asChild>
            <Link href={href || '#'} style={{cursor:'default'}}>
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
                                    style={{ objectFit: 'cover'}}
                                />
                            </Box>
                        </Inset>

                        <Flex justify='between' gap='2'>

                            <Flex direction='column' gap='2'>

                                <Flex gap='2' align='baseline' >
                                    {emoji}
                                    <Heading as='h2' size='5'>
                                        <span>
                                            {title}
                                            <Text as='span' size='1' color='gray' className={sf_mono.className}>
                                                {' '}{date.getFullYear()}
                                            </Text>
                                        </span>
                                    </Heading>
                                </Flex>

                                <Text as='p' size='2' color='gray'>{description}</Text>

                            </Flex>

                            <Flex direction='column' gap='2' align='center' style={{color:'var(--gray-10)'}}>
                                <ProOrPersoIcon type={type} />

                                { githubUrl &&
                                    <LinkTooltipIcon href={githubUrl} content='View on GitHub'>
                                        <Github size={iconSize} />
                                    </LinkTooltipIcon>
                                }

                                { visitUrl &&
                                    <LinkTooltipIcon href={visitUrl} content='Visit project'>
                                        <ExternalLink size={iconSize} />
                                    </LinkTooltipIcon>
                                }   
                            </Flex>

                        </Flex>


                    </Flex>




                    <Flex gap='2' align='center' wrap='wrap' mt='2'>
                        {features.map(tag => (
                            <BadgeMono key={tag.id} variant='soft' radius='full' color={tag.color as any}>{tag.name}</BadgeMono>
                        ))}

                        {stack.map(tag => (
                            <BadgeMono key={tag.id} variant='surface' radius='full' color={tag.color as any}>{tag.name}</BadgeMono>
                        ))}
                    </Flex>
                    
                </Flex>
            </Link>
        </Card>
    )
}

function ProjectThumbnailSkeleton() {
    return (
        <Card asChild>
            <Flex direction='column' height='100%' justify='between' gap='5'>

                <Flex direction='column'>
                    <Inset clip="padding-box" side="top" pb="current">
                        <Skeleton height='100px' width='100%' />
                    </Inset>

                    <Flex gap='2' align='baseline' >
                        <Skeleton><Heading as='h2' size='5'>Mock title</Heading></Skeleton>
                    </Flex>

                </Flex>

                <Flex gap='2' align='end' wrap='wrap' justify='between'>

                    <Flex gap='2' align='center' wrap='wrap'>
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

async function ProjectThumbnailS({ page_id }: { page_id: string }) {

    const props = {
        href: `/projects/${page_id}`,
        title: await getPageTitle(page_id),
        coverImageUrl: await getPageCoverImageUrl(page_id) || 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500',
        features: await getTags({ pageId: page_id, property: 'Features' }),
        stack: await getTags({ pageId: page_id, property: 'Stack' }),
        date: await getDate(page_id),
        emoji: <PageEmoji page_id={page_id} />,
        description: await getProperty({ pageId: page_id, property: 'Description' }) as string || '',
        type: await getProperty({ pageId: page_id, property: 'Type' }) as 'Pro' | 'Perso',
        githubUrl: await getProperty({ pageId: page_id, property: 'GitHub' }) as (string | undefined),
        visitUrl: await getProperty({ pageId: page_id, property: 'Demo' }) as (string | undefined),
    }

    return <ProjectThumbnailView {...props} />
}




export default function ProjectThumbnail({ page_id }: { page_id: string }) {
    return (
        <Suspense fallback={<ProjectThumbnailSkeleton />}>
            <ProjectThumbnailS page_id={page_id} />
        </Suspense>
    )
}