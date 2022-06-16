import React from "react";
import { View, Linking } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./Settings.styles";

export function Settings(props) {
  const { instagram } = props;
  const navigation = useNavigation();

  const openSettings = () => {
    navigation.navigate(screen.account.settings);
  };

  const openUrl = () => {
    Linking.openURL(`https://www.instagram.com/${instagram}/`);
  };

  return (
    <View style={styles.content}>
      <Button
        title="Editar perfil"
        buttonStyle={styles.settings}
        containerStyle={styles.settings}
        titleStyle={styles.settingsText}
        onPress={openSettings}
      />
      {instagram ? (
        <Button
          icon={{ type: "material-community", name: "instagram" }}
          buttonStyle={styles.social}
          containerStyle={styles.social}
          onPress={openUrl}
        />
      ) : null}
    </View>
  );
}
