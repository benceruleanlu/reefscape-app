import Connection from "@/components/Connection";
import CustomButton, { dynamicColour } from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { colours, globalStyles } from "@/globals/constants";
import { name, setName, socket } from "@/globals/state";
import { useRouter } from "expo-router";
import { useEffect, useReducer, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  const router = useRouter()

  const [names, setNames] = useState<string[] | null>(null)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)

  const [, forceUpdate] = useReducer(x => x+1, 0)

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
      <Connection updated={forceUpdate}/>

      <Text style={globalStyles.text}>Scouter Name</Text>
      <CustomTextInput
        viewProps={{ style: { marginTop: 10 } }}
        textInputProps={{
          value: search,
          onChangeText: setSearch
        }}
      />

      <FlatList 
        style={{ flex: 1, marginTop: 20, marginLeft: -20, marginRight: -20, paddingHorizontal: 40 }}
        keyboardShouldPersistTaps="handled"
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
