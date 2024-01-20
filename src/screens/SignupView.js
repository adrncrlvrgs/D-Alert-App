import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"

function SignupView() {

  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center relative top-80">
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

export default SignupView
