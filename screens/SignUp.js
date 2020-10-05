import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import App from '../App';

firebase.initializeApp(App);

export default class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null,id:''};
  
  handleSignUp = async (email, password) => {
    try {
      let response = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      if (response) {
        this.handleFirestore();
      }
    } catch (e) {
      console.error(e.message);
    }
    console.log('handleSignUp');
  };

  handleFirestore = () => {
    console.log('dada');
    const userDocument = firestore()
      .collection('users')
      .add({
        email: this.state.email,
        password: this.state.password,
      })
      .then((doc) => {
        Alert.alert('Success', 'Registration successfully');
        this.props.navigation.navigate('Main',{
          id:doc.id
        });
        console.log('User added! to ',doc.id);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('./skoda.png')} />

        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  img: {
    width: 150,
    height: 150,
  },
});
