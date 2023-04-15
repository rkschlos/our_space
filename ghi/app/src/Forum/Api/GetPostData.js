export async function getPost(props) {
  const token = props.token;
  try {
    const postResponse = await fetch(
      `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/${props.post_id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await postResponse.json();
  } catch (error) {
    return [];
  }
}
