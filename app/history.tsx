import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { FlatList, Text, View } from "react-native";
import { colours, globalStyles } from "@/globals";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { useCallback, useState } from "react";
import CustomListItem from "@/components/CustomListItem";
import { SafeAreaView } from "react-native-safe-area-context";

type SQLiteRes = { name: string }

export default function History() {
  const router = useRouter();

  const params = useLocalSearchParams();

  function newEvent() {
    router.push("./newEvent")
  }

  function getList() { return db.getAllSync<SQLiteRes>("SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%';") }

  const db = SQLite.openDatabaseSync("events");
  const [events, setEvents] = useState(getList());

  useFocusEffect(
    useCallback(() => {
      setEvents(getList())
      return () => {}
    }, [])
  )

  return (
    <SafeAreaView style={globalStyles.rootView}>
      <StatusBar style="dark"/>

      <View style={{
        borderBottomColor: colours.border,
        borderBottomWidth: 2,
        backgroundColor: "white"
      }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "left" }}>FRC Events</Text>
      </View>

      <FlatList
        style={{ paddingTop: 10, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={({item}) =>
          <CustomListItem 
            onPress={() => {
              params.eventName = item.name
              router.push({ pathname: './viewEvent', params: params })
            }}
            text={item.name}
          />
        }
      />

      <View style={{
        borderTopColor: colours.border,
        borderTopWidth: 2,
        backgroundColor: "white"
      }}>
        <CustomButton
          onPress={newEvent}
          style={{marginTop: 10}}
        >New Event</CustomButton>
      </View>
    </SafeAreaView>
  );
}
