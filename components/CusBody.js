import React from 'react';
import { View, StyleSheet } from 'react-native';

const CusBody = ({ components }) => {
    return (
        <View style={styles.container}>
            {components}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#fdfdfd',
      justifyContent:'center',
      alignItems: 'center',
      position: 'relative',
      fontFamily: 'Roboto',
    }
})

export default CusBody
