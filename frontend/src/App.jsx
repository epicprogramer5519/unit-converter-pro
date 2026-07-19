import { useState } from 'react'
import { categories, convert, convertTemperature, temperatureUnits } from './conversions'

const categoryNames = [...Object.keys(categories), 'temperature'].sort()

function App() {
  const [category, setCategory] = useState('length')
  const [value, setValue] = useState(1)
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('foot')

  const isTemp = category === 'temperature'
  const unitList = isTemp ? temperatureUnits : Object.keys(categories[category].units)

  const result = isTemp
    ? convertTemperature(Number(value), fromUnit, toUnit)
    : convert(Number(value), fromUnit, toUnit, category)

  function handleCategoryChange(newCategory) {
    setCategory(newCategory)
    const units = newCategory === 'temperature' ? temperatureUnits : Object.keys(categories[newCategory].units)
    setFromUnit(units[0])
    setToUnit(units[1])
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Unit Converter Pro</h1>

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        >
          {categoryNames.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />

        <div className="flex gap-2 mb-4">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
          >
            {unitList.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
          >
            {unitList.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <p className="text-center text-lg">
          Result: <span className="font-bold">{result.toFixed(4)}</span> {toUnit}
        </p>
      </div>
    </div>
  )
}

export default App