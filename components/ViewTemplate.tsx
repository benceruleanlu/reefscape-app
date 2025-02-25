import { globalStyles } from "@/globals";
import { StatusBar } from "expo-status-bar";
import { ReactElement } from "react";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, ScrollView, ScrollViewProps } from "react-native";

type ViewTemplateProps = {
  avoidingViewProps?: KeyboardAvoidingViewProps,
  scrollViewProps?: ScrollViewProps,
  children?: ReactElement[],
}

export default function ViewTemplate(props: ViewTemplateProps) {
  return (
    <KeyboardAvoidingView
      {...props.avoidingViewProps}
      behavior="position"
      style={[globalStyles.rootView, props.avoidingViewProps?.style]}
    >
      <ScrollView
        {...props.scrollViewProps}
      >
        <StatusBar style="dark"/>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

