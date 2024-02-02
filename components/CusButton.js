import React from "react";
import { StyleSheet } from "react-native";
import { Pressable, Text, Button } from "@react-native-material/core";

const CusButton = ({style,onPress,tittle}) =>{
    return (
        <>
            <Pressable
                android_ripple={{
                    color: 'rgba(255, 255, 255, 0.2)', 
                    borderless: true, 
                }}
                style={[styles.button , style]}
                onPress={ onPress }
                >
                <Text variant="button" style={styles.text}>{tittle}</Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        alignContent: "center",
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#243657',
        padding: 5,
    },
    text:{
        color: '#ffffff',
        textAlign: 'center'
    }
})

export default CusButton