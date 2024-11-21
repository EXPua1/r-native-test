// // src/context/AuthContext.tsx
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { createContext, useState, useContext, ReactNode } from "react";

// // Тип для контекста
// interface AuthContextType {
//   isLoggedIn: boolean;

//   email: string | null;
//   login: (email: string) => void;
//   logout: () => void;
// }

// // Создаем контекст с дефолтным значением
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Провайдер для оборачивания приложения
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [email, setEmail] = useState<string | null>(null);

//   const login = (email: string) => {
//     setIsLoggedIn(true);
//     setEmail(email);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setEmail(null);
//     AsyncStorage.removeItem("authToken");
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Хук для использования контекста в компонентах
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
