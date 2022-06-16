import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { Follow } from "../../../api";
import { useAuth } from "../../../hooks";
import { styles } from "./Follows.styles";

const follow = new Follow();

export function Follows(props) {
  const { idUser } = props;
  const [followedsCount, setFollowedsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const navigation = useNavigation();
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await follow.getFollowedsCount(accessToken, idUser);
        setFollowedsCount(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await follow.getFollowersCount(accessToken, idUser);
        setFollowersCount(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const openFolloweds = () => {
    navigation.navigate(screen.app.followeds, { idUser });
  };

  const openFollowers = () => {
    navigation.navigate(screen.app.followers, { idUser });
  };

  return (
    <View style={styles.content}>
      <Pressable style={styles.item} onPress={openFolloweds}>
        <Text style={styles.count}>{followedsCount}</Text>
        <Text style={styles.title}>Siguiendo</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={openFollowers}>
        <Text style={styles.count}>{followersCount}</Text>
        <Text style={styles.title}>Seguidores</Text>
      </Pressable>
    </View>
  );
}
