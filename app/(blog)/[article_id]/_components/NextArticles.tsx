import { Grid, Card, Inset, AspectRatio, Heading } from "@radix-ui/themes";
import { getArticlesPagesIds, getPageCoverImageUrl, getPageTitle } from "@/app/_notion/actions";
import Image from "next/image";
import Link from "next/link";



interface NextArticlesProps {
    currentArticleId: string;
}

interface NextArticleThumbnailProps {
    articleId: string;
}


async function NextArticleThumbnail({ articleId }: NextArticleThumbnailProps) {
    const coverImageUrl = await getPageCoverImageUrl(articleId);
    const title = await getPageTitle(articleId);
    return (
        <Card variant='classic' style={{aspectRatio:'16/9'}} asChild>
            <Link href={`/${articleId}`}>

                <Inset>
                    <Image
                        src={coverImageUrl || '/'}
                        alt='Cover image'
                        layout='fill'
                        objectFit='cover'
                        style={{filter: 'grayscale(1)'}}
                    />
                </Inset>

                <Heading as='h3' size='2' mt='2'>{title}</Heading>

            
            </Link>
        </Card>
    )
}   


export default async function NextArticles({ currentArticleId }: NextArticlesProps) {
    let articleIds = await getArticlesPagesIds();
    articleIds = articleIds.filter((id) => id !== currentArticleId);
    const recentArticles = articleIds.slice(0, 3);



    return (
        <Grid gap='4' mt='4' columns='repeat(auto-fill, minmax(200px, 1fr))'>
            {recentArticles.map((pageId) => (
                <NextArticleThumbnail articleId={pageId} key={pageId}/>
            ))}
        </Grid>
    )
}