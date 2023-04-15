export async function getComments(props) {
  const token = props.token;
  // console.log("token from Get Comments", token);

  try {
    const commentsResponse = await fetch(
      `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/${props.post_id}/comment/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await commentsResponse.json();
  } catch (error) {
    return [];
  }
}
