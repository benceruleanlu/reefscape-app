import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "@/globals";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { useCallback, useState } from "react";

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
    <View style={globalStyles.rootView}>
      <StatusBar style="dark"/>

      <View style={{
        borderBottomColor: "#666666",
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
          <TouchableOpacity 
            style={{
              height: 40,
              backgroundColor: "#EEEEEE",
              paddingLeft: 20,
              justifyContent: "center",
              borderRadius: 8,
              marginBottom: 10
            }}
            onPress={() => {
              params.event = item.name
              router.push({ pathname: './viewEvent', params: params })
            }}
          >
            <Text style={{ textAlign: "left", fontSize: 18, fontWeight: "600" }}>{item.name}</Text>
          </TouchableOpacity>
        }
      />

      <View style={{
        borderTopColor: "#666666",
        borderTopWidth: 2,
        backgroundColor: "white"
      }}>
        <CustomButton
          touchableProps={{ onPress: newEvent, style: { marginTop: 10 } }}
          text="New Event"
        />
      </View>
    </View>
  );
}
