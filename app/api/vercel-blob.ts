import { PutBlobResult, put, head } from "@vercel/blob";


interface uploadImageToBlobArgs {
    imageUrl: string
    fileName: string
}

export async function uploadImageToBlob({ imageUrl, fileName }: uploadImageToBlobArgs): Promise<PutBlobResult | undefined> {
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


    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
        console.error('Failed to fetch image from:', imageUrl);
        return undefined;
    }

    const imageBlob = await imageResponse.blob();

    console.log('Uploading image to blob:', fileName);
    const blob = await put(fileName, imageBlob, { access: 'public', addRandomSuffix: false });

    return blob;
}


export async function checkIfImageExists(imageUrl: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'development') {
        console.log('Skipping image existence check in development mode');
        return true;
    }
    
    try {
        const blobDetails = await head(imageUrl);
        return true
    } catch (error) {
        console.log('Image does not exist:', imageUrl);
        return false
    }
}