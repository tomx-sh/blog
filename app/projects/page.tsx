import { getPublishedIds } from '../api/notion';
import { Container, Section, Grid, Heading } from '@radix-ui/themes';
import PageCover from '../_components/PageCover';
import ProjectThumbnail from './_components/ProjectThumbnail';


export default async function Home() {
    const projectsIds = await getPublishedIds('projects');

    return (
        <Container size='3' mx='5'>

            <PageCover type='database' database='projects' width='100%' height='200px' />

            <Section>
                {/*<Heading as='h1' size='8' mb='5' style={{ fontWeight: '900' }}>Featured</Heading>*/}

                <Grid gap='5' columns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {projectsIds.map((pageId, index) => (
                        <ProjectThumbnail page_id={pageId} key={pageId} />
                    ))}
                </Grid>

            </Section>

        </Container>

    );
}
