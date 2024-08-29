import express from "express";
import imageSize from "image-size";
import path from "path";
import multer from "../utils/multer.js";
import runWdioTest from "../utils/run-wdio-test.js";

const router = express.Router();

router.post("/", multer.single("image"), (req, res) => {
  const url = req.body.url;
  const { nameWithExt, nameWithoutExt, path: filePath } = req.file;
  const wdConfigPath = path.join(process.cwd(), "wdio.conf.js");

  // Get image dimensions
  const { width, height } = imageSize(filePath);

  runWdioTest({
    url,
    nameWithExt,
    nameWithoutExt,
    wdConfigPath,
    req,
    res,
    width,
    height,
  });
});

export default router;
