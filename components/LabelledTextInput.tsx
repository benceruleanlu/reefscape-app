import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type LabelledTextInputProps = {
  textInputProps: TextInputProps,
  label: string,
}

export default function LabelledTextInput(props: LabelledTextInputProps) {

  return (
    <View style={{ height: 70, marginTop: 3 }}>
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
    borderColor: "#666666",
    borderWidth: 3,
    borderRadius: 5,
    marginTop: 7,
    paddingLeft: 20,
    color: "#666666",
    fontSize: 15,
    fontWeight: "400"
  },
  
  textInputLabel: { 
    position: "absolute", 
    left: 10,
    fontWeight: "600",
    fontSize: 13, 
    color: "#666666",
    backgroundColor: "white" 
  }
})
