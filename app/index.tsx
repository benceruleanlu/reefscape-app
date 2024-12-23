import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Keyboard, StyleSheet } from "react-native";
import { connect, close } from "@/lib/serverUtils";

export default function Index() {
  const [status, setStatus] = useState("Connection uncertain.");
  const [statusCol, setStatusCol] = useState("#000000");
  const [serverIP, setServerIP] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  useEffect(function () {
    return function () { close(); };
  }, []);

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

      <Text style={styles.labelText}>Student Number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={setStudentNumber}
        value={studentNumber}
      />

      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          connect(serverIP, Number(studentNumber), setStatus, setStatusCol);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Connect</Text>
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

