// import React, { useEffect, useState } from "react";
// import { StyleSheet, TextInput, View, Button, Text } from "react-native";
// import * as Yup from "yup";
// import { Formik } from "formik";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { loginSchema } from "../utils/schema";

// // Схема валідації для форми
// interface FormValues {
//   email: string;
//   password: string;
// }

// const INITIAL_VALUES: FormValues = {
//   email: "",
//   password: "",
// };

// export default function AuthForm({ navigation }: any) {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (token) {
//         setIsLoggedIn(true);
//         navigation.replace("Home"); // Перехід на головну сторінку
//       }
//     };
//     checkLoginStatus();
//   }, [navigation]); // Залежність додано, щоб useEffect виконувався лише один раз

//   const handleLogin = async (values: FormValues, { resetForm }: any) => {
//     const { email, password } = values;

//     // Простий приклад перевірки авторизації
//     if (email === "test@example.com" && password === "password123") {
//       await AsyncStorage.setItem("authToken", "fake-jwt-token"); // Збереження токену
//       setIsLoggedIn(true);
//       navigation.replace("Home");
//     } else {
//       alert("Invalid email or password"); //
//     }

//     resetForm();
//   };

//   return (
//     <View style={styles.formContainer}>
//       <Formik
//         initialValues={INITIAL_VALUES}
//         validationSchema={loginSchema}
//         onSubmit={handleLogin}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
//           <View>
//             <Text>Email:</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               onChangeText={handleChange("email")}
//               onBlur={handleBlur("email")}
//               value={values.email}
//             />
//             {errors.email && <Text style={styles.error}>{errors.email}</Text>}

//             <Text>Password:</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               secureTextEntry={true}
//               onChangeText={handleChange("password")}
//               onBlur={handleBlur("password")}
//               value={values.password}
//             />
//             {errors.password && (
//               <Text style={styles.error}>{errors.password}</Text>
//             )}

//             <Button title="Log In" onPress={() => handleSubmit()} />
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   formContainer: {
//     width: "80%",
//     padding: 20,
//     alignItems: "center",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 8,
//     width: "auto",
//     minWidth: 250,
//   },
//   error: {
//     color: "red",
//     fontSize: 12,
//   },
// });
