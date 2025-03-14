import DropDownTemplate from "@/components/DropDownTemplate";
import { colours, getPointsAuton, getPointsTeleop, getRp, globalStyles, Penalty, RpData } from "@/globals";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useCallback, useState } from "react";
import CustomButton from "@/components/CustomButton";
import * as SQLite from 'expo-sqlite';

export default function PostGame() {
  const router = useRouter()
  const params = useLocalSearchParams()

  async function effect() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }
  useFocusEffect(
    useCallback(() => {
      effect()
      return () => {}
    }, [])
  )

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [rpData, setRpData] = useState<RpData>({
    resultRp: 0,
    autonRp: 0,
    coralRp: 0,
    bargeRp: 0
  })

  function toggleVal(prop: string) {
    return () => {
      var cpy: any = {...rpData}
      cpy[prop] = (cpy[prop]+1)%2
      setRpData(cpy)
    }
  }

  function colForVal(val: number) {
    return val ? colours.green : colours.red
  }

  const [coopertitionPoint, setCoopertitionPoint] = useState(0)
  const [penalty, setPenalty] = useState<Penalty | null>(null)

  function finishScouting() {
    const db = SQLite.openDatabaseSync("events")

    db.runSync(`INSERT INTO "${params.eventName}"
                  (matchNumber, scoutedTeam, matchResult, autonPts, teleopPts, rankingPts, coopertitionPoint, penalty, autonData, teleopData, rpData)
                  VALUES(
                    ${params.matchNumber}, 
                    ${params.scoutedTeam}, 
                    "${["Loss", "Tie",'', "Win"][rpData.resultRp]}", 
                    ${getPointsAuton(JSON.parse(params.autonData.toString()))},
                    ${getPointsTeleop(JSON.parse(params.teleopData.toString()))},
                    ${getRp(rpData)},
                    ${coopertitionPoint},
                    ${penalty ? penalty : Penalty.NONE},
                    '${params.autonData}',
                    '${params.teleopData}',
                    '${JSON.stringify(rpData)}')`)

    db.closeSync()
    router.replace({pathname: "../viewMatch", params: {
      teamNumber: params.teamNumber,
      username: params.username,
      eventName: params.eventName, 
      matchNumber: params.matchNumber, 
      scoutedTeam: params.scoutedTeam
    }})
  }

  return (
    <SafeAreaView style={globalStyles.rootView}>
      <Text style={globalStyles.smallTitle}>Ranking Points</Text>
      <DropDownTemplate
        open={open1}
        value={rpData.resultRp}
        items={[
          {label: "Win", value: 3},
          {label: "Loss", value: 0},
          {label: "Tie", value: 1},
        ]}
        placeholder="Match Result"
        setOpen={setOpen1}
        setValue={(next) => {
          var cpy = {...rpData}
          cpy.resultRp = next(rpData.resultRp)
          setRpData(cpy)
        }}
        style={styles.spacing}
      />
      <CustomButton 
        onPress={toggleVal("autonRp")} 
        style={[{backgroundColor: colForVal(rpData.autonRp)}, styles.spacing]}
      >Auton Rp</CustomButton>
      <CustomButton 
        onPress={toggleVal("coralRp")} 
        style={[{backgroundColor: colForVal(rpData.coralRp)}, styles.spacing]}
      >Coral Rp</CustomButton>
      <CustomButton 
        onPress={toggleVal("bargeRp")} 
        style={[{backgroundColor: colForVal(rpData.bargeRp)}, styles.spacing]}
      >Barge Rp</CustomButton>

      <Text style={[globalStyles.smallTitle, {marginTop: 30}]}>Other</Text>
      <CustomButton 
        onPress={() => {setCoopertitionPoint(x => (x+1)%2)}} 
        style={[{backgroundColor: colForVal(coopertitionPoint)}, styles.spacing]}
      >Coopertition Point</CustomButton>
      <DropDownTemplate
        open={open2}
        value={penalty}
        items={[
          {label: "None", value: Penalty.NONE},
          {label: "Yellow Card", value: Penalty.YELLOW},
          {label: "Red Card", value: Penalty.RED}
        ]}
        placeholder="Penalty"
        setOpen={setOpen2}
        setValue={setPenalty}
        style={styles.spacing}
      />

      <CustomButton
        onPress={finishScouting}
        style={{marginTop: 50}}
      >Finish Scouting</CustomButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: 10
  }
})

