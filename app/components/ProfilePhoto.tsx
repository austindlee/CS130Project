import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';

type ProfilePhotoProps  = {
  /** Link to a URL containing the profile photo fo the user */
  profilePhotoURL?: string
}

/**
 * Displays a profile photo given by a URL, or a default profile photo
 */
class ProfilePhoto extends React.Component<ProfilePhotoProps> {
  constructor(props: ProfilePhotoProps) {
    super(props);

    this.state = {
      loadedPhoto: null
    }
  }

  render() {
    return (
      <Image
        style={{width: 36, height: 36, borderRadius: 18, marginRight: 5}}
        source={{uri: this.props.profilePhotoURL ? this.props.profilePhotoURL : 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'}}
      />
    )
  }
}

export default ProfilePhoto
