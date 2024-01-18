import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"

function LoginView() {

  const navigation = useNavigation();

  return (
    <View style={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', position: 'relative', top: '40%'}}>
      <Text>This is the login screen</Text>

      <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("Signup")
          }}
        >
          <Text style={{ color: '#06b6d4', fontSize: 16, fontWeight: 'bold' }}>GO TO SIGN UP PAGE</Text>
        </TouchableOpacity>


    </View>
  )
}

export default LoginView
