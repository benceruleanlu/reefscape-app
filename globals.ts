import { Dimensions, StyleSheet } from "react-native";

export const height = Dimensions.get('window').height

export const globalStyles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "white"
  },

  smallTitle: {
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "left"
  }
});
