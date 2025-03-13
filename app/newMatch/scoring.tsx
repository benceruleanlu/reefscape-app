import { globalStyles, AutonData, colours, getPointsAuton, getPointsTeleop, TeleopData, Barge } from "@/globals";
import {  StyleSheet, Text, View } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useCallback, useState } from "react";
import DropDownTemplate from "@/components/DropDownTemplate";

export default function Scoring() {
  const router = useRouter();
  var params = useLocalSearchParams();

  const [isTeleop, setIsTeleop] = useState(false)

  const defaults = {L1: 0, L2: 0, L3: 0, L4: 0, processor: 0, net: 0}
  const [autonData, setAutonData] = useState<AutonData>({
    leftStartingArea: 0,
    ...defaults
  })
  const [teleopData, setTeleopData] = useState<TeleopData>({
    barge: Barge.NONE, 
    ...defaults
  })

  const [open, setOpen] = useState(false)

  async function effect() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  }
  useFocusEffect(
    useCallback(() => {
      effect()
    }, [])
  )

  function incVal(prop: string) {
    return () => {
      if (isTeleop) {
        var cpy: any = {...teleopData}
        cpy[prop]++
        setTeleopData(cpy)
      }
      else {
        var cpy: any = {...autonData}
        cpy[prop]++
        setAutonData(cpy)
      }
    }
  }

  function nextPage() {
    params.autonData = JSON.stringify(autonData)
    params.teleopData = JSON.stringify(teleopData)
    router.replace({pathname: "./postGame", params: params})
  }

  return (
    <SafeAreaView style={[globalStyles.rootView]}>
      <View style={{flexDirection: "row", flex: 1}}>
        <View style={{flex: 1, padding: 10, paddingLeft: 0}}>
          <Text style={globalStyles.smallTitle}>{isTeleop ? "End Game" : "Misc"}</Text>

          {
            isTeleop ?
              <DropDownTemplate
                open={open}
                items={[
                  { label: "None", value: Barge.NONE },
                  { label: "Parked", value: Barge.PARKED },
                  { label: "Shallow Climb", value: Barge.SHALLOW_CLIMB },
                  { label: "Deep Climb", value: Barge.DEEP_CLIMB },
                ]}
                value={teleopData.barge}
                setOpen={setOpen}
                setValue={(next) => {
                  var cpy = {...teleopData} 
                  cpy.barge = next(teleopData.barge)
                  setTeleopData(cpy)
                }}
                style={{marginTop: styles.spacing.marginTop}}
              /> :
              <CustomButton
                onPress={() => {
                  var cpy = {...autonData} 
                  cpy.leftStartingArea = (cpy.leftStartingArea+1)%2
                  setAutonData(cpy)
                }}
                style={[{
                  backgroundColor: autonData.leftStartingArea ? colours.green : colours.red, 
                }, styles.spacing]}
              >Left Starting Area</CustomButton>
          }

          <View style={[styles.spacing, {justifyContent: "flex-end"}]}>
            <Text style={globalStyles.smallTitle}>Algae</Text>
          </View>

          <CustomButton
            onPress={incVal("processor")}
            style={styles.spacing}
          >Processor</CustomButton>
          <CustomButton
            onPress={incVal("net")}
            style={styles.spacing}
          >Net</CustomButton>
        </View>


        <View style={{flex: 1, padding: 10, paddingRight: 0}}>
          <Text style={globalStyles.smallTitle}>Coral</Text>
          <CustomButton
            onPress={incVal("L1")}
            style={styles.spacing}
          >Trough (L1)</CustomButton>
          <CustomButton
            onPress={incVal("L2")}
            style={styles.spacing}
          >L2 Branch</CustomButton>
          <CustomButton
            onPress={incVal("L3")}
            style={styles.spacing}
          >L3 Branch</CustomButton>
          <CustomButton
            onPress={incVal("L4")}
            style={styles.spacing}
          >L4 Branch</CustomButton>
        </View>
      </View>


      <View style={{marginTop: 10, height: 40, flexDirection: "row"}}>
        <Text 
          adjustsFontSizeToFit
          style={[{
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: 30,
            width: 260,
          }, styles.border]}
        >{isTeleop ? getPointsTeleop(teleopData) + " teleop" : getPointsAuton(autonData) + " auton"} pts</Text>

        <View style={{flex: 1}}/>

        <CustomButton
          onPress={isTeleop ? nextPage : () => {setIsTeleop(true)}}
          style={{width: 160}}
        >{isTeleop ? "Post Game" : "Teleop Portion"}</CustomButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: 10,
    height: 50
  },

  border: {
    borderRadius: 5,
    borderColor: colours.border,
    borderWidth: 3,
  }
})
