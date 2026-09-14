import { Router } from 'express'
import { getApiBaseUrl } from '../config/api.js'
import { Workout } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  try {
    const workouts = await Workout.find().lean()
    response.json({ apiBaseUrl: getApiBaseUrl(), items: workouts })
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workouts', details: (error as Error).message })
  }
})

router.post('/', async (request, response) => {
  try {
    const workout = await Workout.create(request.body)
    response.status(201).json({ apiBaseUrl: getApiBaseUrl(), item: workout })
  } catch (error) {
    response.status(400).json({ error: 'Failed to create workout', details: (error as Error).message })
  }
})

export default router
