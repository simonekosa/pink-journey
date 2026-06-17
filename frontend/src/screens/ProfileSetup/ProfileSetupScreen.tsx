import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import PinkButton from "../../components/Button/PinkButton";
import { COLORS } from "../../theme/colors";
import { RootStackParamList } from "../../navigation/AppNavigator";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "ProfileSetup"
>;

export default function ProfileSetupScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [startWeight, setStartWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [goal, setGoal] = useState("");

  function handleContinue() {
    navigation.navigate("Main");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.eyebrow}>Cadastro inicial</Text>

          <Text style={styles.title}>Me conte sobre sua jornada</Text>

          <Text style={styles.subtitle}>
            Esses dados serão usados futuramente para calcular sua evolução.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Simone"
              placeholderTextColor={COLORS.subtitle}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Altura</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1,70"
              placeholderTextColor={COLORS.subtitle}
              keyboardType="decimal-pad"
              value={height}
              onChangeText={setHeight}
            />

            <Text style={styles.label}>Peso inicial</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 105"
              placeholderTextColor={COLORS.subtitle}
              keyboardType="decimal-pad"
              value={startWeight}
              onChangeText={setStartWeight}
            />

            <Text style={styles.label}>Peso meta</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 85"
              placeholderTextColor={COLORS.subtitle}
              keyboardType="decimal-pad"
              value={targetWeight}
              onChangeText={setTargetWeight}
            />

            <Text style={styles.label}>Objetivo</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: Quero perder peso, ter mais energia e melhorar minha saúde."
              placeholderTextColor={COLORS.subtitle}
              value={goal}
              onChangeText={setGoal}
              multiline
              textAlignVertical="top"
            />

            <PinkButton title="Salvar e Continuar" onPress={handleContinue} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboard: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.subtitle,
  },
  form: {
    marginTop: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 18,
  },
  textArea: {
    minHeight: 110,
  },
});