import React from "react";
import styles from "./UpvoteButton.module.css"

export function UpvoteButton({
  postId,
  upvoteCount,
  setPostUpvoteCount,
  userPostUpvoteCount,
  token,
}) {
  async function AddUpvote() {
    const upvoteUrl = `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/${postId}/upvote/`;
    const fetchConfigEvent = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(upvoteUrl, fetchConfigEvent);
    let responseJson = await response.json();
    console.log(responseJson);

    if (response.ok) {
      setPostUpvoteCount(responseJson.upvote_count, responseJson.user_upvoted);
    }
  }

  async function DeleteUpvote() {
    const deleteUpvoteUrl = `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/${postId}/upvote/`;
    const fetchConfigEvent = {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteUpvoteUrl, fetchConfigEvent);
    let responseJson = await response.json();

    //debugger;

    if (response.ok) {
      setPostUpvoteCount(responseJson.upvote_count, responseJson.user_upvoted);
    }
  }

  //maroon heart color: "#a63a79"

  return (
    <button
      className={styles.upvoteButton}
      style={
        userPostUpvoteCount <= 0
          ? { fontWeight: "normal", float: "right" }
          : { fontWeight: "normal", color: "#a63a79", float: "right" }
      }
      onClick={userPostUpvoteCount <= 0 ? AddUpvote : DeleteUpvote}
    >
      {" "}
      {userPostUpvoteCount <= 0
        ? String.fromCharCode(9825)
        : String.fromCharCode(9829)}
      {upvoteCount}
    </button>
  );
}
