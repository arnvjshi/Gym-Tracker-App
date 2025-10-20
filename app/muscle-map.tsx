import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useGymStore } from '@/src/store/useGymStore';
import { AnimatedBackground } from '@/src/components/ThreeBackground';
import { MuscleGroup } from '@/src/types';
import { useMemo, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryPie } from 'victory-native';

const { width } = Dimensions.get('window');

const ALL_MUSCLE_GROUPS: MuscleGroup[] = [
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Forearms',
  'Quads', 'Hamstrings', 'Calves', 'Glutes', 'Abs', 'Obliques', 'Traps', 'Lats'
];

export default function MuscleMapScreen() {
  const muscleRatings = useGymStore((s) => s.muscleGroupRatings);
  const calculateMuscleStats = useGymStore((s) => s.calculateMuscleStats);
  const updateMuscleRating = useGymStore((s) => s.updateMuscleRating);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);

  const muscleStats = useMemo(() => {
    return ALL_MUSCLE_GROUPS.map(muscle => {
      const rating = muscleRatings.find(r => r.muscleGroup === muscle);
      const stats = calculateMuscleStats(muscle);
      return {
        muscle,
        level: rating?.level || 1,
        ...stats,
      };
    }).sort((a, b) => b.weeklyVolume - a.weeklyVolume);
  }, [muscleRatings, calculateMuscleStats]);

  const volumeDistribution = useMemo(() => {
    return muscleStats
      .filter(m => m.weeklyVolume > 0)
      .slice(0, 6)
      .map(m => ({
        x: m.muscle,
        y: m.weeklyVolume,
        label: `${m.muscle}\n${m.weeklyVolume.toFixed(0)}kg`,
      }));
  }, [muscleStats]);

  const handleRatingChange = (muscle: MuscleGroup, direction: 'up' | 'down') => {
    const current = muscleRatings.find(r => r.muscleGroup === muscle)?.level || 1;
    const newLevel = direction === 'up' 
      ? Math.min(10, current + 1) 
      : Math.max(1, current - 1);
    updateMuscleRating(muscle, newLevel);
  };

  const renderMuscleCard = (stats: typeof muscleStats[0]) => {
    const isSelected = selectedMuscle === stats.muscle;
    
    return (
      <TouchableOpacity
        key={stats.muscle}
        style={[styles.muscleCard, isSelected && styles.muscleCardSelected]}
        onPress={() => setSelectedMuscle(isSelected ? null : stats.muscle)}
      >
        <View style={styles.muscleHeader}>
          <Text style={styles.muscleName}>{stats.muscle}</Text>
          <View style={styles.levelContainer}>
            <TouchableOpacity onPress={() => handleRatingChange(stats.muscle, 'down')}>
              <Text style={styles.levelButton}>−</Text>
            </TouchableOpacity>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv {stats.level}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRatingChange(stats.muscle, 'up')}>
              <Text style={styles.levelButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(stats.level / 10) * 100}%` }]} />
        </View>

        {isSelected && (
          <View style={styles.muscleDetails}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Weekly Volume:</Text>
              <Text style={styles.statValue}>{stats.weeklyVolume.toFixed(0)} kg</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Monthly Volume:</Text>
              <Text style={styles.statValue}>{stats.monthlyVolume.toFixed(0)} kg</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Sets:</Text>
              <Text style={styles.statValue}>{stats.totalSets}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Average Weight:</Text>
              <Text style={styles.statValue}>{stats.averageWeight} kg</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Frequency:</Text>
              <Text style={styles.statValue}>{stats.workoutFrequency}x/week</Text>
            </View>
            {stats.lastTrained && (
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Last Trained:</Text>
                <Text style={styles.statValue}>{new Date(stats.lastTrained).toLocaleDateString()}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <AnimatedBackground />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Muscle Development</Text>

        {volumeDistribution.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Volume Distribution</Text>
            <VictoryPie
              data={volumeDistribution}
              colorScale={['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16']}
              style={{
                labels: { fill: '#e5e7eb', fontSize: 12 }
              }}
              width={width - 64}
              height={220}
            />
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Volume by Muscle Group</Text>
          {muscleStats.filter(m => m.weeklyVolume > 0).length > 0 ? (
            <VictoryChart 
              theme={VictoryTheme.material} 
              domainPadding={{ x: 20 }}
              width={width - 64}
              height={250}
            >
              <VictoryAxis 
                tickFormat={(t) => t.length > 6 ? t.substring(0, 6) : t}
                style={{ 
                  tickLabels: { fill: '#9ca3af', fontSize: 10, angle: -45, textAnchor: 'end' },
                  axis: { stroke: '#374151' }
                }} 
              />
              <VictoryAxis 
                dependentAxis 
                style={{ 
                  tickLabels: { fill: '#9ca3af', fontSize: 10 },
                  axis: { stroke: '#374151' },
                  grid: { stroke: '#1f2937', strokeDasharray: '5,5' }
                }} 
              />
              <VictoryBar 
                data={muscleStats.filter(m => m.weeklyVolume > 0).map(m => ({ x: m.muscle, y: m.weeklyVolume }))}
                style={{ data: { fill: '#22c55e' } }}
              />
            </VictoryChart>
          ) : (
            <Text style={styles.emptyText}>No workout data yet. Start training!</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Muscle Groups</Text>
        {muscleStats.map(renderMuscleCard)}

        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Level Guide</Text>
          <Text style={styles.legendText}>Level 1-3: Beginner</Text>
          <Text style={styles.legendText}>Level 4-6: Intermediate</Text>
          <Text style={styles.legendText}>Level 7-9: Advanced</Text>
          <Text style={styles.legendText}>Level 10: Elite</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: 16, gap: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#f9fafb', textShadowColor: 'rgba(34, 197, 94, 0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  card: { backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#22c55e', marginBottom: 12, alignSelf: 'flex-start' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#22c55e', marginTop: 8 },
  muscleCard: { backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)', gap: 12 },
  muscleCardSelected: { borderColor: '#22c55e', borderWidth: 2 },
  muscleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  muscleName: { fontSize: 18, fontWeight: '700', color: '#f9fafb' },
  levelContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelButton: { fontSize: 24, fontWeight: '700', color: '#22c55e', paddingHorizontal: 8 },
  levelBadge: { backgroundColor: 'rgba(34, 197, 94, 0.2)', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#22c55e' },
  levelText: { fontSize: 14, fontWeight: '700', color: '#22c55e' },
  progressBar: { height: 8, backgroundColor: 'rgba(17, 24, 39, 0.8)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#22c55e', borderRadius: 4 },
  muscleDetails: { gap: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(34, 197, 94, 0.2)' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { color: '#9ca3af', fontSize: 14 },
  statValue: { color: '#e5e7eb', fontSize: 14, fontWeight: '600' },
  legendCard: { backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)', gap: 8 },
  legendTitle: { fontSize: 16, fontWeight: '700', color: '#22c55e', marginBottom: 8 },
  legendText: { color: '#9ca3af', fontSize: 14 },
  emptyText: { color: '#6b7280', textAlign: 'center', paddingVertical: 32 },
});
