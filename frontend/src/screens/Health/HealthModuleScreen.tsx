import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Activity,
  ArrowRight,
  Beaker,
  CalendarDays,
  HeartPulse,
  Pill,
  Scale,
  Sparkles,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../theme/colors";

const healthModules = [
  {
    title: "Bioimpedância",
    route: "Bioimpedance",
    description: "Último peso: 105 kg • Gordura: 42%",
    icon: Scale,
  },
  {
    title: "Exames",
    route: "Exams",
    description: "Último exame: 16/06 • Glicemia: 112",
    icon: Beaker,
  },
  {
    title: "Medicação",
    route: "Medication",
    description: "Próxima aplicação: 22/06 • Mounjaro 5mg",
    icon: Pill,
  },
  {
    title: "Agendamentos",
    route: "MedicalAppointments",
    description: "Próxima consulta: 25/06 às 09:30",
    icon: CalendarDays,
  },
];

export default function HealthModuleScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>Saúde</Text>
        <Text style={styles.title}>Sua evolução completa</Text>
        <Text style={styles.subtitle}>
          Acompanhe composição corporal, exames, medicações e consultas.
        </Text>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <HeartPulse size={32} color={COLORS.white} />
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Além do peso</Text>
            <Text style={styles.heroText}>
              Veja sua saúde evoluindo por vários indicadores.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Área de saúde</Text>

        <View style={styles.modules}>
          {healthModules.map((item) => {
            const Icon = item.icon;

            return (
              <TouchableOpacity
                key={item.title}
                style={styles.moduleCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.route)}
              >
                <View style={styles.moduleIcon}>
                  <Icon size={24} color={COLORS.primary} />
                </View>

                <View style={styles.moduleContent}>
                  <Text style={styles.moduleTitle}>{item.title}</Text>
                  <Text style={styles.moduleDescription}>
                    {item.description}
                  </Text>
                </View>

                <ArrowRight size={22} color={COLORS.primary} />
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Comparativo rápido</Text>

        <View style={styles.compareGrid}>
          <View style={styles.compareCard}>
            <Activity size={22} color={COLORS.primary} />
            <Text style={styles.compareValue}>-4,2%</Text>
            <Text style={styles.compareLabel}>Gordura corporal</Text>
          </View>

          <View style={styles.compareCard}>
            <Scale size={22} color={COLORS.primary} />
            <Text style={styles.compareValue}>+1,8kg</Text>
            <Text style={styles.compareLabel}>Massa muscular</Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Sparkles size={24} color={COLORS.primary} />
          <Text style={styles.noteTitle}>Por que acompanhar?</Text>
          <Text style={styles.noteText}>
            Às vezes o peso demora a mudar, mas a gordura baixa, a massa
            muscular sobe, os exames melhoram e isso também é progresso.
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
    padding: 22,
    marginBottom: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.white,
  },
  heroText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.white,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },
  modules: {
    gap: 14,
    marginBottom: 26,
  },
  moduleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.text,
  },
  moduleDescription: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtitle,
  },
  compareGrid: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
  },
  compareCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  compareValue: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  compareLabel: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  noteCard: {
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
});