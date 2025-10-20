import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { ExerciseLog, MuscleGroup, Profile, WeightEntry, WorkoutTemplate, Goal, PersonalRecord } from '@/src/types';
import { uid } from '@/src/utils/uid';

type State = {
  profile: Profile;
  weightEntries: WeightEntry[];
  exerciseLogs: ExerciseLog[];
  workoutTemplates: WorkoutTemplate[];
  goals: Goal[];
  personalRecords: PersonalRecord[];
};

type Actions = {
  setHeight: (heightCm: number | null) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  addWeight: (weight: number, date?: string) => void;
  removeWeight: (id: string) => void;
  addExercise: (log: Omit<ExerciseLog, 'id'>) => void;
  removeExercise: (id: string) => void;
  addWorkoutTemplate: (template: Omit<WorkoutTemplate, 'id'>) => void;
  removeWorkoutTemplate: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  addPersonalRecord: (record: Omit<PersonalRecord, 'id'>) => void;
  updatePersonalRecord: (id: string, record: Partial<PersonalRecord>) => void;
  exportData: () => Promise<string>;
  importData: (data: string) => void;
};

const initialState: State = {
  profile: { heightCm: null },
  weightEntries: [],
  exerciseLogs: [],
  workoutTemplates: [],
  goals: [],
  personalRecords: [],
};

const creator: StateCreator<State & Actions> = (set, get) => ({
      ...initialState,
      setHeight: (heightCm: number | null) => set((s) => ({ profile: { ...s.profile, heightCm } })),
      updateProfile: (updates: Partial<Profile>) => set((s) => ({ profile: { ...s.profile, ...updates } })),
      addWeight: (weight: number, date?: string) =>
        set((s) => ({
          weightEntries: [
            ...s.weightEntries,
            { id: uid(), date: date ?? new Date().toISOString(), weight },
          ],
        })),
      removeWeight: (id: string) => set((s) => ({ weightEntries: s.weightEntries.filter((w) => w.id !== id) })),
      addExercise: (log: Omit<ExerciseLog, 'id'>) => {
        const newLog = { ...log, id: uid() };
        set((s) => {
          // Check if this is a new personal record
          const existingPR = s.personalRecords.find(pr => pr.exerciseName === log.exerciseName);
          const newVolume = log.weight * log.reps;
          
          let updatedPRs = [...s.personalRecords];
          if (!existingPR || newVolume > existingPR.volume) {
            updatedPRs = updatedPRs.filter(pr => pr.exerciseName !== log.exerciseName);
            updatedPRs.push({
              id: uid(),
              exerciseId: log.exerciseId,
              exerciseName: log.exerciseName,
              weight: log.weight,
              reps: log.reps,
              volume: newVolume,
              date: log.date,
            });
          }
          
          return { 
            exerciseLogs: [...s.exerciseLogs, newLog],
            personalRecords: updatedPRs 
          };
        });
      },
      removeExercise: (id: string) => set((s) => ({ exerciseLogs: s.exerciseLogs.filter((e) => e.id !== id) })),
      addWorkoutTemplate: (template: Omit<WorkoutTemplate, 'id'>) =>
        set((s) => ({ workoutTemplates: [...s.workoutTemplates, { ...template, id: uid() }] })),
      removeWorkoutTemplate: (id: string) => 
        set((s) => ({ workoutTemplates: s.workoutTemplates.filter((t) => t.id !== id) })),
      addGoal: (goal: Omit<Goal, 'id'>) =>
        set((s) => ({ goals: [...s.goals, { ...goal, id: uid() }] })),
      updateGoal: (id: string, updates: Partial<Goal>) =>
        set((s) => ({ 
          goals: s.goals.map((g) => g.id === id ? { ...g, ...updates } : g) 
        })),
      removeGoal: (id: string) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
      addPersonalRecord: (record: Omit<PersonalRecord, 'id'>) =>
        set((s) => ({ personalRecords: [...s.personalRecords, { ...record, id: uid() }] })),
      updatePersonalRecord: (id: string, updates: Partial<PersonalRecord>) =>
        set((s) => ({ 
          personalRecords: s.personalRecords.map((pr) => pr.id === id ? { ...pr, ...updates } : pr) 
        })),
      exportData: async () => {
        const state = get();
        return JSON.stringify({
          profile: state.profile,
          weightEntries: state.weightEntries,
          exerciseLogs: state.exerciseLogs,
          workoutTemplates: state.workoutTemplates,
          goals: state.goals,
          personalRecords: state.personalRecords,
        });
      },
      importData: (data: string) => {
        try {
          const parsed = JSON.parse(data);
          set({
            profile: parsed.profile || initialState.profile,
            weightEntries: parsed.weightEntries || [],
            exerciseLogs: parsed.exerciseLogs || [],
            workoutTemplates: parsed.workoutTemplates || [],
            goals: parsed.goals || [],
            personalRecords: parsed.personalRecords || [],
          });
        } catch (e) {
          console.error('Failed to import data', e);
        }
      },
    });

type Store = State & Actions;
type PartialStore = Pick<State, 'profile' | 'weightEntries' | 'exerciseLogs' | 'workoutTemplates' | 'goals' | 'personalRecords'>;

export const useStore = create<Store>()(
  persist<Store, [], [], PartialStore>(creator as any, {
      name: 'gym-tracker-store',
      partialize: (s) => ({ 
        profile: s.profile, 
        weightEntries: s.weightEntries, 
        exerciseLogs: s.exerciseLogs,
        workoutTemplates: s.workoutTemplates,
        goals: s.goals,
        personalRecords: s.personalRecords,
      }),
      storage: {
        getItem: async (name: string) => {
          const v = await AsyncStorage.getItem(name);
          return v ? JSON.parse(v) : null;
        },
        setItem: async (name: string, value: any) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      },
    })
);

// Selectors
export const weightEntriesSortedSelector = (s: State) =>
  [...s.weightEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// Convenience hook for sorted weight entries
export const useWeightEntriesSorted = () => useStore(weightEntriesSortedSelector as (s: State & Actions) => any);
