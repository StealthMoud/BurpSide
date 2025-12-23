package com.burpside;

import burp.api.montoya.BurpExtension;
import burp.api.montoya.MontoyaApi;
import burp.api.montoya.logging.Logging;

public class BurpSideExtension implements BurpExtension {

    @Override
    public void initialize(MontoyaApi api) {
        api.extension().setName("BurpSide Assistant");

        Logging logging = api.logging();
        logging.logToOutput("BurpSide Assistant Loaded Successfully!");

        BridgeServer server = new BridgeServer(1111, logging);
        server.start();

        // Future: Initialize WebSocket Server here
    }
}
