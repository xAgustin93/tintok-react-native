import React, { useState, useCallback, useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "../../../api";
import { useAuth, useTheme } from "../../../hooks";
import { UpdateAvatar, UpdateData } from "../../../components/Settings";
import { styled } from "./SettingsScreen.styles";

const userController = new User();

export function SettingsScreen(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const { accessToken, logout } = useAuth();
  const { toggleTheme, darkMode } = useTheme();
  const styles = styled();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await userController.me(accessToken);
          setUser(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [reload])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="material-community"
          name={darkMode ? "weather-sunny" : "weather-night"}
          size={24}
          onPress={toggleTheme}
        />
      ),
    });
  }, [darkMode]);

  const onRelaodUser = () => setReload((prevState) => !prevState);

  if (!user) return null;

  return (
    <ScrollView>
      <UpdateAvatar avatar={user.avatar} onRelaodUser={onRelaodUser} />
      <UpdateData
        name={user.first_name}
        username={user.username}
        description={user.description}
        email={user.email}
        website={user.website}
        instagram={user.instagram}
      />

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnLogout}
        onPress={logout}
      />
    </ScrollView>
  );
}
