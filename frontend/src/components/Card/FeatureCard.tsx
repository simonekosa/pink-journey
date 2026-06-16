import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../theme/colors";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>{icon}</View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  description: {
    marginTop: 3,
    fontSize: 13,
    color: COLORS.subtitle,
  },
});
