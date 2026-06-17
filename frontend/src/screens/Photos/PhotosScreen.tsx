import { useState } from "react";
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
import { Camera, ImagePlus, Images, Sparkles } from "lucide-react-native";

import PinkButton from "../../components/Button/PinkButton";
import { COLORS } from "../../theme/colors";

type PhotoPosition = "front" | "right" | "left" | "back";

type PhotoItem = {
  id: PhotoPosition;
  title: string;
  description: string;
};

const photoPositions: PhotoItem[] = [
  {
    id: "front",
    title: "Frente",
    description: "Foto frontal do corpo",
  },
  {
    id: "right",
    title: "Lado direito",
    description: "Foto lateral direita",
  },
  {
    id: "left",
    title: "Lado esquerdo",
    description: "Foto lateral esquerda",
  },
  {
    id: "back",
    title: "Costas",
    description: "Foto de costas",
  },
];

export default function PhotosScreen() {
  const [photos, setPhotos] = useState<Record<PhotoPosition, string | null>>({
    front: null,
    right: null,
    left: null,
    back: null,
  });

  async function handleSelectPhoto(position: PhotoPosition) {
    Alert.alert("Adicionar foto", "Escolha uma opção", [
      {
        text: "Câmera",
        onPress: () => openCamera(position),
      },
      {
        text: "Galeria",
        onPress: () => openGallery(position),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
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

  const hasAnyPhoto = Object.values(photos).some(Boolean);

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
            <Text style={styles.heroTitle}>Primeiro registro</Text>
            <Text style={styles.heroText}>
              Adicione suas fotos iniciais: frente, lados e costas.
            </Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <PinkButton
            title="+ Novo registro de fotos"
            onPress={() => handleSelectPhoto("front")}
          />
        </View>

        <Text style={styles.sectionTitle}>Posições das fotos</Text>

        <View style={styles.grid}>
          {photoPositions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.photoCard}
              activeOpacity={0.85}
              onPress={() => handleSelectPhoto(item.id)}
            >
              <View style={styles.photoPlaceholder}>
                {photos[item.id] ? (
                  <Image
                    source={{ uri: photos[item.id] || "" }}
                    style={styles.photoImage}
                  />
                ) : (
                  <ImagePlus size={34} color={COLORS.primary} />
                )}
              </View>

              <Text style={styles.photoTitle}>{item.title}</Text>
              <Text style={styles.photoDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Linha do tempo</Text>

        <View style={styles.timelineCard}>
          <View style={styles.timelineIcon}>
            <Images size={24} color={COLORS.primary} />
          </View>

          <Text style={styles.timelineTitle}>
            {hasAnyPhoto ? "Registro inicial criado" : "Nenhum registro ainda"}
          </Text>

          <Text style={styles.timelineText}>
            {hasAnyPhoto
              ? "Suas primeiras fotos já foram adicionadas. Futuramente elas serão salvas no banco de dados."
              : "Quando você adicionar suas primeiras fotos, elas aparecerão aqui organizadas por data."}
          </Text>
        </View>

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
  buttonArea: {
    marginBottom: 26,
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
    height: 130,
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
  timelineCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    marginBottom: 24,
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