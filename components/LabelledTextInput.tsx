import { colours } from "@/globals";
import { DimensionValue, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type LabelledTextInputProps = {
  textInputProps?: TextInputProps,
  label: string,
  marginTop?: DimensionValue
}

export default function LabelledTextInput(props: LabelledTextInputProps) {
  return (
    <View style={{ height: 70, marginTop: props.marginTop }}>
      <TextInput 
        {...props.textInputProps}
        style={styles.textInput}
      />

      <Text style={styles.textInputLabel}> {props.label} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderColor: colours.border,
    borderWidth: 3,
    borderRadius: 5,
    marginTop: 8,
    paddingLeft: 20,
    color: colours.border,
    fontSize: 18,
    fontWeight: "500"
  },
  
  textInputLabel: { 
    position: "absolute", 
    left: 10,
    fontWeight: "600",
    fontSize: 13,
    fontFamily: "Inter",
    color: colours.border,
    backgroundColor: "white" 
  }
})
