import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { COLORS } from "../../theme/colors";

interface PinkButtonProps {
  title: string;
  onPress?: () => void;
}

export default function PinkButton({ title, onPress }: PinkButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
