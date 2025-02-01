import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { Link, Stack } from "expo-router";
import { Toast } from "react-native-toast-message"; // Import toast if not already

import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation(); // Create navigation object

  useEffect(() => {
    try {
      AsyncStorage.removeItem("apiKey");
      // const apiKey = AsyncStorage.getItem("apiKey", apiKey);
      if (apiKey) {
        console.error(apiKey);
        // console.log("FUCK");
        setIsLoggedIn(true); // Set logged in state if API key exists
      }
    } catch (error) {
      // Toast.show({
      //   type: "error",
      //   position: "top",
      //   text1: "Error occurred while checking login status",
      // });
      console.log("Error occurred while checking login status:", error);
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array to run only once when the component mounts

  if (!isLoggedIn) {
    return (
      <>
        <Stack.Screen options={{ title: "NSBM Super App | Demo | Home" }} />
        <ThemedView style={styles.interfaceMain}>
          <ThemedText type="title">
            This Screen is still under development :(
          </ThemedText>
          <Link href="/(auth)/sign-in" style={styles.link}>
            <ThemedText type="link">
              isLoggedIn Tripped: Redirect to log in
            </ThemedText>
          </Link>
        </ThemedView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "NSBM Super App | Demo | Home" }} />
      <ThemedView style={styles.interfaceMain}>
        <ThemedText type="title">You are logged in!</ThemedText>
        {/* You can add other logged-in user components here */}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  interfaceMain: {
    alignItems: "center",
    padding: 30,
  },
});
