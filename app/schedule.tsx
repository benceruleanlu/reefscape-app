import CustomButton, { dynamicColour } from "@/components/CustomButton";
import MatchItem, { MatchInfo } from "@/components/MatchItem";
import { globalStyles } from "@/globals/constants";
import { socket } from "@/globals/state";
import { useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Online() {
  const [matches, setMatches] = useState<MatchInfo[] | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  if (matches == null) {
    socket?.on("schedule", (data) => {
      setMatches(data)
    })
    socket?.emit("get schedule")
  }

  return (
    <SafeAreaView style={globalStyles.rootView}>
      {
        matches == null ?
          <Text style={{ flex: 1, fontSize: 20 }}>Waiting for server</Text> :
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
        onPress={() => {}}
      >Scout This Match</CustomButton>
    </SafeAreaView>
  )
}
