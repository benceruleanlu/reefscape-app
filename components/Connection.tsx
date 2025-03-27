import { colours, globalStyles } from "@/globals/constants";
import { socket } from "@/globals/state";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Connection(props: { updated?: () => void }) {
  const [status, setStatus] = useState<"Connected" | "Disconnected">(
    socket?.connected ? "Connected" : "Disconnected"
  )

  useEffect(() => {
    const disconnectListener = () => {
      setStatus("Disconnected")
      if (props.updated) props.updated()
    }

    const connectListener = () => {
      setStatus("Connected")
      if (props.updated) props.updated()
    }
    socket?.on("disconnect", disconnectListener)
    socket?.on("connect", connectListener)

    if (status == "Disconnected") socket?.connect()

    return () => { 
      socket?.removeListener("disconnect", disconnectListener) 
      socket?.removeListener("connect", connectListener) 
    }
  }, [socket])

  return (
    <TouchableOpacity 
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
        color: status == "Connected" ? colours.buttonGreen : colours.buttonRed 
      }]}
      >{status}</Text>
    </TouchableOpacity>
  )
}

