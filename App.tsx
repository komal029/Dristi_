import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system'; // Correct import name: FileSystem
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import DetectObject from './src';


export default function App() {
  return (
    <View style={styles.container}>
      <DetectObject />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
