import { Router } from 'express'
import { getApiBaseUrl } from '../config/api.js'
import { User } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  try {
    const users = await User.find().lean()
    response.json({ apiBaseUrl: getApiBaseUrl(), items: users })
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch users', details: (error as Error).message })
  }
})

router.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body)
    response.status(201).json({ apiBaseUrl: getApiBaseUrl(), item: user })
  } catch (error) {
    response.status(400).json({ error: 'Failed to create user', details: (error as Error).message })
  }
})

export default router
