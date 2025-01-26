import { PutBlobResult, put, head, BlobNotFoundError, HeadBlobResult } from "@vercel/blob";


interface uploadImageToBlobArgs {
    imageUrl: string
    fileName: string
    skipCheckIfExists?: boolean
}

export async function uploadImageToBlob({ imageUrl, fileName, skipCheckIfExists=false }: uploadImageToBlobArgs): Promise<PutBlobResult | undefined> {
    if(process.env.NODE_ENV === 'development') {
        console.log('Skipping image upload to blob in development mode');
        const blob: PutBlobResult = {
            url: imageUrl,
            downloadUrl: imageUrl,
            pathname: imageUrl,
            contentDisposition: 'inline'
        }
        return blob;
    }

    if(process.env.BLOB_READ_WRITE_TOKEN === undefined) {
        console.error('BLOB_READ_WRITE_TOKEN is not defined in the environment variables');
        return undefined;
    }

    // Before uploading the image, check if it already exists in the blob storage
    // if(!skipCheckIfExists) {
    //     const basePath = process.env.BLOB_BASE_URL
    //     if (!basePath) {
    //         console.error('BLOB_BASE_URL is not defined in the environment variables');
    //         return undefined;
    //     }
    //     const blobUrl = `${basePath}/${fileName}`;
    //     const imageExists = await checkIfBlobExists(blobUrl);
    //     if (imageExists) {
    //         console.log('Image already exists in blob:', fileName);
    //         return imageExists;
    //     }
    // }

    // If it doesn't exist, fetch the image and upload it to the blob storage

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
        console.error('Failed to fetch image from:', imageUrl);
        return undefined;
    }

    const imageBlob = await imageResponse.blob();

    console.log('⬆️ Uploading image to blob:', fileName);
    const blob = await put(fileName, imageBlob, { access: 'public', addRandomSuffix: false });

    return blob;
}


export async function checkIfBlobExists(blobUrl: string): Promise<HeadBlobResult | false> {
    try {
        const blobDetails = await head(blobUrl);
        return blobDetails
    } catch (error) {
        if (error instanceof BlobNotFoundError) {
            console.log('Image does not exist:', blobUrl, error.message);
            return false;
        }
        console.log('Error checking if image exists:', error);
        return false;
    }
}