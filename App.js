import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./ui/IconButton";
import ExpensesContextProvider from "./store/expensesContext";

// Global Styles
import GlobalStyles from "./constants/styles";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Scenes
import ManageExpenses from "./screens/ManageExpenses";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { useWindowDimensions } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function MyTabs() {
    const windowHeight = useWindowDimensions().height;
    return (
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          // header
          headerTintColor: "white",
          headerStyle: { backgroundColor: GlobalStyles.colors.gray950 },
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                icon="add-circle"
                color={tintColor}
                size={24}
                onPress={() => {
                  navigation.navigate("ManageExpenses");
                }}
              />
            );
          },

          // tabBar
          tabBarStyle: {
            minHeight: windowHeight / 12,
            backgroundColor: GlobalStyles.colors.gray950,
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent300,
          tabBarInactiveTintColor: GlobalStyles.colors.gray200,
        })}
      >
        {/* Screens */}
        <Tab.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} color={color} name="hourglass-outline" />
            ),
          }}
        />
        <Tab.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: "All expenses",
            tabBarLabel: "All",
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} color={color} name="calendar-outline" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.gray950 },
              headerTintColor: GlobalStyles.colors.gray50,
            }}
          >
            <Stack.Screen
              options={{ title: "Expenses Overview", headerShown: false }}
              name="ExpensesOverview"
              component={MyTabs}
            />
            <Stack.Screen
              options={{ title: "Manage Expenses" }}
              name="ManageExpenses"
              component={ManageExpenses}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
