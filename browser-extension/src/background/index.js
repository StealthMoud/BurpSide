console.log("BurpSide: Background Service Worker Loaded");

let socket = null;
const WS_URL = "ws://localhost:1111";

function connect() {
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
        console.log("BurpSide: Connected to Burp Bridge");
        // Keep-alive or initial handshake
        socket.send(JSON.stringify({ type: 'handshake', source: 'browser-extension' }));
    };

    socket.onmessage = (event) => {
        console.log("BurpSide: Received:", event.data);
    };

    socket.onclose = () => {
        console.log("BurpSide: Disconnected. Retrying in 5s...");
        setTimeout(connect, 5000);
    };

    socket.onerror = (error) => {
        console.log("BurpSide: WebSocket Error", error);
        socket.close();
    };
}

connect();
