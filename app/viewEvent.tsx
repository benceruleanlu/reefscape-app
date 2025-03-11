import CustomButton from "@/components/CustomButton";
import * as SQLite from 'expo-sqlite';
import { globalStyles } from "@/globals";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";
import { useCallback, useState } from "react";
import CustomListItem from "@/components/CustomListItem";

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
    <View style={globalStyles.rootView}>
      <StatusBar style="dark"/>

      <View style={{
        borderBottomColor: "#666666",
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
        borderTopColor: "#666666",
        borderTopWidth: 2,
        backgroundColor: "white",
        flexDirection: "row"
      }}>
        <CustomButton
          touchableProps={{ onPress: deleteEvent, style: { marginTop: 10, marginRight: 5, backgroundColor: "#942A2A", flex: 2 } }}
          text="Delete Event"
        />
        <CustomButton
          touchableProps={{ onPress: newMatch, style: { marginTop: 10, marginLeft: 5, flex: 3 } }}
          text="New Match"
        />
      </View>
    </View>
  );
}
