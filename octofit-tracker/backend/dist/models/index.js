import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    workoutsCompleted: { type: Number, default: 0 },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String, required: true }],
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String },
}, { timestamps: true });
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['strength', 'cardio', 'mobility', 'recovery'], required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], required: true },
    targetMuscles: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
}, { timestamps: true });
export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = model('Workout', workoutSchema);
