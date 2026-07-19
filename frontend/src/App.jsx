import { useState } from 'react'
import { lengthUnits, convertLength } from './conversions'

function App() {
  const [value, setValue] = useState(1)
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('foot')

  const result = convertLength(Number(value), fromUnit, toUnit)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Unit Converter Pro</h1>

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
            {Object.keys(lengthUnits).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
          >
            {Object.keys(lengthUnits).map((unit) => (
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