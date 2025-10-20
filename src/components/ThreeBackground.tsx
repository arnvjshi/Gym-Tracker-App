import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export function AnimatedBackground() {
  const particles = useRef<Animated.Value[]>([]);
  const particleCount = 20;

  useEffect(() => {
    // Create animated values for particles
    for (let i = 0; i < particleCount; i++) {
      particles.current.push(new Animated.Value(0));
    }

    // Animate particles
    particles.current.forEach((particle, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(particle, {
            toValue: 1,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(particle, {
            toValue: 0,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {particles.current.map((particle, index) => {
        const translateY = particle.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -height],
        });
        const opacity = particle.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.3, 0.8, 0.3],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: Math.random() * width,
                top: height + Math.random() * 200,
                transform: [{ translateY }],
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0b1220',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
