import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import LabelledTextInput from "@/components/LabelledTextInput";

export default function Index() {
  const router = useRouter();

  const [teamNumber, setTeamNumber] = useState("");
  const [username, setUsername] = useState("");

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={-250}
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="dark"/>

        <Image 
          source={require("../assets/images/frc_reefscape.gif")}
          style={{ objectFit: "contain", width: 200, height: 250, marginTop: 100 }}
        />

        <View style={{ width: 320, height: 300, marginTop: 35 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "left" }}>Scout Offline</Text>

          <LabelledTextInput textInputProps={{
            onChangeText: setTeamNumber,
            value: teamNumber,
            keyboardType: "number-pad"
          }} label="Team Number"/>

          <LabelledTextInput textInputProps={{
            onChangeText: setUsername,
            value: username,
          }} label="Username"/>

          <TouchableOpacity style={{ width: 320, height: 40, borderRadius: 20, backgroundColor: "#0083AE", marginTop: 15, justifyContent: "center" }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "bold" }}>Let's go scouting!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

