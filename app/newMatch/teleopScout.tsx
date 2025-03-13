import { globalStyles } from "@/globals";
import { useFocusEffect } from "expo-router"
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TeleopScout() {


  async function cleanup() {
    await ScreenOrientation.unlockAsync()
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }
  useFocusEffect(() => {
    return () => { cleanup() }
  })

  return (
    <SafeAreaView style={globalStyles.rootView}>
    </SafeAreaView>
  )
}
