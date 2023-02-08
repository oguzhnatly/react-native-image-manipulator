import React from 'react';
import {Button, View, Image} from 'react-native';
import RNImageManipulator from 'react-native-image-manipulator';

export default class ImageManipulatorSample extends React.Component {
  state = {
    ready: false,
    image: null,
  };

  componentDidMount() {
    (async () => {
      const image = require('./assets/tiktok.png');
      this.setState({
        ready: true,
        image,
      });
    })();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 100}}>
          <Button title="rotate" onPress={this._rotate90andFlip} />
          {this.state.ready && this._renderImage()}
        </View>
      </View>
    );
  }

  _rotate90andFlip = async () => {
    const manipResult = await RNImageManipulator.manipulate(
      Image.resolveAssetSource(this.state.image).uri,
      [{rotate: 90}, {flip: {vertical: true}}],
      {format: 'png'},
    );
    this.setState({image: manipResult});
  };

  _renderImage = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={this.state.image}
          style={{width: 300, height: 300, resizeMode: 'contain'}}
        />
      </View>
    );
  };
}
