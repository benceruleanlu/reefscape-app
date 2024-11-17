import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Network from 'expo-network';

export default function Index() {
	const networkState = Network.useNetworkState();

	const [status, setStatus] = useState("Connection uncertain.");
	const [statusCol, setStatusCol] = useState("#000000");

	const checkConnection = async () => {
		setStatus("Checking connection...");
		setStatusCol("#aaaa00");

		if (!networkState.isConnected || networkState.type !== Network.NetworkStateType.WIFI) {
			setStatus("Wi-fi is not connected!");
			setStatusCol("#bb0000");
			return;
		}
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ color: statusCol, fontSize: 20 }}>{status}</Text>
			<TouchableOpacity onPress={checkConnection} style={{ backgroundColor: "#000000", padding: 10, marginTop: 20, borderRadius: 5 }}>
				<Text style={{ color: "#ffffff", fontSize: 16 }}>Check Connection</Text>
			</TouchableOpacity>
		</View>
	);
}
