import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

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
      <Text style={{ textAlign: "center", color: "white", fontWeight: "600", fontSize: 15 }}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: "#0083AE", 
    justifyContent: "center",
  }
});
