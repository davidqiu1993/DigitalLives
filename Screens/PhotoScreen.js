import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, Permissions } from 'expo';

import D2F from './D2F';


export default class PhotoScreen extends React.Component {
  static navigationOptions = {
    title: 'PhotoScreen',
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => {this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}SNAP{' '}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  updated2f = async function() {
    console.log('in d2f');
    global.detections = this.takePicture();
    console.log("serano",global.detections);
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved, base64:true})
        .then(data => 
          fetch('http://35.231.26.95:8080', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: data.base64,
            })
          }).then((response) => response.json())
            .then((responseJson) => { global.detections = responseJson["data"]["detections"]; console.log('hi',responseJson, global.detections);} )
        );
      console.log('in if');
    }
  }
  onPictureSaved = async photo => {
    fetch('http://35.231.26.95:8080', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: photo.base64,
      }),
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});