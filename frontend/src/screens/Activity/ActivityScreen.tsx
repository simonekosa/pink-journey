import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Footprints, Flame, Timer, TrendingUp } from "lucide-react-native";

import ActivityRing from "../../components/Activity/ActivityRing";
import { COLORS } from "../../theme/colors";

export default function ActivityScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>Atividade</Text>
        <Text style={styles.title}>Seus indicadores do dia</Text>
        <Text style={styles.subtitle}>
          Acompanhe calorias, passos, exercícios e tempo em pé.
        </Text>

        <View style={styles.heroCard}>
          <View style={styles.ringsContainer}>
            <ActivityRing
              size={220}
              strokeWidth={16}
              progress={0.72}
              color={COLORS.primary}
              icon="🔥"
              value="420"
              label="Calorias"
            />

            <View style={styles.innerRing}>
              <ActivityRing
                size={158}
                strokeWidth={14}
                progress={0.55}
                color="#FF8A80"
                icon="🚶"
                value="6.280"
                label="Passos"
              />
            </View>

            <View style={styles.smallRing}>
              <ActivityRing
                size={104}
                strokeWidth={12}
                progress={0.38}
                color="#F06292"
                icon="⏱️"
                value="23m"
                label="Exercício"
              />
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.metricCard}>
            <Flame size={24} color={COLORS.primary} />
            <Text style={styles.metricValue}>420 kcal</Text>
            <Text style={styles.metricLabel}>Calorias ativas</Text>
            <Text style={styles.metricGoal}>Meta: 580 kcal</Text>
          </View>

          <View style={styles.metricCard}>
            <Footprints size={24} color={COLORS.primary} />
            <Text style={styles.metricValue}>6.280</Text>
            <Text style={styles.metricLabel}>Passos</Text>
            <Text style={styles.metricGoal}>Meta: 10.000</Text>
          </View>

          <View style={styles.metricCard}>
            <Timer size={24} color={COLORS.primary} />
            <Text style={styles.metricValue}>23 min</Text>
            <Text style={styles.metricLabel}>Exercício</Text>
            <Text style={styles.metricGoal}>Meta: 60 min</Text>
          </View>

          <View style={styles.metricCard}>
            <TrendingUp size={24} color={COLORS.primary} />
            <Text style={styles.metricValue}>7h</Text>
            <Text style={styles.metricLabel}>Tempo em pé</Text>
            <Text style={styles.metricGoal}>Meta: 12h</Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Resumo do dia</Text>
          <Text style={styles.noteText}>
            Você completou 72% da meta de calorias, 55% da meta de passos e 38%
            da meta de exercícios.
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
    paddingBottom: 120,
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
    backgroundColor: COLORS.surface,
    borderRadius: 32,
    paddingVertical: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  ringsContainer: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  innerRing: {
    position: "absolute",
  },
  smallRing: {
    position: "absolute",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  metricCard: {
    width: "47%",
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricValue: {
    marginTop: 12,
    fontSize: 21,
    fontWeight: "900",
    color: COLORS.text,
  },
  metricLabel: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  metricGoal: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
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
});