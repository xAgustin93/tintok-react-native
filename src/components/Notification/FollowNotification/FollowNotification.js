import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Text, Avatar } from "react-native-elements";
import { DateTime } from "luxon";
import { useNavigation } from "@react-navigation/native";
import { LOGO } from "../../../../assets/images";
import { screen } from "../../../utils";
import { styles } from "./FollowNotification.styles";

export function FollowNotification(props) {
  const { notification, readNotification } = props;
  const userFollower = notification.user_follower_data;
  const navigation = useNavigation();
  const [isRead, setIsRead] = useState(notification.read);

  const goToUser = () => {
    navigation.navigate(screen.app.user, { idUser: userFollower.id });
  };

  const onReadNotification = () => readNotification(notification.id, setIsRead);

  return (
    <Pressable
      style={[styles.content, isRead && styles.inactive]}
      onPress={goToUser}
      onLongPress={!isRead ? onReadNotification : null}
    >
      <View style={styles.leftContent}>
        <Avatar
          source={userFollower.avatar ? { uri: userFollower.avatar } : LOGO}
          rounded
          size={40}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.user}>{userFollower.username}</Text>
          <Text style={styles.text}>empezó a seguirte.</Text>
          <Text style={styles.time}>
            {DateTime.fromISO(notification.created_at)
              .setLocale("es")
              .minus({ days: 1 })
              .toRelative()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
