import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/Auth/slice";
import SearchBar from "../../components/SearchBar/SearchBar";
import { FetchImagesResponse, Image } from "../../services/unsplash-api-types";
import { fetchImages } from "../../services/unsplash-api";
import ImageGallery from "../../components/ImageGallery/ImageGallery";

const HomeScreen = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchImage = (newQuery: string) => {
    setPage(1);
    setQuery(newQuery);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImageData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const responseData: FetchImagesResponse = await fetchImages(
          query,
          page
        );
        if (page === 1) {
          setImages(responseData.results);
        } else {
          setImages((prevImages) => [...prevImages, ...responseData.results]);
        }
      } catch (error) {
        setError("Failed to load images");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageData();
  }, [query, page]);

  const handleEndReached = () => {
    if (isLoading) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <>
          <SearchBar onSearch={searchImage} />
          {error && <Text style={styles.error}>{error}</Text>}
          <ImageGallery
            images={images}
            onEndReached={handleEndReached}
            isLoading={isLoading}
          />
        </>
      ) : (
        <Text style={styles.log}>Log in to use app</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  log: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    fontSize: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
});

export default HomeScreen;
