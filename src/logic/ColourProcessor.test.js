import * as colour from './ColourProcessor';

test("Hex colour component is 14", () => {
  let result = colour.rgbToHex(20);
  expect(result).toEqual("14");
});

test("Hex code is #141414", () => {
  let result = colour.convertToHex(20, 20, 20);
  expect(result).toEqual("#141414");
});

test("Average colour should be (47,67,87)", () => {
  let colourArray = [
    [30, 50, 70],
    [90, 110, 130],
    [20, 40, 60]
  ];
  let expected = [47, 67, 87];
  let result = colour.calculateAverageColour(colourArray);
  
  for (let i = 0; i < expected.length; i++) {
    expect(result[i]).toEqual(expected[i]);
  }
});

test("Array should be flipped exactly", () => {
  let colourArray = [
    [10, 10, 10],
    [20, 20, 20],
    [30, 30, 40]
  ];
  let expected = [
    [30, 30, 40],
    [20, 20, 20],
    [10, 10, 10]
  ]
  let result = colour.findLargestRange(colourArray);
  
  for (let i = 0; i < expected.length; i++) {
    for (let j = 0; j < expected[i].length; j++) {
      expect(result[i][j]).toEqual(expected[i][j]);
    }
  }
});

test("Average colours", () => {
  let colourArray = [
    [20, 40, 230],
    [95, 12, 12],
    [60, 200, 200],
    [150, 20, 207]
  ];
  let expected = ["#551edb", "#4e6a6a"];
  let result = [];

  colour.medianCut(colourArray, 1, 0, result);

  for (let i = 0; i < expected.length; i++) {
    expect(expected[i]).toEqual(result[i]);
  }
});