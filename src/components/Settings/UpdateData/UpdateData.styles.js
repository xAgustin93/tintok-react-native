import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    opacity: 0.5,
  },
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  blockContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  blockValue: {
    maxWidth: 150,
  },
  icon: {
    fontSize: 20,
    opacity: 0.6,
    marginLeft: 5,
  },
});
