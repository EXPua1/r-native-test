import React, { FC } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image as ImageType } from "../../services/unsplash-api-types";

interface ImageGalleryProps {
  images: ImageType[];
  onEndReached: () => void;
  isLoading: boolean;
}

const ImageGallery: FC<ImageGalleryProps> = ({
  images,
  onEndReached,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.urls?.regular }} style={styles.image} />
        )}
        numColumns={2}
        onEndReached={onEndReached}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  noImagesText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ImageGallery;
