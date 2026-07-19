// conversions.js
// Length conversions — all values normalized to meters as the base unit

export const lengthUnits = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.34,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
}

export function convertLength(value, fromUnit, toUnit) {
  const meters = value * lengthUnits[fromUnit]
  const result = meters / lengthUnits[toUnit]
  return result
}