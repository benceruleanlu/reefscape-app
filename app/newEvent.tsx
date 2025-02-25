import CustomButton from "@/components/CustomButton";
import * as SQLite from 'expo-sqlite';
import LabelledTextInput from "@/components/LabelledTextInput";
import ViewTemplate from "@/components/ViewTemplate";
import { useState } from "react";
import { Dimensions, Text } from "react-native";
import { useRouter } from "expo-router";

export default function NewEvent() {
  const router = useRouter();
  const db = SQLite.openDatabaseSync("events");

  const [eventName, setEventName] = useState('');

  function addEvent() {
    db.runSync(`CREATE TABLE IF NOT EXISTS ${eventName} (matchNumber TEXT PRIMARY KEY)`)
    router.back()
  }

  const height = Dimensions.get('window').height;

  return (
    <ViewTemplate
      avoidingViewProps={{ keyboardVerticalOffset: -height }}
      scrollViewProps={{ scrollEnabled: false }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "left", marginTop: height/4 }}>Add New Event</Text>

      <LabelledTextInput textInputProps={{
        onChangeText: setEventName,
        value: eventName,
        autoCorrect: false,
      }} marginTop={15} label="Event Name"/>

      <CustomButton touchableProps={{ onPress: addEvent, style: { marginTop: 15 } }} text="Add New Event"/>
    </ViewTemplate>
  );
}
