import express from 'express'
import { getApiBaseUrl } from './config/api.js'
import connectToDatabase from './config/database.js'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl: getApiBaseUrl(),
  })
})

app.get('/api', (_request, response) => {
  response.json({
    apiBaseUrl: getApiBaseUrl(),
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`)
      console.log(`API base URL: ${getApiBaseUrl()}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })