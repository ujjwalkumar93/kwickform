const express = require("express");
const router = express.Router();
const { createPage } = require("../controllers/pageController");
const validatePage = require("../middleware/validatePage");

router.post("/createPage", validatePage, createPage);

module.exports = router;
