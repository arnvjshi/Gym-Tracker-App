import { WorkoutTemplate } from '@/src/types';

export const PREDEFINED_PROGRAMS: WorkoutTemplate[] = [
  // PUSH/PULL/LEGS
  {
    id: 'program_ppl_push',
    name: 'Push Day (PPL)',
    description: 'Chest, Shoulders, and Triceps',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    exercises: [
      { exerciseId: 'ex_bench_press', exerciseName: 'Barbell Bench Press', sets: 4, reps: 8, restTime: 180, notes: 'Main compound' },
      { exerciseId: 'ex_incline_bench', exerciseName: 'Incline Dumbbell Press', sets: 4, reps: 10, restTime: 120 },
      { exerciseId: 'ex_ohp', exerciseName: 'Overhead Press', sets: 3, reps: 8, restTime: 120 },
      { exerciseId: 'ex_lateral_raise', exerciseName: 'Lateral Raises', sets: 3, reps: 15, restTime: 60 },
      { exerciseId: 'ex_tricep_pushdown', exerciseName: 'Tricep Pushdown', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'ex_skull_crusher', exerciseName: 'Skull Crushers', sets: 3, reps: 12, restTime: 60 },
    ],
    isPreDefined: true,
  },
  {
    id: 'program_ppl_pull',
    name: 'Pull Day (PPL)',
    description: 'Back and Biceps',
    targetMuscles: ['Back', 'Lats', 'Biceps', 'Traps'],
    exercises: [
      { exerciseId: 'ex_deadlift', exerciseName: 'Barbell Deadlift', sets: 4, reps: 6, restTime: 240, notes: 'Main compound' },
      { exerciseId: 'ex_pullups', exerciseName: 'Pull-ups', sets: 4, reps: 10, restTime: 120 },
      { exerciseId: 'ex_bent_row', exerciseName: 'Barbell Bent-Over Row', sets: 4, reps: 8, restTime: 120 },
      { exerciseId: 'ex_db_row', exerciseName: 'Dumbbell Row', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'ex_face_pull', exerciseName: 'Face Pulls', sets: 3, reps: 15, restTime: 60 },
      { exerciseId: 'ex_barbell_curl', exerciseName: 'Barbell Curl', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'ex_hammer_curl', exerciseName: 'Hammer Curls', sets: 3, reps: 12, restTime: 60 },
    ],
    isPreDefined: true,
  },
  {
    id: 'program_ppl_legs',
    name: 'Leg Day (PPL)',
    description: 'Quads, Hamstrings, Glutes, and Calves',
    targetMuscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    exercises: [
      { exerciseId: 'ex_squat', exerciseName: 'Barbell Squat', sets: 4, reps: 8, restTime: 180, notes: 'Main compound' },
      { exerciseId: 'ex_leg_press', exerciseName: 'Leg Press', sets: 4, reps: 12, restTime: 120 },
      { exerciseId: 'ex_lunges', exerciseName: 'Lunges', sets: 3, reps: 12, restTime: 90 },
      { exerciseId: 'ex_rdl', exerciseName: 'Romanian Deadlift', sets: 4, reps: 10, restTime: 120 },
      { exerciseId: 'ex_leg_curl', exerciseName: 'Leg Curl', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'ex_calf_raise', exerciseName: 'Calf Raises', sets: 4, reps: 15, restTime: 60 },
    ],
    isPreDefined: true,
  },

  // UPPER/LOWER
  {
    id: 'program_ul_upper',
    name: 'Upper Body (UL)',
    description: 'Complete upper body workout',
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'],
    exercises: [
      { exerciseId: 'ex_bench_press', exerciseName: 'Barbell Bench Press', sets: 4, reps: 8, restTime: 180 },
      { exerciseId: 'ex_bent_row', exerciseName: 'Barbell Bent-Over Row', sets: 4, reps: 8, restTime: 180 },
      { exerciseId: 'ex_ohp', exerciseName: 'Overhead Press', sets: 3, reps: 10, restTime: 120 },
      { exerciseId: 'ex_lat_pulldown', exerciseName: 'Lat Pulldown', sets: 3, reps: 12, restTime: 90 },
      { exerciseId: 'ex_barbell_curl', exerciseName: 'Barbell Curl', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'ex_tricep_dips', exerciseName: 'Tricep Dips', sets: 3, reps: 12, restTime: 60 },
    ],
    isPreDefined: true,
  },
  {
    id: 'program_ul_lower',
    name: 'Lower Body (UL)',
    description: 'Complete lower body workout',
    targetMuscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    exercises: [
      { exerciseId: 'ex_squat', exerciseName: 'Barbell Squat', sets: 5, reps: 5, restTime: 240 },
      { exerciseId: 'ex_rdl', exerciseName: 'Romanian Deadlift', sets: 4, reps: 8, restTime: 180 },
      { exerciseId: 'ex_leg_press', exerciseName: 'Leg Press', sets: 3, reps: 12, restTime: 120 },
      { exerciseId: 'ex_leg_curl', exerciseName: 'Leg Curl', sets: 3, reps: 12, restTime: 90 },
      { exerciseId: 'ex_lunges', exerciseName: 'Lunges', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'ex_calf_raise', exerciseName: 'Calf Raises', sets: 4, reps: 15, restTime: 60 },
    ],
    isPreDefined: true,
  },

  // FULL BODY
  {
    id: 'program_fullbody_a',
    name: 'Full Body A',
    description: 'Complete full body workout focusing on compounds',
    targetMuscles: ['Chest', 'Back', 'Quads', 'Shoulders'],
    exercises: [
      { exerciseId: 'ex_squat', exerciseName: 'Barbell Squat', sets: 4, reps: 8, restTime: 180 },
      { exerciseId: 'ex_bench_press', exerciseName: 'Barbell Bench Press', sets: 4, reps: 8, restTime: 180 },
      { exerciseId: 'ex_bent_row', exerciseName: 'Barbell Bent-Over Row', sets: 4, reps: 8, restTime: 120 },
      { exerciseId: 'ex_ohp', exerciseName: 'Overhead Press', sets: 3, reps: 10, restTime: 120 },
      { exerciseId: 'ex_plank', exerciseName: 'Plank', sets: 3, reps: 60, restTime: 60, notes: 'Hold for 60 seconds' },
    ],
    isPreDefined: true,
  },
  {
    id: 'program_fullbody_b',
    name: 'Full Body B',
    description: 'Alternative full body workout',
    targetMuscles: ['Back', 'Chest', 'Hamstrings', 'Shoulders'],
    exercises: [
      { exerciseId: 'ex_deadlift', exerciseName: 'Barbell Deadlift', sets: 4, reps: 6, restTime: 240 },
      { exerciseId: 'ex_incline_bench', exerciseName: 'Incline Dumbbell Press', sets: 4, reps: 10, restTime: 120 },
      { exerciseId: 'ex_pullups', exerciseName: 'Pull-ups', sets: 4, reps: 10, restTime: 120 },
      { exerciseId: 'ex_lunges', exerciseName: 'Lunges', sets: 3, reps: 12, restTime: 90 },
      { exerciseId: 'ex_face_pull', exerciseName: 'Face Pulls', sets: 3, reps: 15, restTime: 60 },
    ],
    isPreDefined: true,
  },

  // BEGINNER
  {
    id: 'program_beginner',
    name: 'Beginner Full Body',
    description: 'Perfect for those new to lifting',
    targetMuscles: ['Full Body'],
    exercises: [
      { exerciseId: 'ex_squat', exerciseName: 'Barbell Squat', sets: 3, reps: 10, restTime: 120 },
      { exerciseId: 'ex_bench_press', exerciseName: 'Barbell Bench Press', sets: 3, reps: 10, restTime: 120 },
      { exerciseId: 'ex_lat_pulldown', exerciseName: 'Lat Pulldown', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'ex_ohp', exerciseName: 'Overhead Press', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'ex_plank', exerciseName: 'Plank', sets: 3, reps: 30, restTime: 60, notes: 'Hold for 30 seconds' },
    ],
    isPreDefined: true,
  },

  // ARMS FOCUS
  {
    id: 'program_arms',
    name: 'Arm Blaster',
    description: 'Intense biceps and triceps workout',
    targetMuscles: ['Biceps', 'Triceps', 'Forearms'],
    exercises: [
      { exerciseId: 'ex_barbell_curl', exerciseName: 'Barbell Curl', sets: 4, reps: 10, restTime: 90 },
      { exerciseId: 'ex_tricep_dips', exerciseName: 'Tricep Dips', sets: 4, reps: 12, restTime: 90 },
      { exerciseId: 'ex_hammer_curl', exerciseName: 'Hammer Curls', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'ex_skull_crusher', exerciseName: 'Skull Crushers', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'ex_tricep_pushdown', exerciseName: 'Tricep Pushdown', sets: 3, reps: 15, restTime: 45 },
    ],
    isPreDefined: true,
  },
];

export const getProgramById = (id: string): WorkoutTemplate | undefined => {
  return PREDEFINED_PROGRAMS.find(p => p.id === id);
};

export const getProgramsByTargetMuscle = (muscle: string): WorkoutTemplate[] => {
  return PREDEFINED_PROGRAMS.filter(p => 
    p.targetMuscles.some(m => m.toLowerCase().includes(muscle.toLowerCase()))
  );
};
