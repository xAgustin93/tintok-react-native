import React, { useState, useCallback } from "react";
import { View, Pressable } from "react-native";
import { Text, Image } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { map, size } from "lodash";
import { Video } from "../../../api";
import { useAuth } from "../../../hooks";
import { screen } from "../../../utils";
import { styles } from "./VideosFavorites.styles";

const video = new Video();

export function VideosFavorites(props) {
  const { idUser } = props;
  const [videos, setVideos] = useState(null);
  const navigation = useNavigation();
  const { accessToken } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await video.getVideosFavoritesUser(
            accessToken,
            idUser
          );
          setVideos(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [idUser])
  );

  if (!videos) return null;

  const goToVideo = (data) => {
    navigation.navigate(screen.app.videosFavorites, {
      idVideo: data.video_data.id,
      idUser,
    });
  };

  return (
    <View style={styles.content}>
      {map(videos, (video, index) => (
        <Pressable
          key={index}
          style={styles.videoBlock}
          onPress={() => goToVideo(video)}
        >
          <Image
            source={{ uri: video.video_data.image }}
            style={styles.image}
          />
        </Pressable>
      ))}

      {size(videos) === 0 && (
        <View style={styles.noVideos}>
          <Text>No tienes ningun video en favoritos</Text>
        </View>
      )}
    </View>
  );
}
