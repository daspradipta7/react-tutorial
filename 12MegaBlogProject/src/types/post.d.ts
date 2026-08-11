interface Post {
    id: string | undefined;
    title: string;
    featuredImage: string;
    status: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export type { Post };