import axios from "axios";
import forge from "node-forge";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const serverCertAsset = Asset.fromModule(require("@/assets/server-cert.pem"));
let serverCert: string;
serverCertAsset.downloadAsync().then(async () => {
  if (serverCertAsset.localUri !== null) {
    serverCert = await FileSystem.readAsStringAsync(serverCertAsset.localUri);
  }
});

export function isValidIPv4(ip: string): boolean {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

export function encrypt(data: string) {
  const serverKey = forge.pki.certificateFromPem(serverCert).publicKey;
  const encrypted = serverKey.encrypt(data, "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(512);
export const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

export function decrypt(data: string) {
  const decrypted = privateKey.decrypt(forge.util.decode64(data), "RSA-OAEP");
  return forge.util.encodeUtf8(decrypted);
}

export async function checkConnection(
  serverIP: string,
  setStatus: (status: string) => void,
  setStatusCol: (color: string) => void,
) {
  setStatus("Checking connection...");
  setStatusCol("#bbbb00");

  if (!isValidIPv4(serverIP)) {
    setStatus("Enter a valid IPv4 address!");
    setStatusCol("#bb0000");
    return;
  }

  try {
    const token = (
      Math.floor(Math.random() * 900000000000000) + 100000000000000
    ).toString();
    const response = await axios.post(`http://${serverIP}:3000`, {
      data: encrypt(token),
      key: publicKeyPem,
    });

    if (decrypt(response.data) !== token) {
      setStatus("Incorrect server.");
      setStatusCol("#bb0000");
    } else {
      setStatus("Correct server!");
      setStatusCol("#00bb00");
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        setStatus(`Client error ${error.response.status}`);
      } else if (error.response.status >= 500) {
        setStatus(`Server error ${error.response.status}`);
      }
    } else if (error.request) {
      setStatus("Network error or timeout.");
    } else {
      setStatus("Unknown error");
    }
    setStatusCol("#bb0000");
  }
}
