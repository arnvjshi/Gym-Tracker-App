import { View, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import type { WeightEntry } from '@/src/types';

export function WeightChart({ data }: { data: WeightEntry[] }) {
  if (!data.length) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#9ca3af' }}>No data yet. Add a weigh-in!</Text>
      </View>
    );
  }

  const points = data.map((d) => ({ x: new Date(d.date), y: d.weight }));

  return (
    <VictoryChart theme={VictoryTheme.material} scale={{ x: 'time' }}>
      <VictoryAxis tickFormat={(t) => `${t.getMonth() + 1}/${t.getDate()}`} style={{ tickLabels: { fill: '#9ca3af' } }} />
      <VictoryAxis dependentAxis style={{ tickLabels: { fill: '#9ca3af' } }} />
      <VictoryLine data={points} style={{ data: { stroke: '#22c55e' } }} />
    </VictoryChart>
  );
}
