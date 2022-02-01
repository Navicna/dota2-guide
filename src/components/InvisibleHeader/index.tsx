import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export function InvisibleHeader() {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>Back</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  arrow: {
    color: 'white',
    fontSize: 20,
  },
  arrowContainer: {
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
