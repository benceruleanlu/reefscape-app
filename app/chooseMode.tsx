import CustomButton from "@/components/CustomButton";
import { globalStyles } from "@/globals/constants";
import { serverData } from "@/globals/state";
import { db } from "@/globals/utils";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChooseMode() {
  db.runSync(`CREATE TABLE IF NOT EXISTS ${serverData?.event} (matchData TEXT)`)

  return (
    <SafeAreaView style={[globalStyles.rootView, { justifyContent: "center" }]}>
      <CustomButton onPress={() => { router.replace("./online") }}>Scout Online</CustomButton>
      <CustomButton onPress={() => { router.replace("./offline") }} style={{ marginTop: 30 }}>Scout Offline</CustomButton>
    </SafeAreaView>
  )
}
