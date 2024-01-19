import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"

function HomeView() {

  const navigation = useNavigation();

  return (
    <View style={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', position: 'relative', top: '40%'}}>
      <Text> logo </Text>

      <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("Login")
          }}
        >
          <Text style={{ color: '#06b6d4', fontSize: 16, fontWeight: 'bold' }}>LOG IN</Text>
        </TouchableOpacity>
    </View>
  )
}

export default HomeView
