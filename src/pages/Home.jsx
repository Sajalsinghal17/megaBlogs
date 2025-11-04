// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiChevronRight } from "react-icons/fi";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import AllPosts from "./AllPosts"; // used for Explore Blogs CTA if you prefer page-link

// --- Helpful: try to import your appwrite/post helper if it exists.
// If your project has a module like src/appwrite/posts or src/appwrite/config, update this import to match it.
// e.g. import postsService from "../appwrite/posts";
let postsService = null;
try {
  // eslint-disable-next-line
  postsService = require("../appwrite/posts");
} catch (e) {
  try {
    // fallback name some projects use
    // eslint-disable-next-line
    postsService = require("../appwrite/config");
  } catch (err) {
    postsService = null;
  }
}

/**
 * Helper: attempt to fetch posts via different strategies:
 *  1) Redux slice: state.posts or state.posts.posts
 *  2) postsService.getAll() or postsService.getPosts() (if your appwrite wrapper exposes it)
 *  3) fallback: empty array
 */
async function fetchPostsFromService() {
  if (!postsService) return [];
  // try common function names
  const fnNames = ["getAllPosts", "getPosts", "listPosts", "getAll"];
  for (const fn of fnNames) {
    if (typeof postsService[fn] === "function") {
      try {
        const res = await postsService[fn]();
        // appwrite often returns { documents: [...] }
        if (res?.documents) return res.documents;
        if (Array.isArray(res)) return res;
        if (res?.items) return res.items;
        if (res?.data) return res.data;
      } catch (err) {
        // continue trying other names
      }
    }
  }
  return [];
}

export default function Home() {
  const navigate = useNavigate();
  const authStatus = useSelector((s) => s.auth?.status);
  // Defensive: try many shapes for posts in Redux
  const reduxAllPosts = useSelector((s) => {
    if (!s) return null;
    if (Array.isArray(s.posts)) return s.posts;
    if (s.posts && Array.isArray(s.posts.posts)) return s.posts.posts;
    if (s.posts && Array.isArray(s.posts.data)) return s.posts.data;
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      // 1) prefer posts from Redux if available
      if (reduxAllPosts && reduxAllPosts.length > 0) {
        if (mounted) {
          setRecentPosts(reduxAllPosts.slice(0, 6));
          setLoading(false);
        }
        return;
      }

      // 2) else try service-based fetch (appwrite wrapper)
      const fetched = await fetchPostsFromService();
      if (mounted) {
        // fallback: normalize documents array
        const arr = Array.isArray(fetched) ? fetched : (fetched?.documents ?? []);
        setRecentPosts(arr.slice(0, 6));
        setLoading(false);
      }
    }

    load();

    return () => { mounted = false; };
  }, [reduxAllPosts]);

  // computed memo for hero CTAs text (keeps UX consistent)
  const ctaText = useMemo(() => (authStatus ? "Write a Post" : "Start Writing"), [authStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white">
      {/* Hero */}
      <section className="pt-16 pb-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 leading-tight">
                Write. Share. Inspire.
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl">
                MegaBlogs is a beautiful place to publish your ideas, explore posts
                from creators, and build your audience. Publish quickly and share widely.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => navigate("/all-posts")}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-full shadow-md transition transform hover:-translate-y-0.5"
                >
                  Explore Blogs
                  <FiChevronRight />
                </button>

                <button
                  onClick={() => navigate(authStatus ? "/add-post" : "/login")}
                  className="inline-flex items-center gap-2 border border-red-200 text-red-700 bg-white px-5 py-3 rounded-full font-medium shadow-sm hover:shadow transition"
                >
                  {ctaText}
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <span className="inline-block mr-2">Top tags:</span>
                <span className="inline-flex gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs">#webdev</span>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs">#react</span>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs">#design</span>
                </span>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="rounded-2xl bg-white shadow-card p-6">
                  {/* Minimal SVG illustration — purely decorative */}
                  <svg viewBox="0 0 600 400" className="w-full h-64" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0%" stopColor="#FFECEF" />
                        <stop offset="100%" stopColor="#FFEDEE" />
                      </linearGradient>
                    </defs>
                    <rect rx="16" width="100%" height="100%" fill="url(#g1)"/>
                    <g transform="translate(30,30)" fill="#EF233C" opacity="0.12">
                      <rect x="0" y="10" rx="8" width="520" height="18"/>
                      <rect x="0" y="44" rx="8" width="420" height="14"/>
                      <rect x="0" y="74" rx="8" width="480" height="14"/>
                      <rect x="0" y="104" rx="8" width="360" height="14"/>
                    </g>
                  </svg>
                </div>
                <div className="absolute -bottom-6 right-6">
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold shadow">
                    M
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured / Recent posts */}
      <section className="py-10">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Recent posts</h2>
            <Link to="/all-posts" className="text-sm text-red-600 hover:underline">View all</Link>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-600">Loading posts…</div>
          ) : recentPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((p, idx) => (
                // Try to use your PostCard if available; otherwise show minimal fallback
                <div key={p.$id ?? p.id ?? idx}>
                  <PostCard post={p}/>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600">
              No posts yet. Be the first to{" "}
              <button onClick={() => navigate(authStatus ? "/add-post" : "/login")} className="text-red-600 font-medium underline">write a post</button>.
            </div>
          )}
        </Container>
      </section>

      {/* Quick CTA strip */}
      <section className="py-6 border-t border-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">Create your first blog, organize it with tags, and share with the world.</p>
            <div className="flex gap-3">
              <button onClick={() => navigate("/all-posts")} className="btn-primary">Browse all posts</button>
              <button onClick={() => navigate(authStatus ? "/add-post" : "/login")} className="px-4 py-2 rounded-full border border-red-100 text-red-700">Get started</button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
