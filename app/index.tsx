import React, { useState } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import * as Network from "expo-network";
import { checkConnection } from "./lib/serverUtils";

export default function Index() {
  const networkState = Network.useNetworkState();

  const [status, setStatus] = useState("Connection uncertain.");
  const [statusCol, setStatusCol] = useState("#000000");
  const [serverIP, setServerIP] = useState("192.168.1.");

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: statusCol, fontSize: 20 }}>{status}</Text>

        <Text style={{ color: "#000000", fontSize: 20, marginTop: 20 }}>
          Server IP:
        </Text>
        <TextInput
          style={{
            fontSize: 20,
            color: "#000000",
            borderColor: "#000000",
            borderWidth: 2,
            height: 35,
            width: 200,
          }}
          keyboardType="numeric"
          onChangeText={setServerIP}
          value={serverIP}
        />

        <TouchableOpacity
          onPress={() => checkConnection(serverIP, setStatus, setStatusCol)}
          style={{
            backgroundColor: "#000000",
            padding: 10,
            marginTop: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 16 }}>
            Check Connection
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}
