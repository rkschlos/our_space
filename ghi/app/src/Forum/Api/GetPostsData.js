// import React from "react";

export async function getPosts(props) {
  const token = props.token;
  try {
    const postsResponse = await fetch(
      `${process.env.REACT_APP_OURSPACE_HOST}/api/posts/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await postsResponse.json();
  } catch (error) {
    return [];
  }
}

// function getPosts(props) {
//   const token = props.token;

//   useEffect(() => {
//     const getPostsData = async () => {
//       const postsResponse = await fetch("http://localhost:8090/api/posts/", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//       const postsData = await postsResponse.json();
//       setPosts(postsData);
//     };
//     getPostsData();
//   }, []);
// }
