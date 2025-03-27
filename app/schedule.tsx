import Connection from "@/components/Connection";
import CustomButton, { dynamicColour } from "@/components/CustomButton";
import MatchItem, { MatchInfo } from "@/components/MatchItem";
import { globalStyles } from "@/globals/constants";
import { currMatch, socket } from "@/globals/state";
import { useRouter } from "expo-router";
import { useEffect, useReducer, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Schedule() {
  const router = useRouter()

  const [matches, setMatches] = useState<MatchInfo[] | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [, forceUpdate] = useReducer(x => x+1, 0)

  if (matches == null) {
    socket?.on("schedule", (data) => {
      setMatches(data)
    })
    socket?.emit("get schedule")
  }

  useEffect(() => {
    const timeout = setTimeout(forceUpdate, 1e4)
    return () => {clearTimeout(timeout)}
  }, [])

  return (
    <SafeAreaView style={globalStyles.rootView}>
      <Connection updated={forceUpdate}/>

      {
        matches == null ?
          <Text style={[globalStyles.text, { flex: 1, fontSize: 20 }]}>Waiting for server</Text> :
          <FlatList 
            style={{ flex: 1 }}
            data={matches}
            renderItem={({item, index}) => {
              return ( 
                <MatchItem 
                  item={item} 
                  onPress={() => { setSelected(selected == index ? null : index) }} 
                  selected={selected==index}
                /> 
              )
            }}
          />
      }

      <CustomButton 
        style={{ backgroundColor: dynamicColour(selected != null), marginTop: 20 }}
        onPress={() => {
          if (matches == null) return
          if (selected == null) return
          
          currMatch.label = matches[selected].label
          currMatch.teamNumber = ""
          currMatch.alliance = "red"

          router.push("./scoutMatch/duringGame")
        }}
      >Scout This Match</CustomButton>
    </SafeAreaView>
  )
}
