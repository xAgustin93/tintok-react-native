import { StyleSheet } from "react-native";
import { useTheme } from "../../../../hooks";

export const styled = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    content: {
      alignItems: "center",
      marginBottom: 20,
    },
    commentsList: {
      marginBottom: 80,
    },
    rbSheetContainer: {
      borderTopLeftRadius: 10,
      borderTopEndRadius: 10,
      backgroundColor: theme.Default.background,
    },
    noCommentText: {
      textAlign: "center",
      marginTop: 20,
      opacity: 0.6,
    },
  });
};
