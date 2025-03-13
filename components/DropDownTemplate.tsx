import { colours } from "@/globals";
import DropDownPicker, { DropDownPickerProps, ValueType } from "react-native-dropdown-picker";

export default function DropDownTemplate(props: DropDownPickerProps<ValueType>) {
  return (
    <DropDownPicker
      {...props}
      style={[{
        borderWidth: 3,
        borderColor: colours.border,
      }, props.style]}
      dropDownContainerStyle={[{
        borderWidth: 3,
        borderColor: colours.border
      }, props.dropDownContainerStyle]}
      labelStyle={[{
        fontSize: 16,
        fontFamily: "Inter",
        fontWeight: "400"
      }, props.labelStyle]}
    >
    </DropDownPicker>
  )
}
