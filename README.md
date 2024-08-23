# Visual Testing Demo

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)

## About <a name = "about"></a>

This is a visual testing automation project using webdriver io and it's visual service package.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

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
# install all packages required
npm i

# run test
npx wdio run ./wdio.conf.js --spec visual-test.js

# if you ran the 👆 above command for the first time,
# it will create the baseline image
# Run the above command again to see the comparisons
```
