export const fetcher = async (slug: string, data = undefined) => {
  return fetch(`${window.location.origin}/api/${slug}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status < 200 || res.status > 399) throw new Error();
    return res;
  });
};
