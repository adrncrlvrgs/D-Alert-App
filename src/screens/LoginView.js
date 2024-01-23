import React,{useState,useRef} from 'react'
import {Text,View,TouchableOpacity,Alert,TextInput} from 'react-native';
import { signInWithPhoneNumber } from 'firebase/auth';
import {useNavigation} from "@react-navigation/core"
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import app,{auth} from '../../firebase-config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginView = () =>{

  const navigation = useNavigation()
  
  const [contactNumber,setContactNumber] = useState('+63-976-506-4197')
  const [otp,setOtp] = useState('')
  const [verificationID, setVerificationID] = useState(null)
  const recapchaVerifier = useRef(null)

  const sendVerification = () =>{
    const phoneProvider = new PhoneAuthProvider()
      phoneProvider
      .verifyPhoneNumber(contactNumber,recapchaVerifier.current)
      .then(setVerificationID)
      setContactNumber('')
  }

  const confirmCode = () =>{
    const credential = PhoneAuthProvider.credential(
      verificationID,
      otp
    );
    signInWithCredential(auth,credential)
    .then((userCredential)=>{
        setOtp('')
        const user = userCredential.user;
        AsyncStorage.setItem('user', JSON.stringify(user));
    })
    .catch((error)=>{
      alert(error)
      console.log(error.message)
    })
    Alert.alert(
      "Login Succesful"
    )
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FirebaseRecaptchaVerifierModal
        ref={recapchaVerifier}
        firebaseConfig={app.options}
      />

      <Text>
        Login using your number
      </Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
        placeholder="Phone Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
        autoComplete='tel'
      />
      <TouchableOpacity onPress={sendVerification} style={{ marginBottom: 20 }}>
        <Text>Send Verification</Text>
      </TouchableOpacity>

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



      <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("Signup")
          }}
        >
          <Text className="text-blue-500 text-lg font-bold">GO BACK TO HOME</Text>
      </TouchableOpacity>

    </View>
  );
}

export default LoginView
