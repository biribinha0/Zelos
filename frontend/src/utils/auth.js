import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getDecodedToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Token inválido: ", err);
    return null;
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
