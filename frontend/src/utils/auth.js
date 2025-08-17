import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getDecodedToken() {
  if (typeof window !== "undefined") {

    const token = getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error("Token inválido: ", err);
      return null;
    }
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000; // Verifica se não expirou
  } catch {
    return false;
  }
}
