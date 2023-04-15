import React from "react";
import { useNavigate } from "react-router-dom";


function DeletePostButton({ token, postId }) {
  const navigate = useNavigate();
  async function DeletePost() {
    const deletePostUrl = `${process.env.REACT_APP_FORUM_HOST}/api/posts/${postId}/`;
    const fetchConfigEvent = {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // const navigate = useNavigate();
    const response = await fetch(deletePostUrl, fetchConfigEvent);
    await response.json();
    navigate("/forum/");
  }

  return (
    <button onClick={DeletePost}>
      Delete Post
    </button>
  );
}

export default DeletePostButton;
