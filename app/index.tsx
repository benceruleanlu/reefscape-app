import CustomButton from "@/components/CustomButton";
import { colours, globalStyles } from "@/globals/constants";
import { ServerData } from "@/globals/types";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { setServerData } from "@/globals/state";
import { useRouter } from "expo-router";

function validIPv4(ip: string) {
    const ipv4Pattern = 
        /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Pattern.test(ip);
}

export default function Index() {
  const router = useRouter()

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
      const data = JSON.parse(res.data) as ServerData 
      if (!validIPv4(data.ip) || data.team > 11000) return
      setServerData(data)
      router.replace("./chooseMode")
    } catch (e) { }
  }

  return (
    <SafeAreaView style={[globalStyles.rootView, { flexDirection: "column-reverse" }]}>
      <StatusBar style="light"/>

      <CustomButton
        style={{ backgroundColor: !permission ? colours.border : "white", marginTop: 30 }}
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

