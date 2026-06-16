import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

interface PinkButtonProps {
  title: string;
  onPress?: () => void;
}

export default function PinkButton({ title, onPress }: PinkButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
