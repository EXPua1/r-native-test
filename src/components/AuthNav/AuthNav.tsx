import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Register: undefined;
  Auth: undefined;
};
type AuthNavProps = StackNavigationProp<RootStackParamList, "Register">;
const AuthNav = () => {
  const navigation = useNavigation<AuthNavProps>();

  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
        <Text style={styles.link}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    gap: 20,
    backgroundColor: "#f0f0f0",
  },
  button: {},

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    fontWeight: "bold",
  },
});

export default AuthNav;
