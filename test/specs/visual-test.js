import chalk from "chalk";
import fs from "fs";
import path from "path";

describe("Visual test", () => {
  it("should match homepage", async () => {
    await browser.url("https://saabbir.github.io");

    const baselinePath = path.join(process.cwd(), "comparisons", "baseline");
    console.log(
      chalk.bgRed("is baseline exists:", fs.existsSync(baselinePath))
    );

    if (fs.existsSync(baselinePath)) {
      const element = await $(".c-intro__content > h1");

      // Ensure the element is visible and enabled before interacting
      await element.waitForDisplayed();
      await element.waitForEnabled();

      // Modify innerText using execute
      await browser.execute((el) => {
        el.innerText = "It's Tanjil Hasan";
      }, element);

      await browser.pause(3000); // Observe the change before closing the browser
    }

    await browser.checkFullPageScreen("Homepage", {});
  });
});
