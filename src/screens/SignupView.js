import React,{useState} from 'react'
import { View, TextInput, Button, Text, Alert,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"
import { CusSelectDropDown } from '../../components/index';
import firestore from "@react-native-firebase/firestore"


const SignUpView = ({ route , navigation}) =>  {

  const { uid } = route.params;
  // const navigation = useNavigation();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')

  const saveDetails = async ()=>{
    try{
      await firestore().collection("users").doc(uid).set({
        name,
        email,
        gender
      })

      navigation.navigate("Home")

    }catch(e){
      Alert.alert("error", e.message)
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

      <View>
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
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
          placeholder=""
          value={''}
          onChangeText={''}
          keyboardType=""
        />

        <CusSelectDropDown/>

        <TouchableOpacity>
          <Button
            onPress={()=>{saveDetails}}
          />
        </TouchableOpacity>

      </View>
    </View>
  )
}


export default SignUpView
