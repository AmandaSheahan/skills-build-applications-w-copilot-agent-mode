import { Router } from 'express'
import { getApiBaseUrl } from '../config/api.js'
import { LeaderboardEntry } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  try {
    const entries = await LeaderboardEntry.find().populate('userId').lean()
    response.json({ apiBaseUrl: getApiBaseUrl(), items: entries })
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch leaderboard', details: (error as Error).message })
  }
})

router.post('/', async (request, response) => {
  try {
    const entry = await LeaderboardEntry.create(request.body)
    response.status(201).json({ apiBaseUrl: getApiBaseUrl(), item: entry })
  } catch (error) {
    response.status(400).json({ error: 'Failed to create leaderboard entry', details: (error as Error).message })
  }
})

export default router
