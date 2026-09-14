import mongoose from 'mongoose'
import { User, Team, Activity, LeaderboardEntry, Workout } from '../models/index.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@example.com',
        fitnessLevel: 'advanced',
        workoutsCompleted: 18,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@example.com',
        fitnessLevel: 'intermediate',
        workoutsCompleted: 12,
      },
      {
        name: 'Nina Gomez',
        email: 'nina.gomez@example.com',
        fitnessLevel: 'beginner',
        workoutsCompleted: 7,
      },
    ])

    const teams = await Team.insertMany([
      {
        name: 'Iron Wolves',
        captain: 'ava.patel@example.com',
        members: ['ava.patel@example.com', 'marcus.lee@example.com'],
        wins: 8,
        losses: 2,
      },
      {
        name: 'Storm Riders',
        captain: 'nina.gomez@example.com',
        members: ['nina.gomez@example.com'],
        wins: 4,
        losses: 6,
      },
    ])

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMinutes: 38,
        caloriesBurned: 420,
        date: new Date('2026-09-12T06:30:00Z'),
        notes: 'Tempo interval run',
      },
      {
        userId: users[1]._id,
        type: 'strength',
        durationMinutes: 50,
        caloriesBurned: 310,
        date: new Date('2026-09-13T18:00:00Z'),
        notes: 'Upper-body circuit',
      },
      {
        userId: users[2]._id,
        type: 'walk',
        durationMinutes: 25,
        caloriesBurned: 120,
        date: new Date('2026-09-14T07:00:00Z'),
        notes: 'Recovery walk',
      },
    ])

    const leaderboard = await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        username: 'ava.patel',
        points: 980,
        rank: 1,
        streak: 12,
      },
      {
        userId: users[1]._id,
        username: 'marcus.lee',
        points: 760,
        rank: 2,
        streak: 9,
      },
      {
        userId: users[2]._id,
        username: 'nina.gomez',
        points: 610,
        rank: 3,
        streak: 5,
      },
    ])

    const workouts = await Workout.insertMany([
      {
        name: 'HIIT Burn',
        category: 'cardio',
        durationMinutes: 30,
        difficulty: 'challenging',
        targetMuscles: ['legs', 'core', 'glutes'],
        instructions: ['Warm up for 5 minutes', 'Alternate sprint and walk intervals', 'Cool down for 5 minutes'],
      },
      {
        name: 'Push & Pull',
        category: 'strength',
        durationMinutes: 45,
        difficulty: 'moderate',
        targetMuscles: ['chest', 'back', 'biceps'],
        instructions: ['Complete 3 rounds', 'Rest 60 seconds between sets', 'Focus on controlled reps'],
      },
      {
        name: 'Mobility Reset',
        category: 'mobility',
        durationMinutes: 20,
        difficulty: 'easy',
        targetMuscles: ['hips', 'hamstrings', 'shoulders'],
        instructions: ['Flow through each stretch slowly', 'Breathe deeply throughout', 'End with gentle spinal mobility'],
      },
    ])

    console.log('Seeded users:', users.length)
    console.log('Seeded teams:', teams.length)
    console.log('Seeded activities:', activities.length)
    console.log('Seeded leaderboard entries:', leaderboard.length)
    console.log('Seeded workouts:', workouts.length)
    console.log('Database seeding complete')

    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
