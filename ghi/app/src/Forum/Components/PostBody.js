import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UpvoteButton } from "./UpvoteButton";
import DeletePostButton from "./DeletePostButton";


const PostBody = ({ post, setPost, token, showNavLinks, hideDeleteButton }) => {
  const navigate = useNavigate();
  return (
    <div key={post.post_id} className="card mb-3 shadow">
      <div className="card-body">
        <h5 className="card-title">
          {" "}
          {showNavLinks ? (
            <button
              className="link-dark"
              onClick={() => navigate("/posts/" + post.post_id)}
            >
              {post.title}
            </button>
          ) : (
            <>
              <h2 className="card-header">
                {post.title}{" "}
                {hideDeleteButton ? (
                  <></>
                ) : (
                  <DeletePostButton token={token} postId={post.post_id} />
                )}
              </h2>
            </>
          )}
        </h5>
        <p className="card-text">{post.text}</p>
        <h6 className="card-subtitle mb-2 text-muted">
          Created on:&nbsp;
          {new Date(post.created_on).toLocaleDateString()}
        </h6>
      </div>
      <div className="card-footer">
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
        {/* <div>
          {showDeleteButton ? <DeletePostButton token={token} /> : <></>}
        </div> */}
      </div>
    </div>
  );
};

export default PostBody;
