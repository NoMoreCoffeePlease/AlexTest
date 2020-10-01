import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Alert } from 'react-native'
// import firebase from '@react-native-firebase/app'
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = async (email , password) => {
    try {
      let response = await firebase.auth().createUserWithEmailAndPassword( this.state.email, this.state.password)
      if (response) {
        this.handleAdd();
        Alert.alert('Success', 'Registration successfully')
      }
    } catch (e) {
      console.error(e.message)
    }
  console.log('handleSignUp')
}

handleAdd = () => {
  console.log('dada')
  firebase
  .firestore
  .collection('users')
  .add({
    email: this.state.email,
    password: this.state.password
  })
  .then(() => {
    console.log('User added!')
  })
}

render() {
    return (
      <View style={styles.container}>
                <Image style={styles.img} source={require('./skoda.png')}/>

        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  img: {
    width: 150,
    height: 150
  }
})