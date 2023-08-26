import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';



// constants
import { currencyByRupee } from './constant'
// component
import CurrencyButtons from './components/CurrencyButtons';

import Snackbar from 'react-native-snackbar';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const btnPressed = (targetValue:Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7733',
        textColor: '#000000',
        
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedAmount = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedAmount.toFixed(2)}`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    } else {
       return Snackbar.show({
        text: 'Not valid number',
        backgroundColor: '#F4BEC3',
        textColor:'#000000'
      });
    }
  }

  return (
    <>
      <StatusBar backgroundColor={'#a1a1a1'}/>
      <Text style={styles.title}>Currency Calculator</Text>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>ξ</Text>
            <TextInput
              placeholderTextColor={'#000'}
              style={styles.inputAmountField}
              maxLength={14}
              value={inputValue}
              clearButtonMode='always' //ios
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in rupees'
            />
          </View>
          {resultValue && (
            <Text style={styles.resultTxt}>
              {resultValue}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => (
              <Pressable style={[
                styles.button,
                targetCurrency === item.name && styles.selected
              ]}
                onPress={()=>btnPressed(item)}
              >
                <CurrencyButtons {...item} />
              </Pressable>
            )}
          />
        </View>
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    padding:8,
    width: '100%',
    height:'100%',
    // flex: 1,
    display: 'flex',
    flexDirection:'column',
    backgroundColor: '#e4e4a4',
    alignItems: 'center',
    justifyContent:'center'
  },
  topContainer: {
    width: '100%',
    height: 70,
    marginTop:40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 55,
    width: '80%',
    padding: 8,
    borderWidth: 1,
    color:'#000000',
    borderRadius: 5,
    borderEndWidth: 2,
    // borderColor: '#e1e1a1',
    elevation:4,
    backgroundColor: '#a1a1a1',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    height:300
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#a1a1a1',
  },
  title: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: 5,
    elevation:4,
    color:'#333',
    backgroundColor:'#a1a1a1'
  }
});

export default App;
