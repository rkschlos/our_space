import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DeletePostButton.module.css"


function DeletePostButton({ token, postId }) {
  const navigate = useNavigate();
  async function DeletePost() {
    const deletePostUrl = `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/${postId}/`;
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
    <button onClick={DeletePost} className={styles.deleteButton} >
      Delete Post
    </button>
  );
}

export default DeletePostButton;
