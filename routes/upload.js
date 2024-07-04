const express = require("express");
const router = express.Router();

const {
  imageUpload,
  videoUpload,
  imageSizeReducer,
  localFileUpload,
} = require("../controllers/fileUpload");

router.post("/imageSizeReducer", imageSizeReducer);
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);

module.exports = router;
