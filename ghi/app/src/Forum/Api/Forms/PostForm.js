import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostForm.module.css"

function PostForm(props) {
  const token = props.token;
  const navigate = useNavigate();
  const [statePost, setStatePost] = useState({
    post_id: "",
    title: "",
    text: "",
    created_on: "",
    author: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = statePost;

    const new_post = {
      post_id: data.post_id,
      title: data.title,
      text: data.text,
      created_on: data.created_on,
      author: data.author,
    };

    const postsUrl = `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/`;
    const fetchConfigEvent = {
      method: "POST",
      body: JSON.stringify(new_post),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(postsUrl, fetchConfigEvent);

    if (response.ok) {
      // setStatePost({
      //   post_id: "",
      //   title: "",
      //   text: "",
      //   created_on: "",
      //   author: "",
      // });
      navigate("/forum/");
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setStatePost({
      ...statePost,
      [event.target.name]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className={styles.title}>Create a Post &#9825;{" "}</h1>
          <form
            className={styles.form_card}
            onSubmit={handleSubmit}
            id="create-form"
          >
            <div className={styles.input_card}>
              <label htmlFor="title" className={styles.label}> Post Title</label>
              <input
                onChange={handleChange}
                value={statePost.title}
                placeholder="title"
                required
                type="text"
                name="title"
                id="title"
                className={styles.input_title}
              />
            </div>
            <label htmlFor="text" className={styles.label}>Text</label>
            <div className={styles.input_card}>
              <textarea
                onChange={handleChange}
                value={statePost.text}
                placeholder="text"
                required
                type="text"
                name="text"
                id="text"
                className={styles.input_post}
                row="10"
              />
             
            </div>
            <button className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
