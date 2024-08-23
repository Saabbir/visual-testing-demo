import chalk from "chalk";
import yargs from "yargs";
const argv = yargs(process.argv).argv;

describe("Visual test", () => {
  it("should match homepage", async () => {
    console.log(chalk.bgRed("Saabbir:", "argv.tag", argv.tag));
    await browser.url(argv.url);
    await browser.checkScreen(argv.tag, {});
  });
});
