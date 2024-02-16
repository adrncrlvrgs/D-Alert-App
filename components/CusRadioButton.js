import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const GenderRadioButtonGroup = ({ onChange, value, touched, errors }) => {
  return (
    <View style={styles.container}>
      <View style={styles.radioButtonContainer}>
        <RadioButton.Group onValueChange={onChange} value={value}>
          <View style={styles.radioButtonItem}>
            <RadioButton value="Male" color='#243657' />
            <Text style={styles.radioButtonText}>Male</Text>
          </View>
          <View style={styles.radioButtonItem}>
            <RadioButton value="Female" color='#243657' />
            <Text style={styles.radioButtonText}>Female</Text>
          </View>
          <View style={styles.radioButtonItem}>
            <RadioButton value="Others" color='#243657' />
            <Text style={styles.radioButtonText}>Others</Text>
          </View>
        </RadioButton.Group>
      </View>
      {errors && touched && (
        <Text style={styles.error}>{errors}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonText: {
    marginLeft: 8,
  },
  error: {
    fontSize: 10,
    color: 'red',
  },
});

export default GenderRadioButtonGroup;
