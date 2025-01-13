/**
 * HDLmElectronMain short summary.
 *
 * HDLmElectronMain description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* This code does not appear to be in use. The code in HDLmElectronOne.js does
   appear to be in use. This comment may be wrong. The package.json file in 
   WebApplication5/WebApplication5 does refer to electronMain.js (but not 
   HDLmElectronMain.js. Note that an actual electronMain.js file exists. */
/* console.log('In HDLmElectronMain'); */
const { app, BrowserWindow } = require('electron');
const WebSocket = require("ws");
/* console.log('ws'); */
/* const WebSocket = require("C:/Users/pscha/Documents/Visual_Studio_Code/Projects/ElectronJs/node_modules/ws"); */
/* The HDLmElectronMain class doesn't actually do anything. However,
   it does serve to hold a set of static (and local) values. */
class HDLmElectronMain {
  /* Create the one and only renderer window */
  static createWindow() {
    /* Create the browser window */
    let win = new BrowserWindow({
      width: 2000,
      height: 1000,
      webPreferences: {
        nodeIntegration: true
      }
    })
    /* Load the index.html file of the application. Note that this
       is exactly the same index.html file used when the application
       is run in a browser. The files could be different. However, in
       this case they are not. */
    win.loadFile('index.html');
    HDLmElectronMain.rendererWin = win;
  }
  /* Create a static routine for handling inbound WebSocket
     connections. This routine is invoked for each connection. */
  static onConnectionWebSocket(newWebSocket) {
    newWebSocket.on('message', HDLmElectronMain.onMessageWebSocket);
  }
  /* Create a static routine for handling inbound WebSocket
     messages. This routine is invoked for each message. This
     routine sends the message to the renderer process for
     further handling. */
  static onMessageWebSocket(message) {
    HDLmElectronMain.rendererWin.webContents.send('node-info', message);
  }
  /* Create a startup function. All of the code needed for startup
     goes into this routine. */
  static startup() {
    /* Create a WebSocket server for the main Electron process. This
       server handles WebSocket connections from anywhere. In practice,
       the actual connections come fom browser extensions. However, they
       could come from anywhere. The code below is no longer in use. The
       WebSocket server is actually created in the renderer task (index.html) */
    if (1 == 2) {
      const portNumber = HDLmConfigInfo.getPortNumberWebSocket();
      const webSocketServer = new WebSocket.Server({ port: portNumber });
      webSocketServer.on('connection', HDLmElectronMain.onConnectionWebSocket);
    }
    app.allowRendererProcessReuse = true;
    app.whenReady().then(HDLmElectronMain.createWindow);
  }
}
/* Set a few class specific values to a null value */
HDLmElectronMain.rendererWin = null;
/* Run the startup function */
HDLmElectronMain.startup();