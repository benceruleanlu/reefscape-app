import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useReducer, useState } from "react";
import { colours, globalStyles } from "@/globals/constants";
import { setMatchStart } from "@/globals/state";

export default function Timer(props: { onStart: () => void, onEnd: () => void, onTeleop: () => void }) {
  const [startTime, setStartTime] = useState<number | null>(null)
  const secondsElapsed = Math.floor(startTime ? (Date.now() - startTime) / 1e3 : 0)
  const minutes = Math.floor(secondsElapsed / 60)
  const seconds = secondsElapsed % 60
  
  const [, forceUpdate] = useReducer(x => x+1, 0)

  useEffect(() => {
    if (!startTime) return
    const to = setTimeout(() => { forceUpdate() }, 100)
    return () => { clearTimeout(to) }
  })

  function handlePress() {
    if (startTime) {
      if (secondsElapsed < 168) {
        Alert.alert(
          "End Match", "Are you sure you want to end the match premeturely?",
          [{
            text: 'Yes',
            onPress: props.onEnd,
            style: "cancel"
          }, { text: 'No' }]
        )
        return
      }
      props.onEnd()
    }
    else {
      const temp = Date.now()
      setStartTime(temp)
      setMatchStart(temp)
      props.onStart()
      setTimeout(props.onTeleop, 1.8e4)
    }
  }

  return(
    <View style={{ flexDirection: "row", position: "absolute", alignItems: "center" }}>
      <TouchableOpacity
        onPress={handlePress}
        style={[globalStyles.button, { 
          flex: undefined,
          width: 60,
          height: 30,
          backgroundColor: startTime && secondsElapsed < 168 ? colours.buttonRed : colours.fg,
        }]}
      >
        <Text style={[globalStyles.buttonText]}>{startTime ? "End" : "Start"}</Text>
      </TouchableOpacity>

        <Text style={[globalStyles.text, { fontSize: 20, fontWeight: "600", marginLeft: 15 }]}>{minutes}:{seconds < 10 ? "0" + seconds : seconds}</Text>
    </View>
  )
}
