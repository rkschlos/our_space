import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getComments } from "../Api/GetCommentsData";
import styles from "./CommentList.module.css"


const CommentListBody = ({ comments }) => {
  return (
    <div className={styles.comment_card}>
      <p className={styles.header}>Comments
      <div className={styles.link_to_comment}><NavLink
        style={{ color: "mediumvioletred", float: "center" }}
        to={"comment/form"}
      >
        Add a comment
      </NavLink>
      </div>
      </p>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="card mb-3">
            <div className="card-body">
              <h5 className={styles.card_text}>{comment.text}
              <h6 className={styles.date}>
                {new Date(comment.created_on).toLocaleDateString()}
                &nbsp; at {new Date(comment.created_on).toLocaleTimeString()}
              </h6>
              </h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CommentList = (props) => {
  const token = props.token;
  // console.log("token from commentlist", token);
  const [comments, setComments] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function initializeComments() {
      let commentsData = await getComments({
        token: token,
        post_id: params.post_id,
      });
      setComments(commentsData || []);
    }
    initializeComments();
  }, [params.post_id, token]);

  //   if (comments === null) {
  //     return "loading";
  //   }

  return (
    <div>
        <CommentListBody comments={comments} />
    </div>
  );
};

export default CommentList;
