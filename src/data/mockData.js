// Realistic mock data for YouFit. Swap these out for API calls later.

export const user = {
  name: 'Alex Rivera',
  firstName: 'Alex',
  handle: '@alexlifts',
  initials: 'AR',
  membership: 'Elite',
  memberSince: 'March 2024',
  homeGym: 'YouFit Downtown',
  level: 14,
  xp: 7420,
  nextLevelXp: 8000,
  streak: 12,
  bestStreak: 21,
  totals: {
    workouts: 186,
    hours: 158,
    prs: 23,
    classes: 41,
  },
}

export const landingStats = [
  { label: 'Active members', value: 48250, suffix: '+' },
  { label: 'Workouts completed', value: 1284390, suffix: '' },
  { label: 'Classes this week', value: 342, suffix: '' },
]

export const landingFeatures = [
  {
    icon: 'dumbbell',
    title: 'Plan workouts',
    text: 'Build a split in seconds from 100+ coach-designed exercises, filtered by muscle group.',
    to: '/library',
  },
  {
    icon: 'trending',
    title: 'Track progress',
    text: 'Watch your lifts climb with beautiful charts and trophy-worthy personal records.',
    to: '/progress',
  },
  {
    icon: 'calendar',
    title: 'Book classes',
    text: 'Yoga, HIIT, Spin and Boxing — grab a spot in two taps before they sell out.',
    to: '/classes',
  },
  {
    icon: 'flame',
    title: 'Stay motivated',
    text: 'Streaks, badges and a little confetti when you finish strong. You earned it.',
    to: '/profile',
  },
]

// Mon → Sun. `today` is computed in the UI.
export const weeklyActivity = [
  { day: 'Mon', minutes: 52, calories: 430 },
  { day: 'Tue', minutes: 38, calories: 310 },
  { day: 'Wed', minutes: 0, calories: 0 },
  { day: 'Thu', minutes: 64, calories: 540 },
  { day: 'Fri', minutes: 45, calories: 380 },
  { day: 'Sat', minutes: 15, calories: 120 },
  { day: 'Sun', minutes: 0, calories: 0 },
]

export const weeklyGoals = [
  { key: 'workouts', label: 'Workouts', value: 4, goal: 5, unit: '', colors: ['#c6ff3d', '#7ee787'] },
  { key: 'minutes', label: 'Active min', value: 214, goal: 300, unit: '', colors: ['#22d3ee', '#3b82f6'] },
  { key: 'goals', label: 'Goals hit', value: 6, goal: 8, unit: '', colors: ['#ff7a45', '#ff4d8d'] },
]

export const todayWorkout = {
  id: 'push-power',
  title: 'Push Day — Upper Power',
  focus: 'Chest · Shoulders · Triceps',
  duration: 52,
  calories: 410,
  coach: 'Coach Maya',
  exercises: [
    { id: 'bench', name: 'Barbell Bench Press', sets: 4, reps: 8, weight: '80 kg', rest: 90 },
    { id: 'ohp', name: 'Overhead Press', sets: 3, reps: 8, weight: '50 kg', rest: 90 },
    { id: 'incline', name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: '28 kg', rest: 75 },
    { id: 'dips', name: 'Weighted Dips', sets: 3, reps: 10, weight: '+10 kg', rest: 60 },
    { id: 'lateral', name: 'Cable Lateral Raise', sets: 3, reps: 15, weight: '8 kg', rest: 45 },
  ],
}

export const muscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Core', 'Cardio']

export const exercises = [
  { id: 1, name: 'Barbell Bench Press', muscle: 'Chest', sets: 4, reps: '6–8', difficulty: 'Intermediate', equipment: 'Barbell', rest: 90, kcal: 85, description: 'The king of upper-body pushing. Drive through your feet and keep shoulder blades pinned.' },
  { id: 2, name: 'Incline Dumbbell Press', muscle: 'Chest', sets: 3, reps: '8–10', difficulty: 'Beginner', equipment: 'Dumbbells', rest: 75, kcal: 70, description: 'Targets the upper chest with a greater range of motion than the barbell.' },
  { id: 3, name: 'Cable Crossover', muscle: 'Chest', sets: 3, reps: '12–15', difficulty: 'Beginner', equipment: 'Cable', rest: 60, kcal: 50, description: 'Constant tension through the full squeeze. Finish with hands crossing slightly.' },
  { id: 4, name: 'Deficit Push-Up', muscle: 'Chest', sets: 3, reps: 'AMRAP', difficulty: 'Advanced', equipment: 'Bodyweight', rest: 60, kcal: 60, description: 'Elevate your hands for a deeper stretch. Brutal, effective, anywhere.' },
  { id: 5, name: 'Deadlift', muscle: 'Back', sets: 5, reps: '3–5', difficulty: 'Advanced', equipment: 'Barbell', rest: 150, kcal: 120, description: 'Full posterior-chain power. Brace hard, push the floor away, lock out tall.' },
  { id: 6, name: 'Weighted Pull-Up', muscle: 'Back', sets: 4, reps: '5–8', difficulty: 'Advanced', equipment: 'Pull-up bar', rest: 120, kcal: 75, description: 'Builds a wide, strong back. Chest to bar, control the descent.' },
  { id: 7, name: 'Seated Cable Row', muscle: 'Back', sets: 3, reps: '10–12', difficulty: 'Beginner', equipment: 'Cable', rest: 75, kcal: 60, description: 'Pull elbows past your torso and squeeze the mid-back on every rep.' },
  { id: 8, name: 'Chest-Supported Row', muscle: 'Back', sets: 3, reps: '8–12', difficulty: 'Intermediate', equipment: 'Dumbbells', rest: 75, kcal: 65, description: 'Removes the lower back from the equation so your lats do all the work.' },
  { id: 9, name: 'Back Squat', muscle: 'Legs', sets: 5, reps: '5', difficulty: 'Intermediate', equipment: 'Barbell', rest: 150, kcal: 130, description: 'Sit between your hips, keep the chest proud and drive up through mid-foot.' },
  { id: 10, name: 'Romanian Deadlift', muscle: 'Legs', sets: 3, reps: '8–10', difficulty: 'Intermediate', equipment: 'Barbell', rest: 90, kcal: 90, description: 'Hinge with soft knees to load hamstrings and glutes through a long stretch.' },
  { id: 11, name: 'Bulgarian Split Squat', muscle: 'Legs', sets: 3, reps: '10 / leg', difficulty: 'Advanced', equipment: 'Dumbbells', rest: 90, kcal: 95, description: 'Single-leg strength and balance. Everyone loves to hate them.' },
  { id: 12, name: 'Leg Press', muscle: 'Legs', sets: 4, reps: '10–12', difficulty: 'Beginner', equipment: 'Machine', rest: 90, kcal: 85, description: 'Heavy quad volume with a stable back. Don’t lock the knees at the top.' },
  { id: 13, name: 'EZ-Bar Curl', muscle: 'Arms', sets: 3, reps: '10–12', difficulty: 'Beginner', equipment: 'EZ bar', rest: 60, kcal: 40, description: 'Wrist-friendly biceps builder. Keep elbows pinned and no swinging.' },
  { id: 14, name: 'Skull Crusher', muscle: 'Arms', sets: 3, reps: '10–12', difficulty: 'Intermediate', equipment: 'EZ bar', rest: 60, kcal: 40, description: 'Long-head triceps focus. Lower behind the head for a deeper stretch.' },
  { id: 15, name: 'Hammer Curl', muscle: 'Arms', sets: 3, reps: '12', difficulty: 'Beginner', equipment: 'Dumbbells', rest: 45, kcal: 35, description: 'Hits the brachialis for thicker arms and a stronger grip.' },
  { id: 16, name: 'Hanging Leg Raise', muscle: 'Core', sets: 3, reps: '12', difficulty: 'Intermediate', equipment: 'Pull-up bar', rest: 60, kcal: 45, description: 'Curl the pelvis up — don’t just swing the legs. Slow and controlled.' },
  { id: 17, name: 'Ab Wheel Rollout', muscle: 'Core', sets: 3, reps: '10', difficulty: 'Advanced', equipment: 'Ab wheel', rest: 60, kcal: 50, description: 'Anti-extension at its finest. Keep ribs down and glutes squeezed.' },
  { id: 18, name: 'Plank Hold', muscle: 'Core', sets: 3, reps: '45 s', difficulty: 'Beginner', equipment: 'Bodyweight', rest: 45, kcal: 30, description: 'The foundation. Squeeze everything and breathe behind the brace.' },
  { id: 19, name: 'Assault Bike Sprints', muscle: 'Cardio', sets: 8, reps: '20 s on / 40 s off', difficulty: 'Advanced', equipment: 'Air bike', rest: 40, kcal: 160, description: 'Short, savage intervals that spike heart rate and torch calories.' },
  { id: 20, name: 'Rowing Intervals', muscle: 'Cardio', sets: 5, reps: '500 m', difficulty: 'Intermediate', equipment: 'Rower', rest: 90, kcal: 140, description: 'Legs, then back, then arms. Hold your split and stay smooth.' },
  { id: 21, name: 'Incline Walk', muscle: 'Cardio', sets: 1, reps: '25 min', difficulty: 'Beginner', equipment: 'Treadmill', rest: 0, kcal: 180, description: '12% incline, 5 km/h. Easy on the joints, great for recovery days.' },
]

export const strengthProgress = [
  { week: 'W1', bench: 70, squat: 100, deadlift: 140, ohp: 42.5 },
  { week: 'W2', bench: 70, squat: 102.5, deadlift: 145, ohp: 42.5 },
  { week: 'W3', bench: 72.5, squat: 105, deadlift: 147.5, ohp: 45 },
  { week: 'W4', bench: 72.5, squat: 107.5, deadlift: 150, ohp: 45 },
  { week: 'W5', bench: 75, squat: 110, deadlift: 155, ohp: 45 },
  { week: 'W6', bench: 75, squat: 110, deadlift: 157.5, ohp: 47.5 },
  { week: 'W7', bench: 77.5, squat: 115, deadlift: 162.5, ohp: 47.5 },
  { week: 'W8', bench: 77.5, squat: 117.5, deadlift: 165, ohp: 47.5 },
  { week: 'W9', bench: 80, squat: 120, deadlift: 170, ohp: 50 },
  { week: 'W10', bench: 80, squat: 122.5, deadlift: 172.5, ohp: 50 },
  { week: 'W11', bench: 82.5, squat: 125, deadlift: 177.5, ohp: 50 },
  { week: 'W12', bench: 85, squat: 127.5, deadlift: 180, ohp: 52.5 },
]

export const lifts = [
  { key: 'deadlift', label: 'Deadlift', color: '#c6ff3d' },
  { key: 'squat', label: 'Squat', color: '#22d3ee' },
  { key: 'bench', label: 'Bench', color: '#ff7a45' },
  { key: 'ohp', label: 'OHP', color: '#a78bfa' },
]

export const progressSummary = [
  { label: 'Total volume', value: 48.6, decimals: 1, suffix: ' t', sub: '+12% vs last month' },
  { label: 'Workouts this month', value: 17, decimals: 0, suffix: '', sub: 'On track for 22' },
  { label: 'Avg session', value: 54, decimals: 0, suffix: ' min', sub: '+6 min vs last month' },
  { label: 'Strength score', value: 412, decimals: 0, suffix: '', sub: 'Top 18% of members' },
]

export const personalRecords = [
  { id: 'dl', lift: 'Deadlift', value: 180, unit: 'kg', reps: '1RM', date: 'Oct 12', delta: '+7.5 kg', tier: 'gold' },
  { id: 'sq', lift: 'Back Squat', value: 127.5, unit: 'kg', reps: '1RM', date: 'Oct 10', delta: '+5 kg', tier: 'gold' },
  { id: 'bp', lift: 'Bench Press', value: 85, unit: 'kg', reps: '1RM', date: 'Oct 08', delta: '+2.5 kg', tier: 'silver' },
  { id: 'ohp', lift: 'Overhead Press', value: 52.5, unit: 'kg', reps: '1RM', date: 'Oct 03', delta: '+2.5 kg', tier: 'silver' },
  { id: 'pu', lift: 'Pull-Ups', value: 18, unit: 'reps', reps: 'Max', date: 'Sep 27', delta: '+3 reps', tier: 'bronze' },
  { id: 'row', lift: '2k Row', value: '7:12', unit: '', reps: 'Time', date: 'Sep 19', delta: '−9 s', tier: 'bronze' },
]

export const classTypes = {
  Yoga: { color: '#a78bfa', soft: 'rgba(167,139,250,0.14)' },
  HIIT: { color: '#ff7a45', soft: 'rgba(255,122,69,0.14)' },
  Spin: { color: '#22d3ee', soft: 'rgba(34,211,238,0.14)' },
  Boxing: { color: '#ff4d8d', soft: 'rgba(255,77,141,0.14)' },
}

// Keyed by weekday: 0 = Monday … 6 = Sunday
export const classSchedule = {
  0: [
    { id: 'm1', type: 'Spin', name: 'Sunrise Ride', time: '06:30', duration: 45, coach: 'Jordan Lee', room: 'Studio Cycle', spots: 4, capacity: 24, intensity: 'High' },
    { id: 'm2', type: 'Yoga', name: 'Flow & Restore', time: '12:15', duration: 50, coach: 'Priya Nair', room: 'Studio Zen', spots: 11, capacity: 20, intensity: 'Low' },
    { id: 'm3', type: 'HIIT', name: 'Metcon Blast', time: '18:30', duration: 40, coach: 'Marcus Cole', room: 'Box Floor', spots: 0, capacity: 18, intensity: 'Max' },
  ],
  1: [
    { id: 't1', type: 'Boxing', name: 'Fight Club Fundamentals', time: '07:00', duration: 55, coach: 'Dani Ortiz', room: 'Ring Room', spots: 6, capacity: 16, intensity: 'High' },
    { id: 't2', type: 'Yoga', name: 'Power Vinyasa', time: '18:00', duration: 60, coach: 'Priya Nair', room: 'Studio Zen', spots: 2, capacity: 20, intensity: 'Medium' },
    { id: 't3', type: 'Spin', name: 'Rhythm Ride', time: '18:00', duration: 45, coach: 'Jordan Lee', room: 'Studio Cycle', spots: 9, capacity: 24, intensity: 'High' },
  ],
  2: [
    { id: 'w1', type: 'HIIT', name: 'Tabata Torch', time: '06:45', duration: 30, coach: 'Marcus Cole', room: 'Box Floor', spots: 7, capacity: 18, intensity: 'Max' },
    { id: 'w2', type: 'Boxing', name: 'Heavy Bag Burn', time: '19:00', duration: 50, coach: 'Dani Ortiz', room: 'Ring Room', spots: 3, capacity: 16, intensity: 'High' },
  ],
  3: [
    { id: 'th1', type: 'Yoga', name: 'Mobility Lab', time: '07:30', duration: 40, coach: 'Sam Okafor', room: 'Studio Zen', spots: 14, capacity: 20, intensity: 'Low' },
    { id: 'th2', type: 'Spin', name: 'Climb Club', time: '12:30', duration: 45, coach: 'Jordan Lee', room: 'Studio Cycle', spots: 1, capacity: 24, intensity: 'High' },
    { id: 'th3', type: 'HIIT', name: 'Engine Room', time: '18:30', duration: 45, coach: 'Marcus Cole', room: 'Box Floor', spots: 5, capacity: 18, intensity: 'Max' },
    { id: 'th4', type: 'Boxing', name: 'Combo Cardio', time: '20:00', duration: 45, coach: 'Dani Ortiz', room: 'Ring Room', spots: 10, capacity: 16, intensity: 'Medium' },
  ],
  4: [
    { id: 'f1', type: 'Spin', name: 'Friday Fast Lane', time: '06:30', duration: 45, coach: 'Jordan Lee', room: 'Studio Cycle', spots: 8, capacity: 24, intensity: 'High' },
    { id: 'f2', type: 'HIIT', name: 'Sweat Sesh', time: '17:30', duration: 40, coach: 'Lena Fox', room: 'Box Floor', spots: 2, capacity: 18, intensity: 'Max' },
  ],
  5: [
    { id: 's1', type: 'Yoga', name: 'Slow Saturday', time: '09:00', duration: 75, coach: 'Priya Nair', room: 'Studio Zen', spots: 6, capacity: 20, intensity: 'Low' },
    { id: 's2', type: 'Boxing', name: 'Sparring Prep', time: '10:30', duration: 60, coach: 'Dani Ortiz', room: 'Ring Room', spots: 0, capacity: 12, intensity: 'Max' },
    { id: 's3', type: 'HIIT', name: 'Partner WOD', time: '11:00', duration: 50, coach: 'Lena Fox', room: 'Box Floor', spots: 12, capacity: 24, intensity: 'High' },
  ],
  6: [
    { id: 'su1', type: 'Yoga', name: 'Yin & Breathwork', time: '10:00', duration: 60, coach: 'Sam Okafor', room: 'Studio Zen', spots: 9, capacity: 20, intensity: 'Low' },
  ],
}

export const achievements = [
  { id: 'a1', icon: 'flame', title: 'On Fire', desc: '10-day workout streak', unlocked: true, color: '#ff7a45' },
  { id: 'a2', icon: 'trophy', title: 'PR Machine', desc: 'Set 20 personal records', unlocked: true, color: '#facc15' },
  { id: 'a3', icon: 'dumbbell', title: 'Iron Regular', desc: 'Complete 150 workouts', unlocked: true, color: '#c6ff3d' },
  { id: 'a4', icon: 'sunrise', title: 'Early Bird', desc: '25 workouts before 7 AM', unlocked: true, color: '#22d3ee' },
  { id: 'a5', icon: 'users', title: 'Class Act', desc: 'Attend 50 group classes', unlocked: false, progress: 41, goal: 50, color: '#a78bfa' },
  { id: 'a6', icon: 'zap', title: '200 Club', desc: 'Deadlift 200 kg', unlocked: false, progress: 180, goal: 200, color: '#ff4d8d' },
  { id: 'a7', icon: 'timer', title: 'Marathon Month', desc: '1,500 active minutes in a month', unlocked: false, progress: 1120, goal: 1500, color: '#38bdf8' },
  { id: 'a8', icon: 'medal', title: 'Untouchable', desc: '30-day streak', unlocked: false, progress: 12, goal: 30, color: '#f472b6' },
]

export const quotes = [
  { text: 'The only bad workout is the one that didn’t happen.', author: 'Unknown' },
  { text: 'Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.', author: 'Rikki Rogers' },
  { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' },
  { text: 'Success isn’t always about greatness. It’s about consistency.', author: 'Dwayne Johnson' },
  { text: 'Your body can stand almost anything. It’s your mind you have to convince.', author: 'Unknown' },
  { text: 'Take care of your body. It’s the only place you have to live.', author: 'Jim Rohn' },
  { text: 'You don’t have to be extreme, just consistent.', author: 'Unknown' },
  { text: 'Motivation gets you going, but habit keeps you growing.', author: 'John C. Maxwell' },
]
