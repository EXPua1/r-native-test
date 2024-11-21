import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./src/screens/SignInScreen/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";

import React, { useEffect } from "react";

import Layout from "./src/components/Layout/Layout";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, selectUserEmail } from "./src/redux/Auth/slice";
import { ProfileScreen } from "./src/screens/ProfileScreen/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const AppNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    const loadAuthData = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const email = await AsyncStorage.getItem("userEmail");

      if (token && email) {
        dispatch(login({ email, token }));
      }
    };

    loadAuthData();
  }, [dispatch]);

  return (
    <Layout>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Auth"
          component={SignInScreen}
          options={{
            headerLeft: () => null,
            headerShown: false, // Убирает кнопку назад на экране входа
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => null,
            headerShown: false, // Убирает кнопку назад на главной странице
          }}
        />
        <Stack.Screen
          name="Register"
          component={SignUpScreen}
          options={{ headerLeft: () => null, headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerLeft: () => null, headerShown: false }}
        />
      </Stack.Navigator>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
