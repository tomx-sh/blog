import { getProperty } from "@/app/api/notion";
import { Text, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";


async function ProjectDescriptionServer({ project_id }: { project_id: string }) {
    const description = await getProperty({ pageId: project_id, property: 'Description' });

    return (
        <Text size='3' color='gray' as='p'>{description}</Text>
    )
}

const Fallback = () => (
    <Text size='3' as='p'>
        <Skeleton>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Skeleton>
    </Text>
)

export default function ProjectDescription({ project_id }: { project_id: string }) {
    return (
        <Suspense fallback={<Fallback />}>
            <ProjectDescriptionServer project_id={project_id} />
        </Suspense>
    )
}