import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: width,
  },
  videoBlock: {
    width: "33.3333%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  noVideos: {
    width: "100%",
    alignItems: "center",
    opacity: 0.6,
    marginTop: 20,
  },
});
