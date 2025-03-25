import { colours, globalStyles } from "@/globals/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type MatchInfo = {
  label: string
  time: number
  redAlliance: (string | null)[]
  blueAlliance: (string | null)[]
}

type MatchItemProps = {
  item: MatchInfo,
  onPress: () => void,
  selected: boolean
}

export default function MatchItem(props: MatchItemProps) {
  const item = props.item
  console.log(item.time)
  var timeUntil = (item.time - Date.now()) / 6e4;

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
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity 
        style={[{ 
          padding: 12, 
          paddingLeft: 16, 
          backgroundColor: props.selected ? colours.selected : colours.view, 
          borderTopRightRadius: 10, 
          borderTopLeftRadius: 10 ,
          flexDirection: "row"
        }, props.selected ? {} : { borderRadius: 10 }]}
        onPress={props.onPress}
      >
        <Text style={[globalStyles.text, {flex:1}]}>{item.label}</Text>
        <Text style={globalStyles.text}>{timeUntilStr}</Text>
      </TouchableOpacity>

      {
        props.selected &&
          <View style={[styles.alliance, { backgroundColor: colours.red }]}>
            <Text style={styles.teamNumber}>{item.redAlliance[0]}</Text>
            <Text style={styles.teamNumber}>{item.redAlliance[1]}</Text>
            <Text style={styles.teamNumber}>{item.redAlliance[2]}</Text>
          </View> 
      }
      {
        props.selected && 
          <View style={[styles.alliance, { backgroundColor: colours.blue, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}>
            <Text style={styles.teamNumber}>{item.blueAlliance[0]}</Text>
            <Text style={styles.teamNumber}>{item.blueAlliance[1]}</Text>
            <Text style={styles.teamNumber}>{item.blueAlliance[2]}</Text>
          </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  alliance: {
    padding: 10,
    flexDirection: "row"
  },

  teamNumber: {
    ...globalStyles.text,
    fontSize: 20,
    textAlign: "center",
    flex: 1
  }
})

