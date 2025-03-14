import { colours, globalStyles, Penalty } from "@/globals";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from 'expo-sqlite';
import QRCode from 'react-native-qrcode-svg';
import CustomButton from "@/components/CustomButton";

type SQLiteRes = {
  matchNumber: number,
  scoutedTeam: number,

  matchResult: string,
  autonPts: number,
  teleopPts: number,
  rankingPts: number,

  coopertitionPoint: number,
  penalty: Penalty,

  autonData: string,
  teleopData: string,
  rpData: string
}

export default function ViewMatch() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const db = SQLite.openDatabaseSync("events")
  const res = db.getFirstSync<SQLiteRes>(`SELECT * FROM ${params.eventName} WHERE matchNumber IS ${params.matchNumber} AND scoutedTeam IS ${params.scoutedTeam}`)
  db.closeSync()

  const qrValue: any = {
    teamNumber: parseInt(params.teamNumber.toString()),
    username: params.username.toString(),
    ...res
  }

  function deleteMatch() {
    const db = SQLite.openDatabaseSync("events")
    db.runSync(`DELETE FROM "${params.eventName}" WHERE matchNumber IS ${params.matchNumber} AND scoutedTeam IS ${params.scoutedTeam}`)
    db.closeSync()
    router.back()
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <ScrollView style={globalStyles.rootView}>
        <QRCode value={JSON.stringify(qrValue)} size={Dimensions.get('window').width - 80}/>

        <View style={styles.table}>
          {[
            {label: "Match Number", value: res?.matchNumber},
            {label: "Scouted Team", value: res?.scoutedTeam},
          ].map(Item)}
        </View>

        <View style={styles.table}>
          {[
            {label: "Match result", value: res?.matchResult},
            {label: "Ranking Points", value: res?.rankingPts},
            {label: "Coopertition Point", value: res?.coopertitionPoint ? "Yes" : "No"},
            {label: "Penalty Card", value: res?.penalty == Penalty.RED ? "Red Card" : res?.penalty == Penalty.YELLOW ? "Yellow Card" : "None"},
          ].map(Item)}
        </View>

        <View style={styles.table}>
          {[
            {label: "Auton Points", value: res?.autonPts},
            {label: "Teleop Points", value: res?.teleopPts},
          ].map(Item)}
        </View>

        <CustomButton onPress={deleteMatch} style={{backgroundColor: colours.red, marginTop: 50}}>Delete Match</CustomButton>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  table: {
    borderRadius: 5,
    borderColor: colours.border,
    borderWidth: 3,
    borderBottomWidth: 0,
    marginTop: 30,
  },

  text: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "500"
  }
})

function Item(props: {label: string, value: any}) {
  return (
    <View
      key={props.label}
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderBottomWidth: 3,
        borderColor: colours.border,
        paddingHorizontal: 20,
      }}
    >
      <Text style={[{flex: 1}, styles.text]}>{props.label}</Text>
      <Text style={styles.text}>{props.value}</Text>
    </View>
  )
}

