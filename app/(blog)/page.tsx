import { getPublishedPagesIds, getFeaturedArticlesPagesIds } from '../api/notion';
import { Container, Section, Grid, Heading, Flex } from '@radix-ui/themes';
import ArticleThumbnail from './_components/ArticleThumbnail';
import PageCover from '../_components/PageCover';
import ArticleRow from './_components/ArticleRow';


export default async function Home() {
    const featuredArticleIds = await getFeaturedArticlesPagesIds();
    const articleIds = await getPublishedPagesIds('articles');

    return (
        <Container size='3' mx='5'>

            <PageCover type='database' database='articles' width='100%' height='200px'/>

            <Section>
                <Heading as='h1' size='8' mb='5' style={{fontWeight:'900'}}>Featured</Heading>

                <Grid gap='5' columns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {featuredArticleIds.map((pageId, index) => (
                        <ArticleThumbnail article_id={pageId} key={pageId}/>
                    ))}
                </Grid>

            </Section>

            <Section>

                <Heading as='h1' size='8' mb='5' style={{ fontWeight: '900' }}>All posts</Heading>

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
