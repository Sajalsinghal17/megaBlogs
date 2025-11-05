import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // ✅ Fetch post by slug (not by document ID)
  useEffect(() => {
    if (slug) {
      appwriteService.getPostBySlug(slug).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate("/"); // redirect if slug not found
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // ✅ Delete the post (by document ID)
  const deletePost = () => {
    if (!post || !post.$id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white shadow-sm">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-[480px] w-auto object-cover"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.slug}`}>
                <Button bgColor="bg-green-500 hover:bg-green-600" className="px-4 py-2 rounded-full">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 hover:bg-red-600"
                className="px-4 py-2 rounded-full"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <p className="text-gray-500 text-sm">
            Posted by <span className="font-medium text-gray-700">{post.userId}</span>
          </p>
        </div>

        <div className="prose prose-red max-w-none">{parse(post.content)}</div>
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-gray-500">Loading post...</div>
  );
}
