import React, { useState } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import * as Network from 'expo-network';
import axios, { Axios, AxiosError } from 'axios';

export default function Index() {
	const networkState = Network.useNetworkState();

	const [status, setStatus] = useState("Connection uncertain.");
	const [statusCol, setStatusCol] = useState("#000000");
	const [serverIP, setServerIP] = useState("192.168.1.");

	function isValidIPv4(ip: string): boolean {
		const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return ipv4Regex.test(ip);
	}

	const checkConnection = async () => {
		setStatus("Checking connection...");
		setStatusCol("#bbbb00");

		Keyboard.dismiss();

		if (!networkState.isConnected || networkState.type !== Network.NetworkStateType.WIFI) {
			setStatus("Wi-fi is not connected!");
			setStatusCol("#bb0000");
			return;
		}

		if (!isValidIPv4(serverIP)) {
			setStatus("Enter a valid IPv4 adress!");
			setStatusCol("#bb0000");
			return;
		}

		try {
			const response = await axios.get(`http://${serverIP}:3000`);
			setStatus("Got server response!");
			setStatusCol("#00bb00");
			console.log(response.data);
			console.log(response.headers);
		} catch (error: any) {
			if (error.response) {
				if (error.response.status >= 400 && error.response.status < 500) {
					setStatus(`Client error ${error.response.status}`);
				} else if (error.response.status >= 500) {
					setStatus(`Server error ${error.response.status}`);
				}
			} else if (error.request) {
				setStatus("Network error or timeout.");
			} else {
				setStatus("Unknown error");
			}
			setStatusCol("#bb0000");
		} 	
	}

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

				<Text style={{ color: "#000000", fontSize: 20, marginTop: 20 }}>Server IP:</Text>
				<TextInput style={{ fontSize: 20, color: "#000000", borderColor: "#000000", borderWidth: 2, height: 35, width: 200 }} keyboardType="numeric" onChangeText={setServerIP} value={serverIP}/>
				
				<TouchableOpacity onPress={checkConnection} style={{ backgroundColor: "#000000", padding: 10, marginTop: 5, borderRadius: 5 }}>
					<Text style={{ color: "#ffffff", fontSize: 16 }}>Check Connection</Text>
				</TouchableOpacity>
			</View>
		</GestureHandlerRootView>
	);
}
