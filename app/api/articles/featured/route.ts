import { getFeaturedArticlesPagesIds, getPageTitle, getPageCoverImageBlobUrl, getDate, getTags, Tag, getPageEmoji } from "../../notion";


interface ArticleData {
    //id: string,
    url: string,
    title: string,
    coverImageUrl: string,
    emoji?: string,
    date: Date,
    tags: Tag[]
}

interface ResponseBody {
    articles: ArticleData[]
}


export async function GET(req: Request) {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');

    const featuredArticleIds = await getFeaturedArticlesPagesIds();

    const articles = await Promise.all(
        featuredArticleIds.map(async (pageId) => {
            const title = await getPageTitle(pageId);
            const coverImageUrl = await getPageCoverImageBlobUrl(pageId) || 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500';
            const date = await getDate(pageId);
            const tags = await getTags({ pageId, property: 'Tags' });
            const emoji = await getPageEmoji(pageId);


            return {
                url:`${protocol}://${host}/${pageId}`,
                title,
                coverImageUrl,
                date,
                tags,
                emoji: emoji || undefined
            }
        })
    )

    return Response.json({ articles } as ResponseBody);
}