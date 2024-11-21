import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AuthNav from "../AuthNav/AuthNav";
import { UserMenu } from "../../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/Auth/slice";
import Icon from "react-native-vector-icons/FontAwesome";

const AppBar = () => {
  const isLoggedIn = useSelector(selectLoggedIn);
  const navigation = useNavigation<any>(); //
  const goHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.homeButton} onPress={goHome}>
        <Icon name="home" size={24} color="#000" />
        <Text style={styles.headerText}>Home</Text>
      </TouchableOpacity>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    gap: 55,
  },
  text: {
    fontSize: 16,
  },
  authContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default AppBar;
