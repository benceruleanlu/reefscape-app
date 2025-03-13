import { globalStyles, AutonData, colours, getPointsAuton } from "@/globals";
import {  StyleSheet, Text, View } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useCallback, useState } from "react";

export default function AutonScout() {
  const router = useRouter();
  var params = useLocalSearchParams();

  const [data, setData] = useState<AutonData>({
    leftStartingArea: false,
    L1: 0, 
    L2: 0, 
    L3: 0, 
    L4: 0,
    processor: 0,
    net: 0
  })

  async function effect() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  }
  useFocusEffect(
    useCallback(() => {
      effect()
    }, [])
  )

  function incVal(prop: string) {
    return () => {
      var cpy: any = {...data}
      cpy[prop]++
      setData(cpy)
    }
  }

  function nextPage() {
    params.autonData = JSON.stringify(data)
    router.replace({pathname: "./teleopScout", params: params})
  }

  return (
    <SafeAreaView style={[globalStyles.rootView]}>
      <View style={{flexDirection: "row", flex: 1}}>
        <View style={{flex: 1, padding: 10, paddingLeft: 0}}>
          <Text style={globalStyles.smallTitle}>Misc</Text>

          <CustomButton
            onPress={() => {
              var cpy = {...data} 
              cpy.leftStartingArea = !cpy.leftStartingArea
              setData(cpy)
            }}
            style={[{
              backgroundColor: data.leftStartingArea ? colours.green : colours.red, 
            }, styles.button]}
          >Left Starting Area</CustomButton>

          <View style={[styles.button, {justifyContent: "flex-end"}]}>
            <Text style={globalStyles.smallTitle}>Algae</Text>
          </View>

          <CustomButton
            onPress={incVal("processor")}
            style={styles.button}
          >Processor</CustomButton>
          <CustomButton
            onPress={incVal("net")}
            style={styles.button}
          >Net</CustomButton>
        </View>


        <View style={{flex: 1, padding: 10, paddingRight: 0}}>
          <Text style={globalStyles.smallTitle}>Coral</Text>
          <CustomButton
            onPress={incVal("L1")}
            style={styles.button}
          >Trough (L1)</CustomButton>
          <CustomButton
            onPress={incVal("L2")}
            style={styles.button}
          >L2 Branch</CustomButton>
          <CustomButton
            onPress={incVal("L3")}
            style={styles.button}
          >L3 Branch</CustomButton>
          <CustomButton
            onPress={incVal("L4")}
            style={styles.button}
          >L4 Branch</CustomButton>
        </View>
      </View>

      <View style={{marginTop: 10, height: 40, flexDirection: "row"}}>
        <Text 
          adjustsFontSizeToFit
          style={[{
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: 30,
            width: 160,
          }, styles.border]}
        >{getPointsAuton(data)} pts</Text>

        <View style={{flex: 1}}/>

        <CustomButton
          onPress={nextPage}
          style={{width: 160}}
        >Teleop Portion</CustomButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    flex: 1
  },

  border: {
    borderRadius: 5,
    borderColor: colours.border,
    borderWidth: 3,
  }
})
