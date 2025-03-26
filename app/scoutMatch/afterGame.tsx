import Connection from "@/components/Connection";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { globalStyles } from "@/globals/constants";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BeforeGame() {
  const [notes, setNotes] = useState("")

  return (
    <SafeAreaView style={[globalStyles.rootView, {paddingHorizontal: 0}]}>
      <Connection/>

      <ScrollView 
        style={{ 
          paddingHorizontal: 40,
          paddingBottom: 300,
          flex: 1
        }}
        keyboardShouldPersistTaps="handled"
      >
        <CustomTextInput textInputProps={{ value: notes, onChangeText: setNotes, style: {wordWrap: ""} }}/>
      </ScrollView>

      <CustomButton style={{marginTop: 20, marginHorizontal: 40}}>Submit</CustomButton>
    </SafeAreaView>
  )
}
