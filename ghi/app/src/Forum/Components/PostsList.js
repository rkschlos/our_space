import React from "react";
import PostBody from "./PostBody";
// import { PostWrapper } from "../styling/styling";

//pass in current user id
function PostsList(props) {
  const token = props.token;
  const posts = props.posts;
  const setPosts = props.setPosts;

  return (
    <div className="col">
      {posts.map((post) => {
        return (
          <PostBody
            key={post.post_id}
            post={post}
            token={token}
            showNavLinks={true}
            setPost={(newPost) => {
              let tempPosts = [...posts];
              tempPosts.forEach((tempPost, index) => {
                if (tempPost.post_id === newPost.post_id) {
                  tempPosts[index] = newPost;
                }
              });
              setPosts(tempPosts);
            }}
          />
        );
      })}
    </div>
  );
}
export default PostsList;
