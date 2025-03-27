import { io, Socket } from "socket.io-client";
import { MatchData, ServerData } from "./types";
import * as SQLite from "expo-sqlite"

export var serverData: ServerData | null = null
export var socket: Socket | null = null
export var name: string | null = null

export function setServerData(data: ServerData) {
  serverData = data
  socket = io(`ws://${data.ip}:${data.port}`, { 
    autoConnect: false, 
    reconnectionDelay: 2000,
    reconnectionDelayMax: 2000,
    forceNew: true
  })
}

export function setName(n: string) {
  name = n
}

export var currMatchStart: number = 0
export function setMatchStart(val: number) {
  currMatchStart = val
}
export function msSinceStart() {
  return Date.now() - currMatchStart
}

export var currMatch: MatchData = {
  label: "",
  teamNumber: "",
  alliance: "red",

  autoActions: [],
  teleopActions: [],

  postGame: {
    bargeResult: "no_attempt",
    role: "offense",
    driverAbility: 3,
    traversesShallowCage: false,
    coralPickup: "none",
    algaePickup: "none",
    clearsReef: false,
    matchResult: "win",
    autoRP: false,
    coralRP: false,
    bargeRP: false,
    coopertitionPoint: false,
    penaltiesForOpponent: 0,
    penaltyCard: "none",
    notes: ""
  }
}

export const db = SQLite.openDatabaseSync("events")

