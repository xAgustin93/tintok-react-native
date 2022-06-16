import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Info.styles";

export function Info(props) {
  const { username, description } = props;
  const [showLines, setShowLines] = useState(2);

  const openCloseDescription = () => {
    setShowLines(showLines === 2 ? 100 : 2);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.username}>@{username}</Text>
      <Text numberOfLines={showLines}>{description}</Text>
      <Text style={styles.loadMore} onPress={openCloseDescription}>
        {showLines === 2 ? "Ver más" : "Ocultar"}
      </Text>
    </View>
  );
}
