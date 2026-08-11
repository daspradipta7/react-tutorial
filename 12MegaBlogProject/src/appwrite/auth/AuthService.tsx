import { Client, Account, ID } from "appwrite";
import { config } from "../../config/config";

interface CreateAccountParams {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

interface LoginParams {
    email: string;
    password: string;
}

class AuthService {
    private client: Client;
    private account: Account;

    constructor() {
        this.client = new Client()
            .setProject(config.APPWRITE_PROJECT_ID) 
            .setEndpoint(config.APPWRITE_ENDPOINT);
        this.account = new Account(this.client);
    }

    async createAccount(params: CreateAccountParams) {
        try {
            const user = await this.account.create({
                userId: ID.unique(),
                email: params.email,
                password: params.password,
                name: params.firstname + " " + params.lastname
            });

            return user;
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({ email, password }: LoginParams) {
        try {
            const session = await this.account.createEmailPasswordSession({
                email,
                password
            });

            return session
        } catch (error) {
            console.error("Error log into account:", error);
            throw error;
        }
    }

    async getUserSession() {
        try {
            const session = await this.account.get()
            return session
        } catch (error) {
            console.error("Error getting session details:", error);
            throw error;
        }
    }

    async logout() {
        try {
            const result = await this.account.deleteSessions();
            return result;
        } catch (error) {
            console.error("Error while removing session", error);
            throw error;
        }
    }
}

export default new AuthService();