/* import * as React from 'react'; */
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import { ActivityIndicator } from 'react-native';
import { url, urlHomologacao, urlProducao } from './constants';


export default function App() {

  const webViewRef = useRef(null)
  const [hasPermission, setHasPermission] = useState(null);



  useEffect(() => {
    scrollToBottom();
  }, [webViewRef]);

  function scrollToBottom() {
    webViewRef.current?.injectJavaScript('some JavaScript');
  };


  useEffect(() => {
    (async () => {
    
      const allGranted = await Promise.all([Camera.requestCameraPermissionsAsync(), Camera.requestMicrophonePermissionsAsync()]).then((results) => results.every((result) => result.granted)); 
      setHasPermission(allGranted);
    })();
  }, []);




  useEffect(() => {
    const backAction = () => {
      webViewRef.current.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);


  if (!hasPermission) {
    return (
      <View>
        <Text>Grant Permission first</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <WebView
        style={styles.view}
        javaScriptEnabled
        pullToRefreshEnabled
        source={{
          uri: url,
        }}
        startInLoadingState
        allowsInlineMediaPlayback
        allowsFullscreenVideo
        domStorageEnabled
        useWebKit
        originWhitelist={["*"]}
        mediaPlaybackRequiresUserAction={false}
        ref={webViewRef}


      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006837',
    paddingTop: 40
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  },
  view: {
    borderColor: 'red',

  }
});