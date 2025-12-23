# BurpSide Assistant

BurpSide Assistant is a hybrid security toolkit designed to bridge the gap between manual browser intelligence and the automation of Burp Suite. It enables security researchers and bug bounty hunters to analyze modern Single Page Applications (SPAs) more effectively by leveraging data that is usually invisible to a standard HTTP proxy.

## Project Overview

Modern web applications (React, Vue, Angular) rely heavily on client-side logic. Traditional proxies like Burp Suite only see the HTTP traffic on the wire, often missing:
- Client-side routing logic (hidden paths).
- Client-side state (sensitive data in Redux/Vuex).
- DOM-based vulnerabilities (sinks that never trigger a network request).

BurpSide fills this gap by injecting a "Brain" directly into the browser.

### Two Modes of Operation

**1. Standalone Mode**
The extension operates independently as a Chrome DevTools panel. It uses the browser's own engine to:
- **Map the Application**: Automatically discovering client-side routes (using router heuristics) to find endpoints that you haven't clicked on yet.
- **Monitor Data**: Tracking LocalStorage and State changes in real-time.
- **Find Vulnerabilities**: Analyzing DOM mutations to detect unsafe sink usage (DOM XSS) and exposing hidden form fields.

**2. Hybrid Mode (with Burp Suite)**
When connected to the companion Burp Suite extension, the tool becomes even more powerful:
- **Traffic Sync**: Interesting findings (like a discovered API key in a JS file) are sent directly to Burp's Issue dashboard.
- **Smart Bridge**: You can right-click any element in the DOM to send a specifically crafted request to Burp Repeater, bypassing complex client-side signing or encryption logic by letting the browser handle it first.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- Java 17+ (for Burp component)
- Burp Suite Professional or Community

### Setting up the Browser Extension
1.  Navigate to the `browser-extension` directory.
2.  Install dependencies: `npm install`
3.  Build the project: `npm run build`
4.  Open Chrome and go to `chrome://extensions`.
5.  Enable "Developer mode".
6.  Click "Load unpacked" and select the `browser-extension/dist` folder.
7.  Open Chrome DevTools (F12) to see the new **BurpSide** tab.

### Setting up the Burp Suite Extension
1.  Navigate to the `burp-extension` directory.
2.  Build the jar file: `./gradlew shadowJar`
3.  Open Burp Suite, go to **Extensions** -> **Hosted** -> **Add**.
4.  Select "Java" and choose the built `.jar` file located in `burp-extension/build/libs/`.

## Architecture
This project is a monorepo containing:
- `/browser-extension`: A React-based application built with Vite and CRXJS. It functions as both a popup and a DevTools panel.
- `/burp-extension`: A Java plugin using the Montoya API that acts as a local server to receive data from the browser.

## Contributing
We welcome contributions to improve detection logic or add support for new frameworks. Please submit a Pull Request or open an issue for discussion.
