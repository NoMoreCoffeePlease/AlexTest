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
  const [name, setName] = useState('');


  const handleSubmit = () => {

  const id = route.params.id;
    const userDocument = firestore()
      .collection('Info').doc(id)
      .set({
        number: number,
        country: country,
      })
      .then(() => {
        console.log('User added!',s);
      });
      console.log('user', userDocument)
  };

  const logOut = () => {
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }

const updateSubmit = () => {
  firestore()
  .collection('Prezenta')
  .doc('Semnaturi')
  .update({
    Nume: name,
  }) 
  .then((ceva) => {
    console.log('User updated!',ceva);
  });
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

  const deleteFunction = async () => {
    const id = route.params.id;
    firestore()
  .collection('Delete')
  .doc(id)
  .delete({})
  .then(() => {
    console.log('User deleted!');
  });
  }

  const addToDelete = async () => {
    const id = route.params.id;
    const userDocument = firestore()
      .collection('Delete').doc(id)
      .set({
       delete: 'sters'
      })
      .then(() => {
        console.log('User added!');
      });
  }

  const getUsers = () => {
    const id = route.params.id;
    const users = firestore()
    .collection('users').doc(id)
    .update({
      id: route.params.id
    })
    
    const getUsers = 
    firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
  
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id);
      });
    });
  
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
        <Text style={styles.text}>Prezenta! Semneaza aici: </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Numele"
          onChangeText={(name) => setName({name})}
          value={country}
        />
        <Button title="Update form" onPress={() => updateSubmit()} />
        <Button title="Add function for delete" onPress={() => addToDelete()} />

        <Button title="Delete function" onPress={() => deleteFunction()} />
        <Button title="Users" onPress={() => getUsers()} />


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
