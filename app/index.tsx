import { Image } from "expo-image";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import LabelledTextInput from "@/components/LabelledTextInput";
import ViewTemplate from "@/components/ViewTemplate";
import CustomButton from "@/components/CustomButton";
import "@/globals"
import { globalStyles, height } from "@/globals";

export default function Index() {
  const router = useRouter();

  const [teamNumber, setTeamNumber] = useState("");
  const [username, setUsername] = useState("");

  function nextScreen() {
    router.push({ pathname: "./history", params: { teamNumber: teamNumber, username: username } });
  }

  return (
    <ViewTemplate>
      <Image 
        source={require("../assets/images/frc_reefscape.gif")}
        style={{ height: height*1/4, marginTop: height/12 }}
        contentFit="contain"
      />

      <Text style={[globalStyles.smallTitle, { marginTop: height/30 }]}>Scout Offline</Text>

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

      <CustomButton 
        onPress={nextScreen}
        style={{marginTop: 15}}
      >Scout Offline</CustomButton>
    </ViewTemplate>
  );
}

