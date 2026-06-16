import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

import { COLORS } from "../../theme/colors";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🌸</Text>

        <Text style={styles.title}>Pink Journey</Text>

        <Text style={styles.subtitle}>
          Sua jornada de transformação começa hoje.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  logo: {
    fontSize: 72,
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.subtitle,
    textAlign: "center",
  },

  button: {
    marginTop: 40,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
