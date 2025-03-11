import { Dimensions, StyleSheet } from "react-native";

export const height = Dimensions.get('window').height

export const globalStyles = StyleSheet.create({
  rootView: {
    flex: 1,
    padding: 40,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: "white"
  },

  smallTitle: {
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "left"
  }
});
