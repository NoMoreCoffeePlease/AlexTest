import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Main from './screens/Main';
import {roots} from './roots';



const  App = () =>  {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={roots.main}>
        <Stack.Screen name={roots.main} component={Main} />
        <Stack.Screen name={roots.signUp} component={SignUp} />
        <Stack.Screen name={roots.login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
