import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CalendarDays,
  HeartPulse,
  Ruler,
  Scale,
  TrendingDown,
  X,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import { COLORS } from "../../theme/colors";

type WeightEntry = {
  id: string;
  date: string;
  weight: string;
};

type MeasurementItem = {
  label: string;
  value: string;
};

export default function MeasurementsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [abdomen, setAbdomen] = useState("");
  const [hip, setHip] = useState("");
  const [arm, setArm] = useState("");
  const [thigh, setThigh] = useState("");
  const [calf, setCalf] = useState("");

  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([
    { id: "1", date: "Hoje", weight: "105 kg" },
    { id: "2", date: "15/06/2026", weight: "105,8 kg" },
    { id: "3", date: "10/06/2026", weight: "106,4 kg" },
  ]);

  const [bodyMeasurements, setBodyMeasurements] = useState<MeasurementItem[]>([
    { label: "Cintura", value: "98 cm" },
    { label: "Abdômen", value: "112 cm" },
    { label: "Quadril", value: "118 cm" },
    { label: "Braço", value: "36 cm" },
    { label: "Coxa", value: "68 cm" },
    { label: "Panturrilha", value: "42 cm" },
  ]);

  function handleSaveMeasurement() {
    if (!weight) {
      return;
    }

    const today = new Date().toLocaleDateString("pt-BR");

    setWeightHistory((current) => [
      {
        id: String(Date.now()),
        date: today,
        weight: `${weight} kg`,
      },
      ...current,
    ]);

    setBodyMeasurements([
      { label: "Cintura", value: waist ? `${waist} cm` : "-" },
      { label: "Abdômen", value: abdomen ? `${abdomen} cm` : "-" },
      { label: "Quadril", value: hip ? `${hip} cm` : "-" },
      { label: "Braço", value: arm ? `${arm} cm` : "-" },
      { label: "Coxa", value: thigh ? `${thigh} cm` : "-" },
      { label: "Panturrilha", value: calf ? `${calf} cm` : "-" },
    ]);

    setWeight("");
    setWaist("");
    setAbdomen("");
    setHip("");
    setArm("");
    setThigh("");
    setCalf("");

    setModalVisible(false);
  }

  const currentWeight = weightHistory[0]?.weight ?? "0 kg";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>Peso e medidas</Text>
        <Text style={styles.title}>Acompanhe sua evolução</Text>
        <Text style={styles.subtitle}>
          Registre seu peso e suas medidas para visualizar seu progresso.
        </Text>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>Peso atual</Text>
            <Text style={styles.heroValue}>{currentWeight}</Text>
            <Text style={styles.heroText}>Meta: 85 kg • Faltam 20 kg</Text>
          </View>

          <View style={styles.heroIcon}>
            <Scale size={30} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <TrendingDown size={22} color={COLORS.primary} />
            <Text style={styles.summaryValue}>0,8 kg</Text>
            <Text style={styles.summaryLabel}>Última perda</Text>
          </View>

          <View style={styles.summaryCard}>
            <CalendarDays size={22} color={COLORS.primary} />
            <Text style={styles.summaryValue}>{weightHistory.length}</Text>
            <Text style={styles.summaryLabel}>Registros</Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton
            title="+ Nova pesagem"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <Text style={styles.sectionTitle}>Histórico de peso</Text>

        <View style={styles.listCard}>
          {weightHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Scale size={18} color={COLORS.primary} />
              </View>

              <View style={styles.historyContent}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyLabel}>Registro de peso</Text>
              </View>

              <Text style={styles.historyWeight}>{item.weight}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Medidas corporais</Text>

        <View style={styles.measurementsGrid}>
          {bodyMeasurements.map((item) => (
            <View key={item.label} style={styles.measurementCard}>
              <View style={styles.measurementIcon}>
                <Ruler size={18} color={COLORS.primary} />
              </View>
              <Text style={styles.measurementLabel}>{item.label}</Text>
              <Text style={styles.measurementValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noteCard}>
          <HeartPulse size={22} color={COLORS.primary} />
          <Text style={styles.noteTitle}>Dica da jornada</Text>
          <Text style={styles.noteText}>
            Tire suas medidas sempre no mesmo horário e nas mesmas condições
            para acompanhar sua evolução com mais precisão.
          </Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nova pesagem</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Peso atual</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 104,5"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />

              <Text style={styles.label}>Cintura</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 96"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={waist}
                onChangeText={setWaist}
              />

              <Text style={styles.label}>Abdômen</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 110"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={abdomen}
                onChangeText={setAbdomen}
              />

              <Text style={styles.label}>Quadril</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 116"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={hip}
                onChangeText={setHip}
              />

              <Text style={styles.label}>Braço</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 35"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={arm}
                onChangeText={setArm}
              />

              <Text style={styles.label}>Coxa</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 67"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={thigh}
                onChangeText={setThigh}
              />

              <Text style={styles.label}>Panturrilha</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 41"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={calf}
                onChangeText={setCalf}
              />

              <View style={styles.modalButtonArea}>
                <PinkButton
                  title="Salvar registro"
                  onPress={handleSaveMeasurement}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 24,
    paddingBottom: 110,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.subtitle,
    marginBottom: 24,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 24,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  heroValue: {
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.white,
    marginTop: 6,
  },
  heroText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryValue: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  buttonArea: {
    marginBottom: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 26,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  historyIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyDate: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },
  historyLabel: {
    marginTop: 3,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  historyWeight: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primary,
  },
  measurementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  measurementCard: {
    width: "47%",
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  measurementIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  measurementLabel: {
    fontSize: 13,
    color: COLORS.subtitle,
  },
  measurementValue: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
  },
  noteCard: {
    marginTop: 24,
    backgroundColor: COLORS.secondary,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noteTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  noteText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.subtitle,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  modalContent: {
    maxHeight: "88%",
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
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
    marginBottom: 16,
  },
  modalButtonArea: {
    marginTop: 10,
    marginBottom: 30,
  },
});