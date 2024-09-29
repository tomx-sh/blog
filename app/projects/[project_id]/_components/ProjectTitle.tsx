import { getPageTitle } from "@/app/api/notion";
import { Heading, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";


async function ProjectTitleS({ project_id }: { project_id: string }) {
    const title = await getPageTitle(project_id);

    return (
        <Heading as='h1' size='8'>{title}</Heading>
    )
}


function ProjectTitleSkeleton() {
    return <Heading as='h1' size='8' weight='bold'><Skeleton>Title</Skeleton></Heading>
}


export default function ProjectTitle({ project_id }: { project_id: string }) {
    return (
        <Suspense fallback={<ProjectTitleSkeleton />}>
            <ProjectTitleS project_id={project_id} />
        </Suspense>
    )
}