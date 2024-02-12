import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"
import { CusBody, CusRadioButton } from '../../components';

function HomeView() {
  const navigation = useNavigation();

  return (
    <CusBody
      components={
        
        <CusRadioButton/>

       
      }
    />
  )
}

export default HomeView
