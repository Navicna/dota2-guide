import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export function LoadingScreen() {
  return (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    backgroundColor: Colors.darker,
    justifyContent: 'center',
  },
});
