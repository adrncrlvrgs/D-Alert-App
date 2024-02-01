import React,{useState,useRef} from 'react'
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { CusBody } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextInput,Button, Text, Flex, VStack, Box } from '@react-native-material/core';


//BALI GANITONG PATTERN DIN SA SIGN UP

//etong block na to dito lagi mag ddeclare ng variable ng inputfields

const loginValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .min(10, 'Phone number is not valid'),
  otp: Yup.string()
    .when("confirm", {
      is: true,
      then: Yup.string().required('OTP is required') // eto mismo yung mga validation nya
    }),

  //... can be more depende kung ilang fields
});

const LoginView = () => {

  const [confirm, setConfirm] = useState(null);

  const navigation = useNavigation();

  const checkUserExists = async (phoneNumber) =>{
    const usersRef = firestore().collection('users');
    const querySnapshot = await usersRef.where('phoneNumber', '==', phoneNumber).get();
    return !querySnapshot.empty;
  }

  const signIn = async (phoneNumber) => {
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

  const confirmCode = async (otp) => {
    try {
      await confirm.confirm(otp);
      navigation.navigate("Home");
    } catch (e) {
      console.log(e.message);
      Alert.alert("Authentication Failed", "Failed to authenticate OTP.");
    }
  };

  return (
    
    <CusBody
      components={
      <>
      {/* tapos dito sya mag rereflect , paranf forms lang*/}
        <Formik
          initialValues={{ phoneNumber: '', otp: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            if (!confirm) {
              signIn(values.phoneNumber);
            } else {
              confirmCode(values.otp);
            }
          }}
        >

          {/* yung first three na param, default yan, importante yan */}
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <Flex style={{justifyContent:'center',flexDirection:'col'}} h={'80%'} w={'90%'}>
              {!confirm ? (
                < VStack >
                  <Box>
                    <Text>Image here</Text>
                  </Box>
                  <Box>
                    <Text variant='h4'>Login</Text>
                    <Text>Login using your phone number</Text>
                    <TextInput
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
                    <Button onPress={handleSubmit} title='Send Verification' />
                    
                  </Box>
                  <Text style={{textAlign: 'center'}}>
                    Don't have an account?
                    <Text
                      onPress={()=>{
                        navigation.navigate("Signup")
                      }}
                    > 
                      {' '}Sign up
                    </Text>

                  </Text>  
              
                </ VStack>
              ) : (
                <>
                  <TextInput
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
              )}
            </Flex>
          )}
        </Formik>
      </>
      }
    />
    
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
    textAlign: 'center'
  }
})


export default LoginView
