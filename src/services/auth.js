const location = window.location;
export function getBearerToken() {
  return localStorage.getItem("Stoken");
}
export function logOut() {
  localStorage.removeItem("Stoken");
  location.href = "/login";
}
