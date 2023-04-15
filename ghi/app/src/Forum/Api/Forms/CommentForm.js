import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
          <h1>Add a Comment</h1>
          <form
            style={{ color: "pink" }}
            onSubmit={handleSubmit}
            id="create-form"
          >
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={stateComment.text}
                placeholder="text"
                required
                type="text"
                name="text"
                id="text"
                className="form-control"
              />
              <label htmlFor="name">Comment</label>
            </div>
            <button className="btn btn-secondary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
