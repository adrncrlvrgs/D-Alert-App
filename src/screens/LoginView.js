import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"

function LoginView() {

  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center relative top-80">
      <Text>This is the login screen</Text>

      <TouchableOpacity className="ml-5"
          onPress={() => {
            navigation.navigate("Signup")
          }}
        >
          <Text className="text-blue-500 text-lg font-bold">GO TO SIGN UP PAGE</Text>
        </TouchableOpacity>


    </View>
  )
}

export default LoginView
