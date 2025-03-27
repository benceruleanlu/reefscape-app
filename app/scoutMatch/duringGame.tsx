import Connection from "@/components/Connection";
import { globalStyles } from "@/globals/constants";
import { Action } from "@/globals/types";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import Timer from "@/components/Timer";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { currMatch } from "@/globals/state";
import ScoutingButtons from "@/components/ScoutingButtons";

export default function DuringGame() {
  const router = useRouter()

  const [autoActions, setAutoActions] = useState<Action[]>([])
  const [teleopActions, setTeleopActions] = useState<Action[]>([])

  const [isTeleop, setIsTeleop] = useState<boolean | null>(null)
  const [hasCoral, setHasCoral] = useState(true)
  const [hasAlgae, setHasAlgae] = useState(false)

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, [0])

  return (
    <SafeAreaView style={globalStyles.rootView}>
      <View style={{flex:1}}>
        <Timer
          onStart={() => { setIsTeleop(false) }}
          onTeleop={() => { setIsTeleop(true) }}
          onEnd={() => {
            currMatch.autoActions = autoActions
            currMatch.teleopActions = teleopActions
            router.replace("./afterGame")
          }}
        />
        <Connection/>

        {
          isTeleop == null ?
            <View style={{position: "absolute", alignSelf: "flex-end", alignItems: "center", flexDirection: "row"}}>
              <Text style={[globalStyles.text, { marginRight: 10 }]}>Loaded with Coral</Text>
              <TouchableOpacity style={[globalStyles.button, { width: 40, height: 30, flex: undefined }]} onPress={() => {setHasCoral(!hasCoral)}}>
                <Text style={globalStyles.buttonText}>{hasCoral ? "Yes" : "No"}</Text>
              </TouchableOpacity>
            </View> : 
            <View style={{position: "absolute", alignSelf: "flex-end", justifyContent: "center", height: 30}}>
              <Text style={globalStyles.text}>{isTeleop ? "Teleoperated" : "Autonomous"}</Text>
            </View>
        }

        {
          isTeleop == null ? <View/> :
            <ScoutingButtons
              leftArea={isTeleop ? true : autoActions.length > 0}
              hasCoral={hasCoral} setHasCoral={setHasCoral}
              hasAlgae={hasAlgae} setHasAlgae={setHasAlgae}
              actions={isTeleop ? teleopActions : autoActions}
              setActions={isTeleop ? setTeleopActions : setAutoActions}
            />
        }
      </View>
    </SafeAreaView>
  )
}

