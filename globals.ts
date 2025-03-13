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

export function getPointsAuton(data: AutonData) {
  return ((data.leftStartingArea) ? 3 : 0) 
    + 3*data.L1 
    + 4*data.L2 
    + 6*data.L3 
    + 7*data.L4
    + 6*data.processor
    + 4*data.net
}

export type AutonData = {
  leftStartingArea: boolean,

  L1: number,
  L2: number,
  L3: number,
  L4: number,

  processor: number;
  net: number
}

export function getPointsTeleop(data: TeleopData) {
  return (data.barge == Barge.PARKED ? 2 : data.barge == Barge.SHALLOW_CLIMB ? 6 : data.barge == Barge.DEEP_CLIMB ? 12 : 0) 
    + 2*data.L1 
    + 3*data.L2 
    + 4*data.L3 
    + 5*data.L4
    + 6*data.processor
    + 4*data.net
}

export enum Barge {
  NONE,
  PARKED,
  SHALLOW_CLIMB,
  DEEP_CLIMB 
}

export type TeleopData = {
  barge: Barge,

  L1: number,
  L2: number,
  L3: number,
  L4: number,

  processor: number;
  net: number
}

