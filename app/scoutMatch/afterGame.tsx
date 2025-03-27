import Connection from "@/components/Connection";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import Selector from "@/components/Selector";
import { colours, globalStyles } from "@/globals/constants";
import { currMatch, socket } from "@/globals/state";
import { AlgaePickupT, BargeT, CoralPickupT, DriverAbilityT, MatchResultT, PenaltyT, RoleT } from "@/globals/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BeforeGame() {
  const router = useRouter()

  const [bargeResult, setBargeResult] = useState<BargeT>("no_attempt")
  const [role, setRole] = useState<RoleT>("immobile")
  const [driverAbility, setDriverAbility] = useState<DriverAbilityT>(1)
  const [traversesShallowCage, setTraversesShallowCage] = useState(false)
  const [coralPickup, setCoralPickup] = useState<CoralPickupT>("none")
  const [algaePickup, setAlgaePickup] = useState<AlgaePickupT>("none")
  const [clearsReef, setClearsReef] = useState(false)
  const [matchResult, setMatchResult] = useState<MatchResultT>("loss")
  const [autoRp, setAutoRp] = useState(false)
  const [coralRP, setCoralRp] = useState(false)
  const [bargeRp, setBargeRp] = useState(false)
  const [coopertitionPoint, setCoopertitionPoint] = useState(false)
  const [penaltiesForOpponent, setPenaltiesForOpponent] = useState("")
  const [penaltyCard, setPenlatyCard] = useState<PenaltyT>("none")
  const [notes, setNotes] = useState("")

  return (
    <SafeAreaView style={[globalStyles.rootView, {paddingHorizontal: 0}]}>
      <Connection/>

      <ScrollView
        style={{ 
          paddingHorizontal: 40,
          flex: 1
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Selector
          vertical
          label="Endgame Barge Result"
          value={bargeResult}
          setValue={setBargeResult}
          options={[
            { label: "No Attempt", value: "no_attempt", color: colours.buttonRed },
            { label: "Parked", value: "parked" },
            { label: "Shallow Climb Failed", value: "shallow_fail", color: colours.buttonRed },
            { label: "Shallow Climb Succeeded", value: "shallow_success", color: colours.buttonGreen },
            { label: "Deep Climb Failed", value: "deep_fail", color: colours.buttonRed },
            { label: "Deep Climb Succeeded", value: "deep_success", color: colours.buttonGreen },
          ]}
        />

        <Selector
          vertical
          label="Robot Role"
          value={role}
          setValue={setRole}
          options={[
            { label: "Immobile", value: "immobile", color: colours.buttonRed },
            { label: "Defense", value: "defense" },
            { label: "Feeder", value: "feeder" },
            { label: "Offense", value: "offense" },
          ]}
        />

        <Selector
          label="Driver Ability"
          value={driverAbility}
          setValue={setDriverAbility}
          options={[
            { label: "1", value: 1, color: colours.buttonRed },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5, color: colours.buttonGreen },
          ]}
        />

        <Selector
          label="Traverses Shallow Cage"
          value={traversesShallowCage}
          setValue={setTraversesShallowCage}
          options={[
            { label: "No", value: false, color: colours.buttonRed },
            { label: "Yes", value: true, color: colours.buttonGreen },
          ]}
        />

        <Selector
          vertical
          label="Coral Intake"
          value={coralPickup}
          setValue={setCoralPickup}
          options={[
            { label: "None", value: "none", color: colours.buttonRed },
            { label: "Ground", value: "ground" },
            { label: "Station", value: "station" },
            { label: "Both", value: "both", color: colours.buttonGreen },
          ]}
        />

        <Selector
          vertical
          label="Algae Intake Method(s)"
          value={algaePickup}
          setValue={setAlgaePickup}
          options={[
            { label: "None", value: "none", color: colours.buttonRed },
            { label: "Ground", value: "ground" },
            { label: "Reef", value: "reef" },
            { label: "Both", value: "both", color: colours.buttonGreen },
          ]}
        />

        <Selector
          label="Clears Reef of Algae"
          value={clearsReef}
          setValue={setClearsReef}
          options={[
            { label: "No", value: false, color: colours.buttonRed },
            { label: "Yes", value: true, color: colours.buttonGreen },
          ]}
        />

        <Selector
          label="Match Result"
          value={matchResult}
          setValue={setMatchResult}
          options={[
            { label: "Loss", value: "loss", color: colours.buttonRed },
            { label: "Tie", value: "tie" },
            { label: "Win", value: "win", color: colours.buttonGreen },
          ]}
        />

        <Selector
          label="Auto Ranking Point"
          value={autoRp}
          setValue={setAutoRp}
          options={[
            { label: "No", value: false, color: colours.buttonRed },
            { label: "Yes", value: true, color: colours.buttonGreen },
          ]}
        />

        <Selector
          label="Coral Ranking Point"
          value={coralRP}
          setValue={setCoralRp}
          options={[
            { label: "No", value: false, color: colours.buttonRed },
            { label: "Yes", value: true, color: colours.buttonGreen },
          ]}
        />

        <Selector
          label="Barge Ranking Point"
          value={bargeRp}
          setValue={setBargeRp}
          options={[
            { label: "No", value: false, color: colours.buttonRed },
            { label: "Yes", value: true, color: colours.buttonGreen },
          ]}
        />

        <Selector
          label="Coopertition Point"
          value={coopertitionPoint}
          setValue={setCoopertitionPoint}
          options={[
            { label: "No", value: false, color: colours.buttonRed },
            { label: "Yes", value: true, color: colours.buttonGreen },
          ]}
        />

        <Text style={globalStyles.textBig}>Penalty Points Awarded to Opponent</Text>
        <CustomTextInput textInputProps={{ value: penaltiesForOpponent, onChangeText: setPenaltiesForOpponent, keyboardType: "number-pad" }}/>

        <Selector
          label="Penalty Card"
          value={penaltyCard}
          setValue={setPenlatyCard}
          options={[
            { label: "None", value: "none" },
            { label: "Yellow", value: "yellow", color: colours.buttonYellow },
            { label: "Red", value: "red", color: colours.buttonRed },
          ]}
        />

        <Text style={globalStyles.textBig}>Notes</Text>
        <CustomTextInput textInputProps={{ value: notes, onChangeText: setNotes, style: {flexShrink: 1} }}/>

        <View style={{ height: 300 }}/>
      </ScrollView>

      <CustomButton 
        style={{marginTop: 20, marginHorizontal: 40}}
        onPress={() => {
          currMatch.postGame = {
            bargeResult: bargeResult,
            role: role,
            driverAbility: driverAbility,
            traversesShallowCage: traversesShallowCage,
            coralPickup: coralPickup,
            algaePickup: algaePickup,
            clearsReef: clearsReef,
            matchResult: matchResult,
            autoRP: autoRp,
            coralRP: coralRP,
            bargeRP: bargeRp,
            coopertitionPoint: coopertitionPoint,
            penaltiesForOpponent: parseInt(penaltiesForOpponent),
            penaltyCard: penaltyCard,
            notes: notes
          }
          socket?.emit("upload", currMatch)
          router.back()
        }}
      >Submit</CustomButton>
    </SafeAreaView>
  )
}
