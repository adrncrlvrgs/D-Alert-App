import React from 'react'
import {View,TouchableOpacity, StyleSheet} from 'react-native';
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
  
          <Text>Don't have an account? 
              <TouchableOpacity
                  onPress={() => {
                      navigation.navigate("Signup")
                  }}
              >
              <Text className="text-blue-500 text-lg font-bold">Sign up</Text>
              </TouchableOpacity>
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
