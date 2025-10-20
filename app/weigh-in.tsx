import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useStore, useWeightEntriesSorted } from '@/src/store/useStore';
import { AnimatedBackground } from '@/src/components/ThreeBackground';

export default function WeighInScreen() {
  const addWeight = useStore((s) => s.addWeight);
  const removeWeight = useStore((s) => s.removeWeight);
  const data = useWeightEntriesSorted();
  const [weight, setWeight] = useState('');

  const handleAdd = () => {
    const w = parseFloat(weight);
    if (!isNaN(w) && w > 0) {
      addWeight(w);
      setWeight('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <AnimatedBackground />
      <View style={styles.container}>
        <Text style={styles.title}>Weigh-In</Text>
        <View style={styles.inputCard}>
          <Text style={styles.subtitle}>Add New Entry</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              placeholderTextColor="#6b7280"
              keyboardType="decimal-pad"
              value={weight}
              onChangeText={setWeight}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={[...data].reverse()}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No entries yet. Add your first weigh-in!</Text>
            </View>
          }
          renderItem={({ item, index }) => {
            const prev = data[data.findIndex((d: any) => d.id === item.id) - 1];
            const change = prev ? (item.weight - prev.weight).toFixed(1) : null;
            
            return (
              <View style={styles.item}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemDate}>{new Date(item.date).toLocaleDateString()}</Text>
                  <View style={styles.itemStats}>
                    <Text style={styles.itemWeight}>{item.weight} kg</Text>
                    {change !== null && (
                      <Text style={[styles.itemChange, parseFloat(change) >= 0 ? styles.changePositive : styles.changeNegative]}>
                        {parseFloat(change) >= 0 ? '+' : ''}{change} kg
                      </Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => removeWeight(item.id)}>
                  <Text style={styles.deleteButtonText}>DELETE</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, padding: 16, gap: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#f9fafb', textShadowColor: 'rgba(34, 197, 94, 0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  subtitle: { fontSize: 16, fontWeight: '600', color: '#22c55e', marginBottom: 12 },
  inputCard: { backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  input: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e5e7eb', padding: 14, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.3)' },
  addButton: { backgroundColor: '#22c55e', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, elevation: 4, shadowColor: '#22c55e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  addButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 14 },
  item: { backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  itemContent: { flex: 1 },
  itemDate: { color: '#9ca3af', fontSize: 12, marginBottom: 4 },
  itemStats: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemWeight: { color: '#e5e7eb', fontSize: 20, fontWeight: '700' },
  itemChange: { fontSize: 14, fontWeight: '600' },
  changePositive: { color: '#22c55e' },
  changeNegative: { color: '#ef4444' },
  deleteButton: { backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ef4444' },
  deleteButtonText: { color: '#ef4444', fontWeight: '600', fontSize: 12 },
  emptyState: { padding: 32, alignItems: 'center' },
  emptyText: { color: '#6b7280', textAlign: 'center' },
});
