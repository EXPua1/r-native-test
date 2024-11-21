import React, { FC, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Toast from "react-native-toast-message";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (!query.trim()) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Enter a search query",
        position: "bottom",
      });
      return;
    }

    onSearch(query);

    setQuery("");
  };

  return (
    <View style={styles.header}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text style={styles.btnText}>Поиск</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4a90e2",
    padding: 20,
    alignItems: "center",
  },
  form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SearchBar;
