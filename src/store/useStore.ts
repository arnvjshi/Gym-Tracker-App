import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { ExerciseLog, MuscleGroup, Profile, WeightEntry } from '@/src/types';
import { uid } from '@/src/utils/uid';

type State = {
  profile: Profile;
  weightEntries: WeightEntry[];
  exerciseLogs: ExerciseLog[];
};

type Actions = {
  setHeight: (heightCm: number | null) => void;
  addWeight: (weight: number, date?: string) => void;
  removeWeight: (id: string) => void;
  addExercise: (log: Omit<ExerciseLog, 'id'>) => void;
  removeExercise: (id: string) => void;
};

const initialState: State = {
  profile: { heightCm: null },
  weightEntries: [],
  exerciseLogs: [],
};

const creator: StateCreator<State & Actions> = (set, get) => ({
      ...initialState,
      setHeight: (heightCm: number | null) => set({ profile: { heightCm } }),
      addWeight: (weight: number, date?: string) =>
        set((s) => ({
          weightEntries: [
            ...s.weightEntries,
            { id: uid(), date: date ?? new Date().toISOString(), weight },
          ],
        })),
      removeWeight: (id: string) => set((s) => ({ weightEntries: s.weightEntries.filter((w) => w.id !== id) })),
      addExercise: (log: Omit<ExerciseLog, 'id'>) =>
        set((s) => ({ exerciseLogs: [...s.exerciseLogs, { ...log, id: uid() }] })),
      removeExercise: (id: string) => set((s) => ({ exerciseLogs: s.exerciseLogs.filter((e) => e.id !== id) })),
    });

type Store = State & Actions;
type PartialStore = Pick<State, 'profile' | 'weightEntries' | 'exerciseLogs'>;

export const useStore = create<Store>()(
  persist<Store, [], [], PartialStore>(creator as any, {
      name: 'gym-tracker-store',
      partialize: (s) => ({ profile: s.profile, weightEntries: s.weightEntries, exerciseLogs: s.exerciseLogs }),
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
