import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopNavigationComponent from "@/components/topNavigationComponent";
import { router } from "expo-router";

const UserProfile = () => {
  const [studentId, setStudentId] = useState("");
  const [intake, setIntake] = useState("");
  const [name, setName] = useState("");
  const [nsbmEmail, setNsbmEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [offeredBy, setOfferedBy] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = async () => {
    try {
      const studentId = await AsyncStorage.getItem("student_id");
      const intake = await AsyncStorage.getItem("intake");
      const name = await AsyncStorage.getItem("full_name");
      const nsbmEmail = await AsyncStorage.getItem("email");
      const degree = await AsyncStorage.getItem("degree");
      const offeredBy = await AsyncStorage.getItem("university");
      const nic = await AsyncStorage.getItem("nic");
      const email = await AsyncStorage.getItem("email");
      const mobile = await AsyncStorage.getItem("phone_number");
      setStudentId(studentId || "");
      setIntake(intake || "");
      setName(name || "");
      setNsbmEmail(nsbmEmail || "");
      setDegree(degree || "");
      setOfferedBy(offeredBy || "");
      setNic(nic || "");
      setEmail(email || "");
      setMobile(mobile || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("Logged Out", "You have been logged out successfully.", [
        {
          text: "OK",
          onPress: () => router.replace("/(auth)/sign-in"),
        },
      ]);
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("student_id", studentId);
      await AsyncStorage.setItem("intake", intake);
      await AsyncStorage.setItem("full_name", name);
      await AsyncStorage.setItem("email", nsbmEmail);
      await AsyncStorage.setItem("degree", degree);
      await AsyncStorage.setItem("university", offeredBy);
      await AsyncStorage.setItem("nic", nic);
      await AsyncStorage.setItem("phone_number", mobile);
      Alert.alert("Saved", "Your profile has been updated.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  const renderField = (label, value, setter, editable = true) => {
    return isEditing && editable ? (
      <TextInput
        style={styles.textBox}
        value={value}
        onChangeText={setter}
        placeholder={label}
      />
    ) : (
      <Text style={styles.textBox}>{`${label}: ${value}`}</Text>
    );
  };

  return (
    <>
      <TopNavigationComponent
        title={"User Profile"}
        subtitle={""}
        navigateTo={"/(main_screen)/"}
      />
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <View style={styles.infoContainer}>
            {renderField("Student ID", studentId, setStudentId, false)}
            {renderField("Intake", intake, setIntake, false)}
            {renderField("Name", name, setName)}
            {renderField("Email", nsbmEmail, setNsbmEmail)}
            {renderField("Degree", degree, setDegree)}
            {renderField("Offered By", offeredBy, setOfferedBy)}
            {renderField("NIC", nic, setNic)}
            {renderField("Mobile", mobile, setMobile)}
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              style={[
                styles.editButton,
                { backgroundColor: isEditing ? "#5cb85c" : "#0275d8" },
              ]}
              onPress={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
            >
              <Text style={styles.logoutText}>
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.logoutButton, { marginLeft: 10 }]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 15,
  },
  profileContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
  },
  textBox: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
  },
});

export default UserProfile;
