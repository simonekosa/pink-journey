import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ImageBackground,
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
  Heart,
  Ruler,
  Scale,
  Sparkles,
  Trash2,
  TrendingDown,
  Trophy,
  X,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";

import {
  MeasurementRecord,
  getMeasurementRecords,
  saveMeasurementRecords,
} from "../../storage/measurementsStorage";

import {
  BioRecord,
  getBioimpedanceRecords,
} from "../../storage/bioimpedanceStorage";

import {
  defaultProfile,
  getProfile,
  UserProfile,
} from "../../storage/profileStorage";

import { COLORS } from "../../theme/colors";

// IMAGEM DO CARD PRINCIPAL
import weightProgressBg from "../../assets/weight-progress-bg.png";

export default function MeasurementsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [abdomen, setAbdomen] = useState("");
  const [hip, setHip] = useState("");
  const [arm, setArm] = useState("");
  const [thigh, setThigh] = useState("");
  const [calf, setCalf] = useState("");

  const [records, setRecords] = useState<MeasurementRecord[]>([]);
  const [latestBio, setLatestBio] = useState<BioRecord | null>(null);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const [storedRecords, bioRecords, storedProfile] = await Promise.all([
        getMeasurementRecords(),
        getBioimpedanceRecords(),
        getProfile(),
      ]);

      setRecords(storedRecords);
      setLatestBio(bioRecords[0] ?? null);
      setProfile(storedProfile);
    } catch (error) {
      console.log("Erro ao carregar pesos e medidas:", error);
    }
  }

  function parseNumber(value: string): number | null {
    if (!value.trim()) return null;

    const parsed = Number(value.replace(",", "."));

    return Number.isNaN(parsed) ? null : parsed;
  }

  function formatNumber(value: number | null | undefined, suffix = ""): string {
    if (value === null || value === undefined) {
      return "-";
    }

    return `${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })}${suffix}`;
  }

  function clearForm() {
    setWeight("");
    setWaist("");
    setAbdomen("");
    setHip("");
    setArm("");
    setThigh("");
    setCalf("");
  }

  async function handleSaveMeasurement() {
    const parsedWeight = parseNumber(weight);

    if (parsedWeight === null) {
      Alert.alert(
        "Peso obrigatório",
        "Informe o peso atual para salvar o registro.",
      );
      return;
    }

    const newRecord: MeasurementRecord = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString("pt-BR"),
      weight: parsedWeight,
      waist: parseNumber(waist),
      abdomen: parseNumber(abdomen),
      hip: parseNumber(hip),
      arm: parseNumber(arm),
      thigh: parseNumber(thigh),
      calf: parseNumber(calf),
    };

    const updatedRecords = [newRecord, ...records];

    setRecords(updatedRecords);
    await saveMeasurementRecords(updatedRecords);

    clearForm();
    setModalVisible(false);
  }

  function handleDeleteMeasurement(id: string) {
    Alert.alert(
      "Excluir pesagem",
      "Tem certeza que deseja excluir este registro de peso e medidas?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const updatedRecords = records.filter((item) => item.id !== id);

            setRecords(updatedRecords);
            await saveMeasurementRecords(updatedRecords);
          },
        },
      ],
    );
  }

  const latest = records[0];
  const previous = records[1];

  /*
   * Ordem de prioridade:
   *
   * 1. Última pesagem da tela de medidas
   * 2. Última bioimpedância
   * 3. Peso inicial do perfil
   */
  const currentWeightValue =
    latest?.weight ?? latestBio?.weight ?? profile.startWeight;

  const lostWeight = Math.max(profile.startWeight - currentWeightValue, 0);

  const remainingWeight = Math.max(
    currentWeightValue - profile.targetWeight,
    0,
  );

  const totalGoal = Math.max(profile.startWeight - profile.targetWeight, 0);

  const progress =
    totalGoal > 0
      ? Math.min(Math.max((lostWeight / totalGoal) * 100, 0), 100)
      : 0;

  const lastVariation =
    latest && previous ? previous.weight - latest.weight : null;

  const bestResult = useMemo(() => {
    if (records.length === 0) {
      return lostWeight;
    }

    const lowestWeight = Math.min(
      profile.startWeight,
      ...records.map((item) => item.weight),
    );

    return Math.max(profile.startWeight - lowestWeight, 0);
  }, [records, profile.startWeight, lostWeight]);

  const bodyMeasurements = [
    {
      label: "Cintura",
      value: latest ? formatNumber(latest.waist, " cm") : "-",
      background: "#F2FAE9",
      iconBackground: "#E4F5D3",
    },
    {
      label: "Abdômen",
      value: latest ? formatNumber(latest.abdomen, " cm") : "-",
      background: "#FFF7E9",
      iconBackground: "#FFEDCD",
    },
    {
      label: "Quadril",
      value: latest ? formatNumber(latest.hip, " cm") : "-",
      background: "#F8F0FF",
      iconBackground: "#EDDEFF",
    },
    {
      label: "Braço",
      value: latest ? formatNumber(latest.arm, " cm") : "-",
      background: "#EDF7FF",
      iconBackground: "#DBEFFF",
    },
    {
      label: "Coxa",
      value: latest ? formatNumber(latest.thigh, " cm") : "-",
      background: "#FFF0F5",
      iconBackground: "#FFDDE9",
    },
    {
      label: "Panturrilha",
      value: latest ? formatNumber(latest.calf, " cm") : "-",
      background: "#EBFAFA",
      iconBackground: "#D6F4F5",
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* CABEÇALHO */}

        <Text style={styles.eyebrow}>Peso e medidas</Text>

        <Text style={styles.title}>Acompanhe sua evolução</Text>

        <Text style={styles.subtitle}>
          Registre seu peso e suas medidas para visualizar seu progresso.
        </Text>

        {/* HERO COM IMAGEM */}

        <ImageBackground
          source={weightProgressBg}
          style={styles.heroCard}
          imageStyle={styles.heroBackgroundImage}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
            {/* PESO ATUAL */}

            <View style={styles.weightArea}>
              <View style={styles.scaleIcon}>
                <Scale size={27} color={COLORS.primary} />
              </View>

              <View>
                <Text style={styles.heroLabel}>Peso atual</Text>

                <Text style={styles.heroValue}>
                  {formatNumber(currentWeightValue)} kg
                </Text>

                <Text style={styles.heroSmall}>
                  {latest
                    ? `Última pesagem: ${latest.date}`
                    : latestBio
                      ? `Última bioimpedância: ${latestBio.date}`
                      : "Peso inicial do perfil"}
                </Text>
              </View>
            </View>

            {/* META */}

            <View style={styles.goalArea}>
              <View style={styles.heartCircle}>
                <Heart size={22} color={COLORS.primary} fill={COLORS.primary} />
              </View>

              <Text style={styles.heroLabel}>Meta</Text>

              <Text style={styles.goalValue}>
                {formatNumber(profile.targetWeight)} kg
              </Text>

              <Text style={styles.remainingValue}>
                {formatNumber(remainingWeight)} kg
              </Text>

              <Text style={styles.heroSmall}>faltam para sua meta</Text>
            </View>

            {/* PESO PERDIDO */}

            <View style={styles.lostWeightCard}>
              <View style={styles.lostWeightIcon}>
                <TrendingDown size={22} color="#8AC926" />
              </View>

              <View>
                <Text style={styles.lostWeightLabel}>Você já perdeu</Text>

                <Text style={styles.lostWeightValue}>
                  {formatNumber(lostWeight)} kg
                </Text>

                <Text style={styles.lostWeightDescription}>
                  desde o início da jornada
                </Text>
              </View>
            </View>

            {/* PROGRESSO */}

            <View style={styles.progressArea}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress}%`,
                    },
                  ]}
                />

                <View
                  style={[
                    styles.progressBubble,
                    {
                      left: `${Math.min(Math.max(progress, 5), 90)}%`,
                    },
                  ]}
                >
                  <Text style={styles.progressBubbleText}>
                    {progress.toFixed(0)}%
                  </Text>
                </View>
              </View>

              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>
                  {formatNumber(currentWeightValue)} kg
                </Text>

                <Text style={styles.progressLabel}>
                  {formatNumber(profile.targetWeight)} kg
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* RESUMO */}

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.greenIcon]}>
              <TrendingDown size={22} color="#65B32E" />
            </View>

            <Text style={styles.summaryLabel}>Última variação</Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color:
                    lastVariation !== null && lastVariation >= 0
                      ? "#65B32E"
                      : "#E85D75",
                },
              ]}
            >
              {lastVariation !== null
                ? `${lastVariation >= 0 ? "↓" : "↑"} ${formatNumber(
                    Math.abs(lastVariation),
                  )} kg`
                : "-"}
            </Text>

            <Text style={styles.summaryText}>em relação à anterior</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.purpleIcon]}>
              <CalendarDays size={22} color="#8B5CF6" />
            </View>

            <Text style={styles.summaryLabel}>Pesagens</Text>

            <Text style={[styles.summaryValue, { color: "#8B5CF6" }]}>
              {records.length}
            </Text>

            <Text style={styles.summaryText}>registros realizados</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.blueIcon]}>
              <Trophy size={22} color="#3B82F6" />
            </View>

            <Text style={styles.summaryLabel}>Melhor resultado</Text>

            <Text style={[styles.summaryValue, { color: "#3B82F6" }]}>
              ↓ {formatNumber(bestResult)} kg
            </Text>

            <Text style={styles.summaryText}>peso perdido</Text>
          </View>
        </View>

        {/* BOTÃO */}

        <View style={styles.buttonArea}>
          <PinkButton
            title="+ Nova pesagem"
            onPress={() => setModalVisible(true)}
          />
        </View>

        {/* HISTÓRICO */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingDown size={22} color={COLORS.primary} />

            <Text style={styles.sectionTitle}>Histórico de peso</Text>
          </View>

          {records.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Nenhuma pesagem cadastrada ainda.
              </Text>
            </View>
          ) : (
            records.map((item, index) => {
              const nextRecord = records[index + 1];

              const variation = nextRecord
                ? nextRecord.weight - item.weight
                : null;

              return (
                <View
                  key={item.id}
                  style={[
                    styles.historyItem,
                    index === 0 && styles.currentHistoryItem,
                  ]}
                >
                  <View style={styles.historyIcon}>
                    <Scale size={19} color={COLORS.primary} />
                  </View>

                  <View style={styles.historyContent}>
                    <View style={styles.historyTitleRow}>
                      <Text style={styles.historyDate}>{item.date}</Text>

                      {index === 0 && (
                        <View style={styles.currentBadge}>
                          <Text style={styles.currentBadgeText}>Atual</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.historyMeasurements}>
                      Cintura: {formatNumber(item.waist, " cm")} • Abdômen:{" "}
                      {formatNumber(item.abdomen, " cm")}
                    </Text>
                  </View>

                  <View style={styles.historyRight}>
                    <Text style={styles.historyWeight}>
                      {formatNumber(item.weight)} kg
                    </Text>

                    {variation !== null && (
                      <Text
                        style={[
                          styles.historyVariation,
                          {
                            color: variation >= 0 ? "#65B32E" : "#E85D75",
                          },
                        ]}
                      >
                        {variation >= 0 ? "↓" : "↑"}{" "}
                        {formatNumber(Math.abs(variation))} kg
                      </Text>
                    )}

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteMeasurement(item.id)}
                    >
                      <Trash2 size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* MEDIDAS */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ruler size={22} color={COLORS.primary} />

            <Text style={styles.sectionTitle}>Medidas corporais</Text>
          </View>

          <Text style={styles.sectionSubtitle}>Último registro</Text>

          <View style={styles.measurementsGrid}>
            {bodyMeasurements.map((item) => (
              <View
                key={item.label}
                style={[
                  styles.measurementCard,
                  {
                    backgroundColor: item.background,
                  },
                ]}
              >
                <View
                  style={[
                    styles.measurementIcon,
                    {
                      backgroundColor: item.iconBackground,
                    },
                  ]}
                >
                  <Ruler size={18} color={COLORS.primary} />
                </View>

                <Text style={styles.measurementLabel}>{item.label}</Text>

                <Text style={styles.measurementValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* MOTIVAÇÃO */}

        <View style={styles.motivationCard}>
          <View style={styles.trophyCircle}>
            <Trophy size={30} color="#F59E0B" />
          </View>

          <View style={styles.motivationContent}>
            <Text style={styles.motivationTitle}>Continue assim! 🌸</Text>

            <Text style={styles.motivationText}>
              Cada registro mostra um pouco mais da sua evolução.
            </Text>
          </View>

          <View style={styles.motivationResult}>
            <Sparkles size={18} color={COLORS.primary} />

            <Text style={styles.motivationLabel}>Peso perdido</Text>

            <Text style={styles.motivationValue}>
              {formatNumber(lostWeight)} kg
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalEyebrow}>Novo registro</Text>

                <Text style={styles.modalTitle}>Pesagem e medidas</Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  clearForm();
                  setModalVisible(false);
                }}
              >
                <X size={22} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Peso atual (kg)</Text>

              <TextInput
                style={styles.input}
                placeholder="Ex: 104,5"
                placeholderTextColor={COLORS.subtitle}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />

              <View style={styles.modalGrid}>
                <View style={styles.modalField}>
                  <Text style={styles.label}>Cintura</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="cm"
                    placeholderTextColor={COLORS.subtitle}
                    keyboardType="decimal-pad"
                    value={waist}
                    onChangeText={setWaist}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.label}>Abdômen</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="cm"
                    placeholderTextColor={COLORS.subtitle}
                    keyboardType="decimal-pad"
                    value={abdomen}
                    onChangeText={setAbdomen}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.label}>Quadril</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="cm"
                    placeholderTextColor={COLORS.subtitle}
                    keyboardType="decimal-pad"
                    value={hip}
                    onChangeText={setHip}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.label}>Braço</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="cm"
                    placeholderTextColor={COLORS.subtitle}
                    keyboardType="decimal-pad"
                    value={arm}
                    onChangeText={setArm}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.label}>Coxa</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="cm"
                    placeholderTextColor={COLORS.subtitle}
                    keyboardType="decimal-pad"
                    value={thigh}
                    onChangeText={setThigh}
                  />
                </View>

                <View style={styles.modalField}>
                  <Text style={styles.label}>Panturrilha</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="cm"
                    placeholderTextColor={COLORS.subtitle}
                    keyboardType="decimal-pad"
                    value={calf}
                    onChangeText={setCalf}
                  />
                </View>
              </View>

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
    paddingBottom: 120,
  },

  eyebrow: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 7,
  },

  title: {
    fontSize: 31,
    lineHeight: 37,
    fontWeight: "900",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 22,
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.subtitle,
  },

  // HERO

  heroCard: {
    minHeight: 300,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 18,
  },

  heroBackgroundImage: {
    borderRadius: 28,
  },

  heroContent: {
    flex: 1,
    minHeight: 300,
    padding: 22,
    position: "relative",
  },

  weightArea: {
    position: "absolute",
    left: 22,
    top: 22,
    flexDirection: "row",
    alignItems: "center",
  },

  scaleIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  heroLabel: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "700",
    opacity: 0.95,
  },

  heroValue: {
    marginTop: 2,
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.white,
  },

  heroSmall: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.white,
    opacity: 0.9,
  },

  goalArea: {
    position: "absolute",
    left: "38%",
    top: 22,
  },

  heartCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  goalValue: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.white,
  },

  remainingValue: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.white,
  },

  lostWeightCard: {
    position: "absolute",
    left: 22,
    bottom: 25,
    width: "30%",
    minWidth: 180,
    padding: 14,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(184, 15, 87, 0.60)",
  },

  lostWeightIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8FF9A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  lostWeightLabel: {
    fontSize: 11,
    color: COLORS.white,
  },

  lostWeightValue: {
    marginTop: 2,
    fontSize: 23,
    fontWeight: "900",
    color: "#DFFF54",
  },

  lostWeightDescription: {
    marginTop: 2,
    fontSize: 9,
    color: COLORS.white,
    opacity: 0.9,
  },

  progressArea: {
    position: "absolute",
    left: "38%",
    right: "33%",
    bottom: 40,
  },

  progressTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.45)",
    overflow: "visible",
  },

  progressFill: {
    height: 12,
    borderRadius: 999,
    backgroundColor: "#8EDB25",
  },

  progressBubble: {
    position: "absolute",
    top: -8,
    marginLeft: -22,
    minWidth: 44,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },

  progressBubbleText: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.text,
  },

  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },

  progressLabel: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: "700",
  },

  // RESUMOS

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  greenIcon: {
    backgroundColor: "#EFF9E5",
  },

  purpleIcon: {
    backgroundColor: "#F2E9FF",
  },

  blueIcon: {
    backgroundColor: "#E8F3FF",
  },

  summaryLabel: {
    fontSize: 12,
    color: COLORS.subtitle,
  },

  summaryValue: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: "900",
  },

  summaryText: {
    marginTop: 3,
    fontSize: 11,
    color: COLORS.subtitle,
  },

  buttonArea: {
    marginBottom: 25,
  },

  // SEÇÕES

  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.text,
  },

  sectionSubtitle: {
    marginTop: -8,
    marginBottom: 14,
    fontSize: 12,
    color: COLORS.subtitle,
  },

  emptyCard: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: COLORS.background,
  },

  emptyText: {
    color: COLORS.subtitle,
  },

  // HISTÓRICO

  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  currentHistoryItem: {
    paddingHorizontal: 12,
    backgroundColor: "#FFF2F6",
    borderRadius: 16,
    borderBottomWidth: 0,
    marginBottom: 6,
  },

  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#FFE6EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  historyContent: {
    flex: 1,
  },

  historyTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  historyDate: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.text,
  },

  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#FFDCE8",
  },

  currentBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: COLORS.primary,
  },

  historyMeasurements: {
    marginTop: 4,
    fontSize: 11,
    color: COLORS.subtitle,
  },

  historyRight: {
    alignItems: "flex-end",
  },

  historyWeight: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primary,
  },

  historyVariation: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "800",
  },

  deleteButton: {
    marginTop: 6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFE8EF",
    alignItems: "center",
    justifyContent: "center",
  },

  // MEDIDAS

  measurementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  measurementCard: {
    width: "48%",
    minHeight: 115,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  measurementIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  measurementLabel: {
    fontSize: 12,
    color: COLORS.subtitle,
  },

  measurementValue: {
    marginTop: 5,
    fontSize: 21,
    fontWeight: "900",
    color: COLORS.text,
  },

  // MOTIVAÇÃO

  motivationCard: {
    backgroundColor: "#FFF0F5",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  trophyCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF2D6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  motivationContent: {
    flex: 1,
  },

  motivationTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.text,
  },

  motivationText: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.subtitle,
  },

  motivationResult: {
    alignItems: "flex-end",
  },

  motivationLabel: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: "800",
  },

  motivationValue: {
    marginTop: 2,
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.primary,
  },

  // MODAL

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "flex-end",
  },

  modalContent: {
    maxHeight: "90%",
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  modalEyebrow: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 3,
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: COLORS.text,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  modalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  modalField: {
    width: "48%",
  },

  label: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 7,
  },

  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 15,
  },

  modalButtonArea: {
    marginTop: 8,
    marginBottom: 28,
  },
});
