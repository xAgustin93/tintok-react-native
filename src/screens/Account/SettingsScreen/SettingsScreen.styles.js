import { StyleSheet } from "react-native";
import { useTheme } from "../../../hooks";

export const styled = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    btnLogout: {
      backgroundColor: "transparent",
      borderTopWidth: 1,
      borderTopColor: theme.Default.border,
      borderBottomWidth: 1,
      borderBottomColor: theme.Default.border,
      borderRadius: 0,
    },
  });
};
