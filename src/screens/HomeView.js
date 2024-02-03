import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/core"
import { CusBody } from '../../components';

function HomeView() {
  const navigation = useNavigation();

  return (
    <CusBody
      components={
        <Text> Dasboard </Text>
      }
    />
  )
}

export default HomeView
