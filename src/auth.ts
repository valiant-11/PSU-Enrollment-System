export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

export const requireRole = (role: string) => {
  const user = getCurrentUser();
  if (!user || user.role !== role) {
    return false;
  }
  return true;
};
