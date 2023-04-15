import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostsList from "../Components/PostsList";
import { getPosts } from "../Api/GetPostsData";


const ListView = (props) => {
  console.log(props, "props!");
  const token = props.token;
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function initializePosts() {
      let posts = await getPosts({ token: token });
      if (typeof(posts) === 'object' && posts.detail === "Not Found") {
        setPosts([])
      }
      else {
        setPosts(posts);
      }
    }
    initializePosts();
  }, [token]);

  return (
    
      <div>
        
          OurForum &#9825;{" "}
          <button onClick={() => navigate("/posts/new/")}>
            Create post
          </button>

        <PostsList token={token} posts={posts} setPosts={setPosts} />
      </div>
   
  );
};

export default ListView;
