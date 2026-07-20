// nlpParser.js
// Lightweight pattern-matching parser for natural language conversion queries.
// No AI/API needed — matches common phrasing like "10 km to miles" or "100 psi in bar".

import { categories } from './conversions'

const aliases = {
  km: { category: 'length', unit: 'kilometer' },
  kilometers: { category: 'length', unit: 'kilometer' },
  m: { category: 'length', unit: 'meter' },
  meters: { category: 'length', unit: 'meter' },
  cm: { category: 'length', unit: 'centimeter' },
  centimeters: { category: 'length', unit: 'centimeter' },
  mm: { category: 'length', unit: 'millimeter' },
  millimeters: { category: 'length', unit: 'millimeter' },
  mi: { category: 'length', unit: 'mile' },
  miles: { category: 'length', unit: 'mile' },
  mile: { category: 'length', unit: 'mile' },
  yd: { category: 'length', unit: 'yard' },
  yards: { category: 'length', unit: 'yard' },
  ft: { category: 'length', unit: 'foot' },
  feet: { category: 'length', unit: 'foot' },
  foot: { category: 'length', unit: 'foot' },
  in: { category: 'length', unit: 'inch' },
  inches: { category: 'length', unit: 'inch' },
  inch: { category: 'length', unit: 'inch' },

  kg: { category: 'mass', unit: 'kilogram' },
  kgs: { category: 'mass', unit: 'kilogram' },
  kilograms: { category: 'mass', unit: 'kilogram' },
  g: { category: 'mass', unit: 'gram' },
  grams: { category: 'mass', unit: 'gram' },
  lb: { category: 'mass', unit: 'pound' },
  lbs: { category: 'mass', unit: 'pound' },
  pounds: { category: 'mass', unit: 'pound' },
  oz: { category: 'mass', unit: 'ounce' },
  ounces: { category: 'mass', unit: 'ounce' },

  celsius: { category: 'temperature', unit: 'celsius' },
  c: { category: 'temperature', unit: 'celsius' },
  fahrenheit: { category: 'temperature', unit: 'fahrenheit' },
  f: { category: 'temperature', unit: 'fahrenheit' },
  kelvin: { category: 'temperature', unit: 'kelvin' },
  k: { category: 'temperature', unit: 'kelvin' },

  l: { category: 'volume', unit: 'liter' },
  liters: { category: 'volume', unit: 'liter' },
  ml: { category: 'volume', unit: 'milliliter' },
  milliliters: { category: 'volume', unit: 'milliliter' },
  gallons: { category: 'volume', unit: 'gallonUS' },
  gallon: { category: 'volume', unit: 'gallonUS' },
  cups: { category: 'volume', unit: 'cupUS' },

  psi: { category: 'pressure', unit: 'psi' },
  bar: { category: 'pressure', unit: 'bar' },
  atm: { category: 'pressure', unit: 'atm' },
  pa: { category: 'pressure', unit: 'pascal' },
  pascal: { category: 'pressure', unit: 'pascal' },
  kpa: { category: 'pressure', unit: 'kilopascal' },
  torr: { category: 'pressure', unit: 'torr' },

  joules: { category: 'energy', unit: 'joule' },
  j: { category: 'energy', unit: 'joule' },
  calories: { category: 'energy', unit: 'calorie' },
  cal: { category: 'energy', unit: 'calorie' },
  kwh: { category: 'energy', unit: 'kilowattHour' },

  watts: { category: 'power', unit: 'watt' },
  w: { category: 'power', unit: 'watt' },
  kw: { category: 'power', unit: 'kilowatt' },
  hp: { category: 'power', unit: 'horsepower' },

  mph: { category: 'speed', unit: 'milePerHour' },
  kmh: { category: 'speed', unit: 'kilometerPerHour' },
  knots: { category: 'speed', unit: 'knot' },

  sec: { category: 'time', unit: 'second' },
  seconds: { category: 'time', unit: 'second' },
  min: { category: 'time', unit: 'minute' },
  minutes: { category: 'time', unit: 'minute' },
  hr: { category: 'time', unit: 'hour' },
  hours: { category: 'time', unit: 'hour' },
  days: { category: 'time', unit: 'day' },

  mb: { category: 'digitalStorage', unit: 'megabyte' },
  gb: { category: 'digitalStorage', unit: 'gigabyte' },
  kb: { category: 'digitalStorage', unit: 'kilobyte' },
  tb: { category: 'digitalStorage', unit: 'terabyte' },

  sievert: { category: 'equivalentDose', unit: 'sievert' },
  millisievert: { category: 'equivalentDose', unit: 'millisievert' },
  rem: { category: 'equivalentDose', unit: 'rem' },
  gray: { category: 'absorbedDose', unit: 'gray' },
  rad: { category: 'absorbedDose', unit: 'rad' },
  curie: { category: 'radioactivity', unit: 'curie' },
  becquerel: { category: 'radioactivity', unit: 'becquerel' },
}

export function parseQuery(text) {
  const cleaned = text.trim().toLowerCase()
  const match = cleaned.match(/([\d.]+)\s*([a-z°]+)\s*(?:to|in|into)\s*([a-z°]+)/)
  if (!match) return null

  const [, valueStr, fromWord, toWord] = match
  const value = parseFloat(valueStr)
  if (isNaN(value)) return null

  const fromAlias = aliases[fromWord]
  const toAlias = aliases[toWord]

  if (!fromAlias || !toAlias) return null
  if (fromAlias.category !== toAlias.category) return null

  return {
    value,
    category: fromAlias.category,
    fromUnit: fromAlias.unit,
    toUnit: toAlias.unit,
  }
}