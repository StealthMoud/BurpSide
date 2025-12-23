# How BurpSide Works

This document explains the technical implementation of the scanning and integration features.

## 1. Vulnerability Detection (Standalone)
The extension does not rely on sending traffic to a server to find bugs; it uses the browser's JavaScript runtime to inspect the application from the inside.

### Client-Side Router Scanning
*Status: In Development*
Most SPAs map URLs to components using a client-side router (like `react-router`). BurpSide injects a script that walks the router's configuration object in memory. This allows it to list every possible route the application handles, even if there are no HTML links pointing to them.

### DOM Sink Monitoring
*Status: Planned*
The extension uses a `MutationObserver` to watch the DOM. If a script writes data to a dangerous sink (like `innerHTML` or `document.write`), the extension traces where that data came from. If the data originated from a URL parameter or user input, it flags a "Potential DOM XSS".

### Secret Scavenging
*Status: Planned*
The extension scans loaded JavaScript bundles and Heap snapshots for patterns matching:
- AWS Keys
- JWTs (JSON Web Tokens)
- Hardcoded API credentials
These are displayed in the "Data/Storage" tab of the dashboard.

## 2. Burp Suite Integration (Hybrid)
Communication between Chrome and Burp happens via a local WebSocket connection (default: `ws://localhost:1111`).

### The Bridge
1.  **Burp Server**: The Java extension spins up a WebSocket server inside Burp Suite.
2.  **Browser Client**: The Chrome extension's background service worker connects to this server.
3.  **Data Flow**:
    -   **Browser -> Burp**: When the extension finds a secret or a hidden route, it sends a JSON message to Burp. Burp then adds this to the "Target" site map or generates an "Issue".
    -   **Burp -> Browser**: Burp can ask the browser to "replay" a specific action or click a button to test for dynamic vulnerabilities.

## 3. Workflow
The intended workflow for a user is:
1.  Open the target website.
2.  Open DevTools and the **BurpSide** tab.
3.  Browse the application manually.
4.  Watch the Dashboard populate with "Active Nodes" (discovered pages) and "Vulnerabilities" (client-side issues).
5.  If Burp is open, these findings automatically appear in your Burp Target tab for further server-side testing.
