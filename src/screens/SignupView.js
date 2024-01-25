import React,{useState} from 'react'
import { View, TextInput, Button, Text, Alert,TouchableOpacity } from 'react-native';


const SignUpView = () =>  {


  return (
    <View className="flex justify-center items-center relative top-20">
      <Text>This the signup screen</Text>


      <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("Home")
          }}
        >
          <Text className="text-blue-500 text-lg font-bold">GO BACK TO HOME</Text>
      </TouchableOpacity>
    </View>
  )
}


export default SignUpView
