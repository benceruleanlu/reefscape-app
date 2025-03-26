import { io, Socket } from "socket.io-client";
import { MatchData, ServerData } from "./types";
import * as SQLite from "expo-sqlite"

const maxReconnects = 5;

export var serverData: ServerData | null = null
export var socket: Socket | null = null
export var name: string | null = null

export var connected = false
var numReconnects = 0

export const connList = () => {
  connected = true
  numReconnects = 0
}

export const errList = (_: Error) => {
  if (socket?.active) {
    numReconnects++
    if (numReconnects == maxReconnects) connected = false
  }
  else connected = false
}

export function setServerData(data: ServerData) {
  serverData = data
  socket = io(`ws://${data.ip}:${data.port}`, { 
    autoConnect: false, 
    reconnectionAttempts: maxReconnects,
    timeout: 5000,
    forceNew: true
  })

  socket.on("connect_error", errList)
  socket.on("connect", connList)
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

