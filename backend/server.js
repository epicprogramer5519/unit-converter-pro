import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const LOG_FILE = path.join(__dirname, 'conversion-log.json')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' })
})

app.post('/api/log-conversion', (req, res) => {
  const { category, value, fromUnit, toUnit, result } = req.body

  if (!category || value === undefined || !fromUnit || !toUnit) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  let logs = []
  if (fs.existsSync(LOG_FILE)) {
    logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'))
  }

  logs.push({
    category, value, fromUnit, toUnit, result,
    timestamp: new Date().toISOString(),
  })

  if (logs.length > 100) logs = logs.slice(-100)

  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2))
  res.json({ status: 'logged' })
})

app.get('/api/history', (req, res) => {
  if (!fs.existsSync(LOG_FILE)) return res.json([])
  const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'))
  res.json(logs.slice(-20).reverse())
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})