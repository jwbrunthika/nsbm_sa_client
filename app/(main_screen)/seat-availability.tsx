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
import SeatDisplayBox from "@/components/seatDisplay";

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
          const stat = await authRefresh();
          if (stat == 2012) {
            console.log("Logged in");
            setIsLoggedIn(true);
            const storedName = await AsyncStorage.getItem("full_name");
            // setFullName(storedName || "User"); // Set full name state
            // console.log("Name:", storedName);

            const result = await fetchData("news", key);
            setNewsData(result);
          } else {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Session Expired !",
            });
          }
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

  const facultyData = [
    {
      imageSource: require("@/assets/images/faculty_b.png"),
      title: "Faculty Of Business",
      subtitle: "(FOB)",
      onPress: () => router.push("/seat-availability-main"),
    },
    {
      imageSource: require("@/assets/images/faculty_c.png"),
      title: "Faculty Of Computing",
      subtitle: "(FOB)",
      onPress: () => alert("Faculty Card Pressed"),
    },
    {
      imageSource: require("@/assets/images/faculty_e.png"),
      title: "Faculty Of Engineering",
      subtitle: "(FOB)",
      onPress: () => alert("Faculty Card Pressed"),
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopNavigationComponent
        title={"Seat Availability FOC"}
        subtitle={""}
        navigateTo={"/(main_screen)/seat-availability-main"}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {facultyData.map((faculty, index) => (
          <SeatDisplayBox imageSource={require("@/assets/images/finagle.png")} title="Cafeteria" seatAvailability={0}/>
        ))}
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
