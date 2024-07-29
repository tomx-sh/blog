import { getArticlesPagesIds, getFeaturedArticlesPagesIds } from '../_notion/actions';
import { Container, Section, Grid, Heading, Flex, Separator } from '@radix-ui/themes';
import ArticleThumbnail from './_components/ArticleThumbnail';
import PageCover from './[article_id]/_components/PageCover';
import ArticleRow from './_components/ArticleRow';



export default async function Home() {
    const featuredArticleIds = await getFeaturedArticlesPagesIds();
    const articleIds = await getArticlesPagesIds();

    return (
        <Container size='3' mx='5'>

            <PageCover type='database' />

            <Section>
                <Heading as='h1' size='8' mb='5'>Featured</Heading>

                <Grid gap='5' columns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {featuredArticleIds.map((pageId, index) => (
                        <ArticleThumbnail article_id={pageId} key={pageId}/>
                    ))}
                </Grid>

            </Section>

            <Section>

                <Heading as='h1' size='8' mb='5'>All posts</Heading>

                <Flex direction='column' gap='3'>
                    {
                        articleIds.map((pageId, index) => (
                            <ArticleRow article_id={pageId} key={pageId} />
                        ))
                    }
                </Flex>

            </Section>
        </Container>

    );
}
