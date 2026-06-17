import AsyncStorage from "@react-native-async-storage/async-storage";

export type ExamRecord = {
  id: string;
  date: string;
  glucose: string;
  insulin: string;
  homaIr: string;
  hba1c: string;
  totalCholesterol: string;
  hdl: string;
  ldl: string;
  triglycerides: string;
  tsh: string;
  freeT4: string;
  vitaminD: string;
  ferritin: string;
  b12: string;
};

const STORAGE_KEY = "@pink_journey:exams";

export async function saveExamRecords(records: ExamRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getExamRecords(): Promise<ExamRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function clearExamRecords() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}