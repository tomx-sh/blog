import { getArticlesPagesIds } from '../_notion/actions';
import Link from 'next/link';
import { Container, Section, Card, Inset, Text, Grid, Heading, Link as RadixLink } from '@radix-ui/themes';
import ArticleThumbnail from './_components/ArticleThumbnail';



export default async function Home() {
    const pageIds = await getArticlesPagesIds();

    return (
        <Container size='3' mx='5'>
            <Section>
                <Heading as='h1' size='8' mb='5'>Posts</Heading>

                <Grid gap='5' columns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {pageIds.map((pageId, index) => (
                        <Link href={`/${pageId}`} key={index} style={{ all: 'unset' }}>
                            <RadixLink asChild>
                                <ArticleThumbnail article_id={pageId}/>
                            </RadixLink>
                        </Link>
                    ))}
                </Grid>

            </Section>
        </Container>

    );
}
