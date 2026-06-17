import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { COLORS } from "../../theme/colors";

interface ActivityRingProps {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  label: string;
  value: string;
  icon: string;
}

export default function ActivityRing({
  size,
  strokeWidth,
  progress,
  color,
  label,
  value,
  icon,
}: ActivityRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * progress;

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
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
          stroke={color}
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
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    position: "absolute",
    alignItems: "center",
  },
  icon: {
    fontSize: 22,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.subtitle,
  },
});