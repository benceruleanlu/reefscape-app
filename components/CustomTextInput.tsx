import { colours, globalStyles } from "@/globals/constants";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";

type CustomTextInputProps = {
  viewProps?: ViewProps 
  textInputProps?: TextInputProps 
}

export default function CustomTextInput(props: CustomTextInputProps) {
  return (
    <View
      {...props.viewProps}
      style={[{
        padding: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colours.selected,
        backgroundColor: colours.view
      }, props.viewProps?.style]}
    >
      <TextInput
        {...props.textInputProps}
        style={[globalStyles.text, props.textInputProps?.style]}
      />
    </View>
  )
}
