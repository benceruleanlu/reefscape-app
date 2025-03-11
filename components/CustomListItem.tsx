import { StyleSheet, Text, TouchableOpacity } from "react-native"

type CustomListItemProps = {
  onPress: (() => void),
  text: string
}

export default function CustomListItem(props: CustomListItemProps) {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: "#EEEEEE",
    paddingLeft: 20,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10
  },

  text: {
    textAlign: "left", 
    fontSize: 18, 
    fontWeight: "600" 
  }
})
