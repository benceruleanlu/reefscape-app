function isValidIPv4(ip: string): boolean {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

let socket;
export function connect(serverIP: string, setStatus: (status: string) => void, setStatusCol: (color: string) => void,) {
  setStatus("Checking connection...");
  setStatusCol("#bbbb00");

  if (!isValidIPv4(serverIP)) {
    setStatus("Enter a valid IPv4 address!");
    setStatusCol("#bb0000");
    return;
  }

  socket = new WebSocket(`ws://${serverIP}:4308`);

  socket.onopen = () => {
    setStatus("Connected!");
    setStatusCol("#00bb00");
  };

  socket.onmessage = (event) => {
    setStatus("Message received!");
    setStatusCol("#00bb00");
    console.log(event.data);
  };

  socket.onerror = (error) => {
    setStatus("Error occured.");
    setStatusCol("#bb0000");
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    setStatus("Disconnected.");
    setStatusCol("#bb0000");
  };
}
