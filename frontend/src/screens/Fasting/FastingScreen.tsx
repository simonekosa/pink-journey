import { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Clock,
  Flame,
  Play,
  Square,
  Trophy,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import FastingProgressCircle from "../../components/Fasting/FastingProgressCircle";
import { COLORS } from "../../theme/colors";

type ProtocolType = 16 | 18 | 24;

type HistoryItem = {
  id: string;
  date: string;
  duration: string;
};

export default function FastingScreen() {
  const [protocol, setProtocol] = useState<ProtocolType>(16);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const elapsedHours = elapsedSeconds / 3600;

  const progress = Math.min(elapsedHours / protocol, 1);

  const phase = useMemo(() => {
    if (elapsedHours < 4) {
      return {
        icon: "🍽️",
        title: "Digestão",
      };
    }

    if (elapsedHours < 12) {
      return {
        icon: "🔥",
        title: "Queima de glicogênio",
      };
    }

    if (elapsedHours < 18) {
      return {
        icon: "⚡",
        title: "Cetose leve",
      };
    }

    return {
      icon: "🚀",
      title: "Autofagia",
    };
  }, [elapsedHours]);

  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  }

  function startFast() {
    setIsRunning(true);
  }

  function stopFast() {
    if (elapsedSeconds > 0) {
      const date = new Date().toLocaleDateString("pt-BR");

      setHistory((current) => [
        {
          id: String(Date.now()),
          date,
          duration: formatTime(elapsedSeconds),
        },
        ...current,
      ]);
    }

    setIsRunning(false);
    setElapsedSeconds(0);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>Jejum Intermitente</Text>

        <Text style={styles.title}>Controle seu jejum</Text>

        <Text style={styles.subtitle}>
          Acompanhe suas fases metabólicas em tempo real.
        </Text>

        <FastingProgressCircle
          progress={progress}
          timeLabel={formatTime(elapsedSeconds)}
          phaseIcon={phase.icon}
          phaseTitle={phase.title}
        />

        <Text style={styles.sectionTitle}>Protocolos</Text>

        <View style={styles.protocolRow}>
          {[16, 18, 24].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.protocolCard,
                protocol === item && styles.protocolSelected,
              ]}
              onPress={() => setProtocol(item as ProtocolType)}
            >
              <Text
                style={[
                  styles.protocolTitle,
                  protocol === item && styles.protocolTitleSelected,
                ]}
              >
                {item}h
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.protocolCard}>
            <Text style={styles.protocolTitle}>⚙️</Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          {!isRunning ? (
            <PinkButton title="Iniciar Jejum" onPress={startFast} />
          ) : (
            <PinkButton title="Encerrar Jejum" onPress={stopFast} />
          )}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Flame size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>
              {Math.floor(elapsedHours)}h
            </Text>
            <Text style={styles.statLabel}>Atual</Text>
          </View>

          <View style={styles.statCard}>
            <Clock size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>{protocol}h</Text>
            <Text style={styles.statLabel}>Meta</Text>
          </View>

          <View style={styles.statCard}>
            <Trophy size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>{history.length}</Text>
            <Text style={styles.statLabel}>Jejuns</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Histórico</Text>

        {history.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              Nenhum jejum finalizado ainda.
            </Text>
          </View>
        ) : (
          history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.historyDuration}>
                {item.duration}
              </Text>
            </View>
          ))
        )}

        <View style={styles.noteCard}>
          <Play size={22} color={COLORS.primary} />
          <Text style={styles.noteTitle}>Fases do jejum</Text>
          <Text style={styles.noteText}>
            🍽️ Digestão → 🔥 Glicogênio → ⚡ Cetose → 🚀 Autofagia
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
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 8,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: COLORS.subtitle,
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
  },
  protocolRow: {
    flexDirection: "row",
    gap: 10,
  },
  protocolCard: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  protocolSelected: {
    backgroundColor: COLORS.primary,
  },
  protocolTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  protocolTitleSelected: {
    color: COLORS.white,
  },
  buttonArea: {
    marginTop: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 10,
  },
  statLabel: {
    color: COLORS.subtitle,
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    color: COLORS.subtitle,
  },
  historyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  historyDate: {
    color: COLORS.text,
    fontWeight: "700",
  },
  historyDuration: {
    color: COLORS.primary,
    fontWeight: "900",
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
    color: COLORS.subtitle,
    lineHeight: 22,
  },
});