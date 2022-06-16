import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { LOGO } from "../../../../assets/images";
import { screen } from "../../../utils";
import { styles } from "./UserItem.styles";

export function UserItem(props) {
  const {
    user: { id, avatar, username },
  } = props;
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate(screen.app.user, { idUser: id });
  };

  return (
    <TouchableOpacity style={styles.content} onPress={goToProfile}>
      <Avatar source={avatar ? { uri: avatar } : LOGO} rounded size={60} />
      <Text style={styles.text}>{username}</Text>
    </TouchableOpacity>
  );
}
