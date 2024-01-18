import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"

function SignupView() {

  const navigation = useNavigation();

  return (
    <View style={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', position: 'relative', top: '40%'}}>
      <Text>This the signup screen</Text>

      <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("Home")
          }}
        >
          <Text style={{ color: '#06b6d4', fontSize: 16, fontWeight: 'bold' }}>GO BACK TO HOME</Text>
        </TouchableOpacity>

    </View>
  )
}

export default SignupView
