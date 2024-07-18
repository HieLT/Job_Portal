import bucket from "../config/firsebase";

interface IFile {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
}

interface IImage {
    name: string;
    uri: string;
    type: string;
}

class FirebaseService {
    async uploadFile(file: IFile): Promise<string> {
        try {
            const { originalname, buffer, mimetype } = file;
            const fileName = `resumes/${originalname}`;
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: mimetype
                }
            });

            return new Promise((resolve, reject) => {
                blobStream.on('error', (err: any) => {
                    reject(err);
                });
                blobStream.on('finish', async () => {
                    try {
                        await blob.makePublic();
                        const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                        resolve(url);
                    } catch (error) {
                        reject(error); // Handle any errors during URL generation
                    }
                });
                blobStream.end(buffer);
            });
        } catch (error) {
            throw error;
        }
    }

    async uploadImage(fileImage: IImage) {
        try {
            const { uri, name, type } = fileImage;
            const decodedImage = Buffer.from(uri, 'base64');
            const fileName = `images/${Date.now()}.${name}`;
            const file = bucket.file(fileName);

            await file.save(decodedImage, {
                metadata: {
                    contentType: type,
                },
            });
            const result = await file.getSignedUrl({
                action: 'read',
                expires: '12-12-2050'
            });
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

export default new FirebaseService();
