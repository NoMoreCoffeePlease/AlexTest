import React, {useState} from 'react';
import {StyleSheet, TextInput, Image, Text, View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Main = () => {
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = () => {
    const userDocument = firestore()
      .collection('Info')
      .add({
        number: number,
        country: country,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>We need your infos!</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Number"
          onChangeText={(number) => setNumber({number})}
          value={number}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Country"
          onChangeText={(country) => setCountry({country})}
          value={country}
        />
        <Button title="Submit" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
  },
  textInput: {
    marginLeft: 20,
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});

export default Main;
