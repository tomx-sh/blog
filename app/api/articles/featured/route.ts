import { getFeaturedArticlesPagesIds, getPageTitle, getPageCoverImageUrl, getDate, getTags, Tag } from "../../notion";


interface ArticleData {
    //id: string,
    url: string,
    title: string,
    coverImageUrl: string,
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
            const coverImageUrl = await getPageCoverImageUrl(pageId);
            const date = await getDate(pageId);
            const tags = await getTags({ pageId, property: 'Tags' });

            return {
                url:`${protocol}://${host}/${pageId}`,
                title,
                coverImageUrl,
                date,
                tags
            }
        })
    )

    return Response.json({ articles } as ResponseBody);
}