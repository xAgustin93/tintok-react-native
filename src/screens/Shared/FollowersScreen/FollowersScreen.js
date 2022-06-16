import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { Follow } from "../../../api";
import { useAuth } from "../../../hooks";
import { FollowItem } from "../../../components/Shared";
import { styles } from "./FollowersScreen.styles";

const follow = new Follow();

export function FollowersScreen(props) {
  const {
    route: { params },
  } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await follow.getFollowers(accessToken, params.idUser);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params.idUser]);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Seguidores</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <FollowItem user={item.user_data} />}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={
          <View>
            <Text>Aun no te sigue nadie, sube más contenido</Text>
          </View>
        }
      />
    </View>
  );
}
