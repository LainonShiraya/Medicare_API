const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.get("/", patientController.showPatientList);
router.get("/patient/?:patientId", patientController.showPatientDetail);
router.post("/patient/?:patientId", patientController.showPatientDetail);
router.get("/patient/?:patientId/delete", patientController.DeletePatient);
router.get("/add", patientController.showEditPatientForm);
router.post("/add", patientController.AddPatientForm);
router.get("/edit/?:patientId", patientController.showUpdatePatient);
router.post("/edit/?:patientId", patientController.UpdatePatient);

module.exports = router;
