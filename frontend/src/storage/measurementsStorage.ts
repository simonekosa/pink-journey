import AsyncStorage from "@react-native-async-storage/async-storage";

export type MeasurementRecord = {
  id: string;
  date: string;
  weight: number;
  waist: number | null;
  abdomen: number | null;
  hip: number | null;
  arm: number | null;
  thigh: number | null;
  calf: number | null;
};

const STORAGE_KEY = "@pink_journey:measurements";

export async function saveMeasurementRecords(records: MeasurementRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getMeasurementRecords(): Promise<MeasurementRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  return JSON.parse(stored);
}

export async function clearMeasurementRecords() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
