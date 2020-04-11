// Arithmetic mean
const getMean = (data) => data.reduce((a, b) => Number(a) + Number(b)) / data.length;

// Standard deviation
let getSD = (data) => {
  const m = getMean(data);
  return Math.sqrt(data.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / (data.length - 1));
};

const filterOutliers = (someArray) => {
  // Copy the values, rather than operating on references to existing values
  const values = someArray.concat();

  // Then sort
  values.sort((a, b) => a - b);

  /* Then find a generous IQR. This is generous because if (values.length / 4)
   * is not an int, then really you should average the two elements on either
   * side to find q1.
   */
  const q1 = values[Math.floor((values.length / 4))];
  // Likewise for q3.
  const q3 = values[Math.ceil((values.length * (3 / 4)))];
  const iqr = q3 - q1;

  // Then find min and max values
  const maxValue = q3 + iqr * 1.5;
  const minValue = q1 - iqr * 1.5;

  // Then filter anything beyond or beneath these values.
  return values.filter((x) => (x <= maxValue) && (x >= minValue));
};

module.exports = { filterOutliers, getMean, getSD };