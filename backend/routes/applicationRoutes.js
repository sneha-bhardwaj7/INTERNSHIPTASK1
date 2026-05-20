const express = require("express");

const {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication
} = require("../controllers/applicationController.js");

const router = express.Router();

router.route("/").get(getApplications).post(createApplication);
router.route("/:id").get(getApplicationById).patch(updateApplication).delete(deleteApplication);

module.exports = router;
