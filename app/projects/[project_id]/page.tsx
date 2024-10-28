import { Separator, Container, Section, Flex, Button } from '@radix-ui/themes';
import Link from 'next/link';
import PageDate from '@/app/_components/PageDate';
import ProjectTitle from './_components/ProjectTitle';
import PageBadges from '@/app/_components/PageBadges';
import PageContent from '@/app/_components/PageContent';
import {  ChevronUp, ChevronsLeft } from 'lucide-react';
import PageCover from '@/app/_components/PageCover';
import { getPublishedPagesIds } from '@/app/api/notion';
import ProjectDescription from './_components/ProjectDescription';
import Details from './_components/Details';



export async function generateStaticParams() {
    const projectsIds = await getPublishedPagesIds('projects');
    return projectsIds.map(project_id => ({ params: { project_id } }));
}


export default async function Page({ params }: { params: {project_id: string}}) {

    return (
        <Container size='2' mx='5'>

            <PageCover type='page' id={params.project_id} width='100%' height='200px'/>

            <Section py='4'>

                <ProjectTitle project_id={params.project_id} />
                <ProjectDescription project_id={params.project_id} />

                <Separator size='4' my='4'/>

                <Flex justify='between' gap='2'>
                    <PageBadges page_id={params.project_id} tagsProperty='Stack' />
                    <PageDate page_id={params.project_id} format={{ year: 'numeric'}} />
                </Flex>

                <Details project_id={params.project_id} mt='5'/>

            </Section>

            <Section>
                <PageContent page_id={params.project_id} />
            </Section>

            <Section>
                <Separator size='4' my='4'/>

                <Flex justify='end' align='center'>

                    <Flex gap='2' align='center'>
                        <Button size='2' asChild highContrast>
                            <Link href='/projects'>
                                <ChevronsLeft size='20'/>
                                see all projects
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

            </Section>

        </Container>
    )
}