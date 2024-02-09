import React from "react";
import { StyleSheet } from "react-native";
import { Box, TextInput, Text } from "@react-native-material/core";

const CusTextField = ({
  onChangeText, 
  onBlur,
  value,
  placeholder,
  keyboardType,
  autoComplete,
  style, 
  inputStyle,
  textAlign,
  leading,
  errors,
  touched
}) =>{
    return(
      <Box style={[style]}>
        <TextInput
          onChangeText={onChangeText} 
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          style={[styles.input, inputStyle]}
          leading={leading}
          textAlign={textAlign}
        />
        {errors && touched && (
          <Text style={styles.error}>{errors}</Text>
        )}
      </Box>
    )
}

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    height: 45,
    borderRadius: 15,
    overflow: 'hidden',
  },
  error: {
    fontSize: 10, 
    color: 'red'
  }
})


export default CusTextField