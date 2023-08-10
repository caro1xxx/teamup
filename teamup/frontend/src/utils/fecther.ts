//@ts-ignore
import isOnline from "is-online";

export const fecther = async (path: string, params: any, method: string) => {
  let online = await isOnline();
  if (!online) {
    return "网络错误";
  }
  if (method === "get") {
    return fetch("/api/v1/teamup/" + path)
      .then((res) => res.json())
      .then((data) => data);
  } else {
    return fetch("/api/v1/teamup/" + path, {
      method: method,
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data);
  }
};
