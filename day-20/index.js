import { txtFileLinesToArray } from '../shared.js';

const DOT = '.';

const getEnhancedImgLitPixelCountFromInput = (input, enhanceCount) => {
  const padImg = (img, paddingPixel) => {
    // only need 1 row padding of '.' pixels around img
    // any pixels outside this will all be '.' after 1 enhancement
    const paddingRow = Array(img[0].length + 2)
      .fill(paddingPixel)
      .join('');
    const paddedImg = [
      paddingRow,
      ...img.map(row => paddingPixel + row + paddingPixel),
      paddingRow,
    ];
    return paddedImg;
  };

  const convertSurroundingPixelsStringToDecimal = str =>
    parseInt(str.replace(/\./g, 0).replace(/#/g, 1), 2);

  const convertImgPixelToDecimal = (pixelX, pixelY, img, paddingPixel) => {
    let x, y;
    let surroundingPixelsString = '';
    for (y = pixelY - 1; y <= pixelY + 1; y++) {
      for (x = pixelX - 1; x <= pixelX + 1; x++) {
        if (x < 0 || y < 0 || x >= img.length || y >= img.length) {
          surroundingPixelsString += paddingPixel;
        } else {
          surroundingPixelsString += img[y][x];
        }
      }
    }
    const pixelDecimal = convertSurroundingPixelsStringToDecimal(
      surroundingPixelsString
    );
    return pixelDecimal;
  };

  const applyEnhancement = (img, algorithm, paddingPixel) => {
    const paddedImg = padImg(img, paddingPixel);
    const outputImg = [];

    paddedImg.forEach((row, y) => {
      let transformedRow = '';
      for (let x = 0; x < row.length; x++) {
        const pixelDecimal = convertImgPixelToDecimal(
          x,
          y,
          paddedImg,
          paddingPixel
        );
        transformedRow += algorithm[pixelDecimal];
      }
      outputImg.push(transformedRow);
    });

    return outputImg;
  };

  const applyEnhancementToPaddingPixel = (paddingPixel, algorithm) => {
    const surroundingPixelsString = Array(9).fill(paddingPixel).join('');
    const pixelDecimal = convertSurroundingPixelsStringToDecimal(
      surroundingPixelsString
    );
    const newPaddingPixel = algorithm[pixelDecimal];
    return newPaddingPixel;
  };

  const countLitPixelsInImg = img =>
    img.reduce((acc, curr) => acc + curr.replace(/\./g, '').length, 0);

  const imgAlgorithm = input[0];
  let inputImg = input.slice(2, -1);
  let paddingPixel = DOT;
  let outputImg;

  for (let i = 0; i < enhanceCount; i++) {
    outputImg = applyEnhancement(inputImg, imgAlgorithm, paddingPixel);
    paddingPixel = applyEnhancementToPaddingPixel(paddingPixel, imgAlgorithm);
    inputImg = outputImg;
  }

  const litPixelCount = countLitPixelsInImg(outputImg);

  return litPixelCount;
};

const day20 = input => getEnhancedImgLitPixelCountFromInput(input, 2);
const day20Part2 = input => getEnhancedImgLitPixelCountFromInput(input, 50);

const run = () => {
  const data = txtFileLinesToArray('./day-20/data/challenge.txt');

  // Part 1
  const part1Result = day20(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day20Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day20, day20Part2 };
