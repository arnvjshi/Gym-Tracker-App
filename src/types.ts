export type WeightEntry = {
  id: string;
  date: string; // ISO date
  weight: number; // kg
};

export type Profile = {
  heightCm: number | null;
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
};

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Forearms'
  | 'Quads'
  | 'Hamstrings'
  | 'Calves'
  | 'Glutes'
  | 'Abs'
  | 'Obliques'
  | 'Traps'
  | 'Lats'
  | 'Full Body';

export type EquipmentType = 
  | 'Barbell'
  | 'Dumbbell'
  | 'Machine'
  | 'Cable'
  | 'Bodyweight'
  | 'Kettlebell'
  | 'Resistance Band'
  | 'Other';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ExerciseDefinition = {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  instructions?: string;
  isCustom: boolean; // user-created vs pre-defined
};

export type ExerciseLog = {
  id: string;
  date: string; // ISO date
  exerciseId: string; // Reference to ExerciseDefinition
  exerciseName: string; // Denormalized for performance
  primaryMuscle: MuscleGroup;
  sets: number;
  reps: number;
  weight: number; // kg per set
  duration?: number; // seconds (for timed exercises)
  notes?: string;
  workoutSessionId?: string; // Link to workout session
};

export type WorkoutSession = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime?: string;
  exercises: ExerciseLog[];
  totalVolume: number; // sets * reps * weight
  duration?: number; // minutes
  notes?: string;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  description?: string;
  targetMuscles: MuscleGroup[];
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: number;
    reps: number;
    restTime: number; // seconds
    notes?: string;
  }[];
  isPreDefined: boolean;
};

export type MuscleGroupRating = {
  muscleGroup: MuscleGroup;
  level: number; // 1-10
  lastUpdated: string;
  totalVolume: number; // lifetime volume for this muscle
  workoutCount: number; // number of workouts targeting this muscle
};

export type Goal = {
  id: string;
  type: 'weight' | 'exercise' | 'muscle' | 'custom';
  title: string;
  target: string;
  current: string;
  deadline?: string;
  completed: boolean;
  muscleGroup?: MuscleGroup;
};

export type PersonalRecord = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
  volume: number; // weight * reps
};

export type MuscleGroupStats = {
  muscleGroup: MuscleGroup;
  weeklyVolume: number;
  monthlyVolume: number;
  totalSets: number;
  totalReps: number;
  averageWeight: number;
  workoutFrequency: number; // workouts per week
  lastTrained?: string;
};
