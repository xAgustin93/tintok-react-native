import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    marginVertical: 20,
  },
  contentAvatar: {
    position: "relative",
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  avatar: {
    padding: 5,
  },
  iconContent: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  icon: {
    fontSize: 50,
  },
});
