import { Image } from "expo-image";
import { useRouter } from "expo-router";
import ViewTemplate from "@/components/ViewTemplate";
import CustomButton from "@/components/CustomButton";
import "@/globals"
import { colours, globalStyles, height, QRData } from "@/globals";
import { CameraView, CameraType, useCameraPermissions, scanFromURLAsync, BarcodeScanningResult } from 'expo-camera';
import { useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

function validIPv4(ip: string) {
    const ipv4Pattern = 
        /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Pattern.test(ip);
}

export default function Index() {
  const router = useRouter();

  const [scanning, setScanning] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  function toggleScanning() {
    if (scanning) {
      setScanning(false)
      return
    }

    if (!permission) return
    if (!permission.granted) {
      requestPermission().then((res) => {
        if (res.granted) setScanning(true)
        else alert("Camera permissions are required. Please enable camera permissions in settings.")
      })
      return
    }

    setScanning(true)
  }

  function handleScan(res: BarcodeScanningResult) {
    if (!res.data) return
    try {
      const data = JSON.parse(res.data) as QRData
      if (!validIPv4(data.ip) || data.team > 11000) return
      router.replace({ pathname: "./chooseMode", params: { serverData: res.data }})
    } catch (e) { }
  }

  return (
    <SafeAreaView style={[globalStyles.rootView, { flexDirection: "column-reverse" }]}>
      <StatusBar style="dark"/>

      <CustomButton
        style={{ backgroundColor: !permission ? colours.border : colours.blue, marginTop: 20 }}
        onPress={toggleScanning}
      >{scanning ? "Cancel" : "Scan Server QR"}</CustomButton>

      {
        permission && permission.granted && scanning && (
          <CameraView
            style={{ flex: 1, marginLeft: -40, width: Dimensions.get("window").width }}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"]
            }}
            onBarcodeScanned={handleScan}
          />
        )
      }
    </SafeAreaView>
  );
}

