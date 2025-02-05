import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextProps
} from "react-native";
import CustomText from "@/components/CustomText";
import { Picker } from "@react-native-picker/picker";

import { useRouter, Stack } from "expo-router";
import Toast from "react-native-toast-message"; // Add Toast library

const SignInScreen = () => {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signType, setSignType] = useState("");
  const [phone, setPhoneNo] = useState("");


  const handleSignIn = async () => {
    const currentDateTime = new Date().toISOString();
    const credentials = {
      full_name: name,
      email: mail,
      password: password,
      phone_number: phone,
      user_type: signType,
      profile_picture: "https://www.vhv.rs/dpng/d/505-5058560_person-placeholder-image-free-hd-png-download.png",
      created_at: currentDateTime,
      updated_at: currentDateTime
    };

    
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} /> 
      <Image
        source={require("../../assets/images/nsbm_logo.png")}
        style={styles.logo}
      />
      <CustomText style={styles.title}>Sign Up</CustomText>

      <View style={styles.form}>
      <CustomText style={styles.label}>Full Name: </CustomText>
        <TextInput
          style={styles.input}
          placeholder="Enter Name Here"
          value={name}
          onChangeText={setName}
        />
        
        <CustomText style={styles.label}>NSBM Email</CustomText>
        <TextInput
          style={styles.input}
          placeholder="someone@students.nsbm.ac.lk"
          value={mail}
          onChangeText={setMail}
        />

        <CustomText style={styles.label}>Password</CustomText>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CustomText style={styles.label}>Phone Number</CustomText>
        <TextInput
          style={styles.input}
          placeholder="+94"
          value={phone}
          onChangeText={setPhoneNo}
        />

        <CustomText style={styles.label}>Are you a Student or a Lecturer?</CustomText>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={signType}
            onValueChange={(itemValue) => setSignType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item style={styles.pickerItem} label="Student" value="Student" />
            <Picker.Item style={styles.pickerItem} label="Lecturer" value="Lecturer" />
          </Picker>
        </View>
      
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleSignIn} // Trigger the login process
          >
            <CustomText style={styles.buttonText}>Sign Up</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Toast container */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFD9AF",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 250,
    height: 108,
    resizeMode: "contain",
  },
  title: {
    marginTop: 100,
    marginBottom: 50,
    fontSize: 44,
    fontWeight: "200",
    color: "#ffffff",
    marginVertical: 10,
  },
  form: {
    backgroundColor: "#fff",
    padding: 30,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    marginBottom: 0,
    elevation: 0,
  },
  label: {
    fontSize: 15,
    color: "#888",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 10,
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "200",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  signInButton: {
    backgroundColor: "#39B54A",
    marginRight: 5,
  },
  googleButton: {
    backgroundColor: "#D6E1ED",
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 16,
  },
  googlebuttonText: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: "center",
    color: "#4CAF50",
    marginTop: 15,
    fontWeight: "200",
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#AFD9AF',
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    fontWeight: '200'
  },
});

export default SignInScreen;
