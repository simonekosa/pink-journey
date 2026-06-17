import AsyncStorage from "@react-native-async-storage/async-storage";

export type PhotoRecord = {
  id: string;
  date: string;
  front: string | null;
  right: string | null;
  left: string | null;
  back: string | null;
};

const STORAGE_KEY = "@pink_journey:photos";

export async function savePhotoRecords(records: PhotoRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getPhotoRecords(): Promise<PhotoRecord[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function clearPhotoRecords() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}