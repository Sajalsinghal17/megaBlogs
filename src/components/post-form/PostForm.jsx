// src/components/post-form/PostForm.jsx
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    // same logic as before (preserved)
    if (post) {
      const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file && post.featuredImage) {
        try {
          await appwriteService.deleteFile(post.featuredImage);
        } catch (err) {
          // ignore delete error
        }
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // If image is required but user didn't upload, you may want to handle it.
        // Currently original code required image when creating post—kept same behavior.
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
      <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
        <div className="bg-white rounded-xl shadow-card p-6">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
            inputClassName="rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-100"
          />

          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
            inputClassName="rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-100"
          />

          <div className="mb-4">
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 px-2">
        <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image :</label>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
              className="w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:bg-red-50 file:text-red-600"
            />
          </div>

          {post && (
            <div className="w-full mb-2">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full object-cover"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Select
              options={["active", "inactive"]}
              label="Status"
              className=""
              {...register("status", { required: true })}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-white font-medium transition shadow-sm
                ${post ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              {post ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
