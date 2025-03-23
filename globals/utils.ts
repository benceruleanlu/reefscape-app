import { ActionType, MatchData, MatchSummary } from "@/globals/types";
import * as SQLite from "expo-sqlite"

export function GetSummary(data: MatchData) {
  const bargeRes = data.postGame.bargeResult
  var res: MatchSummary = {
    totalPoints: 0,
    autoPoints: 0,
    teleopPoints: 0,
    endgamePoints: bargeRes == "parked" ? 2 : bargeRes == "shallow_success" ? 6 : bargeRes == "deep_success" ? 12 : 0,

    rankingPoints: 0
  };

  for (const action of data.autoActions) {
    if (action.type == ActionType.LEAVE) res.autoPoints += 3
    if (action.type == ActionType.SCORE_L1) res.autoPoints += 3
    if (action.type == ActionType.SCORE_L2) res.autoPoints += 4
    if (action.type == ActionType.SCORE_L3) res.autoPoints += 6
    if (action.type == ActionType.SCORE_L4) res.autoPoints += 7
    if (action.type == ActionType.SCORE_NET) res.autoPoints += 4
    if (action.type == ActionType.SCORE_PROCESSOR) res.autoPoints += 6
  }

  for (const action of data.teleopActions) {
    if (action.type == ActionType.SCORE_L1) res.autoPoints += 2
    if (action.type == ActionType.SCORE_L2) res.autoPoints += 3
    if (action.type == ActionType.SCORE_L3) res.autoPoints += 4
    if (action.type == ActionType.SCORE_L4) res.autoPoints += 5
    if (action.type == ActionType.SCORE_NET) res.autoPoints += 4
    if (action.type == ActionType.SCORE_PROCESSOR) res.autoPoints += 6
  }

  const matchRes = data.postGame.matchResult
  res.rankingPoints = matchRes == "win" ? 3 : matchRes == "tie" ? 1 : 0
  if (data.postGame.autoRP) res.rankingPoints++
  if (data.postGame.coralRP) res.rankingPoints++
  if (data.postGame.bargeRP) res.rankingPoints++

  res.totalPoints = res.autoPoints + res.teleopPoints + res.endgamePoints
  return res;
}

export const db = SQLite.openDatabaseSync("events")

