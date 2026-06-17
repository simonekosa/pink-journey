import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Activity,
  Camera,
  Clock,
  HeartPulse,
  Home,
  Scale,
  User,
} from "lucide-react-native";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import PhotosScreen from "../screens/Photos/PhotosScreen";
import MeasurementsScreen from "../screens/Measurements/MeasurementsScreen";
import FastingScreen from "../screens/Fasting/FastingScreen";
import MedicationScreen from "../screens/Medication/MedicationScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import HealthModuleScreen from "../screens/Health/HealthModuleScreen";

import { COLORS } from "../theme/colors";

export type BottomTabParamList = {
  Dashboard: undefined;
  Photos: undefined;
  Measurements: undefined;
  Fasting: undefined;
  Health: undefined;  
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.subtitle,
        tabBarStyle: {
          height: 72,
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <Home size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Photos"
        component={PhotosScreen}
        options={{
          tabBarIcon: ({ color }) => <Camera size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Measurements"
        component={MeasurementsScreen}
        options={{
          tabBarIcon: ({ color }) => <Scale size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Fasting"
        component={FastingScreen}
        options={{
          tabBarIcon: ({ color }) => <Clock size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Health"
        component={HealthModuleScreen}
        options={{
          tabBarIcon: ({ color }) => <HeartPulse size={26} color={color} />,
        }}
      />

      

      

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={26} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}