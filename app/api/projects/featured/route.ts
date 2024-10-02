import { getFeaturedProjectsPagesIds, getPageTitle, getPageCoverImageBlobUrl, getDate, getTags, Tag, TagProperty, getProperty } from "../../notion";


interface ProjectData {
    //id: string,
    url: string,
    title: string,
    description: string | null,
    coverImageUrl: string,
    date: Date,
    githubUrl: string | null,
    demoUrl: string | null,
    type: 'Pro' | 'Perso',
    features: Tag[],
    stack: Tag[]
}

interface ResponseBody {
    projects: ProjectData[]
}


export async function GET(req: Request) {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');

    const featuredProjectsIds = await getFeaturedProjectsPagesIds();

    const projects = await Promise.all(
        featuredProjectsIds.map(async (pageId) => {
            return {
                url: `${protocol}://${host}/projects/${pageId}`,
                title: await getPageTitle(pageId),
                description: await getProperty({ pageId, property: 'Description' }),
                coverImageUrl: await getPageCoverImageBlobUrl(pageId) || 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500',
                date: await getDate(pageId),
                githubUrl: await getProperty({ pageId, property: 'GitHub' }),
                demoUrl: await getProperty({ pageId, property: 'Demo' }),
                type: await getProperty({ pageId, property: 'Type' }),
                features: await getTags({ pageId, property: 'Features' }),
                stack: await getTags({ pageId, property: 'Stack' })

            }
        })
    )

    return Response.json({ projects } as ResponseBody);
}