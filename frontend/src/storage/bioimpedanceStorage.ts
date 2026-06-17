import AsyncStorage from "@react-native-async-storage/async-storage";

export type BioRecord = {
  id: string;
  date: string;
  weight: number;
  bmi: number;
  bodyFat: number;
  muscleMass: number;
  leanMass: number;
  visceralFat: number;
  water: number;
  basalMetabolism: number;
  metabolicAge: number;
};

const STORAGE_KEY = "@pink_journey:bioimpedance";

export async function saveBioimpedanceRecords(records: BioRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getBioimpedanceRecords(): Promise<BioRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  return JSON.parse(stored);
}

export async function clearBioimpedanceRecords() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}