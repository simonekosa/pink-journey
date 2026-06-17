import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  CalendarDays,
  Camera,
  Images,
  ImagePlus,
  RefreshCcw,
  Sparkles,
} from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import { COLORS } from "../../theme/colors";
import {
  PhotoRecord,
  getPhotoRecords,
  savePhotoRecords,
} from "../../storage/photosStorage";

type PhotoPosition = "front" | "right" | "left" | "back";

type PhotosState = Record<PhotoPosition, string | null>;

type PhotoItem = {
  id: PhotoPosition;
  title: string;
  description: string;
};

const emptyPhotos: PhotosState = {
  front: null,
  right: null,
  left: null,
  back: null,
};

const photoPositions: PhotoItem[] = [
  { id: "front", title: "Frente", description: "Foto frontal do corpo" },
  { id: "right", title: "Lado direito", description: "Foto lateral direita" },
  { id: "left", title: "Lado esquerdo", description: "Foto lateral esquerda" },
  { id: "back", title: "Costas", description: "Foto de costas" },
];

export default function PhotosScreen() {
  const [photos, setPhotos] = useState<PhotosState>(emptyPhotos);
  const [records, setRecords] = useState<PhotoRecord[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    const storedRecords = await getPhotoRecords();
    setRecords(storedRecords);

    if (storedRecords.length > 0) {
      const latest = storedRecords[0];

      setPhotos({
        front: latest.front,
        right: latest.right,
        left: latest.left,
        back: latest.back,
      });
    }
  }

  const filledPhotosCount = Object.values(photos).filter(Boolean).length;
  const hasAnyPhoto = filledPhotosCount > 0;
  const isComplete = filledPhotosCount === 4;

  async function handleSelectPhoto(position: PhotoPosition) {
    Alert.alert("Adicionar foto", "Escolha uma opção", [
      { text: "Câmera", onPress: () => openCamera(position) },
      { text: "Galeria", onPress: () => openGallery(position) },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  async function openCamera(position: PhotoPosition) {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à câmera para tirar a foto."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      setPhotos((current) => ({
        ...current,
        [position]: result.assets[0].uri,
      }));
    }
  }

  async function openGallery(position: PhotoPosition) {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para escolher a foto."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      setPhotos((current) => ({
        ...current,
        [position]: result.assets[0].uri,
      }));
    }
  }

  async function handleSaveCompleteRecord() {
    if (!isComplete) {
      Alert.alert(
        "Registro incompleto",
        "Adicione as 4 fotos: frente, lado direito, lado esquerdo e costas."
      );
      return;
    }

    const newRecord: PhotoRecord = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString("pt-BR"),
      front: photos.front,
      right: photos.right,
      left: photos.left,
      back: photos.back,
    };

    const updatedRecords = [newRecord, ...records];

    setRecords(updatedRecords);
    await savePhotoRecords(updatedRecords);

    Alert.alert("Registro salvo", "Suas fotos foram salvas com sucesso.");
  }

  function handleStartFullRecord() {
    setPhotos(emptyPhotos);
    Alert.alert(
      "Novo registro completo",
      "Agora adicione frente, lado direito, lado esquerdo e costas. Depois clique em Salvar registro completo."
    );
  }

  const beforeRecord = records[records.length - 1];
  const afterRecord = records[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>Fotos de evolução</Text>
        <Text style={styles.title}>Registre sua transformação</Text>
        <Text style={styles.subtitle}>
          Tire fotos nas mesmas posições para comparar sua evolução ao longo da
          jornada.
        </Text>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Camera size={30} color={COLORS.white} />
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              {isComplete ? "Registro completo" : "Novo registro"}
            </Text>
            <Text style={styles.heroText}>
              {filledPhotosCount}/4 fotos adicionadas neste registro.
            </Text>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(filledPhotosCount / 4) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton
            title="+ Novo registro completo"
            onPress={handleStartFullRecord}
          />
        </View>

        <View style={styles.buttonArea}>
          <PinkButton
            title="Salvar registro completo"
            onPress={handleSaveCompleteRecord}
          />
        </View>

        <Text style={styles.sectionTitle}>Posições das fotos</Text>

        <View style={styles.grid}>
          {photoPositions.map((item) => {
            const photoUri = photos[item.id];

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.photoCard}
                activeOpacity={0.85}
                onPress={() => handleSelectPhoto(item.id)}
              >
                <View style={styles.photoPlaceholder}>
                  {photoUri ? (
                    <Image source={{ uri: photoUri }} style={styles.photoImage} />
                  ) : (
                    <View style={styles.emptyPhoto}>
                      <ImagePlus size={34} color={COLORS.primary} />
                      <Text style={styles.emptyPhotoText}>Adicionar</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.photoTitle}>{item.title}</Text>
                <Text style={styles.photoDescription}>{item.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Comparação</Text>

        <View style={styles.compareCard}>
          <View style={styles.compareHeader}>
            <RefreshCcw size={22} color={COLORS.primary} />
            <Text style={styles.compareTitle}>Antes x Depois</Text>
          </View>

          <View style={styles.compareImages}>
            <View style={styles.compareImageBox}>
              {beforeRecord?.front ? (
                <Image
                  source={{ uri: beforeRecord.front }}
                  style={styles.photoImage}
                />
              ) : (
                <Text style={styles.comparePlaceholder}>Antes</Text>
              )}
            </View>

            <View style={styles.compareImageBox}>
              {afterRecord?.front ? (
                <Image
                  source={{ uri: afterRecord.front }}
                  style={styles.photoImage}
                />
              ) : (
                <Text style={styles.comparePlaceholder}>Depois</Text>
              )}
            </View>
          </View>

          <Text style={styles.compareText}>
            {records.length >= 2
              ? `${beforeRecord.date} x ${afterRecord.date}`
              : "Salve pelo menos 2 registros completos para comparar sua evolução."}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Linha do tempo</Text>

        <View style={styles.timelineCard}>
          <View style={styles.timelineIcon}>
            {records.length > 0 ? (
              <CalendarDays size={24} color={COLORS.primary} />
            ) : (
              <Images size={24} color={COLORS.primary} />
            )}
          </View>

          <Text style={styles.timelineTitle}>
            {records.length > 0
              ? `${records.length} registro(s) salvo(s)`
              : "Nenhum registro ainda"}
          </Text>

          <Text style={styles.timelineText}>
            {records.length > 0
              ? "Seus registros foram salvos localmente no celular."
              : "Quando você salvar suas primeiras fotos, elas aparecerão aqui organizadas por data."}
          </Text>
        </View>

        {records.length > 0 && (
          <View style={styles.recordsList}>
            {records.map((item) => (
              <View key={item.id} style={styles.recordItem}>
                <Text style={styles.recordDate}>{item.date}</Text>
                <Text style={styles.recordText}>
                  Frente • Lados • Costas registrados
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.noteCard}>
          <Sparkles size={24} color={COLORS.primary} />
          <Text style={styles.noteTitle}>Dica para comparar melhor</Text>
          <Text style={styles.noteText}>
            Use sempre a mesma iluminação, distância da câmera e roupas
            parecidas para visualizar melhor sua evolução.
          </Text>
        </View>
      </ScrollView>
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
    padding: 22,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.white,
  },
  heroText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.white,
    opacity: 0.9,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 999,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: COLORS.white,
    borderRadius: 999,
  },
  buttonArea: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 26,
  },
  photoCard: {
    width: "47%",
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  photoPlaceholder: {
    height: 150,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    overflow: "hidden",
  },
  emptyPhoto: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyPhotoText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primary,
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
  },
  photoDescription: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtitle,
  },
  compareCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 26,
  },
  compareHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  compareTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  compareImages: {
    flexDirection: "row",
    gap: 12,
  },
  compareImageBox: {
    flex: 1,
    height: 150,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  comparePlaceholder: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
  },
  compareText: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subtitle,
  },
  timelineCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    marginBottom: 18,
  },
  timelineIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  timelineText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: COLORS.subtitle,
  },
  recordsList: {
    gap: 10,
    marginBottom: 24,
  },
  recordItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recordDate: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.text,
  },
  recordText: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
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
});