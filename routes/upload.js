import express from "express";
import path from "path";
import multer from "../utils/multer.js";
import runWdioTest from "../utils/run-wdio-test.js";

const router = express.Router();

router.post("/", multer.single("image"), (req, res) => {
  const url = req.body.url;
  const { nameWithExt, nameWithoutExt, path: filePath } = req.file;
  const wdConfigPath = path.join(process.cwd(), "wdio.conf.js");

  runWdioTest({
    url,
    nameWithExt,
    nameWithoutExt,
    wdConfigPath,
    req,
    res,
    filePath,
  });
});

export default router;
