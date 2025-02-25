import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Text, View, Dimensions} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import LabelledTextInput from "@/components/LabelledTextInput";
import ViewTemplate from "@/components/ViewTemplate";
import CustomButton from "@/components/CustomButton";
import "@/globals"

export default function Index() {
  const router = useRouter();

  const [teamNumber, setTeamNumber] = useState("");
  const [username, setUsername] = useState("");

  function nextScreen() {
    router.push({ pathname: "./history", params: { teamNumber: teamNumber, username: username } });
  }

  const height = Dimensions.get('window').height;

  return (
    <ViewTemplate
      avoidingViewProps={{ keyboardVerticalOffset: 330-height*251/420 }}
      scrollViewProps={{ scrollEnabled: false }}
    >
      <Image 
        source={require("../assets/images/frc_reefscape.gif")}
        style={{ height: height*2/7, marginTop: height/12 }}
        contentFit="contain"
      />

      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "left", marginTop: height/30 }}>Scout Offline</Text>

      <LabelledTextInput textInputProps={{
        onChangeText: setTeamNumber,
        value: teamNumber,
        keyboardType: "number-pad",
      }} marginTop={15} label="Team Number"/>

      <LabelledTextInput textInputProps={{
        onChangeText: setUsername,
        value: username,
        autoCorrect: false,
      }} marginTop={5} label="Username"/>

      <CustomButton touchableProps={{ onPress: nextScreen, style: { marginTop: 15 } }} text="Let's go scouting!"/>
    </ViewTemplate>
  );
}

