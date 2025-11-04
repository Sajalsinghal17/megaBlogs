import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config"; // adjust to your actual Appwrite helper

export default function Search() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from Appwrite
  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      const fetched = response?.documents || [];
      setPosts(fetched);
      setFiltered(fetched);
      setLoading(false);
    });
  }, []);

  // Debounced filter
  useEffect(() => {
    const t = setTimeout(() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        setFiltered(posts);
        return;
      }
      const results = posts.filter((post) => {
        const title = post.title?.toLowerCase() || "";
        const content = post.content?.toLowerCase() || "";
        const tags = post.tags?.join(" ").toLowerCase() || "";
        return title.includes(q) || content.includes(q) || tags.includes(q);
      });
      setFiltered(results);
    }, 300);
    return () => clearTimeout(t);
  }, [query, posts]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading posts...
      </div>
    );

  return (
    <div className="min-h-screen bg-red-50 py-10">
      <div className="max-w-4xl mx-auto px-5">
        {/* Search Bar */}
        <div className="flex items-center bg-white shadow-md rounded-full px-5 py-3 mb-10">
          <FiSearch className="text-red-500 text-2xl mr-3" />
          <input
            type="text"
            placeholder="Search posts by title, content, or tags..."
            className="w-full outline-none text-lg text-gray-700"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <Link
                to={`/post/${post.$id}`}
                key={post.$id}
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition hover:-translate-y-1 duration-200"
              >
                <h3 className="text-xl font-bold text-red-600 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.content}
                </p>
                <span className="text-xs mt-3 inline-block text-red-400 font-medium">
                  {post.tags?.join(", ")}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">
            No posts found matching “
            <span className="font-bold text-red-600">{query}</span>”
          </p>
        )}
      </div>
    </div>
  );
}
