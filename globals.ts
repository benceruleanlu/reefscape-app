import { Dimensions, StyleSheet } from "react-native";

export const height = Dimensions.get('window').height

export const colours = {
  blue: "#0083AE",
  red: "#942A2A",
  green: "#2A942A",
  border: "#666666"
}

export const globalStyles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "white"
  },

  smallTitle: {
    fontSize: 20, 
    lineHeight: 20,
    fontWeight: "bold", 
    textAlign: "left"
  }
});
