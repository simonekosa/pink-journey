import { useState } from "react";
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
  CalendarDays,
  Clock,
  MapPin,
  Pill,
  Plus,
  Syringe,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import BackButton from "../../components/Button/BackButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../theme/colors";

const medicationHistory = [
  { id: "1", date: "15/06/2026", dose: "5mg", place: "Abdômen" },
  { id: "2", date: "08/06/2026", dose: "5mg", place: "Coxa direita" },
  { id: "3", date: "01/06/2026", dose: "2,5mg", place: "Braço esquerdo" },
];

export default function MedicationScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [applicationDate, setApplicationDate] = useState(new Date());

const [showDatePicker, setShowDatePicker] = useState(false);

const [showTimePicker, setShowTimePicker] = useState(false);
function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />
        <Text style={styles.eyebrow}>Medicação</Text>
        <Text style={styles.title}>Controle suas aplicações</Text>
        <Text style={styles.subtitle}>
          Organize dose, data, horário, local da aplicação e histórico.
        </Text>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>Medicamento atual</Text>
            <Text style={styles.heroValue}>Mounjaro</Text>
            <Text style={styles.heroText}>Dose atual: 5mg</Text>
          </View>

          <View style={styles.heroIcon}>
            <Syringe size={30} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <CalendarDays size={22} color={COLORS.primary} />
            <Text style={styles.summaryValue}>22/06</Text>
            <Text style={styles.summaryLabel}>Próxima aplicação</Text>
          </View>

          <View style={styles.summaryCard}>
            <Clock size={22} color={COLORS.primary} />
            <Text style={styles.summaryValue}>7 dias</Text>
            <Text style={styles.summaryLabel}>Intervalo</Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton title="+ Nova aplicação" onPress={() => setModalVisible(true)} />
        </View>

        <Text style={styles.sectionTitle}>Última aplicação</Text>

        <View style={styles.lastCard}>
          <View style={styles.lastIcon}>
            <Pill size={24} color={COLORS.primary} />
          </View>

          <View style={styles.lastContent}>
            <Text style={styles.lastTitle}>15/06/2026 às 08:00</Text>
            <Text style={styles.lastText}>Dose: 5mg • Local: Abdômen</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Histórico</Text>

        <View style={styles.historyCard}>
          {medicationHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <MapPin size={18} color={COLORS.primary} />
              </View>

              <View style={styles.historyContent}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyPlace}>{item.place}</Text>
              </View>

              <Text style={styles.historyDose}>{item.dose}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noteCard}>
          <Plus size={22} color={COLORS.primary} />
          <Text style={styles.noteTitle}>Observações</Text>
          <Text style={styles.noteText}>
            Futuramente, essa tela terá lembretes, registro de sintomas e
            controle automático da próxima aplicação.
          </Text>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Nova aplicação</Text>

        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={styles.closeText}>Fechar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Mounjaro"
        placeholderTextColor={COLORS.subtitle}
      />

      <Text style={styles.label}>Dose</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 5mg"
        placeholderTextColor={COLORS.subtitle}
      />

<Text style={styles.label}>Data</Text>
<TouchableOpacity
  style={styles.input}
  activeOpacity={0.8}
  onPress={() => setShowDatePicker(true)}
>
  <Text style={styles.inputText}>{formatDate(applicationDate)}</Text>
</TouchableOpacity>

<Text style={styles.label}>Horário</Text>
<TouchableOpacity
  style={styles.input}
  activeOpacity={0.8}
  onPress={() => setShowTimePicker(true)}
>
  <Text style={styles.inputText}>{formatTime(applicationDate)}</Text>
</TouchableOpacity>

      <Text style={styles.label}>Local da aplicação</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Abdômen"
        placeholderTextColor={COLORS.subtitle}
      />

      {showDatePicker && (
  <DateTimePicker
    value={applicationDate}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);

      if (selectedDate) {
        setApplicationDate(selectedDate);
      }
    }}
  />
)}

{showTimePicker && (
  <DateTimePicker
    value={applicationDate}
    mode="time"
    display="default"
    onChange={(event, selectedDate) => {
      setShowTimePicker(false);

      if (selectedDate) {
        const newDate = new Date(applicationDate);

        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());

        setApplicationDate(newDate);
      }
    }}
  />
)}

      <View style={styles.modalButtonArea}>
        <PinkButton title="Salvar aplicação" onPress={() => setModalVisible(false)} />
      </View>
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
    padding: 24,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  heroValue: {
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.white,
    marginTop: 6,
  },
  heroText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryValue: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  buttonArea: {
    marginBottom: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },
  lastCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 26,
  },
  lastIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  lastContent: {
    flex: 1,
  },
  lastTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.text,
  },
  lastText: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  historyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  historyIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyDate: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },
  historyPlace: {
    marginTop: 3,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  historyDose: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primary,
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
  alignItems: "center",
  marginBottom: 22,
},
modalTitle: {
  fontSize: 24,
  fontWeight: "900",
  color: COLORS.text,
},
closeText: {
  fontSize: 14,
  fontWeight: "800",
  color: COLORS.primary,
},
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
modalButtonArea: {
  marginTop: 10,
  marginBottom: 20,
},
inputText: {
  fontSize: 15,
  color: COLORS.text,
},
});