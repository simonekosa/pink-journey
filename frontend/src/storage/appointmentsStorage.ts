import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppointmentRecord = {
  id: string;
  doctor: string;
  type: string;
  date: string;
  time: string;
  location: string;
  notes: string;
};

const STORAGE_KEY = "@pink_journey:appointments";

export async function saveAppointmentRecords(records: AppointmentRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getAppointmentRecords(): Promise<AppointmentRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function clearAppointmentRecords() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}