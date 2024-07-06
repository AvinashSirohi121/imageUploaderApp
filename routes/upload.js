const express = require("express");
const router = express.Router();

const {
  imageUpload,
  videoUpload,
  sizeReducer,
  localFileUpload,
} = require("../controllers/fileUpload");

router.post("/sizeReducer", sizeReducer);
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);

module.exports = router;
