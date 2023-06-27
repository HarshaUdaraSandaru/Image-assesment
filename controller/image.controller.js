const { writeFile } = require("fs");
const { join } = require("path");
const request = require("request");
const blend = require("@mapbox/blend");
const {
  firstImageRequest,
  secondImageRequest,
  imageWidth,
  imageHeight,
} = require("../constant");

const downloadImage = (req) => {
  return new Promise((resolve, reject) => {
    request.get(req, (error, response, body) => {
      if (error) return reject(error);
      if (response?.statusCode != 200) {
       return reject("Invalid status code <" + response?.statusCode + ">");
      }
      resolve(body);
    });
  });
};

const blendImage = (firstImage, secondImage) => {
  return new Promise((resolve, reject) => {
    blend(
      [
        {
          buffer: new Buffer.from(firstImage, "binary"),
          x: 0,
          y: 0,
        },
        {
          buffer: new Buffer.from(secondImage, "binary"),
          x: imageWidth,
          y: 0,
        },
      ],
      {
        width: imageWidth * 2,
        height: imageHeight,
        format: "jpeg",
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
};

const saveBlendImage = (blendedImage) => {
  const fileSavePath = join(process.cwd(), `./asset/cat-card.jpg`);
  return new Promise((resolve, reject) => {
    writeFile(fileSavePath, blendedImage, "binary", (err) => {
      if (err) {
        return reject(err);
      }
      console.log("The file was saved!");
      resolve();
    });
  });
};

const getImagesAndBind = async () => {
  try {
    const [firstImage, secondImage] = await Promise.all([
      downloadImage(firstImageRequest),
      downloadImage(secondImageRequest),
    ]);
    const blendedImage = await blendImage(firstImage, secondImage);
    await saveBlendImage(blendedImage);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getImagesAndBind,
};
