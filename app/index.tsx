import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useWeightEntriesSorted } from '@/src/store/useStore';
import { WeightChart } from '@/src/ui/WeightChart';

export default function HomeScreen() {
  const weightEntries = useWeightEntriesSorted();
  const latest = weightEntries[weightEntries.length - 1];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weight Progress</Text>
      <View style={styles.card}>
        <WeightChart data={weightEntries} />
      </View>

      <View style={styles.row}>
        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Latest</Text>
          <Text style={styles.tileValue}>{latest ? `${latest.weight} kg` : '--'}</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Entries</Text>
          <Text style={styles.tileValue}>{weightEntries.length}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#e5e7eb' },
  card: { backgroundColor: '#111827', borderRadius: 12, padding: 8 },
  row: { flexDirection: 'row', gap: 12 },
  tile: { flex: 1, backgroundColor: '#111827', padding: 12, borderRadius: 12 },
  tileLabel: { color: '#9ca3af' },
  tileValue: { color: '#e5e7eb', fontSize: 18, fontWeight: '700' },
});
