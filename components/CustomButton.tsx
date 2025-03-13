import { colours } from "@/globals";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

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
    backgroundColor: colours.blue, 
    justifyContent: "center",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    fontFamily: "Inter"
  }
});
