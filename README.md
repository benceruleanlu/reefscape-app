## How to run App

1. Install dependencies

```bash
npm install
```

2. Store a server certificate in assets/

Generate a certificate and private key pair with

```bash
openssl req -newkey rsa:2048 -nodes -keyout server-key.pem -x509 -out server-cert.pem
```

Move `server-key.pem` to the corresponding [reefscape-server](https://github.com/benceruleanlu/reefscape-server) and move `server-cert.pem` to `assets/` in the app. 

3. Start the app

```bash
npx expo start
```
