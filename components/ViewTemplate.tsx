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
      style={globalStyles.rootView}
      {...props}
    >
      <StatusBar style="dark"/>
      {props.children}
    </ScrollView>
  );
}

