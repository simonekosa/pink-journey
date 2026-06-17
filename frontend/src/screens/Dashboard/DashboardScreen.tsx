import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  CalendarDays,
  Camera,
  Clock,
  Flame,
  Pill,
  Salad,
  Scale,
  Trophy,
} from "lucide-react-native";

import { COLORS } from "../../theme/colors";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Olá, Simone 🌸</Text>
        <Text style={styles.title}>Sua evolução hoje</Text>

        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Peso atual</Text>
          <Text style={styles.heroValue}>105 kg</Text>
          <Text style={styles.heroText}>Meta: 85 kg • Faltam 20 kg</Text>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Scale size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>0 kg</Text>
            <Text style={styles.statLabel}>Perdidos</Text>
          </View>

          <View style={styles.statCard}>
            <CalendarDays size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Dia</Text>
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
            <Salad size={26} color={COLORS.primary} />
            <Text style={styles.menuTitle}>Refeições</Text>
            <Text style={styles.menuText}>Diário alimentar</Text>
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
    paddingBottom: 40,
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
  },
  progressFill: {
    width: "12%",
    height: 10,
    backgroundColor: COLORS.white,
    borderRadius: 999,
  },
  statsRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 26,
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