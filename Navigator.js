import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Start,Login,SignUp,Home }from './src/screens/index';

const Stack = createNativeStackNavigator();

function Navigator() {

  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold',},}}>
      <Stack.Screen name="Start" component={Start} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: true }} />
      <Stack.Screen name="Signup" component={SignUp} options={{headerShown: true }} />
    </Stack.Navigator>
  )
}

export default Navigator
