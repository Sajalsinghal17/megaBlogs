// src/components/PostCard.jsx
import React, { useEffect, useRef, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

/**
 * Accepts either post object or individual props depending on how you render it.
 * Original usage passed {$id, title, featuredImage}. This component handles both.
 */
function PostCard(props) {
  // allow either a single `post` prop or individual props
  const post = props.post ?? {
    $id: props.$id,
    title: props.title,
    featuredImage: props.featuredImage,
    content: props.content,
    slug: props.slug,
    createdAt: props.createdAt,
    tags: props.tags,
  };

  const title = post.title ?? "Untitled";
  const slug = post.slug ?? post.$id ?? post.id ?? "";
  const featuredImage = post.featuredImage ?? null;
  const content = post.content ?? "";
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "";

  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`bg-white rounded-xl p-5 shadow-card transform transition duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <Link to={`/post/${slug}`}>
        {featuredImage ? (
          <div className="w-full mb-4 rounded-lg overflow-hidden">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-44 object-cover"
            />
          </div>
        ) : null}

        <h3 className="text-lg md:text-xl font-semibold text-red-600 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {content.replace(/<[^>]+>/g, "").slice(0, 120)}...
        </p>
      </Link>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div>{date}</div>
      </div>
    </article>
  );
}

export default PostCard;
