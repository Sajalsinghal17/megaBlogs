import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, Container } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Fetch only active posts once
    appwriteService.getPosts().then((response) => {
      if (response && response.documents) {
        setPosts(response.documents);
      } else {
        setPosts([]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full py-10 bg-gradient-to-b from-white via-red-50 to-white min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-center text-red-600 mb-10">
          All Blogs
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">
            No posts yet. Be the first to <span className="text-red-500 font-medium">write a blog!</span>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="transform transition duration-300 hover:scale-105"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
