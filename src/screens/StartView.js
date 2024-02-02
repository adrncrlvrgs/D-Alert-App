import React from 'react'
import {View,TouchableOpacity, StyleSheet,Linking} from 'react-native';
import {useNavigation} from "@react-navigation/core"
import { CusBody, CusButton } from '../../components/index.js';
import { Text, Button, Pressable } from '@react-native-material/core'


function StartView() {

  const navigation = useNavigation();

  return (
    <CusBody
      components={
        <View style={styles.container}>
        <Text> D-ALERT LOGO</Text>
        
        <CusButton
          onPress={()=>{
            navigation.navigate("Login")
          }}
          tittle={'Login'}
          style={{
            marginTop: 60,
            width: 70 
          }}
        />
        {/* <Pressable
          style={styles.button}
          onPress={()=>{
            navigation.navigate("Login")
          }}
        >
          <Text>Login</Text>
        </Pressable> */}
        <Text>Get Started</Text>  
          <Text>
            Don't have an account?
            <Text
              onPress={()=>{
                navigation.navigate("Signup")
              }}
              color='#243657'
            > 
              {' '}Sign up
            </Text>

          </Text>  
      </View>
      }
    />

  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    marginTop: 60, 
    borderRadius: 20,
    backgroundColor: '#243657' 
  }
})
export default StartView
