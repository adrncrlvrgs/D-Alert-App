import React,{useState} from 'react'
import { View, TextInput, Button, Text, Alert,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"
import { CusSelectDropDown } from '../../components/index';
import firestore from "@react-native-firebase/firestore"
import { Formik } from 'formik';
import * as Yup from 'yup'

const signupValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
  .required('Phone number is required')
  .min(10, 'Phone number is not valid'),
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .required('E-mail is required'),
  gender: Yup.string()
    .required('Gender is required'),
  otp: Yup.string()
    .required('OTP is required')
})

const SignUpView = () =>  {

  const navigation = useNavigation();
  const [phoneNumber,setphoneNumber] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [otp,setOtp] = useState('')
  const [confirm,setConfirm] = useState(null)

  const signUp = async (phoneNumber)=>{
    try{
      console.log('test')
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
      setConfirm(confirmation)
    }catch(e){
      console.log('Sign Up Error:', e.message);
    }
  }

  const confirmCode = async (otp)=>{
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
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This the signup screen</Text>

        <Formik
          initialValues={{ 
            phoneNumber: '', 
            name: '',
            email: '',
            gender: '',
            otp: '',
          }}
          validationSchema={signupValidationSchema}
          onSubmit={(values) =>{
            if(!confirm){
              signUp(values.phoneNumber);
            }else{
              confirmCode(values.otp);
            }
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched }) =>(
            <>
              { !confirm? (
                <>
                  <Text> Enter your phone number</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
                    placeholder="Phone Number"
                    onChangeText={handleChange('phoneNumber')} // kung ano yung nilagay mo sa schema dapat same rin sila
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                    autoComplete='tel'
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>
                  )}

                  <Text>Enter your name</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
                    placeholder="Name"
                    onChangeText={handleChange('name')}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                  )}

                  <Text>Enter your email</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
                    placeholder="E-mail"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                  )}

                   {/* paayos pre, need dropbox para sa gender, may example ako na component na dinownload  '<CusSelectDropDown/>' */}
                  <Text>Gender</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
                    placeholder=""
                    value={values.gender}
                    onChangeText={handleChange('gender')}
                  />

                  {errors.gender && touched.gender && (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.gender}</Text>
                  )}

                  <Button onPress={handleSubmit} title='Register' />
                </>
              ):(
                <>
                  <Text>Enter OTP</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
                    placeholder="Enter OTP"
                    onChangeText={handleChange('otp')}
                    onBlur={handleBlur('otp')}
                    value={values.otp}
                    keyboardType="number-pad"
                  />
                  {errors.otp && touched.otp && (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.otp}</Text>
                  )}
                  <Button onPress={handleSubmit} title='Confirm OTP' />
                </>
              )
              
             }
            </>
          )}
        </Formik>
      </View>

    </>
    
  )
}


export default SignUpView
