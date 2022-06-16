import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Video } from "../../api";
import { useAuth } from "../../hooks";
import { VideoFeed } from "../../components/Shared";

const videoController = new Video();
const { height } = Dimensions.get("window");

export function VideoScreen(props) {
  const {
    route: { params },
  } = props;
  const [video, setVideo] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await videoController.getVideoById(
          accessToken,
          params.idVideo
        );
        setVideo(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params]);

  if (!video) return null;

  return (
    <VideoFeed
      item={video}
      index={1}
      indexShow={1}
      style={{ height: height }}
    />
  );
}
