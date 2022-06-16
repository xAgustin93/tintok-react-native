import React, { useState } from "react";
import { View, Share as ShareRN } from "react-native";
import { Text, Icon } from "react-native-elements";
import { Video, Notification } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { nFormatter, ENV } from "../../../../utils";
import { styles } from "./Share.styles";

const video = new Video();
const notification = new Notification();

export function Share(props) {
  const { idVideo, shareCounter, idTargetUser } = props;
  const [counter, setCounter] = useState(shareCounter);
  const { accessToken, auth } = useAuth();

  const onShare = async () => {
    try {
      const result = await ShareRN.share({
        message: "Compartir video",
      });

      if (result.action === ShareRN.sharedAction) {
        onUpdateShareCounter();
        await notification.create({
          token: accessToken,
          idUserFollower: auth.user_id,
          idTargetUser: idTargetUser,
          idVideo: idVideo,
          typeNotification: ENV.TYPE_NOTIFICATION.SHARED,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateShareCounter = async () => {
    try {
      const newTotal = counter + 1;
      await video.shareVideo(accessToken, idVideo, newTotal);
      setCounter(newTotal);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name="share"
        size={40}
        onPress={onShare}
      />
      <Text>{nFormatter(counter)}</Text>
    </View>
  );
}
