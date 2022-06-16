import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { Follow } from "../../../api";
import { useAuth } from "../../../hooks";
import { FollowItem } from "../../../components/Shared";
import { styles } from "./FollowedsScreen.styles";

const follow = new Follow();

export function FollowedsScreen(props) {
  const {
    route: { params },
  } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await follow.getFolloweds(accessToken, params.idUser);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params.idUser]);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Siguiendo</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <FollowItem user={item.user_followed_data} />}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={
          <View>
            <Text>Empieza a seguir a algun usuario</Text>
          </View>
        }
      />
    </View>
  );
}
