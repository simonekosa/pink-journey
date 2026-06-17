import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Camera,
  Clock,
  HeartPulse,
  Pill,
  Salad,
  Scale,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import FeatureCard from "../../components/Card/FeatureCard";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { COLORS } from "../../theme/colors";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  function handleStart() {
    navigation.navigate("ProfileSetup");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.logoBox}>
            <Text style={styles.logo}>🌸</Text>
          </View>

          <Text style={styles.appName}>Pink Journey</Text>

          <Text style={styles.title}>
            Sua jornada de transformação começa hoje
          </Text>

          <Text style={styles.subtitle}>
            Um planner feminino para acompanhar peso, medidas, fotos, jejum,
            alimentação e medicações.
          </Text>
        </View>

        <View style={styles.features}>
          <FeatureCard
            icon={<Scale size={24} color={COLORS.primary} />}
            title="Peso e medidas"
            description="Acompanhe sua evolução corporal com histórico."
          />

          <FeatureCard
            icon={<Camera size={24} color={COLORS.primary} />}
            title="Fotos de evolução"
            description="Registre frente, lados e costas ao longo da jornada."
          />

          <FeatureCard
            icon={<Pill size={24} color={COLORS.primary} />}
            title="Controle de medicação"
            description="Organize aplicações, doses e próximas datas."
          />

          <FeatureCard
            icon={<Clock size={24} color={COLORS.primary} />}
            title="Jejum intermitente"
            description="Controle seu tempo de jejum e seus protocolos."
          />

          <FeatureCard
            icon={<Salad size={24} color={COLORS.primary} />}
            title="Diário alimentar"
            description="Registre refeições, horários e observações."
          />
        </View>

        <View style={styles.footer}>
          <PinkButton title="Começar Minha Jornada" onPress={handleStart} />

          <View style={styles.noteBox}>
            <HeartPulse size={18} color={COLORS.primary} />
            <Text style={styles.note}>
              Pequenos passos todos os dias criam grandes transformações.
            </Text>
          </View>
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
  hero: {
    alignItems: "center",
    paddingTop: 24,
    marginBottom: 28,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logo: {
    fontSize: 52,
  },
  appName: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "800",
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: COLORS.subtitle,
  },
  features: {
    marginTop: 4,
  },
  footer: {
    marginTop: 20,
  },
  noteBox: {
    marginTop: 20,
    backgroundColor: COLORS.secondary,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  note: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 18,
  },
});