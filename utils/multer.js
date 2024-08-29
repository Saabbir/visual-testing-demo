import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(
      process.cwd(),
      "public/comparisons/baseline-uploads"
    );
    console.log("Saabbir:", "uploadPath", uploadPath);

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname.replace(/[\s]+/g, "_"), ext);

    file.nameWithExt = name + ext;
    file.nameWithoutExt = name;

    cb(null, file.nameWithExt);
  },
});

export default multer({ storage });
