import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class PlaygroundScreen extends React.Component {
  static navigationOptions = {
    title: 'Highlights of Others',
  };

  render() {
    let gif_uri = this.state.isShowingGif ? global.gif_uri : ' ';
    return (
      <ImageBackground source={require('../assets/images/wallpaper3.jpg')}
      resizeMode='cover'
      style={styles.backgroundImage}>
        <Image source={'../assets/images/highlight.jpg'}
          resizeMode= 'center'
          style={styles.Image}
        />
        <Image source={require('../assets/images/platypus0.png')}
        resizeMode= 'center'
        style={styles.Pet}
        />
        <Text>Today I met .... </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    alignSelf: 'center',
    width: 100, height: 100,
  },
  Pet:{
    alignSelf: 'center',
  }
});
