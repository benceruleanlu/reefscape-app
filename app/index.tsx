import React, { useState } from "react";
import {
  Text,
  View,
  Keyboard,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { checkConnection, pingServer } from "@/lib/serverUtils";

export default function Index() {
  const [status, setStatus] = useState("Connection uncertain.");
  const [statusCol, setStatusCol] = useState("#000000");
  const [serverIP, setServerIP] = useState("192.168.1.");

  return (
    <View style={styles.container}>
      <Text style={[styles.statusText, { color: statusCol }]}>{status}</Text>

      <Text style={styles.labelText}>Server IP:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setServerIP}
        value={serverIP}
      />

      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          checkConnection(serverIP, setStatus, setStatusCol);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Check Connection</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          pingServer(serverIP, setStatus, setStatusCol);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ping Server</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusText: {
    fontSize: 20,
  },
  labelText: {
    color: "#000000",
    fontSize: 20,
    marginTop: 20,
  },
  input: {
    fontSize: 20,
    color: "#000000",
    borderColor: "#000000",
    borderWidth: 2,
    height: 50,
    width: 200,
  },
  button: {
    backgroundColor: "#000000",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
