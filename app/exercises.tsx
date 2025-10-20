import { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Pressable } from 'react-native';
import { useStore } from '@/src/store/useStore';
import type { MuscleGroup } from '@/src/types';

const groups: MuscleGroup[] = ['Chest','Back','Shoulders','Arms','Legs','Core','Full Body','Other'];

export default function ExercisesScreen() {
  const addExercise = useStore((s) => s.addExercise);
  const removeExercise = useStore((s) => s.removeExercise);
  const logs = useStore((s) => s.exerciseLogs);
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('Chest');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [weight, setWeight] = useState('20');

  const filtered = useMemo(() => logs.filter((l) => l.muscleGroup === muscleGroup), [logs, muscleGroup]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Exercise</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {groups.map((g) => (
          <Pressable key={g} onPress={() => setMuscleGroup(g)} style={[styles.chip, muscleGroup === g && styles.chipActive]}>
            <Text style={[styles.chipText, muscleGroup === g && styles.chipTextActive]}>{g}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput style={styles.input} placeholder="Exercise name" placeholderTextColor="#6b7280" value={name} onChangeText={setName} />
      <View style={styles.row}>
        <TextInput style={styles.input} keyboardType="number-pad" placeholder="Sets" placeholderTextColor="#6b7280" value={sets} onChangeText={setSets} />
        <TextInput style={styles.input} keyboardType="number-pad" placeholder="Reps" placeholderTextColor="#6b7280" value={reps} onChangeText={setReps} />
        <TextInput style={styles.input} keyboardType="decimal-pad" placeholder="Weight (kg)" placeholderTextColor="#6b7280" value={weight} onChangeText={setWeight} />
      </View>
      <Button title="Add Log" onPress={() => {
        const s = parseInt(sets, 10);
        const r = parseInt(reps, 10);
        const w = parseFloat(weight);
        if (name && !isNaN(s) && !isNaN(r) && !isNaN(w)) {
          addExercise({ name, muscleGroup, sets: s, reps: r, weight: w, date: new Date().toISOString() });
          setName('');
        }
      }} />

      <Text style={styles.subtitle}>Recent ({muscleGroup})</Text>
      <FlatList
        data={[...filtered].reverse()}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{new Date(item.date).toLocaleDateString()} — {item.name} • {item.sets}x{item.reps} @ {item.weight}kg</Text>
            <Button title="Delete" color="#ef4444" onPress={() => removeExercise(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#e5e7eb' },
  subtitle: { color: '#9ca3af', marginTop: 12 },
  row: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#111827', color: '#e5e7eb', padding: 10, borderRadius: 8 },
  item: { backgroundColor: '#111827', padding: 12, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: '#e5e7eb' },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 9999, backgroundColor: '#1f2937' },
  chipActive: { backgroundColor: '#22c55e33' },
  chipText: { color: '#e5e7eb' },
  chipTextActive: { color: '#22c55e', fontWeight: '700' },
});
