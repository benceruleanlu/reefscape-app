import { Stack } from "expo-router";
import { Header } from "@react-navigation/elements";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        header: ({options}) => (
          <Header
            {...options}
            title=""
            headerStyle={{
              height: 50,
            }}
          />
        )
      }}>
    </Stack>
  );
}
