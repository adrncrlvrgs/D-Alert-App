import React,{useState} from 'react'
import { View, TextInput, Button, Text, Alert,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"
import { CusSelectDropDown } from '../../components/index';
import firestore from "@react-native-firebase/firestore"


const SignUpView = () =>  {

  const navigation = useNavigation();
  const [phoneNumber,setphoneNumber] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [otp,setOtp] = useState('')
  const [confirm,setConfirm] = useState(null)

  const signUp = async ()=>{
    try{
      console.log('test')
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
      setConfirm(confirmation)
    }catch(e){
      console.log('Sign Up Error:', e.message);
    }
  }

  const confirmCode = async ()=>{
    try{
      const userCredential = await confirm.confirm(otp)

      if(userCredential.user){

        await firestore().collection('users').doc(userCredential.user.uid).set({
          phoneNumber: phoneNumber,
          name:name,
          email: email,
          gender:gender,
          status: 'active'
        })

        navigation.navigate('Home');
      }
    }catch(e){
      console.log(e.message)
      Alert.alert('Verification Failed', 'Invalid OTP or verification failed.');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This the signup screen</Text>
      
      <Text>
        Sign Up
      </Text>
      {
        !confirm?(
          <View>
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
  
          <Text>Enter your name</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Text>Enter your email</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* paayos pre, need dropbox para sa gender, may example ako na component na dinownload  '<CusSelectDropDown/>' */}
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
            placeholder=""
            value={gender}
            onChangeText={setGender}
  
          />
  
          <CusSelectDropDown/>
  
          <TouchableOpacity>
            <Button
              onPress={()=>{signUp()}}
              title='Register'
            />
          </TouchableOpacity>
  
        </View>
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
            <TouchableOpacity onPress={()=>confirmCode()}>
              <Text>Confirm OTP</Text>
            </TouchableOpacity>
        </> 
        )
      }

    </View>
  )
}


export default SignUpView
