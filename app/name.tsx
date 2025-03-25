import CustomButton, { dynamicColour } from "@/components/CustomButton";
import { colours, globalStyles } from "@/globals/constants";
import { name, setName, socket } from "@/globals/state";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  const router = useRouter()

  const [names, setNames] = useState<string[] | null>(null)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    socket?.once("names", (data) => {
      setNames(data)
    })
    socket?.once("connect", () => {
      socket?.emit("get names")
    })
    socket?.connect()
  }, [0])

  function isSearched(val: string) {
    return val.toLowerCase().includes(search.toLowerCase())
  }

  const selectedSearched = selected != null && isSearched(selected)
  return (
    <SafeAreaView style={globalStyles.rootView}>

      <Text style={globalStyles.text}>Scouter Name</Text>
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={globalStyles.text}
      />

      <FlatList 
        style={{ flex: 1, marginTop: 20 }}
        data={names?.filter(isSearched)}
        renderItem={({item}) => {
          return ( 
            <TouchableOpacity
              style={{ borderRadius: 10, backgroundColor: item == selected ? colours.selected : colours.view, padding: 12, marginTop: 20 }}
              onPress={() => { setSelected(item == selected ? null : item) }}
            >
              <Text style={[globalStyles.text, { color: colours.fg }]}>{item}</Text>
            </TouchableOpacity>
          )
        }}
      />

      <CustomButton 
        style={{ backgroundColor: dynamicColour(!!socket?.connected), marginTop: 20 }}
        onPress={() => {
          if (!socket?.connected) return
          if (selectedSearched) setName(selected)
          else setName(search)

          socket?.emit("set name", name)
          socket.removeAllListeners()
          router.replace("./schedule")
        }}
      >{!socket?.connected ? "Waiting for Server" : selectedSearched ? "Next" : "New Scouter"}</CustomButton>
    </SafeAreaView>
  )
}
