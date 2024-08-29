import yargs from "yargs";
const argv = yargs(process.argv).argv;

describe("Visual test", () => {
  it("should match homepage", async () => {
    await browser.url(argv.url);

    await browser.waitUntil(
      () => browser.execute(() => document.readyState === "complete"),
      {
        timeout: 10000, // 10 seconds timeout
        timeoutMsg: "Page did not load in time",
      }
    );

    await browser.execute(() => {
      window.scrollTo(0, 0);
    });

    // await browser.checkScreen(argv.tag, {}); // Checks viewport only
    await browser.checkFullPageScreen(argv.tag, {});
  });
});
