import CustomButton from "@/components/CustomButton";
import MatchItem, { MatchInfo } from "@/components/MatchItem";
import { globalStyles } from "@/globals/constants";
import { useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Offline() {
  const [matches, setMatches] = useState<MatchInfo[] | null>([{
    matchNumber: 16,
    matchType: "qual",
    time: new Date(Date.now() + 1000*60*45),
    redAlliance: [92, 10000, 36],
    blueAlliance: [4308, 609, 420]
  }])

  return (
    <SafeAreaView style={globalStyles.rootView}>
      {
        matches == null ?
          <Text style={{ flex: 1 }}></Text> :
          <FlatList 
            style={{ flex: 1 }}
            data={matches}
            renderItem={MatchItem}
          />
      }

      <CustomButton>Scout This Match</CustomButton>
    </SafeAreaView>
  )
}
