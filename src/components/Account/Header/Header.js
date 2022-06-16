import React from "react";
import { View } from "react-native";
import { Text, Avatar } from "react-native-elements";
import { LOGO } from "../../../../assets/images";
import { styles } from "./Header.styles";

export function Header(props) {
  const { avatar, username } = props;

  return (
    <View style={styles.content}>
      <Avatar
        size={100}
        source={avatar ? { uri: avatar } : LOGO}
        rounded
        containerStyle={styles.avatar}
      />
      <Text style={styles.username}>@{username}</Text>
    </View>
  );
}
