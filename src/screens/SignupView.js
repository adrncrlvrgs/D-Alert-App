import React,{useState} from 'react'
import { View,  Button, Text, Alert,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Formik } from 'formik';
import * as Yup from 'yup'
import { TextInput } from '@react-native-material/core';
import { CusBody, CusButton } from '../../components';

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
  .when("confirm", {
    is: true,
    then: Yup.string().required('OTP is required') 
  }),
})

const SignUpView = () =>  {

  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const signUp = async (phoneNumber)=>{

    try{
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
      setConfirm(confirmation)
    }catch(e){
      console.log('Sign Up Error:', e.message);
    }
  }

  const confirmCode = async (values)=>{
    try{
      const userCredential = await confirm.confirm(values.otp)

      if(userCredential.user){

        await firestore().collection('users').doc(userCredential.user.uid).set({
          phoneNumber: values.phoneNumber,
          name: values.name,
          email: values.email,
          gender:values.gender,
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
      <CusBody
        components={
          <>
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
              onSubmit={(values) => {
                if (!confirm) {
                  signUp(values.phoneNumber);
                } else {
                  confirmCode(values);
                }
              }}
              
            >
              {({handleChange, handleBlur, handleSubmit, values, errors, touched }) =>(
                <>
                  { !confirm? (
                    <>
                      <Text> Enter your phone number</Text>
                      <TextInput
                        style={{ width: '80%' }}
                        placeholder="Phone Number"
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}
                        keyboardType="phone-pad"
                        autoComplete="tel"
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>
                      )}

                      <Text>Enter your name</Text>
                      <TextInput
                        style={{  width: '80%' }}
                        placeholder="Name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                      )}

                      <Text>Enter your email</Text>
                      <TextInput
                        style={{ width: '80%' }}
                        placeholder="E-mail"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                      )}

                      {/* paayos pre, need dropbox para sa gender, may example ako na component na dinownload  '<CusSelectDropDown/>' */}
                      <Text>Gender</Text>
                      <TextInput
                        style={{  width: '80%' }}
                        placeholder=""
                        value={values.gender}
                        onChangeText={handleChange('gender')}
                        onBlur={handleBlur('gender')}
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
                        style={{ width: '80%' }}
                        placeholder="Enter OTP"
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        value={values.otp}
                        keyboardType="number-pad"
                      />
                      {errors.otp && touched.otp && (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.otp}</Text>
                      )}
                      
                      <CusButton onPress={handleSubmit} title={'Confirm OTP'}/>
                    </>
                  )
                  
                }
                </>
              )}
            </Formik>
          </>
        }
      />
      

    </>
    
  )
}
//blank push

export default SignUpView
