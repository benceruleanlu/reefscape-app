import { colours, globalStyles } from "@/globals/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type MatchInfo = {
  label: string
  times: {[key: string] : number}
  redAlliance: (string | null)[]
  blueAlliance: (string | null)[]
  scoutedTeam: string
}

type MatchItemProps = {
  item: MatchInfo,
  onPress: () => void,
  selected: boolean
}

export default function MatchItem(props: MatchItemProps) {
  const item = props.item
  var timeUntilStr = "";

  if (item.times.estimatedQueueTime < Date.now() && item.times.estimatedStartTime) {
    timeUntilStr = "now"
  }
  else {
    var timeUntil = (item.times.estimatedQueueTime - Date.now()) / 6e4;
    const completed = timeUntil < 0
    timeUntil = Math.abs(timeUntil)

    if (timeUntil > 60*24) {
      timeUntil = timeUntil / 60 / 24
      timeUntilStr = " day"
    }
    else if (timeUntil > 60) {
      timeUntil = timeUntil / 60
      timeUntilStr = " hour"
    } 
    else {
      timeUntil = Math.floor(timeUntil)
      timeUntilStr = " minute"
    }

    if (timeUntil >= 10) timeUntil = Math.floor(timeUntil)
      else timeUntil = Math.floor(timeUntil * 10) / 10
    timeUntilStr = timeUntil + timeUntilStr

    if (Math.abs(timeUntil) != 1) timeUntilStr += "s"

    if (completed) timeUntilStr += " ago"
      else timeUntilStr = "in " + timeUntilStr
  }

  const TeamNumber = (props: {number: string | null}) => (
    <Text 
      style={[styles.teamNumber, {
        color : props.number == item.scoutedTeam ? colours.buttonYellow : colours.fg
      }]}
    >{props.number}</Text>
  )


  return (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity 
        style={[{ 
          padding: 12, 
          paddingLeft: 16, 
          backgroundColor: props.selected ? colours.selected : colours.view, 
          borderTopRightRadius: 10, 
          borderTopLeftRadius: 10,
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
            <TeamNumber number={item.redAlliance[0]}/>
            <TeamNumber number={item.redAlliance[1]}/>
            <TeamNumber number={item.redAlliance[2]}/>
          </View> 
      }
      {
        props.selected && 
          <View style={[styles.alliance, { backgroundColor: colours.blue, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}>
            <TeamNumber number={item.blueAlliance[0]}/>
            <TeamNumber number={item.blueAlliance[1]}/>
            <TeamNumber number={item.blueAlliance[2]}/>
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

