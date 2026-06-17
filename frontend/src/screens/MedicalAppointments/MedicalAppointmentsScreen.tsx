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
  Plus,
  Stethoscope,
  X,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import BackButton from "../../components/Button/BackButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../theme/colors";

type Appointment = {
  id: string;
  doctor: string;
  type: string;
  date: string;
  time: string;
  location: string;
  notes: string;
};

export default function MedicalAppointmentsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const [doctor, setDoctor] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());

const [showDatePicker, setShowDatePicker] = useState(false);
const [showTimePicker, setShowTimePicker] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      doctor: "Endocrinologista",
      type: "Consulta",
      date: "25/06/2026",
      time: "09:30",
      location: "Clínica Saúde",
      notes: "Levar exames recentes.",
    },
  ]);

  function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

  function handleSave() {
    if (!doctor) return;

    setAppointments((current) => [
      {
        id: String(Date.now()),
        doctor,
        type: type || "Consulta",
        date: formatDate(appointmentDate),
time: formatTime(appointmentDate),
        location,
        notes,
      },
      ...current,
    ]);

    setDoctor("");
    setType("");
    
    setLocation("");
    setNotes("");
    setModalVisible(false);
  }

  const nextAppointment = appointments[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />

        <Text style={styles.eyebrow}>Agendamentos médicos</Text>
        <Text style={styles.title}>Consultas e exames</Text>
        <Text style={styles.subtitle}>
          Organize seus retornos, consultas, exames e acompanhamentos.
        </Text>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>Próximo agendamento</Text>
            <Text style={styles.heroValue}>{nextAppointment.date}</Text>
            <Text style={styles.heroText}>
              {nextAppointment.doctor} • {nextAppointment.time}
            </Text>
          </View>

          <View style={styles.heroIcon}>
            <Stethoscope size={30} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton
            title="+ Novo agendamento"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <Text style={styles.sectionTitle}>Agenda</Text>

        <View style={styles.listCard}>
          {appointments.map((item) => (
            <View key={item.id} style={styles.appointmentItem}>
              <View style={styles.appointmentIcon}>
                <CalendarDays size={20} color={COLORS.primary} />
              </View>

              <View style={styles.appointmentContent}>
                <Text style={styles.appointmentTitle}>{item.doctor}</Text>

                <Text style={styles.appointmentText}>
                  {item.type} • {item.date}
                </Text>

                <View style={styles.infoRow}>
                  <Clock size={14} color={COLORS.subtitle} />
                  <Text style={styles.infoText}>{item.time || "Sem horário"}</Text>
                </View>

                <View style={styles.infoRow}>
                  <MapPin size={14} color={COLORS.subtitle} />
                  <Text style={styles.infoText}>
                    {item.location || "Sem local informado"}
                  </Text>
                </View>

                {!!item.notes && (
                  <Text style={styles.notes}>{item.notes}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo agendamento</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Médico / Especialidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Endocrinologista"
                placeholderTextColor={COLORS.subtitle}
                value={doctor}
                onChangeText={setDoctor}
              />

              <Text style={styles.label}>Tipo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Consulta, retorno ou exame"
                placeholderTextColor={COLORS.subtitle}
                value={type}
                onChangeText={setType}
              />

             <Text style={styles.label}>Data</Text>

<TouchableOpacity
  style={styles.input}
  onPress={() => setShowDatePicker(true)}
>
  <Text style={styles.inputText}>
    {formatDate(appointmentDate)}
  </Text>
</TouchableOpacity>

            <Text style={styles.label}>Horário</Text>

<TouchableOpacity
  style={styles.input}
  onPress={() => setShowTimePicker(true)}
>
  <Text style={styles.inputText}>
    {formatTime(appointmentDate)}
  </Text>
</TouchableOpacity>

              <Text style={styles.label}>Local</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Clínica Saúde"
                placeholderTextColor={COLORS.subtitle}
                value={location}
                onChangeText={setLocation}
              />

              <Text style={styles.label}>Observações</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ex: Levar exames recentes."
                placeholderTextColor={COLORS.subtitle}
                value={notes}
                onChangeText={setNotes}
                multiline
                textAlignVertical="top"
              />

              {showDatePicker && (
  <DateTimePicker
    value={appointmentDate}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);

      if (selectedDate) {
        setAppointmentDate(selectedDate);
      }
    }}
  />
)}

{showTimePicker && (
  <DateTimePicker
    value={appointmentDate}
    mode="time"
    display="default"
    onChange={(event, selectedDate) => {
      setShowTimePicker(false);

      if (selectedDate) {
        const newDate = new Date(appointmentDate);

        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());

        setAppointmentDate(newDate);
      }
    }}
  />
)}

              <View style={styles.modalButtonArea}>
                <PinkButton title="Salvar agendamento" onPress={handleSave} />
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
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLabel: { color: COLORS.white, opacity: 0.9 },
  heroValue: {
    marginTop: 6,
    fontSize: 34,
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
  buttonArea: { marginBottom: 26 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  appointmentItem: {
    flexDirection: "row",
    paddingVertical: 14,
  },
  appointmentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  appointmentContent: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
  },
  appointmentText: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 7,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.subtitle,
  },
  notes: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.text,
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
    marginBottom: 22,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
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
  textArea: {
    minHeight: 100,
  },
  modalButtonArea: {
    marginTop: 10,
    marginBottom: 30,
  },
  inputText: {
  fontSize: 15,
  color: COLORS.text,
},
});