import { StyleSheet, Dimensions } from "react-native";
import { ENV } from "../../../../utils";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  content: {
    height: height - ENV.TAB_MENU_HEIGHT,
    width: width,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  blockContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  blockLeft: {
    width: "85%",
    height: "100%",
    justifyContent: "flex-end",
  },
  blockRight: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: 100,
  },
});
