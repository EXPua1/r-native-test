import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const SignUpScreen = () => {
  return (
    <View style={css.container}>
      <Text>Comming soon...</Text>
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
