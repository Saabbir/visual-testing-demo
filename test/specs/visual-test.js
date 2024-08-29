import yargs from "yargs";
const argv = yargs(process.argv).argv;

describe("Visual test", () => {
  it("should match homepage", async () => {
    await browser.url(argv.url);

    await browser.setWindowPosition(0, 0);
    // await browser.execute(() => {
    //   window.scrollTo(0, 0);
    // });

    // await browser.checkScreen(argv.tag, {}); // Checks viewport only
    await browser.checkFullPageScreen(argv.tag, {});
  });
});
