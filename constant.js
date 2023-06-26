const argv = require("minimist")(process.argv.slice(2));
const {
  greeting = "Hi Gapstar",
  who = "I'm Udara",
  imageWidth = 400,
  imageHeight = 500,
  firstImageTextColor = "Pink",
  secondImageTextColor = "Blue",
  firstTextSize = 80,
  secondTextSize = 50,
  tge = "cute",
} = argv;

const firstImageRequest = {
  // https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
  url: `https://cataas.com/cat/says/${greeting}?width=${imageWidth}&height=${imageHeight}&color=${firstImageTextColor}&s=${firstTextSize}`,
  encoding: "binary",
};
const secondImageRequest = {
  url: `https://cataas.com/cat/${tge}/says/${who}?width=${imageWidth}&height=${imageHeight}&color=${secondImageTextColor}&s=${secondTextSize}`,
  encoding: "binary",
};

module.exports = {
  firstImageRequest,
  secondImageRequest,
  imageWidth,
  imageHeight,
};
