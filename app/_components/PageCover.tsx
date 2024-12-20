import { getPageCoverImageBlobUrl, getDatabaseCoverImageBlobUrl } from "@/app/api/notion";
import { Skeleton, BoxProps, Box } from "@radix-ui/themes";
import { Suspense } from "react";
import Image from "next/image";
import type { Db } from "@/app/api/notion";


type PageCoverProps = ({ type: 'database', database: Db } | { type: 'page', id: string }) & BoxProps;


async function PageCoverS({ ...props }: PageCoverProps) {
    const coverImageUrl = (
            props.type === 'database' ?
                await getDatabaseCoverImageBlobUrl(props.database) :
                await getPageCoverImageBlobUrl(props.id)
    ) || 'https://pbs.twimg.com/profile_banners/200216115/1713358979/1500x500';

    return (
        <Box {...props} position='relative' overflow='hidden' style={{
            borderRadius: 'var(--radius-2)',
            boxShadow: 'var(--shadow-3)',
        }}>
            { coverImageUrl && 
                <Image
                    src={coverImageUrl}
                    alt='Cover image'
                    fill={true}
                    sizes="688px" // The size of the radix container
                    quality={80}
                    style={{ objectFit: 'cover' }}
                />
            }
        </Box>
    )
}


export default function PageCover({ ...props }: PageCoverProps) {
    return (
        <Suspense fallback={<Skeleton width={props.width} height={props.height} />}>
            <PageCoverS {...props} />
        </Suspense>
    )
}