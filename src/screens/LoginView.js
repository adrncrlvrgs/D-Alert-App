import React,{useState,useRef} from 'react'
import { View,Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { useNavigation } from '@react-navigation/native'

const LoginView = () =>{
    const [phoneNumber,setphoneNumber] = useState('')
    const [otp,setOtp] = useState('')
    const [confirm,setConfirm] = useState(null)

    const navigation = useNavigation();

    const signIn = async () =>{
      try{
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
        setConfirm(confirmation)
      }catch (e){
        console.log("Error sending code", e.message)
      }
    }

    const confirmCode = async () =>{
      try{
        const userCredential = await confirm.confirm(otp)
        const user = userCredential.user;

        const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

        if (userCredential.exists){
          navigation.navigate("Home")
        }else{
          navigation.navigate("Home")
          Alert.alert("Not exist", "this phone number is not exist")
        }
      }catch(e){
          console.log(e)
      }
    }

return(
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text>
        Login using your number
      </Text>
      {
        !confirm?(
          <>
            <Text>
              Enter your phone number
            </Text>

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setphoneNumber}
              keyboardType="phone-pad"
              autoComplete='tel'
            />

            <TouchableOpacity onPress={signIn} style={{ marginBottom: 20 }}>
              <Text>Send Verification</Text>
            </TouchableOpacity>
          </>
        ):(
          <>
            <Text>
            Enter OTP code
          </Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
                  placeholder="Enter OTP"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                />
              <TouchableOpacity onPress={confirmCode}>
                <Text>Confirm OTP</Text>
              </TouchableOpacity>
          </>
          
        )
      }

      

    </View>
)

  
}

export default LoginView
