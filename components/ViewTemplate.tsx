import { globalStyles } from "@/globals";
import { StatusBar } from "expo-status-bar";
import { ScrollView, ScrollViewProps } from "react-native";

export default function ViewTemplate(props: ScrollViewProps) {
  return (
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...props}
      style={[globalStyles.rootView, props.style]}
    >
      <StatusBar style="dark"/>
      {props.children}
    </ScrollView>
  );
}

