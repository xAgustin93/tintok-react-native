import { StyleSheet } from "react-native";
import { useTheme } from "../../../../../hooks";

export const styled = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    content: {
      backgroundColor: theme.Default.backgroundSecondary,
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 80,
      paddingTop: 10,
    },
    inputContainer: {
      backgroundColor: "#333333",
      borderBottomWidth: 0,
      borderRadius: 8,
      paddingHorizontal: 5,
    },
    inputStyle: {
      fontSize: 14,
    },
  });
};
