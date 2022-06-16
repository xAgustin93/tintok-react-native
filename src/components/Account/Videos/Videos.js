import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { Text, Image } from "react-native-elements";
import { map, size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { Video } from "../../../api";
import { useAuth } from "../../../hooks";
import { screen } from "../../../utils";
import { styles } from "./Videos.styles";

const video = new Video();

export function Videos(props) {
  const { idUser } = props;
  const [videos, setVideos] = useState(null);
  const { accessToken } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const response = await video.getVideosUser(accessToken, idUser);
        setVideos(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [idUser]);

  if (!videos) return null;

  const goToVideo = (data) => {
    navigation.navigate(screen.app.videosPublished, {
      idUser,
      idVideo: data.id,
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
          <Image source={{ uri: video.image }} style={styles.image} />
        </Pressable>
      ))}

      {size(videos) === 0 && (
        <View style={styles.noVideos}>
          <Text>No tienes ningun video publicado</Text>
        </View>
      )}
    </View>
  );
}
