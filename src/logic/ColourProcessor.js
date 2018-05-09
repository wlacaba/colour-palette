/*
MEDIAN CUT ALGORITHM
- Find which dimension (R,G, or B) has largest range, pick that one
- Sort by that dimension, get the median of that dimension
- Half of pixels are lower, half of pixels are higher
- Repeat recursively on these new buckets
- When recursion hits base case, average the pixels in each bucket, that's your colour
*/
function medianCut(colours, levels, currentLevel, palette) {
  let initialArray = findLargestRange(colours);

  if (currentLevel !== levels) {
    //recurse
    let middleIndex = Math.round(initialArray.length/2);
    let smaller = initialArray.slice(0, middleIndex);
    let larger = initialArray.slice(middleIndex, initialArray.length);
    medianCut(smaller, levels, currentLevel + 1, palette);
    medianCut(larger, levels, currentLevel + 1, palette);
  }
  else {
    //take average colour, add it to palette
    let newColour = calculateAverageColour(initialArray);
    palette.push(convertToHex(newColour[0], newColour[1], newColour[2]));
  }
}

function convertToHex(red, green, blue) {
  return "#" + rgbToHex(red) + rgbToHex(green) + rgbToHex(blue);
}

function rgbToHex(colour) {
  let hex = colour.toString(16);

  if (hex.length === 1) {
    return "0" + hex;
  }
  else {
    return hex;
  }
}

function calculateAverageColour(colours) {
  let red = 0;
  let green = 0;
  let blue = 0;

  for (let i = 0; i < colours.length; i++) {
    red += colours[i][0];
    green += colours[i][1];
    blue += colours[i][2];
  }

  red = Math.round(red/colours.length);
  green = Math.round(green/colours.length);
  blue = Math.round(blue/colours.length);

  return ([red, green, blue]);
}

/*
Take a multidimensional array of rgb values (in the form [[r,g,b],[r,g,b]], find
the colour component with the largest range, and sort array by that colour.*/
function findLargestRange(colours) {
  let minRed = 255;
  let minGreen = 255;
  let minBlue = 255;
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;

  for (let i = 0; i < colours.length; i++) {
    if (colours[i][0] < minRed) {
      minRed = colours[i][0];
    }

    if (colours[i][0] > maxRed) {
      maxRed = colours[i][0];
    }

    if (colours[i][1] < minGreen) {
      minGreen = colours[i][1];
    }

    if (colours[i][1] > maxGreen) {
      maxGreen = colours[i][1];
    }

    if (colours[i][2] < minBlue) {
      minBlue = colours[i][2];
    }

    if (colours[i][2] > maxBlue) {
      maxBlue = colours[i][2];
    }
  }

  let ranges = [maxRed - minRed, maxGreen - minGreen, maxBlue - minBlue];
  let maxRange = ranges[0];
  let indexOfMax = 0;

  for (let j = 0; j < ranges.length; j++) {
    if (ranges[j] > maxRange) {
      maxRange = ranges[j];
      indexOfMax = j;
    }
  }

  let newArray = sortByColumn(colours, indexOfMax);

  return newArray;
}

function sortByColumn(array, index) {
  let newArray = array.sort(function(a, b) {
    /*
    NTS: 
    a-b tends to give darker to lighter colours while
    b-a tends to give lighter to darker colours. Doesn't really
    matter, more of a preference.
    */
    return b[index] - a[index];
  });

  return newArray;
}

export {medianCut, convertToHex, rgbToHex, calculateAverageColour, findLargestRange}