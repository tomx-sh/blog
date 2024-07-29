import { getPageCoverImageUrl, getDatabaseCoverImageUrl } from "@/app/_notion/actions";
import { Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";


interface PageCoverSProps {
    id: string;
}

type PageCoverProps = { type: 'database' } | ({ type: 'page' } & PageCoverSProps);


async function PageCoverS({ id }: PageCoverSProps) {
    const coverImageUrl = await getPageCoverImageUrl(id);

    return (
        <>
            { coverImageUrl && 
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImageUrl} alt='Cover image' width={'100%'} height={200} 
                    style={{
                        objectFit:'cover',
                        borderRadius: 'var(--radius-2)',
                        boxShadow: 'var(--shadow-3)',
                        //filter: 'grayscale(100%)',
                    }}
                />
            }
        </>
    )
}

async function DatabaseCoverS() {
    const coverImageUrl = await getDatabaseCoverImageUrl();

    return (
        <>
            { coverImageUrl && 
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImageUrl} alt='Cover image' width={'100%'} height={200} 
                    style={{
                        objectFit:'cover',
                        borderRadius: 'var(--radius-2)',
                        boxShadow: 'var(--shadow-3)',
                        //filter: 'grayscale(100%)',
                    }}
                />
            }
        </>
    )
}


function PageCoverSkeleton() {
    return (
        <Skeleton width='100%' height='200px' />
    )
}


export default function PageCover({ ...props }: PageCoverProps) {
    return (
        <Suspense fallback={<PageCoverSkeleton />}>
            {props.type === 'database' ? <DatabaseCoverS /> : <PageCoverS id={props.id} />}
        </Suspense>
    )
}