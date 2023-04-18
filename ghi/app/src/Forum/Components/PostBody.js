import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UpvoteButton } from "./UpvoteButton";
import DeletePostButton from "./DeletePostButton";
import styles from "./PostBody.module.css"


const PostBody = ({ post, setPost, token, showNavLinks, hideDeleteButton }) => {
  const navigate = useNavigate();
  return (
    <div key={post.post_id} className={styles.card}>
      <div className={styles.card_body}>
        <div className={styles.detail_title}>
          {" "}
          {showNavLinks ? (
            <button
              className={styles.postdetail_button}
              onClick={() => navigate("/posts/" + post.post_id)}
            >
              {post.title}
            </button>
          ) : (
            <>
              <div className={styles.title_container}>
                {post.title}{" "}
                {hideDeleteButton ? (
                  <></>
                ) : (
                  
                  <DeletePostButton token={token} postId={post.post_id} className={styles.deleteButton}/>
                )}
              </div>
            </>
          )}
        </div>
        <p className={styles.text}>{post.text}</p>
        <div className={styles.date}>
          Created on:&nbsp;
          {new Date(post.created_on).toLocaleDateString()}
        </div>
      </div>
      <div className={styles.comments_link}>
        {showNavLinks ? (
          <NavLink
            to={"/posts/" + post.post_id}
            style={{ color: "mediumvioletred " }}
          >
            View Comments
          </NavLink>
          
        ) : (
          ""
        )}
        <div>
        <UpvoteButton
          token={token}
          postId={post.post_id}
          upvoteCount={post.upvote_count}
          userPostUpvoteCount={post.user_upvoted}
          setPostUpvoteCount={(postUpvoteCount, userPostUpvoteCount) => {
            let newPost = { ...post };
            newPost.upvote_count = postUpvoteCount;
            newPost.user_upvoted = userPostUpvoteCount;
            setPost(newPost);
          }}
        />
        </div>
        {/* <div>
          {showDeleteButton ? <DeletePostButton token={token} /> : <></>}
        </div> */}
      
    </div>
    </div>
  );
};

export default PostBody;
