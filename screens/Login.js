import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Alert } from 'react-native'
import firebase from '@react-native-firebase/app'


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = async (email , password) => {
      try {
        let response = await firebase.auth().signInWithEmailAndPassword( this.state.email, this.state.password)
        if (response) {
          Alert.alert('Success', 'Authenticated successfully')
        }
      } catch (e) {
        console.error(e.message)
      }
    console.log('handleLogin')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('./skoda.png')}/>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        
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
    height: 150,
  }
})