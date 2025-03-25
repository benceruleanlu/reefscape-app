import { colours, globalStyles } from "@/globals/constants";
import { connected, connList, errList, socket } from "@/globals/state";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Connection(props: { updated?: () => void }) {
  const [status, setStatus] = useState<"Conncected" | "Disconnected" | "Reconnecting">(
    socket?.connected ? "Conncected" : connected ? "Reconnecting" : "Disconnected"
  )

  useEffect(() => {
    const errorListener = (_: Error) => {
      errList(_)
      if (socket?.active && connected) setStatus("Reconnecting")
      else setStatus("Disconnected")
      if (props.updated) props.updated()
    }

    const connectListener = () => {
      connList()
      setStatus("Conncected")
      if (props.updated) props.updated()
    }
    socket?.on("connect_error", errorListener)
    socket?.on("connect", connectListener)

    return () => { 
      socket?.removeListener("connect_error", errorListener) 
      socket?.removeListener("connect", connectListener) 
    }
  }, [socket])

  return (
    <View 
      style={{ 
        borderRadius: 15, 
        borderWidth: 2, 
        borderColor: colours.selected, 
        backgroundColor: colours.view, 
        alignSelf: "center",
        justifyContent: "center",
        height: 30,
        paddingHorizontal: 15,
        marginBottom: 15
      }}
    >
      <Text style={[globalStyles.text, { 
        fontSize: 14, 
        color: 
          status == "Conncected" ? "#90f090" :
          status == "Disconnected" ? "#f09090" :
            "#f0f090"
      }]}
      >{status}</Text>
    </View>
  )
}

