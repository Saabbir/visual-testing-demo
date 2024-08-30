# Visual Testing Demo

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Notes](#notes)

## About <a name = "about"></a>

This is a visual testing automation project using webdriver io and it's visual service package.

## Getting Started <a name = "getting_started"></a>

### Prerequisites

You’ll need [Node.js](https://nodejs.org/en) installed.

- Install at least v16.x or higher as this is the oldest active LTS version
- Only releases that are or will become an LTS release are officially supported

If Node is not currently installed on your system, we suggest utilizing a tool such as NVM or Volta to assist in managing multiple active Node.js versions. NVM is a popular choice, while Volta is also a good alternative.

```sh
node -v # version should be 16 or higher
```

### Install and Run

```sh
# clone the repo
git clone https://github.com/Saabbir/visual-testing-demo.git

# cd into visual-testing-demo
cd visual-testing-demo

# install all packages required
npm i

# run single test
npx wdio run ./wdio.conf.js --spec visual-test.js

# run all tests
npm run dev
```

# Notes

- headless feature doesn't work with `browser.setViewport` properly
- `checkScreen` method works well while `checkFullPageScreen` doesn't
- some color differences are shown event if the images are identical
