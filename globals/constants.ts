import { StyleSheet } from "react-native";

export const colours = {
  bg: "#101010",
  fg: "#e0e0e0",
  view: "#282828",
  blue: "#282878",
  red: "#782828"
}

export const globalStyles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: colours.bg
  },
});

