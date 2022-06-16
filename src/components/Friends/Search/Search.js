import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./Search.styles";

export function Search(props) {
  const { setSearchText } = props;

  return (
    <View>
      <Input
        placeholder="Encuentra amigos"
        inputContainerStyle={styles.inputContainer}
        leftIcon={{
          type: "material-community",
          name: "magnify",
        }}
        onChangeText={(text) => setSearchText(text)}
      />
    </View>
  );
}
