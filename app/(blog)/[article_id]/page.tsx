import { Separator, Container, Section, Flex, Heading, Button, Grid, Card, Avatar, Text } from '@radix-ui/themes';
import Link from 'next/link';
import ArticleDate from './_components/ArticleDate';
import ArticleTitle from './_components/ArticleTitle';
import ArticleBadges from './_components/ArticleBadges';
import ArticleContent from './_components/ArticleContent';
import { ChevronLeft, ChevronUp, ChevronsLeft } from 'lucide-react';
import PageCover from './_components/PageCover';
import ArticleEmoji from './_components/ArticleEmoji';
import HomeButton from '../_components/HomeButton';
import NextArticles from './_components/NextArticles';
import { getArticlesPagesIds } from '@/app/api/notion';



export async function generateStaticParams() {
    const articleIds = await getArticlesPagesIds();
    return articleIds.map(article_id => ({ params: { article_id } }));
}


export default async function Page({ params }: { params: {article_id: string}}) {

    return (
        <Container size='2' mx='5'>

            <PageCover type='page' id={params.article_id} width='100%' height='200px'/>

            <Section py='4'>

                <Flex gap='2' align='baseline'>
                    <ArticleEmoji article_id={params.article_id} size='8' />
                    <ArticleTitle article_id={params.article_id} />
                </Flex>

                <Separator size='4' my='4'/>

                <Flex justify='between'>
                    <ArticleBadges article_id={params.article_id} />
                    <ArticleDate article_id={params.article_id} />
                </Flex>
            </Section>

            <Section>
                <ArticleContent article_id={params.article_id} />
            </Section>

            <Section>
                <Separator size='4' my='4'/>

                <Flex justify='between' align='center'>
                    <Heading as='h3' size='5' color='gray'>{`What's next`}</Heading>

                    <Flex gap='2' align='center'>
                        <Button size='2' asChild highContrast>
                            <Link href='/'>
                                <ChevronsLeft size='20'/>
                                see all posts
                            </Link>
                        </Button>

                        <Button size='2' asChild variant='soft'>
                            <Link href='#'>
                                <ChevronUp size='20' />
                                top
                            </Link>
                        </Button>
                    </Flex>
                </Flex>

                <NextArticles currentArticleId={params.article_id} />


                <Heading as='h3' size='3' color='gray' weight='regular' mt='5'>About the author</Heading>
                <Card mt='1' size='2' asChild>
                    <Link href='https://tomx.sh' prefetch>
                        <Flex gap='3' align='center'>
                            <Avatar size='4' fallback='T' radius='full' src='https://pbs.twimg.com/profile_images/1662912989316493312/OikmnLqo_400x400.jpg' />
                            <div>
                                <Heading as='h4' size='2'>Tom</Heading>
                                <Text as='p' size='2' color='gray'>
                                    I am a software engineer with a cybersecurity background, now specialized in web development.
                                    I like writing about programming and technology in general.
                                </Text>
                            </div>
                        </Flex>
                    </Link>
                </Card>

                


            </Section>

        </Container>
    )
}