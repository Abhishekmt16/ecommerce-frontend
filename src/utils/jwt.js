export function getUserRole() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  try {
    const base64Payload = token.split(".")[1];
    const decodedPayload = atob(base64Payload);
    const payload = JSON.parse(decodedPayload);

    return payload.role || null;

  } catch (error) {   // 👈 changed err → error (safer)
    console.error("JWT decode error:", error);
    return null;
  }
}