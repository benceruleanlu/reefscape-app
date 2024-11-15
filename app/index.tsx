import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  const [status, setStatus] = useState("Connection uncertain");
  const [statusCol, setStatusCol] = useState("#000000");

  const checkConnection = () => {
    setStatus("Checking connection...");
	setStatusCol("#aaaa00");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text id="status" style={{ color: statusCol, fontSize: 20 }}>{status}</Text>
	  <TouchableOpacity onPress={checkConnection} style={{ backgroundColor: "#000000", padding: 10, marginTop: 20, borderRadius: 5 }}>
        <Text style={{ color: "#ffffff", fontSize: 16 }}>Check Connection</Text>
      </TouchableOpacity>
    </View>
  );
}
