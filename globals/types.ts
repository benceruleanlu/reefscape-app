export type ServerData = {
  ip: string
  port: number
  team: string
  event: string
  code: string
}

export enum ActionType {
  LEAVE,
  INTAKE_CORAL,
  DROP_CORAL,
  SCORE_L1,
  SCORE_L2,
  SCORE_L3,
  SCORE_L4,
  INTAKE_ALGAE,
  DROP_ALGAE,
  SCORE_NET,
  MISS_NET,
  SCORE_PROCESSOR
}

export type Action = {
  type: ActionType
  time: number
}

export type PostGame = {
  bargeResult: "no_attempt" | "parked" | "shallow_fail" | "shallow_success" | "deep_fail" | "deep_success"

  role: "offense" | "defense" | "feeder" | "immobile"
  driverAbility: 1 | 2 | 3 | 4 | 5
  traversesShallowCage: boolean

  coralPickup: "none" | "ground" | "station" | "both"
  algaePickup: "none" | "ground" | "reef" | "both"
  clearsReef: boolean

  matchResult: "win" | "loss" | "tie"
  autoRP: boolean
  coralRP: boolean
  bargeRP: boolean

  coopertitionPoint: boolean

  penaltiesForOpponent: number
  penaltyCard: "none" | "yellow" | "red"

  notes: string
}

export type MatchData = {
  label: string
  teamNumber: string,
  alliance: "red" | "blue"

  autoActions: Action[]
  teleopActions: Action[]
  postGame: PostGame
}

