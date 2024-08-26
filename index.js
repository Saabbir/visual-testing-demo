import spawn from "cross-spawn";
import express from "express";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path from "path";
import yargs from "yargs";
const argv = yargs(process.argv).argv;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

  // Respond immediately to the client
  // res.status(202).send("Upload received, processing in the background...");

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
      // res.status(200).send("Upload processed successfully.");

      return res.status(200).send(/*html*/ `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Side by Side Images</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <!-- <header>
            <div class="l-wrap">
              <h1>Visual Testing Demo</h1>
            </div>
          </header> -->
          <main>
            <div class="c-side-by-side-images">
              <div class="c-img-wrapper c-img-wrapper--before">
                <div class="c-img-wrapper__label">Design</div>
                <img src="/comparisons/baseline-uploads/${nameWithExt}" alt="Baseline Image">
              </div>
              <div class="c-img-wrapper c-img-wrapper--after">
                <div class="c-img-wrapper__label">Mismatch</div>
                <img src="/comparisons/differences/diff/${nameWithExt}" alt="Difference Image">
              </div>
            </div>
          </main>
          <!-- <footer>
            <div class="l-wrap">
              <p>&copy; Echologyx Inc; All rights reserved.</p>
            </div>
          </footer> -->
        </body>
        </html>
        `);
    } else {
      res.status(500).send("There was an error processing your upload.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
