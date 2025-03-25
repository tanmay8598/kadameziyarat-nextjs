import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://54.227.11.59:5000/api",
  // baseURL: "http://localhost:5000/api",
  headers: { Accept: "application/vnd.github.v3+json" },
});

if (typeof window !== "undefined") {
  apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    // const authToken = await authStorage.getToken();

    if (!authToken) return;
    request.headers["x-auth-token"] = authToken;
  });
}

export default apiClient;
