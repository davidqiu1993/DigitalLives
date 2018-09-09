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


var db = {};

db._dbpath = '../assets/det2feel.json';
db._dbbpath = require('../assets/det2feel.json');

db._data = undefined;

db._load = function () {
    if (!db._data) {
      db._data = db._dbbpath;
    }
}

db._save = function () {
  fs.writeFileSync(db._dbpath, JSON.stringify(db._data));
}

db.init = function () {
  db._load();
}

db.getFeelingList = function () {
  return db._data.feelings;
}

db.getDetectionList = function () {
  var detectionList = [];
  
  for (var detection in db._data.detections) {
    if (db._data.detections.hasOwnProperty(detection)) {
      detectionList.push(detection);
    }
  }

  return detectionList;
}

db.getIncompleteDetectionList = function () {
  var detectionList = [];
  
  for (var detection in db._data.detections) {
    if (db._data.detections.hasOwnProperty(detection)) {
      for (var i=0; i<db._data.feelings.length; ++i) {
        var feeling = db._data.feelings[i];
        if (!db._data.detections[detection].hasOwnProperty(feeling)) {
          detectionList.push(detection);
          break;
        }
      }
    }
  }

  return detectionList;
}

db.getFeelingValues = function (detection) {
  return db._data.detections[detection];
}

db.getIncompleteFeelingList = function (detection) {
  var feelingList = [];

  for (var i=0; i<db._data.feelings.length; ++i) {
    var feeling = db._data.feelings[i];
    if (!db._data.detections[detection].hasOwnProperty(feeling)) {
      feelingList.push(feeling);
    }
  }

  return feelingList;
}

db.updateFeelingValue = function (detection, feeling, val) {
  db._data.detections[detection][feeling] = val;
  var sum = 0;
  db._save();
  return db.getFeelingValues(detection);
};

function testDetections (detectionList) {
  db.init();

    var feelingValues = {};
    var feelingList = db.getFeelingList();
    for (var i=0; i<feelingList.length; ++i) {
      var feeling = feelingList[i];
      feelingValues[feeling] = 0;
      for (var j=0; j<detectionList.length; ++j) {
          var detection = detectionList[j];
          feelingValues[feeling] += db.getFeelingValues(detection)[feeling];
      }
    }
    return feelingValues;
};

function getPetFeelingKeyword (detectionList, petFeelings=null) {
  if (detectionList === []){
    return 'random+sky';
  }
  if (petFeelings === null) {
    petFeelings = {
      "depraved": 0,
      "fresh": 4,
      "people": 0,
      "animal": 5,
      "city": 2,
      "countryside": 5
    };
  }

  var feelingValues = testDetections(detectionList);

  // normalization and difference
  var feelingList = db.getFeelingList();
  var sum_pet = 0;
  var sum_feel = 0;
  var diff = 0;
  for (var i=0; i<feelingList.length; ++i) {
    var feeling = feelingList[i];
    sum_pet += petFeelings[feeling];
    sum_feel += feelingValues[feeling];
  }
  for (var i=0; i<feelingList.length; ++i) {
    var feeling = feelingList[i];
    petFeelings[feeling] = petFeelings[feeling] / sum_pet;
    feelingValues[feeling] = feelingValues[feeling] / sum_feel;
    diff += Math.abs(petFeelings[feeling] - feelingValues[feeling]);
  }
  
  // output feeling keywords
  var keyword = 'boring';
  if (diff < 0.35) {
    keyword = 'nice';
  } else if (diff < 0.55) {
    keyword = 'like';
  } else if (diff < 0.7) {
    keyword = 'boring';
  } else if (diff < 0.85) {
    keyword = 'bad';
  } else {
    keyword = 'sucks';
  }

  return keyword;
}


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    let keyword = getPetFeelingKeyword (global.detections);
    var xhr = fetch("http://api.giphy.com/v1/gifs/search?q=" + keyword + "key&api_key=6cCWFhXew0IqQcfPdHzyIBj2ArBA0YTW&limit=1", {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => responseJson["data"][0]); // take first gif in hit

    var gif_uri;

    xhr.done(function(data) {
      console.log("success got data", data);
      try{gif_uri = data["images"]["original"]["url"];}
      catch(err){gif_uri = ' ';}
      console.log("this is gif uri ", gif_uri);
      global_gif_uri = gif_uri;   
    });  
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
    let gif_uri = this.state.isShowingGif ? this.state.gif_uri : ' ';
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