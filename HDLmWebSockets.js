/**
 * HDLmWebSockets short summary.
 *
 * HDLmWebSockets description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmWebSockets class is not used to create any objects.
   However, it does contain code for creating and using web
   sockets. */ 
class HDLmWebSockets {
  /* This method sends a get configuration request to the server. The
     get configuration request retrieves the configuration settings
     for the current application. */
  static getConfigRequest(configNames) {
    /* console.log('In HDLmWebSockets.getConfigRequest'); */
    /* Create a promise that we can settle later */
    let newPromise = new Promise(function (resolve, reject) {
      /* Build a configuration object with a set of configuration
         names */      
      let  configObj = {};
      configObj['configNames'] = configNames;
      /* Build a message with the required information */
      let requestType = 'getConfigValues';
      let jsonStr = JSON.stringify(configObj); 
      jsonStr = HDLmUtility.updateJsonStr(jsonStr, 'HDLmRequestType', requestType);   
      HDLmWebSockets.contentSendValue.push(jsonStr);
      /* Build the callback function that will be used to handle the
         WebSocket message that is returned by the caller. Note that
         this routine is a closure and get important values from the
         environment where it is defined. */
      let messageCallback = (event) => {
        /* Provide an exception handler for the entire callback */
        try {
          let currentWebSocket = event.target;
          /* Close the WebSocket, if need be */
          if (currentWebSocket != null) {
            currentWebSocket.close();
          }
          /* Pass the WebSocket message to the appropriate handler */
          /* console.log(event.data); */
          /* console.log(typeof event.data); */
          resolve(event.data);
        }
        catch (errorObj) {
          let errorText = HDLmError.reportError(errorObj, 'messageCallback');
          reject(errorText);
        }
      };
      /* Open a connnection to another process */
      HDLmWebSockets.openWebSocketConnection(messageCallback);
    });
    return newPromise;
  } 
  /* This routine returns a promise that yields either  
     a set of image choices or an error. The promise is 
     thenable. */
  static getImageChoices(inputImage, urlStr, pathValueStr) {
    /* console.log('In HDLmWebSockets.getImageChoices'); */
    /* console.log(HDLmWebSockets.contentSendValue); */
    /* Create a promise that we can settle later */
    let newPromise = new Promise(function (resolve, reject) {
      /* Build a message with the required information */
      let sendJsonStr = JSON.stringify({});
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmRequestType', 'getImageChoices');
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmInputImage', 'https:' + inputImage);
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmUrlValue', urlStr);
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmPathValue', pathValueStr);
      /* console.log('In getImageChoices', sendJsonStr); */
      HDLmWebSockets.contentSendValue.push(sendJsonStr);
      /* Build the callback function that will be used to handle the
         WebSocket message that is returned by the caller. Note that
         this routine is a closure and get important values from the
         environment where it is defined. */
      let messageCallback = (event) => {
        /* Provide an exception handler for the entire callback */
        try {
          let currentWebSocket = event.target;
          /* Close the WebSocket, if need be */
          if (currentWebSocket != null) {
            currentWebSocket.close();
          }
          /* Pass the WebSocket message to the appropriate handler */
          /* console.log(event.data); */
          /* console.log(typeof event.data); */
          resolve(event.data);
        }
        catch (errorObj) {
          let errorText = HDLmError.reportError(errorObj, 'messageCallback');
          reject(errorText);
        }
      };
      /* Open a connnection to another process */
      HDLmWebSockets.openWebSocketConnection(messageCallback);
    });
    return newPromise;
  }
  /* This routine returns a promise that yields either a string
     with the complete set of modifications or an error. The 
     promise is a thenable. */
  static getModifications() {
    /* console.log('In HDLmWebSockets.getModifications', HDLmUtility.getHostName()); */
    /* console.trace(); */
    /* console.log(HDLmWebSockets.contentSendValue); */
    /* Create a promise that we can settle later */
    let newPromise = new Promise(function (resolve, reject) {
      /* Build a message with the required information */
      let sendJsonStr = JSON.stringify({});
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmRequestType', 'getModPart');
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmUrlValue', window.location.href);
      /* console.log('In getModifications', sendJsonStr); */
      HDLmWebSockets.contentSendValue.push(sendJsonStr);
      /* Build the callback function that will be used to handle the
         WebSocket message that is returned by the caller. Note that
         this routine is a closure and get important values from the
         environment where it is defined. */
      let messageCallback = (event) => {
        /* Provide an exception handler for the entire callback */
        try {
          let currentWebSocket = event.target;
          /* Close the WebSocket, if need be */
          if (currentWebSocket != null) {
            currentWebSocket.close();
          }
          /* Pass the WebSocket message to the appropriate handler */
          /* console.log(event.data); */
          /* console.log(typeof event.data); */
          resolve(event.data);
        }
        catch (errorObj) {
          let errorText = HDLmError.reportError(errorObj, 'messageCallback');
          reject(errorText);
        }
      };
      /* Open a connnection to another process */
      HDLmWebSockets.openWebSocketConnection(messageCallback);
    });
    return newPromise;
  }
  /* This routine returns a promise that yields either  
     a set of text choices or an error. The promise is 
     thenable. */
  static getTextChoices(inputText, urlStr, pathValueStr) {
    /* console.log('In HDLmWebSockets.getTextChoices'); */
    /* console.log(HDLmWebSockets.contentSendValue); */
    /* Create a promise that we can settle later */
    let newPromise = new Promise(function (resolve, reject) {
      /* Build a message with the required information */
      let sendJsonStr = JSON.stringify({});
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmRequestType', 'getTextChoices');
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmInputText', inputText);
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmUrlValue', urlStr);
      sendJsonStr = HDLmUtility.updateJsonStr(sendJsonStr, 'HDLmPathValue', pathValueStr);
      /* console.log('In getTextChoices', sendJsonStr); */
      HDLmWebSockets.contentSendValue.push(sendJsonStr);
      /* Build the callback function that will be used to handle the
         WebSocket message that is returned by the caller. Note that
         this routine is a closure and gets important values from the
         environment where it is defined. */
      let messageCallback = (event) => {
        /* Provide an exception handler for the entire callback */
        try {
          let currentWebSocket = event.target;
          /* Close the WebSocket, if need be */
          if (currentWebSocket != null) {
            currentWebSocket.close();
          }
          /* Pass the WebSocket message to the appropriate handler */
          /* console.log(event.data); */
          /* console.log(typeof event.data); */
          resolve(event.data);
        }
        catch (errorObj) {
          let errorText = HDLmError.reportError(errorObj, 'messageCallback');
          reject(errorText);
        }
      };
      /* Open a connnection to another process */
      HDLmWebSockets.openWebSocketConnection(messageCallback);
    });
    return newPromise;
  }
  /* This method creates a modified tree node with a set 
     of fields removed from original tree node. Note that 
     the original tree node is not modified and a modified 
     copy of the original tree node is returned to the caller. */
  static modifiedTreeNode(treePos) {
    /* console.log('In HDLmWebSockets.modifiedTreeNode', treePos); */
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. */
    let tempPos = {};
    tempPos = Object.assign(tempPos, treePos);
    if (tempPos.hasOwnProperty('children'))
      delete tempPos.children;
    if (tempPos.hasOwnProperty('containerWidget'))
      delete tempPos.containerWidget;
    if (tempPos.hasOwnProperty('id'))
      delete tempPos.id;
    /* Remove the saved details from the current node, if need be */
    if (tempPos.hasOwnProperty('savedDetails'))
      delete tempPos.savedDetails;
    /* Return the modified tree node to the caller */
    return tempPos;
  }
  /* This method is the WebSocket message handler. This method runs
     as part of a content script. This method does the actual work
     of receiving a WebSocket message. */
  static onMessageWebSocketContent(event) {
    /* Build an object from the JSON we just received. Get the
       request type from the JSON. */
    let eventObj = JSON.parse(event.data);
  }
  /* This method is the WebSocket open handler. This method runs as
     part of a content script. This method does the actual work of
     sending a WebSocket message to (hopefully) the receiver. */
  static onOpenWebSocketContent(event) {
    /* console.log('In HDLmWebSockets.onOpenWebSocketContent', event); */
    /* console.log(event); */
    let currentWebSocket = event.target;
    /* console.log(currentWebSocket); */
    /* console.log(HDLmWebSockets.contentSendValue); */
    /* Check if the send array is empty. We have nothing to send
       if the send array is empty. */
    if (HDLmWebSockets.contentSendValue.length == 0)
      return;
    /* Get and remove the first entry from the send array and
       send it */
    let messageStr = HDLmWebSockets.contentSendValue.shift();
    /* console.log(messageStr, HDLmWebSockets.contentSendValue); */    
    currentWebSocket.send(messageStr);    
    /* At the point, we used to close the WebSocket port in all cases. This is no longer
       possible because we expect to receive messages from the server in some cases. Of
       course, this means that the WebSocket must remain open. */
    let messageObj = JSON.parse(messageStr);
    /* This is the web sockets on open routine. In most cases, we
       want to close the socket right here. However, in some number
       of important cases, this is not true. We want to leave the
       web socket open so that we can get and use the reply. */
    if (messageObj.hasOwnProperty('HDLmRequestType')) {
      let messageRequestType = messageObj['HDLmRequestType'];
      if (messageRequestType.startsWith('getConfig')      == false &&
          messageRequestType.startsWith('getImage')       == false &&
          messageRequestType.startsWith('getMod')         == false &&
          messageRequestType.startsWith('getText')        == false &&
          messageRequestType.startsWith('storeTreeNodes') == false) {
        currentWebSocket.close(); 
      }
    }    
  }
  /* The next routine establishes a Web Sockets connection to another
     process */
  static openWebSocketConnection(messageCallback) {
    /* console.log('In HDLmWebSockets.openWebSocketConnection', messageCallback); */
    /* Declare and define a few variables for use below */
    let newWebTargetPort;
    let newWebTargetScheme;
    let newWebTargetSite;
    let newWebTargetPathValue;
    let newWebTarget;
    /* The port number is hard-coded below. The port number is actually
       a configuration value. However, we can not use configuration
       values here. */
    if (1 == 2) {
      /* These value are for the Electron JS application */
      newWebTargetPort = 8102;
      newWebTargetScheme = 'ws';
      newWebTargetSite = '127.0.0.1';
    }
    else if (1 == 2) {
      /* These values are for the proxy server running locally under Eclipse */
      newWebTargetPort = 80;
      newWebTargetScheme = 'ws';
      newWebTargetSite = '127.0.0.1';
    } else {
      /* These values are for proxy server running in the cloud or running
         locally under Eclipse */
      newWebTargetPort = 443;
      newWebTargetScheme = 'wss';
      newWebTargetSite = HDLmConfigInfo.getServerName();
      /* console.log('In HDLmWebSockets.openWebSocketConnection ', newWebTargetSite); */
    }
    newWebTargetPathValue = 'HDLmWebSocketServer';
    newWebTarget = newWebTargetScheme + '://' + newWebTargetSite + ':' +
      newWebTargetPort + '/' + newWebTargetPathValue + '/';
    /* console.log('In HDLmWebSockets.openWebSocketConnection', newWebTarget); */
    const newWebSocket = new WebSocket(newWebTarget);
    /* console.log(newWebSocket); */
    /* The statement below establishes the message (receive) routine
       for this WebSocket. The message routine does the actual work
       of receiving a message. The caller can provide a specific
       message callback routine or a general message callback function
       can be used. */
    if (messageCallback == null)
      newWebSocket.onmessage = HDLmWebSockets.onMessageWebSocketContent;
    else
      newWebSocket.onmessage = messageCallback;
    /* The statement below establishes the open routine for this WebSocket.
       The open routine does the actual work of sending the a message. */
    newWebSocket.onopen = HDLmWebSockets.onOpenWebSocketContent;
    return newWebSocket;
  }
  /* The next routine resets a field */
  static resetWebSockets() {
    /* console.log('In HDLmWebSockets.resetWebSockets', HDLmWebSockets.contentSendValue); */
    /* console.log('In HDLmWebSockets.resetWebSockets'); */
    /* console.trace(); */
    HDLmWebSockets.contentSendValue.length = 0; 
  }
  /* This method sends an add tree node request to the server. The add tree 
     node request adds one tree node. */
  static sendAddTreeNodeRequest(treePos) {
    /* console.log('In HDLmWebSockets.sendAddTreeNodeRequest', treePos); */
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. */
    let tempPos = HDLmWebSockets.modifiedTreeNode(treePos);
    /* Convert the temporary object into a string */
    let tempPosStr = JSON.stringify(tempPos);
    /* console.log(tempPosStr); */
    /* Open a connnection to another process */
    HDLmWebSockets.sendCurrentRequest(tempPosStr, 'addTreeNode');
  }
  /* Send the current request to the server. The caller provides
     all of the information needed for the current request. This
     routine does the actual work. In some cases, this routine 
     returns a promise that will be fulfilled when the sever 
     handles the request. */
  static sendCurrentRequest(jsonStr, requestType) {
    /* console.log('HDLmWebSockets.sendCurrentRequest', jsonStr, requestType); */
    /* console.trace(); */
    /* console.log(jsonStr); */
    /* console.log(requestType); */
    /* Set a few values that are used below */
    let newPromise = null;
    let valueStrJsonFalse = false;
    jsonStr = HDLmUtility.updateJsonStr(jsonStr, 'HDLmRequestType', requestType); 
    jsonStr = HDLmUtility.updateJsonStr(jsonStr, 'HDLmCopyElements', valueStrJsonFalse);
    jsonStr = HDLmUtility.updateJsonStr(jsonStr, 'HDLmUrlValue', window.location.href);
    HDLmWebSockets.contentSendValue.push(jsonStr);
    /* Take the appropriate action */
    HDLmWebSockets.contentSendValue.push(jsonStr);
    let webSocketsMessageCallbackNull = null;
    HDLmWebSockets.openWebSocketConnection(webSocketsMessageCallbackNull);
    return;  
  }
  /* This method sends a delete tree node request to the server. 
     The delete tree node request deletes one tree node. */
  static sendDeleteTreeNodeRequest(treePos) {
    /* Create a temporary tree node */
    let tempPos = {};
    /* Add the node path to the temporary tree node */
    tempPos.nodePath = treePos.nodePath;
    /* Convert the temporary node into a string */
    let tempPosStr = JSON.stringify(tempPos);
    /* Open a connnection to another process */
    HDLmWebSockets.sendCurrentRequest(tempPosStr, 'deleteTreeNode');
  }  
  /* This method sends a store tree nodes request to the server. The 
     store tree node request stores zero or more trees nodes. The tree
     node are either added or updated. */
  static sendStoreTreeNodesRequest(treeNodesStr) {
    /* console.log('In HDLmWebSockets.sendStoreTreeNodesRequest', treeNodesStr); */
    /* Create a promise that we can settle later */
    let newPromise = new Promise(function (resolve, reject) {
      /* Build a message with the required information */
      let requestType = 'storeTreeNodes';
      let jsonStr = treeNodesStr; 
      jsonStr = HDLmUtility.updateJsonStr(jsonStr, 'HDLmRequestType', requestType);   
      HDLmWebSockets.contentSendValue.push(jsonStr);
      /* Build the callback function that will be used to handle the
         WebSocket message that is returned by the caller. Note that
         this routine is a closure and get important values from the
         environment where it is defined. */
      let messageCallback = (event) => {
        /* Provide an exception handler for the entire callback */
        try {
          let currentWebSocket = event.target;
          /* Close the WebSocket, if need be */
          if (currentWebSocket != null) {
            currentWebSocket.close();
          }
          /* Pass the WebSocket message to the appropriate handler */
          /* console.log(event.data); */
          /* console.log(typeof event.data); */
          resolve(event.data);
        }
        catch (errorObj) {
          let errorText = HDLmError.reportError(errorObj, 'messageCallback');
          reject(errorText);
        }
      };
      /* Open a connnection to another process */
      HDLmWebSockets.openWebSocketConnection(messageCallback);
    });
    return newPromise;
  }
  /* This method sends an update tree node request to the server. The 
     update tree node request updates one tree node. */
  static sendUpdateTreeNodeRequest(treePos) {
    /* console.log('In HDLmWebSockets.sendUpdateTreeNodeRequest', treePos); */
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. */
    let tempPos = HDLmWebSockets.modifiedTreeNode(treePos);
    /* Convert the temporary object into a string */
    let tempPosStr = JSON.stringify(tempPos);
    /* Open a connnection to another process */
    HDLmWebSockets.sendCurrentRequest(tempPosStr, 'updateTreeNode');
  }
}
HDLmWebSockets.contentSendValue = [];