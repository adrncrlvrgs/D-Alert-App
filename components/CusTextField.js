import React from "react";
import { StyleSheet } from "react-native";
import { Box, TextInput } from "@react-native-material/core";

const CusTextField = ({onChangeText, onBlur,value,placeholder,keyboardType,autoComplete,style, inputStyle,outline,leading}) =>{
    return(
        <Box style={[style]}>
        <TextInput
          onChangeText={onChangeText} // kung ano yung nilagay mo sa schema dapat same rin sila
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          style={inputStyle}
          outline={outline}
          leading={leading}
        />
      </Box>
    )
}

//blank push

export default CusTextField