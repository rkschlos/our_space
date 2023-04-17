import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostsList from "../Components/PostsList";
import { getPosts } from "../Api/GetPostsData";
import styles from "./ListView.module.css"


const ListView = (props) => {
  console.log(props, "props!");
  const token = props.token;
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function initializePosts() {
      let postsResponse = await getPosts({ token: token });
      if (typeof(postsResponse) === 'object' && postsResponse.detail === "Not Found") {
        setPosts([])
      }
      else {
        setPosts(postsResponse);
      }
    }
    initializePosts();
  }, [token]);

  return (
    
      <div className={styles.forum_body}>
        
          <h1 className={styles.forum_header}>OurForum &#9825;{" "}</h1>
          <button className={styles.createButton} onClick={() => navigate("/posts/new/")}>
            Create post
          </button>

        <PostsList token={token} posts={posts} setPosts={setPosts} />
      </div>
   
  );
};

export default ListView;
