const express = require("express");
const router = express.Router();
// const { onSaveController } = require("../controllers/events/onSaveController");
const {onSaveController} = require("../controllers/events/onSaveController");


router.post("/save", onSaveController);

module.exports = router;