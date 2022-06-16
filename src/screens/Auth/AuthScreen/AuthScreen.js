import React from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";
import { screen } from "../../../utils";
import { styled } from "./AuthScreen.styles";

export function AuthScreen(props) {
  const { navigation } = props;
  const styles = styled();

  const goToRegisterEmail = () => {
    navigation.navigate(screen.auth.registerEmail);
  };

  const goToLoginEmail = () => {
    navigation.navigate(screen.auth.loginEmail);
  };

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.optionsContent}>
        <Text style={styles.title}>Regístrate en TinTok</Text>
        <Text style={styles.info}>
          Crea un perfil, sigue otras cuentas, sube tus propios videos y más.
        </Text>

        <TouchableOpacity
          onPress={goToRegisterEmail}
          style={styles.itemRegister}
        >
          <Icon type="material-community" name="at" />
          <Text>Usar correo electronico</Text>
          <View />
        </TouchableOpacity>
      </View>

      <View style={styles.loginContent}>
        <Text>
          ¿Ya tienes una cuenta?{" "}
          <Text style={styles.login} onPress={goToLoginEmail}>
            Iniciar sesión
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
