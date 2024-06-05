import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.Appwrite_Url).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.Article_collectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("Status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.Article_collectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  async getPostByCategory(
    Category,
    queries = [Query.equal("Category", Category)]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.Article_collectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  getBloggerAvatar(AvatarId) {
    try {
      return this.bucket.getFilePreview(conf.Blogger_Avatar_bucketId, AvatarId);
    } catch (error) {
      console.error("Error fetching the avatar:", error);
      // Return a default avatar or null based on your application's needs
      return null;
    }
  }
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.Blog_Image_bucketId, fileId);
    } catch (error) {
      console.log(error);
    }
  }
  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        conf.Blogger_Avatar_bucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async getAuthorPosts(
    BloggerId,
    queries = [Query.equal("Blogger_ID", BloggerId)]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.Article_collectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(BlogID) {
    try {
      await this.databases.deleteDocument(
        conf.databaseId,
        conf.Article_collectionId,
        BlogID
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const service = new Service();
export default service;
