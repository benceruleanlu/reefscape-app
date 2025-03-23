import { colours } from "@/globals/constants";
import { StyleSheet, Text, View } from "react-native";

export type MatchInfo = {
  matchNumber: number,
  matchType: "qual" | "playoff",

  time: Date,

  redAlliance: number[],
  blueAlliance: number[]
}

export default function MatchItem({item} : { item: MatchInfo }) {
  var timeUntil = (item.time.getTime() - Date.now()) / 6e4;

  var timeUntilStr = "";
  if (Math.abs(timeUntil) > 60*24) {
    timeUntil = timeUntil / 60 / 24
    timeUntilStr = " day"
  }
  else if (Math.abs(timeUntil) > 60) {
    timeUntil = timeUntil / 60
    timeUntilStr = " hour"
  } 
  else timeUntilStr = " minute"

  if (timeUntil >= 10) timeUntil = Math.floor(timeUntil)
  else timeUntil = Math.floor(timeUntil * 10) / 10
  timeUntilStr = timeUntil + timeUntilStr

  if (timeUntil > 1) timeUntilStr += "s"

  if (timeUntil < 0) timeUntilStr += " ago"
  else timeUntilStr = "in " + timeUntilStr

  return (
    <View>
      <View 
        style={{ 
          padding: 12, 
          paddingLeft: 16, 
          backgroundColor: colours.view, 
          borderTopRightRadius: 10, 
          borderTopLeftRadius: 10 ,
          flexDirection: "row"
        }}
      >
        <Text style={[styles.title, {flex:1}]}>{item.matchType.charAt(0).toUpperCase() + item.matchType.slice(1)} {item.matchNumber}</Text>
        <Text style={styles.title}>{timeUntilStr}</Text>
      </View>

      <View style={[styles.alliance, { backgroundColor: colours.red }]}>
        <Text style={styles.teamNumber}>{item.redAlliance[0]}</Text>
        <Text style={styles.teamNumber}>{item.redAlliance[1]}</Text>
        <Text style={styles.teamNumber}>{item.redAlliance[2]}</Text>
      </View>

      <View style={[styles.alliance, { backgroundColor: colours.blue, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}>
        <Text style={styles.teamNumber}>{item.blueAlliance[0]}</Text>
        <Text style={styles.teamNumber}>{item.blueAlliance[1]}</Text>
        <Text style={styles.teamNumber}>{item.blueAlliance[2]}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  alliance: {
    padding: 10,
    flexDirection: "row"
  },

  title: {
    fontFamily: "Inter", 
    fontSize: 16,
    color: colours.fg 
  },

  teamNumber: {
    fontFamily: "Inter",
    fontSize: 20,
    textAlign: "center",
    color: colours.fg,
    flex: 1
  }
})

