import { Client, TablesDB, ID, Permission, Role, Query } from "appwrite";
import { config, tableConfig, articleStatus } from "../../config/config";
import type { Post } from "../../types/post";

class PostService {
    private client: Client;
    private tablesDB: TablesDB

    constructor() {
        this.client = new Client()
            .setProject(config.APPWRITE_PROJECT_ID) 
            .setEndpoint(config.APPWRITE_ENDPOINT);
        this.tablesDB = new TablesDB(this.client);
    }

    async createPost(params: Partial<Post>) {
        try {
            const result = await this.tablesDB.createRow({
                databaseId: config.APPWRITE_DATABASE_ID,
                tableId: tableConfig.ARTICLES_TABLE_ID,
                rowId: ID.unique(),
                data: {
                    title: params.title,
                    content: params.content,
                    featuredImage: params.featuredImage,
                    status: articleStatus.DRAFT,
                    isActive: params.isActive,
                    userId: params.userId
                },
                permissions: [Permission.read(Role.any())], // optional
            });

            return result
        } catch (error) {
            console.error("Error creating post::createPost", error)
            throw error
        }
    }

    async getPostDetailsById(rowId: string) {
        try {
            const result = await this.tablesDB.getRow({
                databaseId: config.APPWRITE_DATABASE_ID,
                tableId: tableConfig.ARTICLES_TABLE_ID,
                rowId: rowId
            });
            return result;
        } catch (error) {
            console.error("Error fetching post details::getPostDetailsById", error);
            throw error;
        }
    }

    async updatePost(rowId: string, data: Partial<Post>) {
        try {
            const result = await this.tablesDB.updateRow({
                databaseId: config.APPWRITE_DATABASE_ID,
                tableId: tableConfig.ARTICLES_TABLE_ID,
                rowId: rowId,
                data: data
            });

            return result;
        } catch (error) {
            console.error("Error updating post::updatePost", error);
            throw error;
        }
    }

    async deletePostById(rowId: string) {
        try {
            const result = await this.tablesDB.deleteRow({
                databaseId: config.APPWRITE_DATABASE_ID,
                tableId: tableConfig.ARTICLES_TABLE_ID,
                rowId: rowId
            });
            return result;
        } catch (error) {
            console.error("Error deleting post::deletePostById", error);
            throw error;
        }
    }

    async listPosts(queries: string[] = [
        Query.orderDesc("createdAt"), 
        Query.limit(10), Query.offset(0), 
        Query.equal("status", articleStatus.PUBLISHED)]
    ) {
        try {
            const result = await this.tablesDB.listRows({
                databaseId: config.APPWRITE_DATABASE_ID,
                tableId: tableConfig.ARTICLES_TABLE_ID,
                queries
            });
            return result;
        }
        catch (error) {
            console.error("Error listing posts::listPosts", error);
            throw error;
        }
    }

}

export default new PostService()