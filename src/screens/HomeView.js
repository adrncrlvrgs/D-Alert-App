import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"

function HomeView() {

  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center relative top-60">
      <Text> D-ALERT LOGO </Text>

      <TouchableOpacity className="ml-5 mt-60"
          onPress={() => {
            navigation.navigate("Login")
          }}
        >
          <Text className="text-blue-500 text-lg font-bold">LOG IN</Text>
        </TouchableOpacity>
    </View>
  )
}

export default HomeView
