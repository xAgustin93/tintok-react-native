import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    minHeight: 70,
  },
  inactive: {
    opacity: 0.4,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  contentInfo: {
    width: "75%",
  },
  user: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  text: {
    opacity: 0.4,
  },
  time: {
    marginTop: 5,
    fontSize: 12,
  },
  imgVideo: {
    width: 40,
    height: 60,
    marginVertical: 5,
    borderRadius: 6,
    resizeMode: "cover",
  },
});
