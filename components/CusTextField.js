import React from "react";
import { StyleSheet } from "react-native";
import { Box, TextInput } from "@react-native-material/core";

const CusTextField = () =>{
    return(
        <Box style={{marginBottom: 10}}>
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
      </Box>
    )
}

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

export default CusTextField