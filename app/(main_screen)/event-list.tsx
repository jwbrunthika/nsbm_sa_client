import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const events = [
  {
    title: "NSBM Green Fiesta 2025",
    date: "2025-02-13", // Corrected format for Calendar component
    time: "3PM",
    venue: "Phase 1 Ground",
    image: require("../../assets/images/green_fiesta.jpg"),
  },
  {
    title: "NSBM Sports Fiesta 2025",
    date: "2025-02-23",
    time: "5PM",
    venue: "Main Stadium",
    image: require("../../assets/images/sports_fiesta.jpg"),
  },
];

const EventList = () => {
  const router = useRouter();
  const [markedDates, setMarkedDates] = useState<Record<string, { event: any }>>({});

  // Example of updating marked dates
  const handleEventSelection = (selectedDate: string, selectedEvent: any) => {
    if (!selectedDate) return; // Prevent undefined errors
    setMarkedDates((prev) => ({
      ...prev,
      [selectedDate]: { event: selectedEvent },
    }));
  };

  const goToEventDetails = (event: any) => {
    router.push({
      pathname: "../app/(main_screen)/event-details",
      params: { title: event.title, date: event.date, time: event.time, venue: event.venue },
    });
  };

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ServicesMenu}>
          <Ionicons
            name="grid"
            size={24}
            color="#1B5E20"
            onPress={() => router.push("/service-menu")}
          />
        </View>
      </View>
      <Text style={styles.header}>Events and Stalls</Text>


      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          const selectedEvent = events.find((e) => e.date === day.dateString);
          if (selectedEvent) {
            goToEventDetails(selectedEvent);
          }
        }}
        dayComponent={({ date, state }) => {
          if (!date?.dateString) return <View><Text>-</Text></View>; // Fallback in case date is undefined
        
          const event = events.find((e) => e.date === date.dateString);
        
          return (
            <View>
              <TouchableOpacity onPress={() => event && goToEventDetails(event)}>
                <View style={[styles.eventCircle, event ? styles.eventHighlighted : {}]}>
                  <Text style={[styles.calendarText, state === "disabled" ? { color: "gray" } : {}]}>
                    {date.day ?? "-"} {/* Ensure `day` is not undefined */}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      
    </ScrollView>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
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
  eventCircle: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "rgb(144, 238, 144)" },

  eventHighlighted: { 
    backgroundColor: "orange" },
    calendarText: { fontSize: 16 },
    
  ServicesMenu: {
      alignItems: "center",
      justifyContent: "center", // This will vertically center the content
      width: 40,
      height: 40,
      borderRadius: 5,
      backgroundColor: "#C8E6C9",
    },
});

export default EventList;
