import imageSize from "image-size";
import yargs from "yargs";
const argv = yargs(process.argv).argv;
const { url, tag, filePath } = argv;

// Get image dimensions
const { width: imageWidth, height: imageHeight } = imageSize(filePath);

console.log("Saabbir:", "filePath", filePath);
console.log("Saabbir:", "imageWidth", Number(imageWidth));
console.log("Saabbir:", "imageHeight", Number(imageHeight));

describe("Visual test", () => {
  it("should match homepage", async () => {
    await browser.url(url);

    await browser.setViewport({
      width: Number(imageWidth),
      height: Number(imageHeight),
      devicePixelRatio: 1,
    });

    // await browser.pause(5000);

    await browser.checkScreen(tag, {}); // Checks viewport only

    // await browser.checkFullPageScreen(tag, {});
  });
});
