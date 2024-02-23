import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const DetectObject = () => {
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
      console.log(result);
    } catch (error) {
      console.error('Error picking Image: ', error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        Alert('No image detected');
        return;
      }

      const apiKey = "AIzaSyDkfMmxkxeqjPY2dgWFG5OBxFEBbH5L1hg"; // Security note: Store API keys securely
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        request: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData);
      setLabels(apiResponse.data.responses[0].labelAnnotations);
    } catch (error) {
      console.error('Error while analyzing the image: ', error);
      Alert('Error while analyzing the image. Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DetectIt</Text> {/* Corrected typo */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      )}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.text}>Choose an Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.text}>Analyze Image</Text> {/* Corrected typo */}
      </TouchableOpacity>
    </View>
  );
};

export default DetectObject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 100,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Optional: Adjust image sizing and aspect ratio
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10, // Made consistent
    marginTop: 20,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});
