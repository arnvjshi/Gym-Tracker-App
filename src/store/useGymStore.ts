import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  ExerciseLog, MuscleGroup, Profile, WeightEntry, WorkoutTemplate, 
  Goal, PersonalRecord, ExerciseDefinition, WorkoutSession, MuscleGroupRating, MuscleGroupStats 
} from '@/src/types';
import { uid } from '@/src/utils/uid';
import { PREDEFINED_EXERCISES } from '@/src/data/exerciseLibrary';
import { PREDEFINED_PROGRAMS } from '@/src/data/workoutPrograms';

type State = {
  profile: Profile;
  weightEntries: WeightEntry[];
  exerciseLogs: ExerciseLog[];
  workoutSessions: WorkoutSession[];
  workoutTemplates: WorkoutTemplate[];
  customExercises: ExerciseDefinition[];
  muscleGroupRatings: MuscleGroupRating[];
  goals: Goal[];
  personalRecords: PersonalRecord[];
};

type Actions = {
  // Profile
  setHeight: (heightCm: number | null) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  
  // Weight
  addWeight: (weight: number, date?: string) => void;
  removeWeight: (id: string) => void;
  
  // Exercises
  addExercise: (log: Omit<ExerciseLog, 'id'>) => void;
  removeExercise: (id: string) => void;
  addCustomExercise: (exercise: Omit<ExerciseDefinition, 'id' | 'isCustom'>) => void;
  removeCustomExercise: (id: string) => void;
  getAllExercises: () => ExerciseDefinition[];
  
  // Workout Sessions
  startWorkoutSession: (name: string) => string;
  endWorkoutSession: (sessionId: string) => void;
  addExerciseToSession: (sessionId: string, exercise: Omit<ExerciseLog, 'id' | 'workoutSessionId'>) => void;
  
  // Templates & Programs
  addWorkoutTemplate: (template: Omit<WorkoutTemplate, 'id'>) => void;
  removeWorkoutTemplate: (id: string) => void;
  getAllPrograms: () => WorkoutTemplate[];
  
  // Muscle Group Ratings
  updateMuscleRating: (muscleGroup: MuscleGroup, level: number) => void;
  getMuscleRating: (muscleGroup: MuscleGroup) => MuscleGroupRating | undefined;
  calculateMuscleStats: (muscleGroup: MuscleGroup) => MuscleGroupStats;
  
  // Goals
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  
  // Personal Records
  addPersonalRecord: (record: Omit<PersonalRecord, 'id' | 'volume'>) => void;
  updatePersonalRecord: (id: string, record: Partial<PersonalRecord>) => void;
  
  // Data Management
  exportData: () => Promise<string>;
  importData: (data: string, mergeMode?: 'replace' | 'merge') => void;
};

const initialState: State = {
  profile: { heightCm: null },
  weightEntries: [],
  exerciseLogs: [],
  workoutSessions: [],
  workoutTemplates: [],
  customExercises: [],
  muscleGroupRatings: [],
  goals: [],
  personalRecords: [],
};

const creator: StateCreator<State & Actions> = (set, get) => ({
  ...initialState,
  
  // Profile
  setHeight: (heightCm: number | null) => set((s) => ({ profile: { ...s.profile, heightCm } })),
  updateProfile: (updates: Partial<Profile>) => set((s) => ({ profile: { ...s.profile, ...updates } })),
  
  // Weight
  addWeight: (weight: number, date?: string) =>
    set((s) => ({
      weightEntries: [
        ...s.weightEntries,
        { id: uid(), date: date ?? new Date().toISOString(), weight },
      ],
    })),
  removeWeight: (id: string) => set((s) => ({ weightEntries: s.weightEntries.filter((w) => w.id !== id) })),
  
  // Exercises
  addExercise: (log: Omit<ExerciseLog, 'id'>) => {
    const newLog = { ...log, id: uid() };
    set((s) => {
      // Check for new personal record
      const existingPR = s.personalRecords.find(pr => pr.exerciseId === log.exerciseId);
      const newVolume = log.weight * log.reps;
      
      let updatedPRs = [...s.personalRecords];
      if (!existingPR || newVolume > existingPR.volume) {
        updatedPRs = updatedPRs.filter(pr => pr.exerciseId !== log.exerciseId);
        updatedPRs.push({
          id: uid(),
          exerciseId: log.exerciseId,
          exerciseName: log.exerciseName,
          weight: log.weight,
          reps: log.reps,
          date: log.date,
          volume: newVolume,
        });
      }
      
      // Update muscle group rating
      let updatedRatings = [...s.muscleGroupRatings];
      const existingRating = updatedRatings.find(r => r.muscleGroup === log.primaryMuscle);
      if (existingRating) {
        existingRating.totalVolume += newVolume;
        existingRating.workoutCount += 1;
        existingRating.lastUpdated = new Date().toISOString();
      } else {
        updatedRatings.push({
          muscleGroup: log.primaryMuscle,
          level: 1,
          lastUpdated: new Date().toISOString(),
          totalVolume: newVolume,
          workoutCount: 1,
        });
      }
      
      return { 
        exerciseLogs: [...s.exerciseLogs, newLog],
        personalRecords: updatedPRs,
        muscleGroupRatings: updatedRatings,
      };
    });
  },
  removeExercise: (id: string) => set((s) => ({ exerciseLogs: s.exerciseLogs.filter((e) => e.id !== id) })),
  
  addCustomExercise: (exercise: Omit<ExerciseDefinition, 'id' | 'isCustom'>) =>
    set((s) => ({ 
      customExercises: [...s.customExercises, { ...exercise, id: uid(), isCustom: true }] 
    })),
  removeCustomExercise: (id: string) => 
    set((s) => ({ customExercises: s.customExercises.filter((e) => e.id !== id) })),
  
  getAllExercises: () => {
    const state = get();
    return [...PREDEFINED_EXERCISES, ...state.customExercises];
  },
  
  // Workout Sessions
  startWorkoutSession: (name: string) => {
    const sessionId = uid();
    set((s) => ({
      workoutSessions: [...s.workoutSessions, {
        id: sessionId,
        name,
        date: new Date().toISOString(),
        startTime: new Date().toISOString(),
        exercises: [],
        totalVolume: 0,
      }]
    }));
    return sessionId;
  },
  
  endWorkoutSession: (sessionId: string) => {
    set((s) => ({
      workoutSessions: s.workoutSessions.map(session => {
        if (session.id === sessionId) {
          const endTime = new Date().toISOString();
          const start = new Date(session.startTime);
          const end = new Date(endTime);
          const duration = Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
          return { ...session, endTime, duration };
        }
        return session;
      })
    }));
  },
  
  addExerciseToSession: (sessionId: string, exercise: Omit<ExerciseLog, 'id' | 'workoutSessionId'>) => {
    const exerciseLog = { ...exercise, id: uid(), workoutSessionId: sessionId };
    const volume = exercise.sets * exercise.reps * exercise.weight;
    
    set((s) => ({
      workoutSessions: s.workoutSessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            exercises: [...session.exercises, exerciseLog],
            totalVolume: session.totalVolume + volume,
          };
        }
        return session;
      }),
      exerciseLogs: [...s.exerciseLogs, exerciseLog],
    }));
    
    // Also add the exercise normally to trigger PR and muscle rating updates
    get().addExercise(exercise);
  },
  
  // Templates & Programs
  addWorkoutTemplate: (template: Omit<WorkoutTemplate, 'id'>) =>
    set((s) => ({ workoutTemplates: [...s.workoutTemplates, { ...template, id: uid() }] })),
  removeWorkoutTemplate: (id: string) => 
    set((s) => ({ workoutTemplates: s.workoutTemplates.filter((t) => t.id !== id) })),
  
  getAllPrograms: () => {
    const state = get();
    return [...PREDEFINED_PROGRAMS, ...state.workoutTemplates];
  },
  
  // Muscle Group Ratings
  updateMuscleRating: (muscleGroup: MuscleGroup, level: number) => {
    set((s) => {
      const existing = s.muscleGroupRatings.find(r => r.muscleGroup === muscleGroup);
      if (existing) {
        return {
          muscleGroupRatings: s.muscleGroupRatings.map(r =>
            r.muscleGroup === muscleGroup
              ? { ...r, level, lastUpdated: new Date().toISOString() }
              : r
          )
        };
      } else {
        return {
          muscleGroupRatings: [...s.muscleGroupRatings, {
            muscleGroup,
            level,
            lastUpdated: new Date().toISOString(),
            totalVolume: 0,
            workoutCount: 0,
          }]
        };
      }
    });
  },
  
  getMuscleRating: (muscleGroup: MuscleGroup) => {
    return get().muscleGroupRatings.find(r => r.muscleGroup === muscleGroup);
  },
  
  calculateMuscleStats: (muscleGroup: MuscleGroup): MuscleGroupStats => {
    const state = get();
    const logs = state.exerciseLogs.filter(log => log.primaryMuscle === muscleGroup);
    
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const weeklyLogs = logs.filter(log => new Date(log.date) >= oneWeekAgo);
    const monthlyLogs = logs.filter(log => new Date(log.date) >= oneMonthAgo);
    
    const weeklyVolume = weeklyLogs.reduce((sum, log) => sum + (log.sets * log.reps * log.weight), 0);
    const monthlyVolume = monthlyLogs.reduce((sum, log) => sum + (log.sets * log.reps * log.weight), 0);
    const totalSets = logs.reduce((sum, log) => sum + log.sets, 0);
    const totalReps = logs.reduce((sum, log) => sum + (log.sets * log.reps), 0);
    const averageWeight = logs.length > 0 
      ? logs.reduce((sum, log) => sum + log.weight, 0) / logs.length 
      : 0;
    
    const uniqueDays = new Set(logs.map(log => new Date(log.date).toDateString())).size;
    const weeksTracked = Math.max(1, Math.ceil(uniqueDays / 7));
    const workoutFrequency = uniqueDays / weeksTracked;
    
    const lastLog = logs.length > 0 ? logs[logs.length - 1].date : undefined;
    
    return {
      muscleGroup,
      weeklyVolume,
      monthlyVolume,
      totalSets,
      totalReps,
      averageWeight: parseFloat(averageWeight.toFixed(1)),
      workoutFrequency: parseFloat(workoutFrequency.toFixed(1)),
      lastTrained: lastLog,
    };
  },
  
  // Goals
  addGoal: (goal: Omit<Goal, 'id'>) =>
    set((s) => ({ goals: [...s.goals, { ...goal, id: uid() }] })),
  updateGoal: (id: string, updates: Partial<Goal>) =>
    set((s) => ({ 
      goals: s.goals.map((g) => g.id === id ? { ...g, ...updates } : g) 
    })),
  removeGoal: (id: string) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
  
  // Personal Records
  addPersonalRecord: (record: Omit<PersonalRecord, 'id' | 'volume'>) =>
    set((s) => ({ 
      personalRecords: [...s.personalRecords, { 
        ...record, 
        id: uid(), 
        volume: record.weight * record.reps 
      }] 
    })),
  updatePersonalRecord: (id: string, updates: Partial<PersonalRecord>) =>
    set((s) => ({ 
      personalRecords: s.personalRecords.map((pr) => pr.id === id ? { ...pr, ...updates } : pr) 
    })),
  
  // Data Management
  exportData: async () => {
    const state = get();
    return JSON.stringify({
      version: '2.0',
      exportDate: new Date().toISOString(),
      profile: state.profile,
      weightEntries: state.weightEntries,
      exerciseLogs: state.exerciseLogs,
      workoutSessions: state.workoutSessions,
      workoutTemplates: state.workoutTemplates,
      customExercises: state.customExercises,
      muscleGroupRatings: state.muscleGroupRatings,
      goals: state.goals,
      personalRecords: state.personalRecords,
    }, null, 2);
  },
  
  importData: (data: string, mergeMode: 'replace' | 'merge' = 'replace') => {
    try {
      const parsed = JSON.parse(data);
      
      if (mergeMode === 'replace') {
        set({
          profile: parsed.profile || initialState.profile,
          weightEntries: parsed.weightEntries || [],
          exerciseLogs: parsed.exerciseLogs || [],
          workoutSessions: parsed.workoutSessions || [],
          workoutTemplates: parsed.workoutTemplates || [],
          customExercises: parsed.customExercises || [],
          muscleGroupRatings: parsed.muscleGroupRatings || [],
          goals: parsed.goals || [],
          personalRecords: parsed.personalRecords || [],
        });
      } else {
        // Merge mode: combine data without duplicates
        set((s) => ({
          weightEntries: [...s.weightEntries, ...(parsed.weightEntries || [])],
          exerciseLogs: [...s.exerciseLogs, ...(parsed.exerciseLogs || [])],
          workoutSessions: [...s.workoutSessions, ...(parsed.workoutSessions || [])],
          workoutTemplates: [...s.workoutTemplates, ...(parsed.workoutTemplates || [])],
          customExercises: [...s.customExercises, ...(parsed.customExercises || [])],
          goals: [...s.goals, ...(parsed.goals || [])],
        }));
      }
    } catch (e) {
      console.error('Failed to import data', e);
      throw new Error('Invalid data format');
    }
  },
});

type Store = State & Actions;
type PartialStore = Pick<State, 'profile' | 'weightEntries' | 'exerciseLogs' | 'workoutSessions' | 'workoutTemplates' | 'customExercises' | 'muscleGroupRatings' | 'goals' | 'personalRecords'>;

export const useGymStore = create<Store>()(
  persist<Store, [], [], PartialStore>(creator as any, {
    name: 'gym-tracker-pro-v2',
    partialize: (s) => ({ 
      profile: s.profile, 
      weightEntries: s.weightEntries, 
      exerciseLogs: s.exerciseLogs,
      workoutSessions: s.workoutSessions,
      workoutTemplates: s.workoutTemplates,
      customExercises: s.customExercises,
      muscleGroupRatings: s.muscleGroupRatings,
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

export const useWeightEntriesSorted = () => useGymStore(weightEntriesSortedSelector as (s: State & Actions) => any);

// Keep backward compatibility with old store
export const useStore = useGymStore;
