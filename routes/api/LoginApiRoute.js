const express = require("express");
const router = express.Router();
const loginApiController = require("../../api/LoginAPI");

router.get("/:lekarzId?:haslo", loginApiController.getLogin);

module.exports = router;
