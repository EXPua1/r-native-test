import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AppBar from "../AppBar/AppBar";
import { StatusBar } from "expo-status-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <AppBar /> Верхняя панель
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",

    overflow: "hidden",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});

export default Layout;
