function isValidIPv4(ip: string): boolean {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

let socket: WebSocket | undefined;
let connected: boolean = false;
export function connect(serverIP: string, studentNumber: number, setStatus: (status: string) => void, setStatusCol: (color: string) => void,) {
  if (connected) {
    setStatus("Already connected.");
    setStatusCol("#00bb00");
    return;
  }

  if (!isValidIPv4(serverIP)) {
    setStatus("Enter a valid IPv4 address!");
    setStatusCol("#bb0000");
    return;
  }

  setStatus("Checking connection...");
  setStatusCol("#bbbb00");

  socket = new WebSocket(`ws://${serverIP}:4308`);

  socket.onopen = () => {
    setStatus("Connected!");
    setStatusCol("#00bb00");
    connected = true;

    if (socket) socket.send(JSON.stringify({ action: "verify", studentNumber: studentNumber }));
  };

  socket.onmessage = (event) => {
    setStatus(`Message received: ${event.data}`);
    setStatusCol("#00bb00");
  };

  socket.onerror = (error) => {
    setStatus("Error occured.");
    setStatusCol("#bb0000");
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    if (!connected) return;
    setStatus("Disconnected.");
    setStatusCol("#bb0000");
    connected = false;
  };
}

export function send(data: any) {
  if (!socket) return;
  if (!connected) return;

  socket.send(data);
}

export function close() {
  if (socket && connected) {
    socket.close();
  }
}
