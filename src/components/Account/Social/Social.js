import React, { useState, useEffect } from "react";
import { View, Linking } from "react-native";
import { Button } from "react-native-elements";
import { Follow, Notification } from "../../../api";
import { useAuth } from "../../../hooks";
import { ENV } from "../../../utils";
import { styles } from "./Social.styles";

const followController = new Follow();
const notification = new Notification();

export function Social(props) {
  const { idUser, instagram } = props;
  const [isFollowing, setIsFollowing] = useState(undefined);
  const { accessToken, auth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await followController.isFollowing(
          accessToken,
          auth.user_id,
          idUser
        );
        setIsFollowing(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const openUrl = () => {
    Linking.openURL(`https://www.instagram.com/${instagram}`);
  };

  const follow = async () => {
    try {
      await followController.follow(accessToken, auth.user_id, idUser);
      await notification.create({
        token: accessToken,
        idUserFollower: auth.user_id,
        idTargetUser: idUser,
        typeNotification: ENV.TYPE_NOTIFICATION.FOLLOW,
      });
      setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const unfollowing = async () => {
    try {
      const response = await followController.getFollowing(
        accessToken,
        auth.user_id,
        idUser
      );
      const idFollow = response.id;

      await followController.deleteFollow(accessToken, idFollow);
      setIsFollowing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.content}>
      {isFollowing === false ? (
        <Button
          title="Seguir"
          buttonStyle={styles.follow}
          containerStyle={styles.follow}
          onPress={follow}
        />
      ) : null}

      {isFollowing ? (
        <Button
          icon={{ type: "material-community", name: "account-check-outline" }}
          buttonStyle={styles.unfollowing}
          containerStyle={styles.unfollowing}
          onPress={unfollowing}
        />
      ) : null}

      {instagram ? (
        <Button
          icon={{ type: "material-community", name: "instagram" }}
          buttonStyle={styles.social}
          containerStyle={styles.social}
          onPress={openUrl}
        />
      ) : null}
    </View>
  );
}
