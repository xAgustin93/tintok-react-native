import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { Users } from "../../api";
import { useAuth } from "../../hooks";
import { Search, UserItem } from "../../components/Friends";

const usersController = new Users();

export function FriendsScreen() {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await usersController.obtains(accessToken, searchText);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchText]);

  return (
    <View>
      <SafeAreaView>
        <Search setSearchText={setSearchText} />
      </SafeAreaView>

      <FlatList
        style={{
          marginHorizontal: 12,
          height: "100%",
        }}
        data={users}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserItem user={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>
            No se han encontardo usuarios
          </Text>
        }
      />
    </View>
  );
}
