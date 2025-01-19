import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [guess, setGuess] = useState();
  const [answer, setAnswer] = useState('Guess a number between 1-100');
  const [count, setCount] = useState(1);
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);

  

  const clearInput = () => {
    setGuess()
  };

  const buttonPressed = () => {
    //Checks if the number is valid. If the number is invalid, this does not count towards
    //the number of guessess.
    if (parseFloat(guess) < 1 || parseFloat(guess) > 100) {
      setAnswer('Invalid. Please guess a number between 1-100')
      clearInput()
      return;

    } else if (parseFloat(guess) < number) {
      setAnswer(`Your guess ${guess} is too low`)
      setCount(count + 1)
      clearInput()

    } else if (parseFloat(guess) > number) {
      setAnswer(`Your guess ${guess} is too high`)
      setCount(count + 1)
      clearInput()

    //If the number is correct, resets the count and generates new number  
    } else if (parseFloat(guess) == number) {
      setCount(count + 1)
      clearInput()
      Alert.alert(`You guessed the number in ${count} guessess`)
      setNumber(Math.floor(Math.random() * 100) + 1)
      setCount(1)
      setAnswer('Guess a number between 1-100')
    }


  };

  return (
    <View style={styles.container}>
      <View >
        <Text>{answer}</Text>
        
        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <TextInput
          style={styles.input}
          placeholder=''
          onChangeText={guess => setGuess(guess)}
          value={guess}
          keyboardType='numeric'
        />
      </View>
      <View>
        <Button onPress={buttonPressed} title='Make a Guess' />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {

    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 100
  },
});
