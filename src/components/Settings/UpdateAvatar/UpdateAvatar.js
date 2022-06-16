import React from "react";
import { View, Pressable } from "react-native";
import { Text, Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { LOGO } from "../../../../assets/images";
import { styles } from "./UpdateAvatar.styles";

const user = new User();

export function UpdateAvatar(props) {
  const { avatar, onRelaodUser } = props;
  const { accessToken } = useAuth();

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) updateAvatar(result.uri);
  };

  const updateAvatar = async (imageUri) => {
    try {
      await user.updateAvatar(accessToken, imageUri);
      onRelaodUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable style={styles.content} onPress={changeAvatar}>
      <View style={styles.contentAvatar}>
        <Avatar
          size={100}
          source={avatar ? { uri: avatar } : LOGO}
          rounded
          containerStyle={styles.avatar}
        />
        <View style={styles.iconContent}>
          <Icon
            type="material-community"
            name="camera-outline"
            size={14}
            containerStyle={styles.iconContainer}
            iconStyle={styles.icon}
          />
        </View>
      </View>
      <Text>Cambiar foto</Text>
    </Pressable>
  );
}
