import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { COLORS } from "../../theme/colors";

interface Props {
  progress: number;
  timeLabel: string;
  phaseIcon: string;
  phaseTitle: string;
}

export default function FastingProgressCircle({
  progress,
  timeLabel,
  phaseIcon,
  phaseTitle,
}: Props) {
  const size = 230;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * progress;

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        <Circle
          stroke={COLORS.secondary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <Circle
          stroke={COLORS.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.icon}>{phaseIcon}</Text>
        <Text style={styles.time}>{timeLabel}</Text>
        <Text style={styles.phase}>{phaseTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 230,
    height: 230,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  center: {
    position: "absolute",
    alignItems: "center",
  },
  icon: {
    fontSize: 34,
    marginBottom: 8,
  },
  time: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.text,
  },
  phase: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
  },
});