// import isOnline from "is-online";
import { getStorage } from "./localStorage";

export const fether = async (path, params, method) => {
  // let online = await isOnline();
  // if (!online) return "网络错误";
  let headers = {
    Authorization: `Bearer ${
      getStorage("accessToken") ? getStorage("accessToken") : ""
    }`,
    "Content-Type": "application/json",
  };
  if (method === "get") {
    return fetch("/api/v1/teamup/" + path, { method: method, headers: headers })
      .then((res) => res.json())
      .then((data) => data);
  } else {
    return fetch("/api/v1/teamup/" + path, {
      method: method,
      body: JSON.stringify(params),
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => data);
  }
};
