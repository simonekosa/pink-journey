import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  CalendarDays,
  Camera,
  Heart,
  Pencil,
  Scale,
  Sparkles,
  Target,
  Timer,
  User,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import { COLORS } from "../../theme/colors";

const stats = [
  { label: "Dias de jornada", value: "1", icon: CalendarDays },
  { label: "Peso perdido", value: "0 kg", icon: Scale },
  { label: "Fotos registradas", value: "0", icon: Camera },
  { label: "Jejuns realizados", value: "3", icon: Timer },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <User size={42} color={COLORS.primary} />
          </View>

          <Text style={styles.name}>Simone</Text>
          <Text style={styles.subtitle}>Sua jornada Pink Journey</Text>
        </View>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>Meta principal</Text>
            <Text style={styles.heroTitle}>Perder 20 kg</Text>
            <Text style={styles.heroText}>105 kg → 85 kg</Text>
          </View>

          <View style={styles.heroIcon}>
            <Target size={28} color={COLORS.white} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Resumo corporal</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Peso inicial</Text>
            <Text style={styles.summaryValue}>105 kg</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Peso atual</Text>
            <Text style={styles.summaryValue}>105 kg</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Peso meta</Text>
            <Text style={styles.summaryValue}>85 kg</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Altura</Text>
            <Text style={styles.summaryValue}>1,70 m</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Estatísticas</Text>

        <View style={styles.statsGrid}>
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <View key={item.label} style={styles.statCard}>
                <View style={styles.statIcon}>
                  <Icon size={20} color={COLORS.primary} />
                </View>

                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Objetivo</Text>

        <View style={styles.goalCard}>
          <Heart size={24} color={COLORS.primary} />

          <Text style={styles.goalText}>
            Quero perder peso, melhorar minha saúde, ter mais energia e voltar a
            me sentir bem comigo mesma.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Sparkles size={24} color={COLORS.primary} />

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Data de início</Text>
            <Text style={styles.infoText}>16/06/2026</Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton title="Editar Perfil" onPress={() => {}} />
        </View>

        <View style={styles.secondaryButton}>
          <Pencil size={18} color={COLORS.primary} />
          <Text style={styles.secondaryButtonText}>Atualizar metas</Text>
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
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  name: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: COLORS.subtitle,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 24,
    marginBottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  heroTitle: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.white,
  },
  heroText: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.subtitle,
  },
  summaryValue: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 24,
  },
  statCard: {
    width: "47%",
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  goalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  goalText: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.text,
  },
  infoCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },
  infoText: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.subtitle,
  },
  buttonArea: {
    marginBottom: 14,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
  },
});