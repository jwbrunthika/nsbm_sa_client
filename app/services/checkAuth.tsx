import React, { useState } from "react";
import SERVER_ADDRESS from "@/config";
import {Link, router} from 'expo-router';

export default async function checkApiValid(apiKey) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  try {

    // Get Email and Password from local storage

    const response = await fetch(`${SERVER_ADDRESS}/data/users/fetch`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.log("API Error:", response.statusText);
      router.replace('/(auth)/sign-in')
      return false;
    }

    const result = await response.json();
    if (result && Array.isArray(result)) {
      return true; // API is valid and returned expected data as an array
    } else {
      console.log("Invalid data format:", result);
      return false;
    }
  } catch (error) {
    console.log("Error checking API validity:", error);
    return false; // Return false if there's any error
  }
};
