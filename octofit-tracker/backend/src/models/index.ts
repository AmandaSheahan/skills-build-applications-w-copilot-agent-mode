import mongoose, { Schema, model, type Model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced'
  workoutsCompleted: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ITeam {
  name: string
  captain: string
  members: string[]
  wins: number
  losses: number
  createdAt?: Date
  updatedAt?: Date
}

export interface IActivity {
  userId: mongoose.Types.ObjectId | string
  type: string
  durationMinutes: number
  caloriesBurned: number
  date: Date
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId | string
  username: string
  points: number
  rank: number
  streak: number
  createdAt?: Date
  updatedAt?: Date
}

export interface IWorkout {
  name: string
  category: 'strength' | 'cardio' | 'mobility' | 'recovery'
  durationMinutes: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  targetMuscles: string[]
  instructions: string[]
  createdAt?: Date
  updatedAt?: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  workoutsCompleted: { type: Number, default: 0 },
}, { timestamps: true })

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  captain: { type: String, required: true },
  members: [{ type: String, required: true }],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
}, { timestamps: true })

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
}, { timestamps: true })

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
  streak: { type: Number, default: 0 },
}, { timestamps: true })

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  category: { type: String, enum: ['strength', 'cardio', 'mobility', 'recovery'], required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], required: true },
  targetMuscles: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
}, { timestamps: true })

export const User: Model<IUser> = model<IUser>('User', userSchema)
export const Team: Model<ITeam> = model<ITeam>('Team', teamSchema)
export const Activity: Model<IActivity> = model<IActivity>('Activity', activitySchema)
export const LeaderboardEntry: Model<ILeaderboardEntry> = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema)
export const Workout: Model<IWorkout> = model<IWorkout>('Workout', workoutSchema)
