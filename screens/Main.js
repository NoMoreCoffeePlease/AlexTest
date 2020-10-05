import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, Image, Text, View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app'


const Main = ({navigation, route}) => {
  console.log(route);
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const handleSubmit = () => {

  const id = route.params.id;
    const userDocument = firestore()
      .collection('Info').doc(id)
      .set({
        number: number,
        country: country,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const logOut = () => {
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }

  const getInfo = async () => {
    const infos = [];
    await firebase.firestore().collection('Info').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        infos.push(doc.data());
      });
      console.log('ss', infos)
      setInfo(infos)

    });
    return infos;
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>You are not logged in!</Text>
        <Button title="Go to login form" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }

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
        <View  style ={styles.distant} />
        <Button title="Log out" onPress={() => logOut()} />
        <View  style ={styles.distant}>
        <Button title="Get info" onPress={() => getInfo() }/> 
        </View>
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
  distant: {
    marginTop: 15
  }
});

export default Main;
