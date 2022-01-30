const express = require("express");
const router = express.Router();
const patientApiController = require("../../api/PatientAPI");

router.get("/:lekarzId", patientApiController.getPatients);
module.exports = router;
