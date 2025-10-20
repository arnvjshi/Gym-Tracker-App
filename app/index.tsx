import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStore, useWeightEntriesSorted } from '@/src/store/useStore';
import { useGymStore } from '@/src/store/useGymStore';
import { WeightChart } from '@/src/ui/WeightChart';
import { AnimatedBackground } from '@/src/components/ThreeBackground';
import { useMemo } from 'react';
import { MuscleGroup } from '@/src/types';
import { router } from 'expo-router';

export default function HomeScreen() {
  const weightEntries = useWeightEntriesSorted();
  const exerciseLogs = useStore((s) => s.exerciseLogs);
  const goals = useStore((s) => s.goals);
  const profile = useStore((s) => s.profile);
  const calculateMuscleStats = useGymStore((s) => s.calculateMuscleStats);
  const getMuscleRating = useGymStore((s) => s.getMuscleRating);
  
  const latest = weightEntries[weightEntries.length - 1];
  const first = weightEntries[0];
  
  const muscleGroups: MuscleGroup[] = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Quads', 'Hamstrings', 'Calves'];
  
  const stats = useMemo(() => {
    const totalWorkouts = exerciseLogs.length;
    const weightChange = latest && first ? (latest.weight - first.weight).toFixed(1) : '0';
    const activeGoals = goals.filter(g => !g.completed).length;
    
    let bmi = null;
    if (latest && profile.heightCm) {
      const heightM = profile.heightCm / 100;
      bmi = (latest.weight / (heightM * heightM)).toFixed(1);
    }
    
    // Calculate muscle development stats
    const muscleStats = muscleGroups.map(muscle => {
      const ratingObj = getMuscleRating(muscle);
      const rating = ratingObj?.level || 0;
      return {
        muscle,
        rating,
        stats: calculateMuscleStats(muscle)
      };
    }).sort((a, b) => b.rating - a.rating);
    
    const topMuscles = muscleStats.slice(0, 3);
    const laggingMuscles = muscleStats.filter(m => m.rating > 0).sort((a, b) => a.rating - b.rating).slice(0, 2);
    
    const totalVolume = muscleStats.reduce((sum, m) => sum + m.stats.weeklyVolume, 0);
    const averageRating = muscleStats.reduce((sum, m) => sum + m.rating, 0) / muscleStats.length;
    
    return { 
      totalWorkouts, 
      weightChange, 
      activeGoals, 
      bmi, 
      topMuscles, 
      laggingMuscles, 
      totalVolume,
      averageRating: averageRating.toFixed(1)
    };
  }, [exerciseLogs, weightEntries, goals, profile, latest, first, calculateMuscleStats, getMuscleRating]);

  return (
    <View style={styles.wrapper}>
      <AnimatedBackground />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Weekly Volume</Text>
            <Text style={styles.statValue}>{stats.totalVolume.toFixed(0)} kg</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Workouts</Text>
            <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Muscle Balance</Text>
            <Text style={styles.statValue}>{stats.averageRating}/10</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Current Weight</Text>
            <Text style={styles.statValue}>{latest ? `${latest.weight} kg` : '--'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/muscle-map')}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>💪 Top Developed Muscles</Text>
            <Text style={styles.viewMore}>View All →</Text>
          </View>
          {stats.topMuscles.length > 0 ? (
            stats.topMuscles.map((item, idx) => (
              <View key={item.muscle} style={styles.muscleRow}>
                <View style={styles.muscleRank}>
                  <Text style={styles.muscleRankText}>{idx + 1}</Text>
                </View>
                <View style={styles.muscleInfo}>
                  <Text style={styles.muscleName}>{item.muscle}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(item.rating / 10) * 100}%` }]} />
                  </View>
                </View>
                <Text style={styles.muscleLevel}>Lv {item.rating}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No workouts logged yet. Start training!</Text>
          )}
        </TouchableOpacity>

        {stats.laggingMuscles.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚠️ Needs Attention</Text>
            {stats.laggingMuscles.map((item) => (
              <View key={item.muscle} style={styles.laggingRow}>
                <Text style={styles.laggingMuscle}>{item.muscle}</Text>
                <Text style={styles.laggingLevel}>Lv {item.rating}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weight Progress</Text>
          <WeightChart data={weightEntries} />
          <View style={styles.weightSummary}>
            <View>
              <Text style={styles.weightLabel}>Change</Text>
              <Text style={[styles.weightValue, parseFloat(stats.weightChange) >= 0 ? styles.positive : styles.negative]}>
                {parseFloat(stats.weightChange) >= 0 ? '+' : ''}{stats.weightChange} kg
              </Text>
            </View>
            {stats.bmi && (
              <View>
                <Text style={styles.weightLabel}>BMI</Text>
                <Text style={styles.weightValue}>{stats.bmi}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week</Text>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatLabel}>Workouts Completed</Text>
            <Text style={styles.quickStatValue}>
              {exerciseLogs.filter(log => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(log.date) >= weekAgo;
              }).length}
            </Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatLabel}>Active Goals</Text>
            <Text style={styles.quickStatValue}>{stats.activeGoals}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: 16, gap: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#f9fafb', textShadowColor: 'rgba(34, 197, 94, 0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  card: { backgroundColor: 'rgba(17, 24, 39, 0.8)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#22c55e' },
  viewMore: { color: '#22c55e', fontSize: 12, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  statLabel: { color: '#9ca3af', fontSize: 12, marginBottom: 4 },
  statValue: { color: '#e5e7eb', fontSize: 24, fontWeight: '700' },
  positive: { color: '#22c55e' },
  negative: { color: '#ef4444' },
  muscleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(31, 41, 55, 0.6)', padding: 12, borderRadius: 10, marginBottom: 8 },
  muscleRank: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(34, 197, 94, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  muscleRankText: { color: '#22c55e', fontWeight: '700', fontSize: 14 },
  muscleInfo: { flex: 1, marginRight: 12 },
  muscleName: { color: '#f9fafb', fontSize: 15, fontWeight: '600', marginBottom: 6 },
  progressBar: { height: 6, backgroundColor: 'rgba(31, 41, 55, 0.8)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#22c55e', borderRadius: 3 },
  muscleLevel: { color: '#22c55e', fontSize: 16, fontWeight: '700' },
  laggingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(239, 68, 68, 0.1)' },
  laggingMuscle: { color: '#f9fafb', fontSize: 14, fontWeight: '600' },
  laggingLevel: { color: '#fbbf24', fontSize: 14, fontWeight: '700' },
  weightSummary: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(34, 197, 94, 0.2)' },
  weightLabel: { color: '#9ca3af', fontSize: 12, marginBottom: 4 },
  weightValue: { color: '#e5e7eb', fontSize: 18, fontWeight: '700' },
  emptyText: { color: '#6b7280', textAlign: 'center', paddingVertical: 16, fontStyle: 'italic' },
  quickStat: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(34, 197, 94, 0.1)' },
  quickStatLabel: { color: '#9ca3af' },
  quickStatValue: { color: '#22c55e', fontSize: 16, fontWeight: '700' },
});
