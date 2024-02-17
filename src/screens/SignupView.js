import React,{useState} from 'react'
import { Alert, Image,StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Formik } from 'formik';
import * as Yup from 'yup'
import { TextInput, Flex, VStack, Box, Text } from '@react-native-material/core';
import { CusBody, CusButton, CusTextField, CusRadioButton } from '../../components';

import Entypo from "@expo/vector-icons/Entypo";

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
    
      <CusBody
        components={
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
                  { !confirm? 
                    (
                      <VStack style={{width: "98%", alignSelf: 'center'}}>
                        <Box  style={{justifyContent: 'center'}}>
                          <Image
                            source={require('../../assets/image/login.jpg')}
                            style={styles.image} 
                            resizeMode='contain'                        

                          />
                        </Box>
                        <Box >
                          <Text variant='h4'>Register</Text>
                          <Text>Please Register to login.</Text>

                          <CusTextField
                            onChangeText={handleChange('phoneNumber')} 
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            autoComplete='tel'
                            style={{marginTop: 5}}
                            textAlign={'left'}
                            leading={<Entypo name='phone' size={20} color={'#243657'}/>}
                            errors={errors.phoneNumber}
                            touched={touched.phoneNumber}
                          />

                          <CusTextField
                            onChangeText={handleChange('name')} 
                            onBlur={handleBlur('name')}
                            value={values.name}
                            placeholder="Full Name"
                            style={{marginVertical: 8}}
                            textAlign={'left'}
                            leading={<Entypo name='user' size={20} color={'#243657'}/>}
                            errors={errors.name}
                            touched={touched.name}
                          />

                          <CusTextField
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder={"E-mail"}
                            textAlign={'left'}
                            leading={<Entypo name='mail' size={20} color={'#243657'}/>}
                            errors={errors.email}
                            touched={touched.email}
                          />
                          <>
                          <CusRadioButton
                            onChange={handleChange('gender')}
                            value={values.gender}
                            touched={errors.gender}
                            errors={errors.gender}
                          />
                          </>
                          {/* add validation and fucntion */}

                        </Box>

    

                        <CusButton onPress={handleSubmit} title='Register' />
                      </VStack>
                    ):(
                      <VStack>
                        <Box style={{height: '50%', width: '100%'}}> 
                          <Image
                            source={require('../../assets/image/otp.png')}
                            style={styles.image}
                            resizeMode="cover"
                          />
                        </Box>
                        <Box>
                          <CusTextField
                            onChangeText={handleChange('otp')} 
                            onBlur={handleBlur('otp')}
                            value={values.otp}
                            placeholder="Enter OTP"
                            keyboardType="number-pad"
                            autoComplete='sms-otp'
                            style={{marginVertical: 8}}
                            textAlign={'center'}
                            errors={errors.otp}
                            touched={touched.otp}
                          />
                          <CusButton onPress={handleSubmit} title={'Confirm OTP'} />
                        </Box>
                      </VStack>
                    )
                  
                  }

                </>
  
             
              )}
            </Formik>
            
        }
      />
      

    
    
  )
}

const styles = StyleSheet.create({
  image:{
    width: 250,
    height: 250,
    alignSelf: 'center'
    // aspectRatio: 1, 
    // resizeMode: 'contain',
  },
})


export default SignUpView
