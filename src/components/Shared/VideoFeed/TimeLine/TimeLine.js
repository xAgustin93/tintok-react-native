import React from "react";
import { View } from "react-native";
import { styles } from "./TimeLine.styles";

export function TimeLine(props) {
  const { status } = props;

  const totalTime = status.playableDurationMillis;
  const currenTime = status.positionMillis;

  const currentPercentaje = (currenTime * 100) / totalTime;

  const lineStyle = {
    width: `${currentPercentaje}%`,
  };

  return <View style={[styles.content, lineStyle]} />;
}
