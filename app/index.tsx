import React, { useState } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import * as Network from 'expo-network';
import axios from 'axios';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import forge from 'node-forge';

export default function Index() {
	const networkState = Network.useNetworkState();

	const [status, setStatus] = useState("Connection uncertain.");
	const [statusCol, setStatusCol] = useState("#000000");
	const [serverIP, setServerIP] = useState("192.168.1.");

	function isValidIPv4(ip: string): boolean {
		const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return ipv4Regex.test(ip);
	}
	
	const serverCertAsset = Asset.fromModule(require('../assets/server-cert.pem'));
	let serverCert: string;
	serverCertAsset.downloadAsync().then(async () => {
		if (serverCertAsset.localUri !== null) {
			serverCert = await FileSystem.readAsStringAsync(serverCertAsset.localUri);
		} 
	});

	function encrypt(data: string) {
		const serverKey = forge.pki.certificateFromPem(serverCert).publicKey;
		const encrypted = serverKey.encrypt(data, 'RSA-OAEP');
		return forge.util.encode64(encrypted);
	}

	const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(512);
	const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
	function decrypt(data: string) {
		const decrypted = privateKey.decrypt(forge.util.decode64(data), 'RSA-OAEP');
		return forge.util.encodeUtf8(decrypted);
	}

	const checkConnection = async () => {
		setStatus("Checking connection...");
		setStatusCol("#bbbb00");

		Keyboard.dismiss();

		if (!networkState.isConnected) {
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
			const token = (Math.floor(Math.random() * (900000000000000)) + 100000000000000).toString();
			const response = await axios.post(`http://${serverIP}:3000`, {data: encrypt(token), key: publicKeyPem});
			
			if (decrypt(response.data) !== token) {
				setStatus("Incorrect server.");
				setStatusCol("#bb0000");
			} else {
				setStatus("Correct server!");
				setStatusCol("#00bb00");
			}
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
