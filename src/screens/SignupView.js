import React,{useState} from 'react'
import { View, TextInput, Button, Text, Alert,TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc } from 'firebase/firestore';
import {useNavigation} from "@react-navigation/core"
import { db,auth } from '../../firebase-config';

const SignUpView = () =>  {
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const handleSignUp = async () => {
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional information in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { email, contactNumber, username });

      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }
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
      <TextInput
        className="input bg-white border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
    </View>
  )
}


export default SignUpView
