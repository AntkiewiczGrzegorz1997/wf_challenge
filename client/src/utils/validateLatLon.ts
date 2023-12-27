export const isValidCoordinate = (type: string, value: string): boolean => {
  if (!isValidNumber(value)) {
    return false;
  }
  const num = parseFloat(value);
  if (type === 'lat') {
    return num >= -90 && num <= 90;
  }
  if (type === 'long') {
    return num >= -180 && num <= 180;
  }
  return false;
};

const isValidNumber = (value: string): boolean => {
  const regex = /^-?\d+(\.\d+)?$/;
  return regex.test(value);
};
