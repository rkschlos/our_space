import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CommentForm.module.css"

function CommentForm(props) {
  const token = props.token;
  const navigate = useNavigate();
  const [stateComment, setStateComment] = useState({
    comment_id: "",
    text: "",
    created_on: "",
    post_id: "",
    commenter: "",
  });

  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = stateComment;

    const new_comment = {
      comment_id: data.comment_id,
      text: data.text,
      created_on: data.created_on,
      post_id: data.post_id,
      commenter: data.commenter,
    };

    const commentsUrl = `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/${params.post_id}/comment/`;

    const fetchConfigEvent = {
      method: "POST",
      body: JSON.stringify(new_comment),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(commentsUrl, fetchConfigEvent);

    if (response.ok) {
      navigate(-1);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setStateComment({
      ...stateComment,
      [event.target.name]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className={styles.title}>Add a Comment &#9825;{" "}</h1>
          <form
            className={styles.form_card}
            onSubmit={handleSubmit}
            id="create-form"
          >
            <label htmlFor="name" className={styles.label}>Comment</label>
            <div className={styles.input_card}>
        
              <textarea
                onChange={handleChange}
                value={stateComment.text}
                placeholder="text"
                required
                type="text"
                name="text"
                id="text"
                className={styles.input_comment}
              />
              
            </div>
            <button className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
