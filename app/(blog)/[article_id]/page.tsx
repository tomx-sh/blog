import { Separator, Container, Section, Flex, Heading, Button, Grid, Card, Avatar, Text } from '@radix-ui/themes';
import Link from 'next/link';
import ArticleDate from './_components/ArticleDate';
import ArticleTitle from './_components/ArticleTitle';
import ArticleBadges from './_components/ArticleBadges';
import ArticleContent from './_components/ArticleContent';
import { ChevronLeft, ChevronUp } from 'lucide-react';


export default async function Page({ params }: { params: {article_id: string}}) {

    return (
        <Container size='2' mx='5'>

            <Section>

                <ArticleTitle article_id={params.article_id} />

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
                    <Heading as='h3' size='5' mt='2' color='gray'>{`What's next`}</Heading>

                    <Flex gap='2'>
                        <Button size='2' asChild highContrast>
                            <Link href='/'>
                                <ChevronLeft size='20'/>
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

                <Grid gap='4' mt='4' columns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card variant='classic' style={{aspectRatio:'16/9'}}/>
                    <Card variant='classic' style={{ aspectRatio: '16/9' }} />
                    <Card variant='classic' style={{ aspectRatio: '16/9' }} />
                </Grid>


                <Heading as='h3' size='3' color='gray' weight='regular' mt='5'>About the author</Heading>
                <Card mt='1' size='2' asChild>
                    <Link href='https://tomx.sh'>
                        <Flex gap='3' align='center'>
                            <Avatar size='4' fallback='T' radius='full' src='https://pbs.twimg.com/profile_images/1662912989316493312/OikmnLqo_400x400.jpg' />
                            <div>
                                <Heading as='h4' size='2'>Tom</Heading>
                                <Text as='p' size='2' color='gray'>
                                    I am a software engineer with a cybersecurity background, now specialized in web development.
                                    I like to write about programming and technology in general.
                                </Text>
                            </div>
                        </Flex>
                    </Link>
                </Card>

                


            </Section>

        </Container>
    )
}