import { isValidCoordinate } from '../utils/validateLatLon';

describe('isValidCoordinate', () => {
  // Testing valid latitudes
  it.each([
    ['-90', true],
    ['0', true],
    ['90', true],
    ['45', true],
    ['-45', true],
  ])('should return true for valid latitudes', (value, expected) => {
    expect(isValidCoordinate('lat', value)).toBe(expected);
  });

  // Testing invalid latitudes
  it.each([
    ['-91', false],
    ['91', false],
    ['100', false],
    ['-100', false],
    ['abc', false],
  ])('should return false for invalid latitudes', (value, expected) => {
    expect(isValidCoordinate('lat', value)).toBe(expected);
  });

  // Testing valid longitudes
  it.each([
    ['-180', true],
    ['0', true],
    ['180', true],
    ['90', true],
    ['-90', true],
  ])('should return true for valid longitudes', (value, expected) => {
    expect(isValidCoordinate('long', value)).toBe(expected);
  });

  // Testing invalid longitudes
  it.each([
    ['-181', false],
    ['181', false],
    ['200', false],
    ['-200', false],
    ['xyz', false],
  ])('should return false for invalid longitudes', (value, expected) => {
    expect(isValidCoordinate('long', value)).toBe(expected);
  });

  // Testing non-numeric values
  it.each([
    ['abc', false],
    ['123abc', false],
    ['!@#', false],
    ['100.', false],
  ])('should return false for non-numeric values', (value, expected) => {
    expect(isValidCoordinate('lat', value)).toBe(expected);
    expect(isValidCoordinate('long', value)).toBe(expected);
  });
});
