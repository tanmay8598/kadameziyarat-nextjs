import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://backend.kadameziyarat.com/api",
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
