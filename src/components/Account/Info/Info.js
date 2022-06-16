import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import { styles } from "./Info.styles";

export function Info(props) {
  const { description, website } = props;

  const openUrl = () => {
    WebBrowser.openBrowserAsync(website);
  };

  return (
    <View style={styles.content}>
      {description ? <Text style={styles.text}>{description}</Text> : null}

      {website ? (
        <TouchableOpacity style={styles.linkContent} onPress={openUrl}>
          <Icon
            type="material-community"
            name="link-variant"
            size={14}
            containerStyle={styles.iconContainer}
          />
          <Text style={styles.text}>{website}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
