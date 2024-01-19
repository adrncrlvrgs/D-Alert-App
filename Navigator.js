import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './src/screens/HomeView';
import LoginView from './src/screens/LoginView';
import SignupView from './src/screens/SignupView';

const Stack = createNativeStackNavigator();


function Navigator() {


  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold',},}}
>

    <Stack.Screen name="Home" component={HomeView} options={{title: 'WELCOME' }} />
    <Stack.Screen name="Login" component={LoginView} options={{title: 'LOGIN' }} />
    <Stack.Screen name="Signup" component={SignupView} options={{title: 'SIGNUP' }} />

    </Stack.Navigator>
  )
}

export default Navigator
