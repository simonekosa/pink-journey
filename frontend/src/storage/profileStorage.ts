import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserProfile = {
  name: string;
  height: number;
  startWeight: number;
  targetWeight: number;
  startDate: string;
  goal: string;
};

const STORAGE_KEY = "@pink_journey:profile";

export const defaultProfile: UserProfile = {
  name: "Simone",
  height: 1.7,
  startWeight: 105,
  targetWeight: 85,
  startDate: "16/06/2026",
  goal: "Quero perder peso, melhorar minha saúde, ter mais energia e voltar a me sentir bem comigo mesma.",
};

export async function saveProfile(profile: UserProfile) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export async function getProfile(): Promise<UserProfile> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return defaultProfile;
  }

  return JSON.parse(stored);
}