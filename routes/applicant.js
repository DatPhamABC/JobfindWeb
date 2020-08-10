const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("applicants/index");
});

module.exports = router;
