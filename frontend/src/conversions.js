// conversions.js
// All values normalized to a base unit per category, then converted.

export const categories = {
  length: {
    units: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254,
      nauticalMile: 1852,
    },
  },
  mass: {
    units: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      tonne: 1000,
      pound: 0.453592,
      ounce: 0.0283495,
      stone: 6.35029,
    },
  },
  area: {
    units: {
      squareMeter: 1,
      squareKilometer: 1000000,
      squareCentimeter: 0.0001,
      squareMile: 2589988.11,
      squareYard: 0.836127,
      squareFoot: 0.092903,
      acre: 4046.86,
      hectare: 10000,
    },
  },
  volume: {
    units: {
      liter: 1,
      milliliter: 0.001,
      cubicMeter: 1000,
      gallonUS: 3.78541,
      quartUS: 0.946353,
      pintUS: 0.473176,
      cupUS: 0.24,
      fluidOunceUS: 0.0295735,
      tablespoon: 0.0147868,
      teaspoon: 0.00492892,
    },
  },
  speed: {
    units: {
      meterPerSecond: 1,
      kilometerPerHour: 0.277778,
      milePerHour: 0.44704,
      knot: 0.514444,
      foot_per_second: 0.3048,
    },
  },
  time: {
    units: {
      second: 1,
      millisecond: 0.001,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2629746,
      year: 31556952,
    },
  },
  pressure: {
    units: {
      pascal: 1,
      kilopascal: 1000,
      bar: 100000,
      psi: 6894.76,
      atm: 101325,
      torr: 133.322,
    },
  },
  energy: {
    units: {
      joule: 1,
      kilojoule: 1000,
      calorie: 4.184,
      kilocalorie: 4184,
      wattHour: 3600,
      kilowattHour: 3600000,
      electronVolt: 1.60218e-19,
    },
  },
  power: {
    units: {
      watt: 1,
      kilowatt: 1000,
      megawatt: 1000000,
      horsepower: 745.7,
      btuPerHour: 0.293071,
    },
  },
  digitalStorage: {
    units: {
      byte: 1,
      kilobyte: 1024,
      megabyte: 1048576,
      gigabyte: 1073741824,
      terabyte: 1099511627776,
      bit: 0.125,
    },
  },
  force: {
    units: {
      newton: 1,
      dyne: 0.00001,
      poundForce: 4.44822,
      kilogramForce: 9.80665,
    },
  },
  torque: {
    units: {
      newtonMeter: 1,
      poundFoot: 1.35582,
      poundInch: 0.112985,
      kilogramForceMeter: 9.80665,
    },
  },
  angle: {
    units: {
      radian: 1,
      degree: 0.0174533,
      gradian: 0.015708,
      arcminute: 0.000290888,
      arcsecond: 0.00000484814,
    },
  },
  density: {
    units: {
      kilogramPerCubicMeter: 1,
      gramPerCubicCentimeter: 1000,
      poundPerCubicFoot: 16.0185,
      poundPerCubicInch: 27679.9,
    },
  },
  fuelEconomy: {
    units: {
      kilometerPerLiter: 1,
      milesPerGallonUS: 0.425144,
      milesPerGallonUK: 0.354006,
      milesPerLiter: 1.60934,
    },
  },
  cooking: {
    units: {
      milliliter: 1,
      teaspoon: 4.92892,
      tablespoon: 14.7868,
      cup: 240,
      fluidOunce: 29.5735,
      pint: 473.176,
      quart: 946.353,
      gallon: 3785.41,
      stickOfButter: 113.4,
    },
  },
}

// Generic converter for all linear (multiplier-based) categories above
export function convert(value, fromUnit, toUnit, categoryName) {
  const units = categories[categoryName].units
  const base = value * units[fromUnit]
  return base / units[toUnit]
}

// Temperature is NOT a simple multiplier (has offsets), handled separately
export function convertTemperature(value, fromUnit, toUnit) {
  let celsius
  if (fromUnit === 'celsius') celsius = value
  else if (fromUnit === 'fahrenheit') celsius = (value - 32) * (5 / 9)
  else if (fromUnit === 'kelvin') celsius = value - 273.15

  if (toUnit === 'celsius') return celsius
  if (toUnit === 'fahrenheit') return celsius * (9 / 5) + 32
  if (toUnit === 'kelvin') return celsius + 273.15
}

export const temperatureUnits = ['celsius', 'fahrenheit', 'kelvin']