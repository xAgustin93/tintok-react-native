import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { ENV } from "../utils";

async function saveTokens(access, refresh) {
  await AsyncStorage.setItem(ENV.JWT.ACCESS, access);
  await AsyncStorage.setItem(ENV.JWT.REFRESH, refresh);
}

async function getTokens() {
  const access = await AsyncStorage.getItem(ENV.JWT.ACCESS);
  const refresh = await AsyncStorage.getItem(ENV.JWT.REFRESH);

  return {
    access,
    refresh,
  };
}

async function removeTokens() {
  await AsyncStorage.removeItem(ENV.JWT.ACCESS);
  await AsyncStorage.removeItem(ENV.JWT.REFRESH);
}

function hasExpired(token) {
  if (!token) return false;

  const { exp } = jwtDecode(token);
  const currentDate = new Date().getTime();
  const expiredDate = new Date(exp * 1000).getTime();

  if (currentDate > expiredDate) {
    return true;
  }
  return false;
}

export const jwt = {
  saveTokens,
  getTokens,
  removeTokens,
  hasExpired,
};
