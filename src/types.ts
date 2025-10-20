export type WeightEntry = {
  id: string;
  date: string; // ISO date
  weight: number; // kg
};

export type Profile = {
  heightCm: number | null;
};

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Arms'
  | 'Legs'
  | 'Core'
  | 'Full Body'
  | 'Other';

export type ExerciseLog = {
  id: string;
  date: string; // ISO date
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: number;
  weight: number; // kg per set (simple model)
};
