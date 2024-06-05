const conf = {
    Appwrite_Url: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

    Article_collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ARTICLES),
    Blogger_collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_BLOGGER),
    Comment_collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_COMMENTS),

    Blog_Image_bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_BLOG_IMAGE),
    Blogger_Avatar_bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_BLOGGER_AVATAR),
};

export default conf;