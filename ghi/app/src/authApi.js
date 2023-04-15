import { useEffect, useState } from "react";
let internalToken = null;

export function getToken() {
  return internalToken;
}

function handleErrorMessage(error) {
  if ("error" in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ("__all__" in error) {
        error = error.__all__;
      }
    } catch {}
  }
  if (Array.isArray(error)) {
    error = error.join("<br>");
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ""
    );
  }
  return error;
}

async function getTokenInternal() {
  const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.token;
      return internalToken;
    }
  } catch (e) {}
  return false;
}

export function useToken() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      console.log(token, "auth_api");
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [token]);

  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
      await fetch(url, { method: "delete", credentials: "include" });
      internalToken = null;
      setToken(null);
    }
  }

  async function login(username, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      return;
    }
    let error = await response.json();
    return handleErrorMessage(error);
  }

  async function signup(username, firstname, lastname, email, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/users`;
    const response = await fetch(url, {
      credentials: "include",
      method: "post",
      body: JSON.stringify({ username, firstname, lastname, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return await login(username, password);
    }
    let error = await response.json();
    return handleErrorMessage(error);
  }

  return [token, login, logout, signup];
}
