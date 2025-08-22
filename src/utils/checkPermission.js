export default function (endpointName) {
  const userData = JSON.parse(localStorage.getItem('user_data'));

  if (!userData || !userData.data || !Array.isArray(userData.data.roles)) {
    return false;
  }

  const roles = userData.data.roles;
  return roles.some(role => role?.endpoint?.includes(endpointName));
}
