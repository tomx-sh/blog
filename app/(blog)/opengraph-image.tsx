import { ImageResponse } from 'next/og'
//import { getDatabaseCoverImageUrl } from '../api/notion'
//import * as NextImage from 'next/image'

export const alt = 'TOMX - Blog'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'


/*export default async function Image() {
    const coverImageUrl = await getDatabaseCoverImageUrl()

    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%'}}>
                <NextImage.default
                    src={coverImageUrl}
                    alt={alt}
                    fill={true}
                    style= {{ objectFit: 'cover' }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}*/


export default async function Image() {

    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex'}}>
                <p>Hello (Home)</p>
            </div>
        ),
        {
            ...size,
        }
    )
}