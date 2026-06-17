import { useMemo, useState, useEffect } from "react";
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
  Activity,
  ArrowDown,
  ArrowUp,
  Droplets,
  Flame,
  Scale,
  X,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import BackButton from "../../components/Button/BackButton";
import { getBioimpedanceRecords, saveBioimpedanceRecords } from "../../storage/bioimpedanceStorage";
import { COLORS } from "../../theme/colors";

type BioRecord = {
  id: string;
  date: string;
  weight: number;
  bmi: number;
  bodyFat: number;
  muscleMass: number;
  leanMass: number;
  visceralFat: number;
  water: number;
  basalMetabolism: number;
  metabolicAge: number;
};

export default function BioimpedanceScreen() {
  const userHeight = 1.7;

  const [modalVisible, setModalVisible] = useState(false);

  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [leanMass, setLeanMass] = useState("");
  const [visceralFat, setVisceralFat] = useState("");
  const [water, setWater] = useState("");
  const [basalMetabolism, setBasalMetabolism] = useState("");
  const [metabolicAge, setMetabolicAge] = useState("");

  const [records, setRecords] = useState<BioRecord[]>([]);

  useEffect(() => {
  loadRecords();
}, []);

async function loadRecords() {
  try {
    const storedRecords = await getBioimpedanceRecords();

    if (storedRecords.length > 0) {
      setRecords(storedRecords);
    } else {
      setRecords([
        {
          id: "1",
          date: "16/06/2026",
          weight: 105,
          bmi: 36.3,
          bodyFat: 42,
          muscleMass: 31,
          leanMass: 60.9,
          visceralFat: 14,
          water: 48,
          basalMetabolism: 1680,
          metabolicAge: 52,
        },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
}

  function parseNumber(value: string) {
    const parsed = Number(value.replace(",", "."));
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  function formatNumber(value: number) {
    return value.toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    });
  }

  const calculatedBmi = useMemo(() => {
    const currentWeight = parseNumber(weight);

    if (!currentWeight || !userHeight) {
      return 0;
    }

    return currentWeight / (userHeight * userHeight);
  }, [weight]);

  function getBmiClassification(bmiValue: number) {
    if (!bmiValue) return "";

    if (bmiValue < 18.5) return "Abaixo do peso";
    if (bmiValue < 25) return "Peso normal";
    if (bmiValue < 30) return "Sobrepeso";
    if (bmiValue < 35) return "Obesidade Grau I";
    if (bmiValue < 40) return "Obesidade Grau II";

    return "Obesidade Grau III";
  }

  function getDifference(current: number, previous?: number) {
    if (previous === undefined) {
      return null;
    }

    return current - previous;
  }

  function renderDiff(diff: number | null, goodWhenDown = false) {
    if (diff === null || diff === 0) {
      return <Text style={styles.diffNeutral}>Sem variação</Text>;
    }

    const isPositive = diff > 0;
    const isGood = goodWhenDown ? diff < 0 : diff > 0;
    const Icon = isPositive ? ArrowUp : ArrowDown;

    return (
      <View style={styles.diffRow}>
        <Icon size={15} color={isGood ? COLORS.success : COLORS.error} />

        <Text
          style={[
            styles.diffText,
            { color: isGood ? COLORS.success : COLORS.error },
          ]}
        >
          {isPositive ? "+" : ""}
          {formatNumber(diff)}
        </Text>
      </View>
    );
  }

 async function handleSave() {
  if (!weight) return;

  const today = new Date().toLocaleDateString("pt-BR");

  const newRecord: BioRecord = {
    id: String(Date.now()),
    date: today,
    weight: parseNumber(weight),
    bmi: calculatedBmi,
    bodyFat: parseNumber(bodyFat),
    muscleMass: parseNumber(muscleMass),
    leanMass: parseNumber(leanMass),
    visceralFat: parseNumber(visceralFat),
    water: parseNumber(water),
    basalMetabolism: parseNumber(basalMetabolism),
    metabolicAge: parseNumber(metabolicAge),
  };

  const updatedRecords = [newRecord, ...records];

  setRecords(updatedRecords);

  await saveBioimpedanceRecords(updatedRecords);

  setWeight("");
  setBodyFat("");
  setMuscleMass("");
  setLeanMass("");
  setVisceralFat("");
  setWater("");
  setBasalMetabolism("");
  setMetabolicAge("");
  setModalVisible(false);
}

const latest =
  records[0] ??
  {
    weight: 0,
    bmi: 0,
    bodyFat: 0,
    muscleMass: 0,
    visceralFat: 0,
    water: 0,
  };

const previous = records[1];

  const comparisonItems = [
    {
      label: "Gordura corporal",
      current: latest.bodyFat,
      previous: previous?.bodyFat,
      suffix: "%",
      goodWhenDown: true,
    },
    {
      label: "Massa muscular",
      current: latest.muscleMass,
      previous: previous?.muscleMass,
      suffix: "kg",
      goodWhenDown: false,
    },
    {
      label: "Gordura visceral",
      current: latest.visceralFat,
      previous: previous?.visceralFat,
      suffix: "",
      goodWhenDown: true,
    },
    {
      label: "Água corporal",
      current: latest.water,
      previous: previous?.water,
      suffix: "%",
      goodWhenDown: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />

        <Text style={styles.eyebrow}>Bioimpedância</Text>
        <Text style={styles.title}>Composição corporal</Text>
        <Text style={styles.subtitle}>
          Acompanhe gordura corporal, massa muscular, água corporal e metabolismo.
        </Text>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>Último peso</Text>
            <Text style={styles.heroValue}>{formatNumber(latest.weight)} kg</Text>
            <Text style={styles.heroText}>
              Gordura corporal: {formatNumber(latest.bodyFat)}%
            </Text>
          </View>

          <View style={styles.heroIcon}>
            <Scale size={30} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Activity size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>
              {formatNumber(latest.muscleMass)} kg
            </Text>
            <Text style={styles.cardLabel}>Massa muscular</Text>
          </View>

          <View style={styles.card}>
            <Flame size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>
              {formatNumber(latest.visceralFat)}
            </Text>
            <Text style={styles.cardLabel}>Gordura visceral</Text>
          </View>

          <View style={styles.card}>
            <Droplets size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>{formatNumber(latest.water)}%</Text>
            <Text style={styles.cardLabel}>Água corporal</Text>
          </View>

          <View style={styles.card}>
            <Scale size={22} color={COLORS.primary} />
            <Text style={styles.cardValue}>{formatNumber(latest.bmi)}</Text>
            <Text style={styles.cardLabel}>IMC</Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton
            title="+ Nova bioimpedância"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <Text style={styles.sectionTitle}>Comparativo</Text>

        <View style={styles.comparisonCard}>
          {comparisonItems.map((item) => {
            const diff = getDifference(item.current, item.previous);

            return (
              <View key={item.label} style={styles.comparisonItem}>
                <View>
                  <Text style={styles.comparisonLabel}>{item.label}</Text>
                  <Text style={styles.comparisonValues}>
                    {item.previous !== undefined
                      ? `${formatNumber(item.previous)}${item.suffix} → `
                      : ""}
                    {formatNumber(item.current)}
                    {item.suffix}
                  </Text>
                </View>

                {renderDiff(diff, item.goodWhenDown)}
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Histórico</Text>

        <View style={styles.historyCard}>
          {records.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyText}>
                  Gordura: {formatNumber(item.bodyFat)}% • Massa:{" "}
                  {formatNumber(item.muscleMass)}kg
                </Text>
              </View>

              <Text style={styles.historyWeight}>
                {formatNumber(item.weight)}kg
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nova bioimpedância</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Peso</Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o peso atual"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />

              {weight ? (
                <View style={styles.calculatedBox}>
                  <Text style={styles.calculatedLabel}>
                    IMC calculado automaticamente
                  </Text>

                  <Text style={styles.calculatedValue}>
                    {formatNumber(calculatedBmi)}
                  </Text>

                  <Text style={styles.calculatedClassification}>
                    {getBmiClassification(calculatedBmi)}
                  </Text>
                </View>
              ) : null}

              {[
                ["% Gordura corporal", bodyFat, setBodyFat],
                ["Massa muscular", muscleMass, setMuscleMass],
                ["Massa magra", leanMass, setLeanMass],
                ["Gordura visceral", visceralFat, setVisceralFat],
                ["Água corporal %", water, setWater],
                ["Taxa metabólica basal", basalMetabolism, setBasalMetabolism],
                ["Idade metabólica", metabolicAge, setMetabolicAge],
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
                <PinkButton title="Salvar registro" onPress={handleSave} />
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
  eyebrow: { fontSize: 14, fontWeight: "800", color: COLORS.primary },
  title: {
    marginTop: 8,
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
    fontSize: 42,
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
  comparisonCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 26,
  },
  comparisonItem: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comparisonLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },
  comparisonValues: {
    marginTop: 3,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  diffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  diffText: {
    fontSize: 14,
    fontWeight: "900",
  },
  diffNeutral: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.subtitle,
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
  historyWeight: { fontWeight: "900", color: COLORS.primary },
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
  calculatedBox: {
    backgroundColor: COLORS.secondary,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  calculatedLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.subtitle,
  },
  calculatedValue: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.primary,
    marginTop: 4,
  },
  calculatedClassification: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  modalButtonArea: { marginTop: 10, marginBottom: 30 },
});