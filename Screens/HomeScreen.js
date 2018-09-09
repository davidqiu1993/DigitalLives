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

import D2F from './D2F';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('counter 1?', global.counter);
    this.state= {
      isShowingGif:false,
      ipath:'../assets/images/platypus0.png',
      images:[
        '../assets/images/platypus0.png',
        '../assets/images/perry1.png',
        '../assets/images/perry2.png'
      ],
    }
    if (!global.counter || global.counter % 3 == 0){
      this.state.ipath = this.state.images[0];
    }
    else if (global.counter % 3 == 1){
      ipath = this.state.images[1];
      setInterval(() => {
        ipath = this.state.images[2];
      }, 5000);
    }
    else if (global.counter % 3 == 2){
      ipath = this.state.images[0];
      this.setState({isShowingGif: true});
      setInterval(() => {
        global.counter = 0;
        this.setState({isShowingGif: false});
      }, 10000);
    }
    console.log('counter 2?', global.counter);
  };

  static navigationOptions = {
    title: null,
  };

  render() {
    let gif_uri = this.state.isShowingGif ? global.gif_uri : ' ';
    let ipath=require('../assets/images/platypus0.png');
    console.log("what path", ipath);
    return (
      <ImageBackground source={require('../assets/images/wallpaper3.jpg')}
      resizeMode='cover'
      style={styles.backgroundImage}>
        <Image source={{uri: gif_uri}}
          resizeMode= 'center'
          style={styles.Image}
        />
        <Image source={ipath}
        resizeMode= 'center'
        style={styles.Pet}
        />
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
  },
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    padding: 20,
  },
  containerBottom: {
    position: 'absolute',
    bottom: 125,
    alignItems: 'center',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black',
    paddingBottom: 2,
    fontFamily: 'roboto'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  button: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: 'center'
  },
  swipe: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 25,
    fontFamily: 'roboto',
    alignSelf: 'center'
  }
});