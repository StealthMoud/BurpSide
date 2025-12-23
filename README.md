# BurpSide Assistant

**BurpSide Assistant** is a hybrid Bug Hunting toolkit that bridges the gap between manual browser analysis and Burp Suite automation.

It operates in two modes:
1.  **Standalone Mode**: A powerful browser extension with a built-in "Hacker Dashboard" (DevTools) related to client-side reconnaissance, tracking vulnerabilities, and analyzing DOM state without needing a proxy.
2.  **Hybrid Mode**: Connects to a companion Burp Suite extension to offload heavy tasks (Differential Analysis, Active Fuzzing) and sync session data.

## Features (Planned & Implemented)
-   🕷️ **Hacker Dashboard**: A dedicated DevTools panel for real-time app analysis.
-   🔗 **Burp <-> Browser Bridge**: WebSocket connection for seamless data sync.
-   🕵️ **Client-Side Recon**: Auto-discovery of client-side routes (Router scanning) and hidden endpoints.
-   🧠 **State Analysis**: Monitoring Redux/Vuex state for secrets.
-   ⚡ **Automated Fuzzing**: Send interesting findings directly to Burp Scanner/Repeater.

## Project Structure
This is a monorepo containing:
-   `browser-extension/`: The React-based Chrome Extension (Vite + CRXJS).
-   `burp-extension/`: The Java-based Burp Suite Extension (Montoya API).

---

## 🚀 Getting Started

### 1. Browser Extension (The Eye)
**Requirements**: Node.js 18+

1.  Navigate to the directory:
    ```bash
    cd browser-extension
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the extension:
    ```bash
    npm run build
    ```
4.  **Load into Chrome**:
    -   Go to `chrome://extensions`.
    -   Enable **Developer mode**.
    -   Click **Load unpacked**.
    -   Select the `browser-extension/dist` folder.
5.  **Access the Dashboard**: Open Chrome DevTools (F12) and click the **BurpSide** tab.

### 2. Burp Extension (The Brain)
**Requirements**: Java 17+, Gradle (Wrapper included)

1.  Navigate to the directory:
    ```bash
    cd burp-extension
    ```
2.  Build the plugin:
    ```bash
    ./gradlew shadowJar
    ```
    *Build artifact will be at `build/libs/burp-extension-1.0-SNAPSHOT-all.jar`*
3.  **Load into Burp Suite**:
    -   Go to **Extensions** -> **Installed** -> **Add**.
    -   Select **Extension type: Java**.
    -   Select the `.jar` file created above.

---

## 🤝 Contribution
Created by [stealthmoud](https://github.com/stealthmoud).

Contributions are welcome! Please open an issue or PR if you have feature ideas for modern SPA bug hunting.
