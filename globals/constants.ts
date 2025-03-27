import { StyleSheet } from "react-native";

export const colours = {
  bg: "#101010",
  fg: "#e0e0e0",
  view: "#282828",
  selected: "#484848",
  inactive: "#808080",
  blue: "#282878",
  red: "#782828",
  buttonRed: "#f09090",
  buttonGreen: "#90f090",
  buttonYellow: "#f0f090"
}

export const globalStyles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: colours.bg
  },

  text: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: colours.fg
  },

  textBig: {
    marginTop: 40,
    marginBottom: 5,
    fontFamily: "Inter",
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "500",
    color: colours.fg
  },

  button: {
    backgroundColor: colours.fg,
    borderRadius: 10,
    justifyContent: "center",
    flex: 1
  },
  
  buttonText: {
    textAlign: "center",
    color: colours.bg,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Inter"
  },

  buttonTextBig: {
    textAlign: "center",
    color: colours.bg,
    fontWeight: "600",
    fontSize: 24,
    fontFamily: "Inter"
  }
});

