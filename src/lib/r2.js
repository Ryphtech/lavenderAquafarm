import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const accountId = import.meta.env.VITE_R2_ACCOUNT_ID || 'd6e0e618a594c39ee7bf96cd59297564';
const accessKeyId = import.meta.env.VITE_R2_ACCESS_KEY_ID || '5e65066a2e59efdbc80d932ba200ca5b';
const secretAccessKey = import.meta.env.VITE_R2_SECRET_ACCESS_KEY || '8adf35524fcc3d8933251cb36f7e1b6c6d2f5e3bef3a02d9c9bf5585742c5c78';
const bucketName = import.meta.env.VITE_R2_BUCKET_NAME || 'lavenderaquafarm';
const publicUrl = (import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-d49b66a578ef447082383c177f9479d0.r2.dev').replace(/\/$/, '');
const endpoint = import.meta.env.VITE_R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`;

export const r2Client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

/**
 * Uploads a file to Cloudflare R2 and returns its public URL
 * @param {File | Blob} file - The file to upload
 * @param {string} folder - Optional folder prefix (e.g. 'breeds')
 * @returns {Promise<string>} - The public accessible URL of the uploaded image
 */
export async function uploadToR2(file, folder = 'breeds') {
    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const key = folder ? `${folder}/${uniqueName}` : uniqueName;

    // Convert File/Blob to Uint8Array for browser compatibility with AWS SDK
    const arrayBuffer = await file.arrayBuffer();
    const body = new Uint8Array(arrayBuffer);

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: file.type || 'image/jpeg',
    });

    await r2Client.send(command);
    return `${publicUrl}/${key}`;
}

/**
 * Deletes a file from Cloudflare R2 using its public URL or key
 * @param {string} fileUrlOrKey - Public URL or key of the file
 */
export async function deleteFromR2(fileUrlOrKey) {
    if (!fileUrlOrKey) return;
    let key = fileUrlOrKey;
    if (fileUrlOrKey.startsWith('http')) {
        const url = new URL(fileUrlOrKey);
        key = url.pathname.replace(/^\//, '');
    }

    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    await r2Client.send(command);
}

