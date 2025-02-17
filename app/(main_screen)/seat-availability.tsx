import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import authRefresh from "../services/authRefreshService";
import { Stack } from "expo-router";
import fetchData from "../services/fetcher";
import Toast from "react-native-toast-message";
import caraouselComponent from "@/components/textnimageCaraousel";
import { Ionicons } from "@expo/vector-icons";
import FacultyCard from "@/components/facultyCard";
import TopNavigationComponent from "@/components/topNavigationComponent";

const width = Dimensions.get("window").width;
const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

export default function SeatStuff() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const progress = useSharedValue(0);

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const key = await AsyncStorage.getItem("apiKey");
        if (key) {
          const isApiValid = await authRefresh();
          setIsLoggedIn(true);
          // if (isApiValid) {
          //   // const dataResult = await fetchData("users", key);

          //   // if (Array.isArray(dataResult) && dataResult.length > 0) {
          //   //   setUserData(dataResult[0]); // Use the first user object
          //   // }
          //   // console.log(dataResult)

          //   // setNewsData(result);
          // } else {
          //   Toast.show({
          //     type: "error",
          //     position: "bottom",
          //     text1: "Session Expired !",
          //   });
          // }
        } else {
          router.replace("/(auth)/sign-in");
        }
      } catch (error) {
        console.log("Error checking login status:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "System Experienced an Error !",
        });
      }
    };

    validateLogin();
  }, []);

  if (!isLoggedIn) {
    return null; // Avoid rendering anything if not logged in
  }

  const images = [
    "https://cssl.nsbm.ac.lk/wp-content/uploads/2023/07/NSBM-LOGO.png",
    "https://www.eduwire.lk/wp-content/uploads/2025/01/1000-human_resource_circle_of_nsbm_green_university_cover.jpg",
    "https://d3c539pel8wzjz.cloudfront.net/wp-content/uploads/2021/08/r1-1.jpg",
    "https://idonura.wordpress.com/wp-content/uploads/2017/09/img_5287.jpg?w=1200&h=899",
    "https://media.licdn.com/dms/image/v2/C561BAQHiubTkMPrifw/company-background_10000/company-background_10000/0/1638507962416/nsbmgreenuniversity_cover?e=2147483647&v=beta&t=FD8-SbAHk-24clJVlVICcshOxvqYi2QPS5r4w7Fgpzo",
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopNavigationComponent
        title={"Seat Availability"}
        subtitle={""}
        navigateTo={"/"}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent} // Added this
      >
        <FacultyCard
          style={styles.factCard}
          imageSource={require("@/assets/images/faculty_b.png")}
          title="Faculty Of Business"
          subtitle="(FOB)"
          tintColor="rgba(0, 0, 0, 0.5)"
          onPress={() => alert("Faculty Card Pressed")}
        />

        <FacultyCard
          style={styles.factCard}
          imageSource={require("@/assets/images/faculty_c.png")}
          title="Faculty Of Computing"
          subtitle="(FOB)"
          tintColor="rgba(0, 0, 0, 0.5)"
          onPress={() => alert("Faculty Card Pressed")}
        />

        <FacultyCard
          style={styles.factCard}
          imageSource={require("@/assets/images/faculty_e.png")}
          title="Faculty Of Engineering"
          subtitle="(FOB)"
          tintColor="rgba(0, 0, 0, 0.5)"
          onPress={() => alert("Faculty Card Pressed")}
        />

        <FacultyCard
          style={styles.factCard}
          imageSource={require("@/assets/images/library.png")}
          title="Library"
          subtitle=""
          tintColor="rgba(0, 0, 0, 0.5)"
          onPress={() => alert("Faculty Card Pressed")}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1B5E20",
    justifyContent: "flex-end",
  },
  profileIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C8E6C9",
  },
  ServicesMenu: {
    alignItems: "center",
    justifyContent: "center", // This will vertically center the content
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#C8E6C9",
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject, // fills the image's dimensions
    backgroundColor: "rgba(144, 238, 144, 0.3)", // light green with 30% opacity
    borderRadius: 10,
  },
  factCard: {
    alignSelf: "center",
  },
});
