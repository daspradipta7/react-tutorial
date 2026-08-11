const config = Object.freeze({
    TINY_MCE_API_KEY: import.meta.env.VITE_TINY_MCE_API_KEY,
    APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    APPWRITE_PROJECT_NAME: import.meta.env.VITE_APPWRITE_PROJECT_NAME,
    APPWRITE_ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
    APP_ENV: import.meta.env.VITE_APP_ENV,
    APPWRITE_DATABASE_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    APPWRITE_BUCKET_ID: import.meta.env.VITE_APPWRITE_BUCKET_ID
});


const tableConfig = Object.freeze({
    ARTICLES_TABLE_ID: "articles",
    USERS_TABLE_ID: "users"
})

const articleStatus = Object.freeze({
    DRAFT: "DRAFT",
    PUBLISHED: "PUBLISHED",
    ARCHIVED: "ARCHIVED"
})

export {
    config,
    tableConfig,
    articleStatus
}