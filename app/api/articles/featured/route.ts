import { getFeaturedIds, getPageTitle, getPageCoverImageBlobUrl, getDate, getTags, Tag, getPageEmoji, getProperty } from "../../notion";


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

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');

    const featuredArticleIds = await getFeaturedIds('articles');

    const articles = await Promise.all(
        featuredArticleIds.map(async (pageId) => {

            const slugPromise = getProperty({ pageId, property: 'slug' });
            const titlePromise = getPageTitle(pageId);
            const datePromise = getDate(pageId);
            const tagsPromise = getTags({ pageId, property: 'Tags' });
            const emojiPromise = getPageEmoji(pageId);
            const coverImageUrlPromise = getPageCoverImageBlobUrl(pageId)|| 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500';

            const [slug,title, date, tags, emoji, coverImageUrl] = await Promise.all([slugPromise, titlePromise, datePromise, tagsPromise, emojiPromise, coverImageUrlPromise]);

            return {
                url:`${protocol}://${host}/${slug}`,
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