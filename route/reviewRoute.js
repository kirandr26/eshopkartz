const express = require("express");
const route = express.Router();
const reviewCtrl = require("../controller/reviewCtrl");
const { authenticateUser } = require("../middleware/authentication");

route.post("/", authenticateUser, reviewCtrl.createReview);

route.get("/", reviewCtrl.getAllReview);

route.get("/:id", reviewCtrl.getReview);

route.patch("/:id"), authenticateUser, reviewCtrl.updateReview;

route.delete("/:id"), authenticateUser, reviewCtrl.deleteReview;

module.exports = route;
