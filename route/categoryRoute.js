const express = require("express");
const route = express.Router();
const categoryCtrl = require("../controller/categoryCtrl");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");

route.get(
  "/",
  [authenticateUser, authorizeRoles("superadmin")],
  categoryCtrl.getAll
);
route.get(
  "/:id",
  [authenticateUser, authorizeRoles("superadmin")],
  categoryCtrl.getSingle
);
route.post(
  "/create",
  [authenticateUser, authorizeRoles("superadmin")],
  categoryCtrl.create
);
route.put(
  "/update/:id",
  [authenticateUser, authorizeRoles("superadmin")],
  categoryCtrl.update
);
route.delete(
  "/delete/:id",
  [authenticateUser, authorizeRoles("superadmin")],
  categoryCtrl.delete
);

module.exports = route;
