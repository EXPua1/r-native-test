import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserEmail } from "../../redux/Auth/slice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootParamList = {
  Profile: undefined;
  Auth: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "Profile"
>;

type AvatarResponse = {
  data: {
    avatar: string;
    first_name: string;
  };
};

export const ProfileScreen = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const dispatch = useDispatch();
  const email = useSelector(selectUserEmail);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const fetchAvatar = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users/1");
      const data: AvatarResponse = await response.json();
      setAvatar(data.data.avatar);
      setName(data.data.first_name);
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text>Loading avatar...</Text>
        )}
        {name ? (
          <Text style={styles.name}>{name}</Text>
        ) : (
          <Text>Loading name...</Text>
        )}
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogOut} style={styles.btn}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 5,
  },
  email: {
    fontSize: 18,
    marginVertical: 10,
    color: "#555",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  footer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
