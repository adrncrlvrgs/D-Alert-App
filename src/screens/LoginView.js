import React,{useState,useRef} from 'react'
import { View, Alert, StyleSheet, Image } from 'react-native'
import { TextInput, Text, Flex, VStack, Box } from '@react-native-material/core';
import Entypo from "@expo/vector-icons/Entypo";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { CusBody, CusButton, CusTextField } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
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
            <>
              {!confirm ? (
                < VStack  style={{width: "98%", alignSelf: 'center'}}>
                  <Box style={{height: '50%', width: '100%'}}>
                    <Image
                      source={require('../../assets/image/login.jpg')}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </Box>
                  <Box>
                    <Text variant='h4'>Login</Text>
                    <Text>Login using your phone number</Text>

                    <CusTextField
                      onChangeText={handleChange('phoneNumber')} // kung ano yung nilagay mo sa schema dapat same rin sila
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      placeholder="Phone Number"
                      keyboardType="phone-pad"
                      autoComplete='tel'
                      style={{marginVertical: 8}}
                      textAlign={'left'}
                      leading={<Entypo name='phone' size={20} color={'#243657'}/>}
                      errors={errors.phoneNumber}
                      touched={touched.phoneNumber}
                    />
                    <CusButton onPress={ handleSubmit} title={ 'Send Verification'} style={{height: 35}}/>
                  </Box>
                  <Text style={{textAlign: 'center'}}>
                    Don't have an account?
                    <Text
                      onPress={()=>{
                        navigation.navigate("Signup")
                      }}
                      color='#243657'
                    > 
                      {' '}Sign up
                    </Text>

                  </Text>  
              
                </ VStack>
              ) : (
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
              )}
            </>
          )}
        </Formik>
      }
    />
    
    
  );
};

const styles = StyleSheet.create({
  image:{
    width: 250,
    height: 250,
    alignSelf: 'center'
  },
})


export default LoginView


