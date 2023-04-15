import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostBody from "../Components/PostBody";
import CommentList from "../Components/CommentList";
import { getPost } from "../Api/GetPostData";
import { getCurrentUser } from "../Api/GetCurrentUser";


const DetailView = (props) => {
  const token = props.token;
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function initializePost() {
      let postData = await getPost({ token: token, post_id: params.post_id });
      setPost(postData);
    }
    async function initializeUser() {
      let user = await getCurrentUser({ token: token });
      setUser(user);
    }
    initializePost();
    initializeUser();
  }, [params.post_id, token]);

  return (
    
      <div>
        <PostBody
          post={post}
          token={token}
          setPost={setPost}
          showNavLinks={false}
          hideDeleteButton={!user.username || user.username !== post.author}
        />
        <CommentList token={token} />
      </div>
  );
};

export default DetailView;
