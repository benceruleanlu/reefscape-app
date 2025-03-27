import { Action, ActionType } from "@/globals/types"
import { Dispatch, SetStateAction } from "react"
import { Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { colours, globalStyles } from "@/globals/constants"
import { msSinceStart } from "@/globals/state"
import { dynamicColour } from "./CustomButton"

type SelfProps = {
  leftArea: boolean

  hasCoral: boolean
  setHasCoral: Dispatch<SetStateAction<boolean>>
  hasAlgae: boolean
  setHasAlgae: Dispatch<SetStateAction<boolean>>

  actions: Action[]
  setActions: Dispatch<SetStateAction<Action[]>>

  text: string
}

type ButtonProps = {
  style?: ViewStyle
  onPress?: () => void
  appendType?: ActionType
  text: string
}

export default function ScoutingButtons(props: SelfProps) {
  function appendAction(action: Action) {
    props.setActions([...props.actions, action])
  }

  function popAction() {
    const popped = props.actions.pop()
    props.setActions([...props.actions])
    if (!popped) return
    
    const t = popped.type
    switch (t) {
      case ActionType.DROP_CORAL:
      case ActionType.SCORE_L1:
      case ActionType.SCORE_L2:
      case ActionType.SCORE_L3:
      case ActionType.SCORE_L4:
        props.setHasCoral(true)
        break
      case ActionType.DROP_ALGAE:
      case ActionType.MISS_NET:
      case ActionType.SCORE_NET:
      case ActionType.SCORE_PROCESSOR:
        props.setHasAlgae(true)
        break
      case ActionType.INTAKE_CORAL:
        props.setHasCoral(false)
        break
      case ActionType.INTAKE_ALGAE:
        props.setHasAlgae(false)
        break
    }
  }

  const Button = (_props: ButtonProps) => (
    <TouchableOpacity 
      style={[globalStyles.button, _props.style]}
      onPress={() => {
        if (_props.onPress) _props.onPress()
        if (_props.appendType != undefined) appendAction({type: _props.appendType, time: msSinceStart()})
      }}
    >
      <Text style={globalStyles.buttonTextBig}>{_props.text}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={{flex:1, flexDirection: "row"}}>
      {
        props.leftArea ?
          <View style={{flex: 2.2, marginRight: 40, flexDirection: "row"}}>
            
            <View style={{flex: 1.5, marginRight: 20}}>
              {
                props.hasCoral ?
                  <View style={{flex: 2.2}}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <Button
                        style={{marginRight: 10}}
                        onPress={() => {props.setHasCoral(false)}}
                        appendType={ActionType.SCORE_L1}
                        text="L1"
                      />
                      <Button
                        onPress={() => {props.setHasCoral(false)}}
                        appendType={ActionType.SCORE_L2}
                        text="L2"
                      />
                    </View>
                    <View style={{flex: 1, flexDirection: "row", marginTop: 10}}>
                      <Button
                        style={{marginRight: 10}}
                        onPress={() => {props.setHasCoral(false)}}
                        appendType={ActionType.SCORE_L3}
                        text="L3"
                      />
                      <Button
                        onPress={() => {props.setHasCoral(false)}}
                        appendType={ActionType.SCORE_L4}
                        text="L4"
                      />
                    </View>
                  </View> : <View style={{flex: 2.2}}/>
              }

              {
                props.hasAlgae ? 
                  <Button
                    style={{flex: 1, marginTop: 20, marginRight: -10}}
                    onPress={() => {props.setHasAlgae(false)}}
                    appendType={ActionType.SCORE_PROCESSOR}
                    text="Score Processor"
                  /> : <View style={{flex: 1, marginTop: 20, marginRight: -10}}/>
              }
            </View>

            {
              props.hasAlgae ?
                <View style={{flex: 1}}>
                  <Button
                    style={{backgroundColor: colours.buttonGreen}}
                    onPress={() => {props.setHasAlgae(false)}}
                    appendType={ActionType.SCORE_NET}
                    text="Score Net"
                  />
                  <Button
                    style={{backgroundColor: colours.buttonRed, marginTop: 10}}
                    onPress={() => {props.setHasAlgae(false)}}
                    appendType={ActionType.MISS_NET}
                    text="Miss Net"
                  />
                </View> : <View style={{flex: 1}}/>
            }
          </View> :
          <Button
            style={{flex: 2.2, marginRight: 40}}
            appendType={ActionType.LEAVE}
            text={"Leave\nStarting\nArea"}
          />
      }

      <View style={{flex: 1}}>
        <Button
          onPress={() => {props.setHasCoral(!props.hasCoral)}}
          appendType={props.hasCoral ? ActionType.DROP_CORAL : ActionType.INTAKE_CORAL}
          text={(props.hasCoral ? "Drop" : "Intake") + " Coral"}
        />
        <Button
          style={{marginTop: 15}}
          onPress={() => {props.setHasAlgae(!props.hasAlgae)}}
          appendType={props.hasAlgae ? ActionType.DROP_ALGAE : ActionType.INTAKE_ALGAE}
          text={(props.hasAlgae ? "Drop" : "Intake") + " Algae"}
        />

        <Button
          style={{flex: 0.75, marginVertical: 30, backgroundColor: dynamicColour(props.actions.length > 0)}}
          onPress={popAction}
          text="Undo"
        />

        <Text style={[globalStyles.text, {textAlign: "right"}]}>{props.text}</Text>
      </View>
    </View>
  )
}
