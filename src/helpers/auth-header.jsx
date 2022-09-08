export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
