import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function InputFieldComponent({
  placeHolder,
  keyboardType = 'default',
  secureTextEntry = false,
  value,
  onChangeText,
  validator,
}) {
  const [error, setError] = useState('');

  const handleTextChange = text => {
    onChangeText(text);

    if (validator) {
      const validationError = validator(text);
      setError(validationError);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, error ? styles.errorBorder : null]}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={handleTextChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
