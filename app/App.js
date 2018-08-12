import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker } from 'expo';

export default class App extends React.Component {
  
  state = {
    showImage: false,
    image: null,
    status: ''
  }

  openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    });
    console.log(result);
    if (!result.cancelled) {
      console.log(result);
      this.setState({
        image: {uri: result.uri}, showImage: true
      });
    }
  }

  uploadImage = async (imageUri) => {
    this.setState({status: `Fetching Upload URL`});
    let res = await fetch('http://api.com/upload/images');
    res = await res.json();
    this.setState({status: `Uploading to AWS S3`});
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', urlResponse.data.url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({status: 'Successfully Uploaded'})
        } else {
          console.log(xhr.responseText);
            this.setState({status: `Upload failed with error code ${xhr.status}`});
          }
      }
    }
    xhr.setRequestHeader('Content-Type', 'image/jpeg')
    xhr.send({ uri: imageUri, type: 'image/jpeg', name: res.key})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Scalable Image Upload to AWS S3</Text>
        <Button
          title='Pick Image'
          onPress={this.openImagePicker}
        />
        {this.state.showImage ? 
        <View>
          <Image
            style={{width: 200, height: 200, marginTop: 50, marginBottom: 50}}
            source={this.state.image}
          />
          <Button
            title='Upload to S3'
            onPress={this.uploadImage}
          />
          <Text style={{marginTop: 25}}>{this.state.status}</Text>
        </View>
        : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    marginBottom: 25
  }
});
