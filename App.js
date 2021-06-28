/**
 * Curiel Consuelos Alan Carlos
 * React Native Engineer Practical Test
 * PAGA_TODO #005c42
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import AsyncStorage from '@react-native-async-storage/async-storage';

let ico_pag = require('./src/ico_pagatodo.png');
let ico_banc = require('./src/ico_bancomer.png');
let ico_bana = require('./src/ico_banamex.png');
let ico_san = require('./src/ico_santander.png');
let ico_sco = require('./src/ico_scotiabank.png');

renderIcon = nameBank => {
  if (nameBank == 'Paga Todo') {
    return (
      <Image
        source={ico_pag}
        style={{
          width: responsiveScreenWidth(25),
          height: responsiveScreenHeight(10),
        }}
      />
    );
  } else if (nameBank == 'BBVA Bancomer') {
    return (
      <Image
        source={ico_banc}
        style={{
          width: responsiveScreenWidth(25),
          height: responsiveScreenHeight(5),
        }}
      />
    );
  } else if (nameBank == 'Banamex') {
    return (
      <Image
        source={ico_bana}
        style={{
          width: responsiveScreenWidth(25),
          height: responsiveScreenHeight(5),
        }}
      />
    );
  } else if (nameBank == 'Santander') {
    return (
      <Image
        source={ico_san}
        style={{
          width: responsiveScreenWidth(25),
          height: responsiveScreenHeight(5),
        }}
      />
    );
  } else if (nameBank == 'Scotiabank') {
    return (
      <Image
        source={ico_sco}
        style={{
          width: responsiveScreenWidth(25),
          height: responsiveScreenHeight(5),
        }}
      />
    );
  }
};

const Item = ({
  nameBank,
  description,
  age,
  url,
  item,
  onPress,
  backgroundColor,
  textColor,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={styles.item_name}>
      <Text style={[styles.item_name_txt, textColor]}>{nameBank}</Text>
      <Text style={[styles.item_desc_txt, textColor]}>{description}</Text>
      <Text style={styles.item_url_txt}>{url}</Text>
    </View>
    <View style={styles.item_logo}>{this.renderIcon(nameBank)}</View>
  </TouchableOpacity>
);

const App: () => Node = () => {
  const [selectedBank, setselectedBank] = useState(null);
  const [datajson, setDatajson] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    const backgroundColor = item.bankName === selectedBank ? '#005c42' : '#FFF';
    const color = item.bankName === selectedBank ? 'white' : 'black';

    return (
      <Item
        nameBank={item.bankName}
        description={item.description}
        age={item.age}
        url={item.url}
        item={item}
        onPress={() => setselectedBank(item.bankName)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  const getDataFromJson = async () => {
    try {
      let response = await fetch(
        'https://api.jsonbin.io/b/604006e581087a6a8b95b784',
      );
      let json = await response.json();
      setDatajson(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@banks_Key');
      if (value !== null) {
        setDatajson(JSON.parse(value));
      } else {
        let data = await getDataFromJson();
        setDatajson(data);
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@banks_Key', jsonValue);
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ImageBackground
        source={require('./src/wallpaper.png')}
        style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.header_txt}>
            Selecciona tu banco de preferencia.
          </Text>
        </View>
        <View style={{flex: 0.7}}>
          <FlatList
            data={datajson}
            renderItem={renderItem}
            keyExtractor={item => item.bankName}
            scrollEnabled={true}
            extraData={selectedBank}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.15,
    margin: 20,
  },
  header_txt: {
    fontSize: responsiveScreenFontSize(5),
    color: '#FFF',
  },
  backgroundStyle: {
    backgroundColor: '#FFF',
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(100),
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    marginVertical: 5,
    padding: 20,
    borderRadius: 20,
    borderColor: '#005c42',
    borderWidth: 5,
  },
  item_name: {
    flex: 2,
  },
  item_name_txt: {
    fontSize: responsiveScreenFontSize(3),
  },
  item_desc_txt: {
    fontSize: responsiveScreenFontSize(1.5),
  },
  item_url_txt: {
    fontSize: responsiveScreenFontSize(0.5),
    color: '#FFF',
  },
  item_logo: {
    flex: 1,
  },
});

export default App;
