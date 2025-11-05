import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ Create a new post with an auto-generated ID
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(), // auto-generate a valid unique document ID
        {
          title,
          slug, // store slug as a field
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("❌ Appwrite service :: createPost :: error", error);
      return null;
    }
  }

  // ✅ Update a post by its actual Appwrite document ID
  async updatePost(id, { title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id, // use the existing post's $id, not a new ID
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("❌ Appwrite service :: updatePost :: error", error);
      return null;
    }
  }

  // ✅ Delete post by document ID
  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("❌ Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // ✅ Get post by document ID (used when editing or viewing by ID)
  async getPost(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("❌ Appwrite service :: getPost :: error", error);
      return null;
    }
  }

  // ✅ Get post by slug (used when URL param is slug)
  async getPostBySlug(slug) {
    try {
      const result = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("slug", slug)]
      );
      if (result.documents.length > 0) {
        return result.documents[0];
      }
      return null;
    } catch (error) {
      console.log("❌ Appwrite service :: getPostBySlug :: error", error);
      return null;
    }
  }

  // ✅ Get all posts (optionally filter by active)
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("❌ Appwrite service :: getPosts :: error", error);
      return [];
    }
  }

  // ✅ File upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("❌ Appwrite service :: uploadFile :: error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("❌ Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
  try {
    const result = this.bucket.getFileView(conf.appwriteBucketId, fileId);
    return typeof result === "string" ? result : result?.href ?? "";
  } catch (error) {
    console.error("getFileView error:", error);
    return "";
  }
}

}

const service = new Service();
export default service;
