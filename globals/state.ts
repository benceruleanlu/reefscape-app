import { io, Socket } from "socket.io-client";
import { ServerData } from "./types";

export var serverData: ServerData | null = null
export var socket: Socket | null = null

export function setServerData(data: ServerData) {
  serverData = data
  socket = io(`ws://${data.ip}:4308`, { autoConnect: false })
}

