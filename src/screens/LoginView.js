import React,{useState,useRef} from 'react'
import { View, Alert, StyleSheet, Image } from 'react-native'
import { TextInput,Button, Text, Flex, VStack, Box } from '@react-native-material/core';
import Entypo from "@expo/vector-icons/Entypo";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { CusBody, CusButton } from '../../components'
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
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      onChangeText={handleChange('phoneNumber')} // kung ano yung nilagay mo sa schema dapat same rin sila
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      keyboardType="phone-pad"
                      autoComplete='tel'
                      outline={false}
                      leading={<Entypo name='phone' size={20} color={'#243657'}/>}
                      // underlineColorAndroid='transparent'
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>
                    )}
                    {/* <Button onPress={handleSubmit} title='Send Verification' color='#243657'/> */}
                    <CusButton onPress={ handleSubmit} tittle={ 'Send Verification'} style={{height: 35}}/>
                    
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
                    <CusButton onPress={handleSubmit} tittle={'Confirm OTP'} />
                  </Box>
                </VStack>
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
  },
  image:{
    width: '100%',
    height: '100%',
  },
  input: {
    justifyContent: 'center',
    height: 45,
    borderRadius: 15,
    overflow: 'hidden'
  },
})


export default LoginView



// todo:
// add CusTextInput component
