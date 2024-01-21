import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"
import { db } from '../../firebase-config';
import { collection, addDoc } from "firebase/firestore"; 


function HomeView() {

  const navigation = useNavigation();


  const addDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, "your_collection"), {
        field1: "value1",
        field2: "value2",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View className="flex justify-center items-center relative top-60">
      <Text> D-ALERT LOGO </Text>

      <TouchableOpacity className="ml-5 mt-60"
          onPress={() => {
            navigation.navigate("Login")
          }}
        >
          <Text className="text-blue-500 text-lg font-bold">LOG IN</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=> addDocument()}>
              <View>
                  <Text>test</Text>
              </View>
          </TouchableOpacity>
    </View>
  )
}

export default HomeView
