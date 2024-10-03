import { usePostStore } from "@/store/postStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  const { post, setPost, getPost, errorMessage } = usePostStore();

  useEffect(() => {
    getPost(postId as string);
  }, [postId]);
  return (
    <div>
      <h1>Post Detail: {errorMessage ? errorMessage : post?.title}</h1>
    </div>
  );
}
