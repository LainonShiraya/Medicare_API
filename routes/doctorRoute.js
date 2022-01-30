const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");
router.get("/", doctorController.showDoctorList);
router.get("/add", doctorController.showAddDoctorForm);
router.get("/editDoctor", doctorController.showDoctorDetails);

module.exports = router;
