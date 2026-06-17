import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import ProfileSetupScreen from "../screens/ProfileSetup/ProfileSetupScreen";
import BottomTabs from "./BottomTabs";

import BioimpedanceScreen from "../screens/Bioimpedance/BioimpedanceScreen";
import ExamsScreen from "../screens/Exams/ExamsScreen";
import MedicalAppointmentsScreen from "../screens/MedicalAppointments/MedicalAppointmentsScreen";
import MedicationScreen from "../screens/Medication/MedicationScreen";

export type RootStackParamList = {
  Welcome: undefined;
  ProfileSetup: undefined;
  Main: undefined;
  Bioimpedance: undefined;
  Exams: undefined;
  MedicalAppointments: undefined;
  Medication: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />

        <Stack.Screen name="Bioimpedance" component={BioimpedanceScreen} />
        <Stack.Screen name="Exams" component={ExamsScreen} />
        <Stack.Screen
          name="MedicalAppointments"
          component={MedicalAppointmentsScreen}
        />
        <Stack.Screen name="Medication" component={MedicationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}