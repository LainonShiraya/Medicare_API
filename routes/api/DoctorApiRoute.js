const express = require("express");
const router = express.Router();
const docApiController = require("../../api/DoctorAPI");

router.get("/", docApiController.getDoctor);

module.exports = router;
