import SERVER_ADDRESS from "@/config";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function authRefresh() {
  try {
    const credentials = {
      email: await AsyncStorage.getItem("email"),
      password: await AsyncStorage.getItem("password"),
    };
    console.log(credentials);
    const response = await fetch(`${SERVER_ADDRESS}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      console.log("API Error:", response.json());
      router.push("/(auth)/sign-in");
      throw new Error("Session Failiure, Resign in");
    }
    const data = await response.json();
    const apiKey = data.access_token;
    await AsyncStorage.setItem("apiKey", apiKey);
    return 2012
  } catch (error) {
    console.log("Error checking API validity:", error);
    return false; // Return false if there's any error
  }
}
