import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Auth/slice";
import { loginSchema } from "../../utils/schema";

// Схема валидации для формы
// const loginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

interface FormValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: FormValues = {
  email: "",
  password: "",
};

export default function SignInScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const handleLogin = async (values: FormValues, { resetForm }: any) => {
    const { email, password } = values;

    if (email && password) {
      await AsyncStorage.setItem("authToken", "fake-jwt-token");
      await AsyncStorage.setItem("userEmail", email);
      dispatch(login({ email, token: "fake-jwt-token" }));
      navigation.navigate("Home");
    }

    resetForm();
  };

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
              <Text style={{ color: "white" }}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,

    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: "auto",
    minWidth: 250,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6347", // Цвет фона кнопки
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25, // Скругленные углы
  },
});
