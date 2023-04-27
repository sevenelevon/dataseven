import Cookies from "js-cookie";

export function SetToken(data) {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.data.user.id);
  Cookies.set("username", data.data.user.username);
  Cookies.set("hashPass", data.data.user.hashPass);

}

export function unsetToken() {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("hashPass");

//   Router.reload();
}

export function getIdFromLocalCookie() {
  return Cookies.get("id");
}

export function getUserFromLocalCookie() {
  return Cookies.get("username");
}

export function getTokenFromLocalCookie() {
  return Cookies.get("hashPass");
}

export function getTokenFromServerCookie(req) {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie;
}
