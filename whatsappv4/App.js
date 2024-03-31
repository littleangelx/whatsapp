import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// LogBox.ignoreLogs(["AsyncStorage has been extrated"]);

// AsyncStorage.clear();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppIsLoaded(true);
    }, 2000);
  });

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) return null;

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
