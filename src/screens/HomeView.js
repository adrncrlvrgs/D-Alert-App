import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"

function HomeView() {
  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center relative top-60">
      <Text> Dasboard </Text>
    </View>
  )
}

export default HomeView
