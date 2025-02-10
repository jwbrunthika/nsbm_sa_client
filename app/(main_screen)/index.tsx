import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import SERVER_ADDRESS from "@/config";
import checkApiValid from "../services/checkAuth";
import { Stack } from "expo-router";

const width = Dimensions.get("window").width;

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const progress = useSharedValue(0);

  const fetchNews = async (key) => {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/data/news/fetch`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      const result = await response.json();
      setNewsData(result); // Assuming the API returns an array of news
    } catch (error) {
      console.log("Error fetching news:", error);
    }
  };

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const key = await AsyncStorage.getItem('apiKey');
        if (key) {
          const isApiValid = await checkApiValid(key);
          setIsLoggedIn(true);
          if (isApiValid) {
            fetchNews(key); // Fetch data if API is valid
          } else {
            console.log('Invalid API key');
          }
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    validateLogin();
  }, []);

  if (!isLoggedIn) {
    return null; // Avoid rendering anything if not logged in
  }

  const images = [
    "https://www.eduwire.lk/wp-content/uploads/2025/01/1000-human_resource_circle_of_nsbm_green_university_cover.jpg",
    "https://d3c539pel8wzjz.cloudfront.net/wp-content/uploads/2021/08/r1-1.jpg",
    "https://idonura.wordpress.com/wp-content/uploads/2017/09/img_5287.jpg?w=1200&h=899",
    "https://media.licdn.com/dms/image/v2/C561BAQHiubTkMPrifw/company-background_10000/company-background_10000/0/1638507962416/nsbmgreenuniversity_cover?e=2147483647&v=beta&t=FD8-SbAHk-24clJVlVICcshOxvqYi2QPS5r4w7Fgpzo",
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/bc/7a/62/bc7a621f-e816-3fde-cdea-28f1b05176e3/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png",
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.ServicesMenu}></View>
          <Text style={styles.greeting}>Welcome back [Name]!</Text>
          <View style={styles.profileIcon}></View>
        </View>

        <Carousel
          width={width * 1}
          height={width / 1.5}
          data={images}
          onProgressChange={(_, absoluteProgress) =>
            (progress.value = absoluteProgress)
          }
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={{ uri: item }} style={styles.carouselImage} />
            </View>
          )}
        />
        <Pagination.Basic
          progress={progress}
          data={images}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
        />

        <Text style={styles.subtitle}>
          "Connecting Campus Life, One App at a Time."
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>[RetrieveEventsFromDB]</Text>
        </View>

        <Text style={styles.sectionTitle}>Latest News</Text>
        <View style={styles.newsContainer}>
          {(newsData || []).map((news, index) => (
            <View key={index} style={styles.newsCard}>
              <Text style={styles.newsTitle}>{news.news_title}</Text>
              {news.image && <Image source={{ uri: news.image }} style={styles.newsImage} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 16,
    backgroundColor: "#AFD9AF",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1B5E20",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C8E6C9",
  },
  ServicesMenu: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#C8E6C9",
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "95%",
    height: "95%",
    borderRadius: 12,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "300",
    color: "#388E3C",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#d6e1ed",
    padding: 100,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "200",
    color: "#0D47A1",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  newsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  newsCard: {
    backgroundColor: "#DCEDC8",
    width: "48%",
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#1B5E20",
  },
  newsDate: {
    fontSize: 14,
    color: "#558B2F",
  },
});
