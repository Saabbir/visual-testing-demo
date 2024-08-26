import yargs from "yargs";
const argv = yargs(process.argv).argv;

describe("Visual test", () => {
  it("should match homepage", async () => {
    await browser.url(argv.url);
    await browser.checkScreen(argv.tag, {});
  });
});
