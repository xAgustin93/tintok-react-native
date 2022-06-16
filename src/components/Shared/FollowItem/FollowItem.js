import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { LOGO } from "../../../../assets/images";
import { screen } from "../../../utils";
import { styles } from "./FollowItem.styles";

export function FollowItem(props) {
  const { user } = props;
  const navigation = useNavigation();

  const goToUser = () => {
    navigation.goBack();
    navigation.navigate(screen.app.user, { idUser: user.id });
  };

  return (
    <TouchableOpacity style={styles.content} onPress={goToUser}>
      <Avatar
        source={user.avatar ? { uri: user.avatar } : LOGO}
        rounded
        size={30}
      />
      <View style={styles.info}>
        <Text>{user.first_name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </TouchableOpacity>
  );
}
