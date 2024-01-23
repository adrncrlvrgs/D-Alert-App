import React,{useState} from 'react'
import { View, TextInput, Button, Text, Alert,TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc } from 'firebase/firestore';
import {useNavigation} from "@react-navigation/core"
import { signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { db,auth } from '../../firebase-config';


const SignUpView = () =>  {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('09765074197');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const navigation = useNavigation();
  const handleSignUp = async () => {
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { email, phoneNumber, username });

      Alert.alert("Success", "Account created successfully!");

      navigation.navigate("Login")
      
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  const recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      
    }
  }, auth);

  const sendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber,recaptchaVerifier);
      setVerificationId(verificationId);
      Alert.alert("Verification", "Code has been sent to your phone");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error.message)
    }
  };

  const verifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const userCredential = await signInWithPhoneNumber(auth, credential);
      // Additional logic to handle user creation or sign in
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex justify-center items-center relative top-20">
      <Text>This the signup screen</Text>


      <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("Home")
          }}
        >
          <Text className="text-blue-500 text-lg font-bold">GO BACK TO HOME</Text>
      </TouchableOpacity>


      <View className="flex justify-center">
      <TextInput
        className="input bg-white border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {/* <TextInput
        className="input bg-white border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      /> */}
      <TextInput
        className="input bg-white border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
         className="input bg-white border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

    <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Send Verification Code" onPress={sendVerificationCode} />

      {verificationId && (
        <>
          <TextInput
            placeholder="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
          />
          <Button title="Verify Code" onPress={verifyCode} />
        </>
      )}
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
    </View>
  )
}


export default SignUpView
