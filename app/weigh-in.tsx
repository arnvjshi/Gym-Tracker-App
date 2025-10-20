import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useStore, useWeightEntriesSorted } from '@/src/store/useStore';

export default function WeighInScreen() {
  const addWeight = useStore((s) => s.addWeight);
  const removeWeight = useStore((s) => s.removeWeight);
  const data = useWeightEntriesSorted();
  const [weight, setWeight] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Weigh-In</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#6b7280"
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={setWeight}
        />
        <Button title="Add" onPress={() => {
          const w = parseFloat(weight);
          if (!isNaN(w)) {
            addWeight(w);
            setWeight('');
          }
        }} />
      </View>

      <FlatList
        data={[...data].reverse()}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{new Date(item.date).toLocaleDateString()} — {item.weight} kg</Text>
            <Button title="Delete" color="#ef4444" onPress={() => removeWeight(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#e5e7eb' },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#111827', color: '#e5e7eb', padding: 10, borderRadius: 8 },
  item: { backgroundColor: '#111827', padding: 12, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: '#e5e7eb' },
});
