import { useLocalSearchParams, useRouter } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "@/globals";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";

export default function History() {
  const router = useRouter();

  //const db = SQLite.openDatabaseSync("events");
  const params = useLocalSearchParams();

  function newEvent() {
    router.push("./newEvent")
  }

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
        style={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
        data={['testEvent1', 'testEvent2', 'testEvent3', 'testEvent4', 'testEvent5', 'testEvent6', 'testEvent7', 'testEvent8', 'testEvent9', 'testEvent10', 'testEvent11', 'testEvent12', 'testEvent13', 'testEvent14', 'testEvent15', 'testEvent16', 'testEvent17', 'testEvent18', 'testEvent19', 'testEvent20']}
        renderItem={({item}) =>
          <TouchableOpacity 
            style={{
              height: 40,
              backgroundColor: "#EEEEEE",
              paddingLeft: 20,
              justifyContent: "center",
              borderRadius: 8,
              marginTop: 10
            }}
            onPress={() => {
              params.event = item
              router.push({ pathname: './viewEvent', params: params })
            }}
          >
            <Text style={{ textAlign: "left", fontSize: 18, fontWeight: "600" }}>{item}</Text>
          </TouchableOpacity>
        }
      />

      <View style={{
        borderTopColor: "#666666",
        borderTopWidth: 2,
        backgroundColor: "white"
      }}>
        <CustomButton
          touchableProps={{ onPress: newEvent, style: { marginTop: 12 } }}
          text="New Event"
        />
      </View>
    </View>
  );
}
