import { useEffect, useState } from "react";

import {
  ExamRecord,
  getExamRecords,
  saveExamRecords,
} from "../../storage/examsStorage";

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
import { Beaker, HeartPulse, Plus, TrendingDown, X } from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import BackButton from "../../components/Button/BackButton";
import { COLORS } from "../../theme/colors";


export default function ExamsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const [glucose, setGlucose] = useState("");
  const [insulin, setInsulin] = useState("");
  const [homaIr, setHomaIr] = useState("");
  const [hba1c, setHba1c] = useState("");
  const [totalCholesterol, setTotalCholesterol] = useState("");
  const [hdl, setHdl] = useState("");
  const [ldl, setLdl] = useState("");
  const [triglycerides, setTriglycerides] = useState("");
  const [tsh, setTsh] = useState("");
  const [freeT4, setFreeT4] = useState("");
  const [vitaminD, setVitaminD] = useState("");
  const [ferritin, setFerritin] = useState("");
  const [b12, setB12] = useState("");

const [records, setRecords] = useState<ExamRecord[]>([]);

useEffect(() => {
  loadRecords();
}, []);

async function loadRecords() {
  const stored = await getExamRecords();

  if (stored.length > 0) {
    setRecords(stored);
  }
}

  async function handleSave() {
  const today = new Date().toLocaleDateString("pt-BR");

  const newRecord: ExamRecord = {
    id: String(Date.now()),
    date: today,
    glucose,
    insulin,
    homaIr,
    hba1c,
    totalCholesterol,
    hdl,
    ldl,
    triglycerides,
    tsh,
    freeT4,
    vitaminD,
    ferritin,
    b12,
  };

  const updatedRecords = [newRecord, ...records];

  setRecords(updatedRecords);

  await saveExamRecords(updatedRecords);

  setGlucose("");
  setInsulin("");
  setHomaIr("");
  setHba1c("");
  setTotalCholesterol("");
  setHdl("");
  setLdl("");
  setTriglycerides("");
  setTsh("");
  setFreeT4("");
  setVitaminD("");
  setFerritin("");
  setB12("");

  setModalVisible(false);
}

  const latest = records[0] ?? {
  date: "-",
  glucose: "-",
  insulin: "-",
  homaIr: "-",
  vitaminD: "-",
};

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />
        <Text style={styles.eyebrow}>Exames</Text>
        <Text style={styles.title}>Indicadores laboratoriais</Text>
        <Text style={styles.subtitle}>
          Registre seus exames e acompanhe a evolução da sua saúde metabólica.
        </Text>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>Últimos exames</Text>
            <Text style={styles.heroValue}>{latest.date}</Text>
            <Text style={styles.heroText}>Glicemia: {latest.glucose} mg/dL</Text>
          </View>

          <View style={styles.heroIcon}>
            <Beaker size={30} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <HeartPulse size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>{latest.glucose}</Text>
            <Text style={styles.cardLabel}>Glicemia</Text>
          </View>

          <View style={styles.card}>
            <TrendingDown size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>{latest.insulin}</Text>
            <Text style={styles.cardLabel}>Insulina</Text>
          </View>

          <View style={styles.card}>
            <Beaker size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>{latest.homaIr}</Text>
            <Text style={styles.cardLabel}>HOMA-IR</Text>
          </View>

          <View style={styles.card}>
            <Plus size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>{latest.vitaminD}</Text>
            <Text style={styles.cardLabel}>Vitamina D</Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton title="+ Novo exame" onPress={() => setModalVisible(true)} />
        </View>

        <Text style={styles.sectionTitle}>Histórico</Text>

        <View style={styles.historyCard}>
          {records.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyText}>
                  Insulina: {item.insulin} • HOMA: {item.homaIr}
                </Text>
              </View>

              <Text style={styles.historyValue}>{item.glucose}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Comparativo importante</Text>
          <Text style={styles.noteText}>
            Em um processo de emagrecimento, exames como glicemia, insulina,
            HOMA-IR, triglicerídeos e vitamina D ajudam a enxergar evolução além
            do peso.
          </Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo exame</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {[
                ["Glicemia", glucose, setGlucose],
                ["Insulina", insulin, setInsulin],
                ["HOMA-IR", homaIr, setHomaIr],
                ["Hemoglobina glicada", hba1c, setHba1c],
                ["Colesterol total", totalCholesterol, setTotalCholesterol],
                ["HDL", hdl, setHdl],
                ["LDL", ldl, setLdl],
                ["Triglicerídeos", triglycerides, setTriglycerides],
                ["TSH", tsh, setTsh],
                ["T4 Livre", freeT4, setFreeT4],
                ["Vitamina D", vitaminD, setVitaminD],
                ["Ferritina", ferritin, setFerritin],
                ["Vitamina B12", b12, setB12],
              ].map(([label, value, setter]) => (
                <View key={String(label)}>
                  <Text style={styles.label}>{String(label)}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o valor"
                    placeholderTextColor={COLORS.subtitle}
                    keyboardType="decimal-pad"
                    value={value as string}
                    onChangeText={setter as (text: string) => void}
                  />
                </View>
              ))}

              <View style={styles.modalButtonArea}>
                <PinkButton title="Salvar exame" onPress={handleSave} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 24, paddingBottom: 120 },
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroLabel: { color: COLORS.white, opacity: 0.9 },
  heroValue: {
    marginTop: 6,
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.white,
  },
  heroText: { marginTop: 4, color: COLORS.white, opacity: 0.9 },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 14 },
  card: {
    width: "47%",
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardValue: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  cardLabel: { marginTop: 4, fontSize: 13, color: COLORS.subtitle },
  buttonArea: { marginTop: 24, marginBottom: 26 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },
  historyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyItem: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  historyDate: { fontWeight: "800", color: COLORS.text },
  historyText: { marginTop: 3, color: COLORS.subtitle },
  historyValue: { fontWeight: "900", color: COLORS.primary },
  noteCard: {
    marginTop: 24,
    backgroundColor: COLORS.secondary,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noteTitle: {
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
    justifyContent: "space-between",
    marginBottom: 22,
  },
  modalTitle: { fontSize: 24, fontWeight: "900", color: COLORS.text },
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
  modalButtonArea: { marginTop: 10, marginBottom: 30 },
});