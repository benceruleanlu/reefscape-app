import CustomButton from "@/components/CustomButton";
import * as SQLite from 'expo-sqlite';
import { colours, globalStyles } from "@/globals";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";
import { useCallback, useState } from "react";
import CustomListItem from "@/components/CustomListItem";
import { SafeAreaView } from "react-native-safe-area-context";

type SQLiteRes = {
  matchNumber: string
}

export default function ViewEvent() {
  const router = useRouter()

  const params = useLocalSearchParams()
  const event = params.eventName

  function getList() { return db.getAllSync<SQLiteRes>(`SELECT matchNumber FROM ${event}`) }

  const db = SQLite.openDatabaseSync("events");
  const [ matches, setMatches] = useState(getList());

  useFocusEffect(
    useCallback(() => {
      setMatches(getList())
      return () => {}
    }, [])
  )

  function deleteEvent() {
    router.back()
    db.runSync(`DROP TABLE ${event}`)
  }

  function newMatch() {
    router.push({ pathname: "./newMatch", params: params })
  }

  return (
    <SafeAreaView style={globalStyles.rootView}>
      <StatusBar style="dark"/>

      <View style={{
        borderBottomColor: colours.border,
        borderBottomWidth: 2,
        backgroundColor: "white"
      }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "left" }}>{event} Matches</Text>
      </View>

      <FlatList
        style={{ paddingTop: 10, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        data={matches}
        renderItem={({item}) =>
          <CustomListItem 
            onPress={() => {
              router.push({ pathname: './viewMatch', params: { eventName: event, matchNumber: item.matchNumber } })
            }}
            text={`Match ${item.matchNumber}`}
          />
        }
      />

      <View style={{
        borderTopColor: colours.border,
        borderTopWidth: 2,
        backgroundColor: "white",
        flexDirection: "row"
      }}>
        <CustomButton
          onPress={deleteEvent}
          style={{marginTop: 10, marginRight: 5, backgroundColor: "#942A2A", flex: 2}}
        >Delete Event</CustomButton>

        <CustomButton
          onPress={newMatch}
          style={{marginTop: 10, marginLeft: 5, flex: 3}}
        >New Match</CustomButton>
      </View>
    </SafeAreaView>
  );
}
