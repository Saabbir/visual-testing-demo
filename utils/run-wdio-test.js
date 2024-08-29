import spawn from "cross-spawn";

function runWdioTest({
  url,
  nameWithExt,
  nameWithoutExt,
  wdConfigPath,
  req,
  res,
}) {
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
}

export default runWdioTest;
