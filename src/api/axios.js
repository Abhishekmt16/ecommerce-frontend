import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ✅ REQUEST INTERCEPTOR (attach token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

// ✅ RESPONSE INTERCEPTOR (handle 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔐 If no response (network error)
    if (!error.response) {
      return Promise.reject(error);
    }

    // 🔁 Handle 401
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/refresh`,
          { refreshToken }
        );

        const newAccessToken = res.data.data.accessToken;

        // ✅ save new token
        localStorage.setItem("accessToken", newAccessToken);

        // ✅ update header
        originalRequest.headers.Authorization =
          "Bearer " + newAccessToken;

        // ✅ retry request
        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(refreshError); // ✅ IMPORTANT
      }
    }

    return Promise.reject(error);
  }
);
export default api;