import React from 'react'
import {View,TouchableOpacity, StyleSheet,Linking} from 'react-native';
import {useNavigation} from "@react-navigation/core"
import { CusBody } from '../../components/index.js';
import { Text, Button } from '@react-native-material/core'


function StartView() {

  const navigation = useNavigation();

  return (
    <CusBody
      components={
        <View style={styles.container}>
        <Text> D-ALERT LOGO</Text>
        <Button
          style={{marginTop: 60}}
          title={'Login'}
          onPress={()=>{
            navigation.navigate("Login")
          }}
        />

          <Text>Get Started</Text>
  
          <Text>
            Don't have an account?
            <Text
              onPress={()=>{
                navigation.navigate("Signup")
              }}
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
  }
})
export default StartView
