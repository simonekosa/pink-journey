import AsyncStorage from "@react-native-async-storage/async-storage";

export type FastingRecord = {
  id: string;
  date: string;
  duration: string;
  protocol: number;
};

const STORAGE_KEY = "@pink_journey:fasting";

export async function saveFastingRecords(records: FastingRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getFastingRecords(): Promise<FastingRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function clearFastingRecords() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}