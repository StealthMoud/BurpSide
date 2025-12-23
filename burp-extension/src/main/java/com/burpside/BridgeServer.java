package com.burpside;

import burp.api.montoya.logging.Logging;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

public class BridgeServer extends WebSocketServer {

    private final Logging logging;

    public BridgeServer(int port, Logging logging) {
        super(new InetSocketAddress(port));
        this.logging = logging;
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        logging.logToOutput("BurpSide: New connection from " + conn.getRemoteSocketAddress());
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        logging.logToOutput("BurpSide: Connection closed " + conn.getRemoteSocketAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        logging.logToOutput("BurpSide: Received message: " + message);
        // Echo back for now
        conn.send("Echo: " + message);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        logging.logToError("BurpSide: WebSocket Error: " + ex.getMessage());
    }

    @Override
    public void onStart() {
        logging.logToOutput("BurpSide: WebSocket Server started on port " + getPort());
    }
}
