import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class bloggerService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.Appwrite_Url).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async Create_Blogger({ Blogger_Name, Blogger_Avatar, User_Account_ID }) {
    try {
      const Blogger_ID = ID.unique();

      return await this.databases.createDocument(
        conf.databaseId,
        conf.Blogger_collectionId,
        Blogger_ID,
        {
          Blogger_Name,
          User_Account_ID,
          Blogger_Avatar,
        }
      );
    } catch (error) {
      throw error;
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

  async uploadArticleImage(file) {
    try {
      return await this.bucket.createFile(
        conf.Blog_Image_bucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async GetBloggerStatus(
    userID,
    query = [Query.equal("User_Account_ID", userID)]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.Blogger_collectionId,
        query
      );
    } catch (error) {
      console.log("Get Blogger status ", error);
    }
  }

  async UploadPost({
    Title,
    Featured_Image,
    content,
    Blogger_ID,
    Blogger_Name,
    Status,
    AvatarId,
    Category,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.Article_collectionId,
        ID.unique(),
        {
          Title,
          Featured_Image,
          content,
          Blogger_ID,
          Blogger_Name,
          Status,
          AvatarId,
          Category,
        }
      );
    } catch (error) {
      console.log("Error in Blog appwrite ", error);
    }
  }
}

const BloggerService = new bloggerService();
export default BloggerService;
