import { colours, globalStyles } from "@/globals/constants"
import { Dispatch, SetStateAction } from "react"
import { Text, TouchableOpacity, View, ViewStyle } from "react-native"

export default function Selector<T>(
  props: {
    vertical?: boolean
    label: string
    value: T
    setValue: Dispatch<SetStateAction<T>>
    options: { label: string, value: T, color?: string }[]
  }) {

  function getStyle(index: number): ViewStyle {
    const style: ViewStyle = {}
    style.height = 40
    style.justifyContent = "center"
    style.borderWidth = 2
    style.borderColor = colours.selected
    if (props.vertical) {
      if (index == 0) {
        style.borderBottomWidth = 1
        style.borderTopRightRadius = 10
        style.borderTopLeftRadius = 10
      } else if (index == props.options.length-1) {
        style.borderTopWidth = 1
        style.borderBottomRightRadius = 10
        style.borderBottomLeftRadius = 10
      } else {
        style.borderTopWidth = 1
        style.borderBottomWidth = 1
      }
    }
    else {
      style.flex = 1
      if (index == 0) {
        style.borderRightWidth = 1
        style.borderTopLeftRadius = 10
        style.borderBottomLeftRadius = 10
      } else if (index == props.options.length-1) {
        style.borderLeftWidth = 1
        style.borderTopRightRadius = 10
        style.borderBottomRightRadius = 10
      } else {
        style.borderRightWidth = 1
        style.borderLeftWidth = 1
      }
    }

    return style
  }

  return (
    <View>
      <Text style={globalStyles.textBig}>{props.label}</Text>
      <View 
        style={[
          props.vertical ? 
            { paddingTop: 0 } : 
            { flexDirection: "row", paddingRight: 0 }
        ]}
      >

        {
          props.options.map((item: { label: string, value: T, color?: string }, index) => {
            const selected = props.value === item.value
            return (
              <TouchableOpacity 
                key={item.label}
                style={[getStyle(index), {
                  backgroundColor: selected ? item.color == undefined ? colours.fg : item.color : colours.view 
                }]}
                onPress={() => {props.setValue(item.value)}}
              >
                <Text style={selected ? globalStyles.buttonText : [globalStyles.text, {textAlign: "center"}]}>{item.label}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  )
}
