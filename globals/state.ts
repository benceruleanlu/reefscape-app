import { io, Socket } from "socket.io-client";
import { ServerData } from "./types";

export var serverData: ServerData | null = null
export var socket: Socket | null = null
export var name: string | null = null

export function setServerData(data: ServerData) {
  serverData = data
  socket = io(`ws://${data.ip}:${data.port}`, { autoConnect: false })
}

export function setName(n: string) {
  name = n
}

