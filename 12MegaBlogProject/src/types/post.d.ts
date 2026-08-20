interface Post {
    id: string | undefined;
    title: string;
    slug: string;
    featuredImage: string | null;
    content: string;
    status: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export type { Post };