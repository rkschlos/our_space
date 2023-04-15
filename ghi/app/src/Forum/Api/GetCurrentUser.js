export async function getCurrentUser(props) {
  const token = props.token;
  try {
    const userResponse = await fetch(
      `${process.env.REACT_APP_OURSPACE_HOST}/users/me`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await userResponse.json();
  } catch (error) {
    return [];
  }
}
