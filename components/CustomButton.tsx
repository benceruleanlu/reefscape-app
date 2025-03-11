import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type CustomButtonProps = {
  touchableProps?: TouchableOpacityProps,
  text: string
}

export default function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableOpacity 
      {...props.touchableProps}
      style={[styles.button, props.touchableProps?.style]}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: "#0083AE", 
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
