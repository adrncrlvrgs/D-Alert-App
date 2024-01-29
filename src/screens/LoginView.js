import React,{useState,useRef} from 'react'
import { View,Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
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
    .required('OTP is required') // eto mismo yung mga validation nya

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login using your number</Text>


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
          <>
            {!confirm ? (
              <>
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
                <Button onPress={handleSubmit} title='Send Verification' />
              </>
            ) : (
              <>
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
            )}
          </>
        )}
      </Formik>
    </View>
  );
};


export default LoginView
