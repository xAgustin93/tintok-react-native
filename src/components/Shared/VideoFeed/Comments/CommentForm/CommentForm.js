import React, { useState, useEffect } from "react";
import { View, Platform, Keyboard } from "react-native";
import { Input } from "react-native-elements";
import { size } from "lodash";
import { Comment, Notification } from "../../../../../api";
import { useAuth } from "../../../../../hooks";
import { ENV } from "../../../../../utils";
import { styled } from "./CommentForm.styles";

const commentController = new Comment();
const notification = new Notification();

export function CommentForm(props) {
  const { idTargetUser, idVideo, onReloadComments } = props;
  const [comment, setComment] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const styles = styled();
  const { accessToken, auth } = useAuth();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(
        Platform.OS === "ios" ? e.endCoordinates.height - 20 : 100
      );
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const sendComment = async () => {
    if (size(comment) > 0) {
      try {
        await commentController.create(
          accessToken,
          comment,
          auth.user_id,
          idVideo
        );
        await notification.create({
          token: accessToken,
          idUserFollower: auth.user_id,
          idTargetUser: idTargetUser,
          idVideo: idVideo,
          comment: comment,
          typeNotification: ENV.TYPE_NOTIFICATION.COMMENT,
        });

        setComment("");
        onReloadComments();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={[styles.content, { bottom: keyboardHeight }]}>
      <Input
        placeholder="Añadir comentario..."
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputStyle}
        onChangeText={(text) => setComment(text)}
        value={comment}
        onSubmitEditing={sendComment}
      />
    </View>
  );
}
