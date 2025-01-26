import { MDXRemote } from 'next-mdx-remote/rsc';
import customComponents from './CustomComponents';
import { getMarkdown } from '@/app/api/notion';
import { Skeleton, Text } from '@radix-ui/themes';
import { Suspense } from 'react';


async function PageContentS({ page_id }: { page_id: string }) {
    const mdString = await getMarkdown(page_id);
    const escapedString = mdString.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

    return (
        <MDXRemote source={escapedString} components={customComponents} />
    )
}


function PageContentSkeleton() {
    return (
        <Text>
            <Skeleton>
                Sit officia aliquip incididunt Lorem sit non mollit non qui occaecat proident. Eiusmod ullamco velit sunt laboris sunt amet magna labore mollit Lorem sit. Occaecat sunt veniam fugiat do sint irure sint in qui officia laboris. Dolore ut consectetur officia in laboris eu.

                Laboris minim consequat non Lorem est qui ea occaecat. Voluptate ad irure nisi ipsum magna et ipsum voluptate voluptate reprehenderit sint amet Lorem excepteur excepteur. Dolor ullamco mollit anim qui veniam laboris fugiat enim consequat incididunt duis nulla. Et non ea irure ea labore.

                Aliqua excepteur consectetur in id Lorem. Elit enim officia excepteur id dolor amet occaecat culpa quis. Nisi occaecat laboris reprehenderit tempor aliquip ex elit excepteur qui dolor enim excepteur culpa excepteur pariatur. Sunt aute incididunt Lorem est Lorem enim deserunt laborum.

                Ipsum magna esse et cillum enim proident aliquip cillum. Laboris laborum Lorem quis ea sit sint Lorem. Et culpa ad reprehenderit exercitation esse deserunt non laboris cupidatat culpa non aliquip. Cillum nulla ipsum commodo ea dolor labore officia ut ea. Eiusmod nostrud duis est officia pariatur do amet. Velit ut ut sint sit pariatur reprehenderit qui excepteur ut velit Lorem. Enim nostrud reprehenderit laboris. Mollit excepteur minim minim dolore adipisicing dolor minim.

                Dolor consectetur est veniam duis nostrud. Excepteur dolore Lorem labore occaecat mollit velit dolor cillum nulla incididunt. Aliqua eu sit in consequat cillum eu Lorem est ex aute nostrud consectetur cupidatat ad do. Sunt cupidatat labore laboris ipsum non excepteur aliqua minim ut commodo laborum nulla eu cillum proident. Elit velit aliquip aliquip consequat pariatur non cillum. Exercitation ex dolore esse proident sit consequat sunt magna fugiat ut ullamco incididunt.
            </Skeleton>
        </Text>
    )
}


export default function PageContent({ page_id }: { page_id: string }) {
    return (
        <Suspense fallback={<PageContentSkeleton />}>
            <PageContentS page_id={page_id} />
        </Suspense>
    )
}