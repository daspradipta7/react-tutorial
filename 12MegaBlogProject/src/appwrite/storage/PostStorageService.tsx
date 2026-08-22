import { Client, Storage, Permission, Role, ID } from "appwrite";
import { config } from "../../config/config";

class PostStorageService {
    private client: Client;
    private storage: Storage

    constructor() {
        this.client = new Client()
            .setProject(config.APPWRITE_PROJECT_ID) 
            .setEndpoint(config.APPWRITE_ENDPOINT);
        this.storage = new Storage(this.client);
    }

    async uploadPostFile(files: File[]) {
        try {
            const result = await this.storage.createFile({
                bucketId: config.APPWRITE_BUCKET_ID,
                fileId: ID.unique(),
                file: files[0],
                permissions: [Permission.read(Role.any())] // optional
            });

            return result
        } catch (error) {
            console.error("Error uploading file::uploadPostFile", error)
            throw error
        }
    }

    async getPostFileById(fileId: string) {
        try {
            const result = await this.storage.getFile({
                bucketId: config.APPWRITE_BUCKET_ID,
                fileId: fileId
            });
            return result;
        } catch (error) {
            console.error("Error fetching file::getPostFileById", error);
            throw error;
        }
    }

    async deletePostFileById(fileId: string) {
        try {
            const result = await this.storage.deleteFile({
                bucketId: config.APPWRITE_BUCKET_ID,
                fileId: fileId
            });
            return result;
        } catch (error) {
            console.error("Error deleting file::deletePostFileById", error);
            throw error;
        }
    }

    getFilePreview(fileId: string){
        return this.storage.getFileView (
            {
                bucketId: config.APPWRITE_BUCKET_ID,
                fileId: fileId
            }
        )
    }
}

export default new PostStorageService()