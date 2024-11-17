import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const news3Client = new S3Client({
    region: 'ru-1',
    endpoint: 'https://s3.timeweb.cloud',
    credentials: {
        accessKeyId: '08NHRLH3VLWTPOBK4F56',
        secretAccessKey: 'bdc3s2ZOQUfwsCsROWVJRhmB4ECaagi9pTU6xcXr'
    },
});

export const sendFile = async (buffer, key) => {
    try {
        const upload = new Upload({
            client: news3Client,
            params: {
                Bucket: 'bc53f73a-todo',
                Key: key,
                Body: buffer,
            },
        })

        const data = await upload.done()
        console.log(data);
        
        if (data.$metadata.httpStatusCode === 200) {
            return data.Location;
        }
    } catch (error) {
        console.log(error);
        
    }
}