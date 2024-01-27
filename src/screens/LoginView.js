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

    const checkUserExists = async (phoneNumber) =>{
      const usersRef = firestore().collection('users');
      const querySnapshot = await usersRef.where('phoneNumber', '==', phoneNumber).get();
      return !querySnapshot.empty;
    }

    const signIn = async () => {
      const userExists = await checkUserExists(phoneNumber);
      if (userExists) {
        try {
          const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
          setConfirm(confirmation);
        } catch (e) {
          console.log("Error sending code", e.message);
        }
      } else {
        navigation.navigate("Signup");
      }
    };
  
    const confirmCode = async () => {
      try {
        await confirm.confirm(otp);
        navigation.navigate("Home");
      } catch (e) {
        console.log(e.message);
        Alert.alert("Authentication Failed", "Failed to authenticate OTP.");
      }
    };

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
