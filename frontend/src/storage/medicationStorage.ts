import AsyncStorage from "@react-native-async-storage/async-storage";

export type MedicationRecord = {
  id: string;
  medication: string;
  dose: string;
  date: string;
  time: string;
  place: string;
};

const STORAGE_KEY = "@pink_journey:medications";

export async function saveMedicationRecords(records: MedicationRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getMedicationRecords(): Promise<MedicationRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  return JSON.parse(stored);
}

export async function clearMedicationRecords() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}