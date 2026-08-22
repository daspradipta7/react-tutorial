import type { Models } from "appwrite";

interface Post extends Models.Row {
    $id: string;
    title: string;
    slug: string;
    featuredImage: string;
    content: string;
    status: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export type { Post };