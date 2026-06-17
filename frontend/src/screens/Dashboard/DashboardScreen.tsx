import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  CalendarDays,
  Camera,
  Clock,
  Flame,
  HeartPulse,
  Pill,
  Scale,
  Target,
  Trophy,
} from "lucide-react-native";

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

export default function DashboardScreen() {
  const [latestBio, setLatestBio] = useState<BioRecord | null>(null);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    async function loadData() {
      const records = await getBioimpedanceRecords();
      const storedProfile = await getProfile();

      if (records.length > 0) {
        setLatestBio(records[0]);
      }

      setProfile(storedProfile);
    }

    loadData();
  }, []);

  const currentWeight = latestBio?.weight ?? profile.startWeight;
  const lostWeight = Math.max(profile.startWeight - currentWeight, 0);
  const remainingWeight = Math.max(currentWeight - profile.targetWeight, 0);

  const totalGoal = profile.startWeight - profile.targetWeight;
  const progress =
    totalGoal > 0 ? Math.min((lostWeight / totalGoal) * 100, 100) : 0;

  const currentWeightLabel = `${currentWeight.toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
  })} kg`;

  const bodyFat = latestBio ? `${latestBio.bodyFat}%` : "-";
  const muscleMass = latestBio ? `${latestBio.muscleMass} kg` : "-";
  const bmi = latestBio ? latestBio.bmi.toFixed(1).replace(".", ",") : "-";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Olá, {profile.name} 🌸</Text>
        <Text style={styles.title}>Sua evolução hoje</Text>

        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Peso atual</Text>
          <Text style={styles.heroValue}>{currentWeightLabel}</Text>

          <Text style={styles.heroText}>
            Meta: {profile.targetWeight} kg • Faltam{" "}
            {remainingWeight.toLocaleString("pt-BR", {
              maximumFractionDigits: 1,
            })}{" "}
            kg
          </Text>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.progressText}>
            {progress.toFixed(0)}% da meta concluída
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Flame size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>
              {lostWeight.toLocaleString("pt-BR", {
                maximumFractionDigits: 1,
              })}{" "}
              kg
            </Text>
            <Text style={styles.statLabel}>Peso perdido</Text>
          </View>

          <View style={styles.statCard}>
            <Target size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>
              {remainingWeight.toLocaleString("pt-BR", {
                maximumFractionDigits: 1,
              })}{" "}
              kg
            </Text>
            <Text style={styles.statLabel}>Faltam para meta</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <HeartPulse size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>{bodyFat}</Text>
            <Text style={styles.statLabel}>Gordura corporal</Text>
          </View>

          <View style={styles.statCard}>
            <Scale size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>{muscleMass}</Text>
            <Text style={styles.statLabel}>Massa muscular</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Scale size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>{bmi}</Text>
            <Text style={styles.statLabel}>IMC</Text>
          </View>

          <View style={styles.statCard}>
            <CalendarDays size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>{profile.startDate}</Text>
            <Text style={styles.statLabel}>Início da jornada</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Seu planner</Text>

        <View style={styles.grid}>
          <View style={styles.menuCard}>
            <Camera size={26} color={COLORS.primary} />
            <Text style={styles.menuTitle}>Fotos</Text>
            <Text style={styles.menuText}>Evolução corporal</Text>
          </View>

          <View style={styles.menuCard}>
            <Scale size={26} color={COLORS.primary} />
            <Text style={styles.menuTitle}>Medidas</Text>
            <Text style={styles.menuText}>Peso e corpo</Text>
          </View>

          <View style={styles.menuCard}>
            <Pill size={26} color={COLORS.primary} />
            <Text style={styles.menuTitle}>Medicação</Text>
            <Text style={styles.menuText}>Aplicações</Text>
          </View>

          <View style={styles.menuCard}>
            <Clock size={26} color={COLORS.primary} />
            <Text style={styles.menuTitle}>Jejum</Text>
            <Text style={styles.menuText}>Controle diário</Text>
          </View>

          <View style={styles.menuCard}>
            <HeartPulse size={26} color={COLORS.primary} />
            <Text style={styles.menuTitle}>Saúde</Text>
            <Text style={styles.menuText}>Exames e consultas</Text>
          </View>

          <View style={styles.menuCard}>
            <Trophy size={26} color={COLORS.primary} />
            <Text style={styles.menuTitle}>Conquistas</Text>
            <Text style={styles.menuText}>Metas alcançadas</Text>
          </View>
        </View>

        <View style={styles.motivationCard}>
          <Flame size={24} color={COLORS.primary} />
          <Text style={styles.motivationTitle}>Frase do dia</Text>
          <Text style={styles.motivationText}>
            Uma escolha saudável hoje aproxima você da sua melhor versão.
          </Text>
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "800",
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    color: COLORS.text,
    fontWeight: "900",
    marginBottom: 24,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 24,
    marginBottom: 18,
  },
  heroLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  heroValue: {
    fontSize: 46,
    color: COLORS.white,
    fontWeight: "900",
    marginTop: 6,
  },
  heroText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  progressTrack: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 999,
    marginTop: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: 10,
    backgroundColor: COLORS.white,
    borderRadius: 999,
  },
  progressText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.white,
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    marginTop: 12,
    fontSize: 22,
    color: COLORS.text,
    fontWeight: "900",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: "900",
    marginTop: 10,
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  menuCard: {
    width: "47%",
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 128,
  },
  menuTitle: {
    marginTop: 14,
    fontSize: 17,
    color: COLORS.text,
    fontWeight: "900",
  },
  menuText: {
    marginTop: 5,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  motivationCard: {
    marginTop: 24,
    backgroundColor: COLORS.secondary,
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  motivationTitle: {
    marginTop: 12,
    fontSize: 18,
    color: COLORS.text,
    fontWeight: "900",
  },
  motivationText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.subtitle,
  },
});