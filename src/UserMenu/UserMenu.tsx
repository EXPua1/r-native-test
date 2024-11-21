import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Profile: undefined;
};

type AppBarNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export const UserMenu = () => {
  const navigation = useNavigation<AppBarNavigationProp>();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.authContainer}>
      <TouchableOpacity style={styles.profileBtn} onPress={navigateToProfile}>
        <Icon name="user" size={24} color="#000" />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  profileBtn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
