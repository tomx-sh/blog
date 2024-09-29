import { Grid, Card, Inset, AspectRatio, Heading, Box, Flex } from "@radix-ui/themes";
import { getPublishedPagesIds, getPageCoverImageUrl, getPageTitle } from "@/app/api/notion";
import Image from "next/image";
import Link from "next/link";



interface NextArticlesProps {
    currentArticleId: string;
}

interface NextArticleThumbnailProps {
    articleId: string;
}


async function NextArticleThumbnail({ articleId }: NextArticleThumbnailProps) {
    const coverImageUrl = await getPageCoverImageUrl(articleId) || 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500';
    const title = await getPageTitle(articleId);
    return (
        <Card asChild>
            <Link href={`/${articleId}`}>


                <Inset clip="padding-box" side="top" pb="current">
                    <Box position='relative' width='100%' height='80px'>
                        <Image
                            src={coverImageUrl}
                            alt='Cover image'
                            fill={true}
                            sizes={"400px"}
                            quality={70}
                            style={{ objectFit: 'cover' }}
                        />
                    </Box>
                </Inset>


                <Heading as='h3' size='2'>{title}</Heading>

            </Link>
        </Card>
    )
}   


export default async function NextArticles({ currentArticleId }: NextArticlesProps) {
    let articleIds = await getPublishedPagesIds('articles');
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