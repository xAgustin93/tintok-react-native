import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Follow, Notification } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { LOGO } from "../../../../../assets/images";
import { screen, ENV } from "../../../../utils";
import { styles } from "./Profile.styles";

const followController = new Follow();
const notification = new Notification();

export function Profile(props) {
  const { idUser, image } = props;
  const [isFollowing, setIsFollowing] = useState(true);
  const { accessToken, auth } = useAuth();
  const navigation = useNavigation();
  const { name } = useRoute();
  const isMyVideo = idUser === auth.user_id;

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

  const goToProfile = () => {
    if (isMyVideo && name === screen.home.home) {
      navigation.navigate(screen.account.tab, {
        screen: screen.account.account,
      });
    } else {
      navigation.navigate(screen.app.user, { idUser });
    }
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

  return (
    <View style={styles.content}>
      <Avatar
        rounded
        source={image ? { uri: image } : LOGO}
        size={40}
        avatarStyle={styles.avatar}
        onPress={goToProfile}
      />
      {!isMyVideo && !isFollowing && (
        <Icon
          type="material-community"
          name="plus"
          size={14}
          containerStyle={styles.iconContainer}
          onPress={follow}
        />
      )}
    </View>
  );
}
