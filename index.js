import spawn from "cross-spawn";
import express from "express";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path from "path";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "./public/comparisons/baseline-uploads";

    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }

    cb(null, path);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname.replace(/[\s]+/g, "_"), ext);
    file.nameWithExt = name + ext;
    file.nameWithoutExt = name;

    cb(null, file.nameWithExt);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const url = req.body.url;
  const nameWithExt = req.file.nameWithExt;
  const nameWithoutExt = req.file.nameWithoutExt;

  // Get the path to the wdio.conf.js file
  const wdConfigPath = path.join(process.cwd(), "wdio.conf.js");

  // Spawn a child process to run the WebDriverIO test using npx
  const child = spawn(
    "npx",
    ["wdio", wdConfigPath, "--url", url, "--tag", nameWithoutExt],
    {
      stdio: "inherit", // Inherit stdio so you can see the output in the console
    }
  );

  // Handle child process errors
  child.on("error", (err) => {
    console.error("Child process error:", err);
    res.status(500).send("Error processing upload.");
  });

  // When the child process exits, send the response to the client
  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
    if (code === 0) {
      return res.status(200).render("diff", {
        nameWithExt,
      });
    } else {
      res.status(500).send("There was an error processing your upload.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
