import CustomButton from "@/components/CustomButton";
import LabelledTextInput from "@/components/LabelledTextInput";
import ViewTemplate from "@/components/ViewTemplate";
import { globalStyles, height } from "@/globals";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function NewMatch() {
  const router = useRouter();

  const params = useLocalSearchParams();

  const [matchNumber, setMatchNumber] = useState('')
  const [scoutedTeam, setScoutedTeam] = useState('')

  function nextPage() {
    if (matchNumber == "" || scoutedTeam == "") return
    params.matchNumber = matchNumber
    params.scoutedTeam = scoutedTeam
    router.replace({ pathname: "./newMatch/scoring", params: params })
  }

  return (
    <ViewTemplate>
      <Text style={[globalStyles.smallTitle, { marginTop: height/5 }]}>General Info</Text>

      <LabelledTextInput textInputProps={{
        onChangeText: setMatchNumber,
        value: matchNumber,
        autoCorrect: false,
        keyboardType: "number-pad",
      }} marginTop={15} label="Match Number"/>

      <LabelledTextInput textInputProps={{
        onChangeText: setScoutedTeam,
        value: scoutedTeam,
        autoCorrect: false,
        keyboardType: "number-pad",
      }} marginTop={5} label="Scouted Team"/>

      <CustomButton 
        onPress={nextPage}
        style={{marginTop: 15}}
      >Auton Portion</CustomButton>
    </ViewTemplate>
  )
}
