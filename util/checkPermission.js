const checkPermission = (user, item) => {
  //check permission for admin
  if (user.role === "superadmin") return true;
  //check user id
  if (user.userId === item.user.toString()) return true;
};

module.exports = checkPermission;
