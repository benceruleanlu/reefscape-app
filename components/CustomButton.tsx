import { colours } from "@/globals/constants";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export function dynamicColour(active: boolean) {
  return active ? colours.fg : colours.inactive
}

export default function CustomButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity 
      {...props}
      style={[styles.button, props.style]}
    >
      <Text adjustsFontSizeToFit style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: colours.fg, 
    justifyContent: "center",
  },

  buttonText: {
    textAlign: "center",
    color: colours.bg,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Inter"
  }
});
