/**
 * HDLmElectronOne short summary.
 *
 * HDLmElectronOne description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmElectronOne class doesn't actually do anything. However, it
   does define a set of static methods that are used to build the
   a rule editor. No instances of this class can ever be created. */
class HDLmElectronOne {
  /* Handle Electron initialization */
  static handleElectronInitialization() {
    /* console.log('In HDLmElectronOne.handleElectronInitialization'); */
    /* The code below is only used in the Electron JS environment. This
       code receives messages from the main Electron JS process and
       handles them. Of course, this code can only be used with Electron
       JS. This code is no longer in use. A WebSocket server is created
       below to receive messages directly. */
    if (false && HDLmUtility.isElectron()) {
      const electron = require('electron');
      const { ipcRenderer } = electron;
      ipcRenderer.on('node-info', (event, message) => {
        /* What follows is a dummy loop used only to allow break to work */
        while (true) {
          /* Get the DOM element for the Fancytree. If this fails,
             build an error message and terminate the dummy loop. */
          let treeElement = document.getElementById("tree");
          if (treeElement == null) {
            let errorText = 'Tree DOM element not found';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          /* Get a reference to the entire Fancytree. If this fails,
             build an error message and terminate the dummy loop. */
          let fancyTree = $(treeElement).fancytree("getTree");
          if (fancyTree == null) {
            let errorText = 'Null Fanctree reference returned';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          /* Get the currently active Fancytree node. If this fails,
             build an error message and terminate the dummy loop. */
          let fancyNode = fancyTree.getActiveNode();
          if (fancyNode == null) {
            let errorText = 'No active Fancytree node found';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          /* Get the node path for the currently active Fancytree
             node. This value is used to verity that a site node is
             active. */
          let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
          let nodePath = fancyNode.data[nodePathName];
          if (nodePath == null) {
            let errorText = 'Node path not obtained from active Fancytree node';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          /* We need to check for (and handle) a special case here.
             A modification node may be active at this point. If that
             is true, then we can just use the parent site node. */
          if (nodePath.length == 7) {
            fancyNode = fancyNode.parent;
            nodePath = fancyNode.data[nodePathName];
          }
          /* Use the node path length to determine if a site node
             is active. Report an error if a site node is not active. */
          if (nodePath.length != HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH')) {
            let errorText = 'Site node is not currently active';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          /* Use the node identifier values to (help) build a node to be inserted */
          let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
          let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
          HDLmMenus.handleCmd(divDescriptions,
                              divValues,
                              fancyNode,
                              'insert',
                              message);
          break;
        }
      });
    }
    /* The code below is only used in the Electron JS environment. This
       code receives messages from the main Electron JS process and
       handles them. Of course, this code can only be used with Electron
       JS. */
    /* console.log('In HDLmElectronOne.handleElectronInitialization - before isElectron()'); */
    if (HDLmUtility.isElectron()) {
      /* console.log('In HDLmElectronOne.handleElectronInitialization - after isElectron()'); */
      /* Use require to get the actual WebSocket code. This can only be
         done in the Electron JS environment. */
      /* console.log('In HDLmElectronOne.js'); */
      const WebSocket = require("ws");
      /* console.log(HDLmUtility.isElectron()); */
      /* const WebSocket = require("C:/Users/pscha/Documents/Visual_Studio_Code/Projects/ElectronJs/node_modules/ws"); */
      /* Create a local routine for handling inbound WebSocket
         connections. This routine is invoked for each connection. */
      function onConnectionWebSocket(newWebSocket) {
        /* Save the new web socket in a place where we can
           use it later. The new web socket is needed (required)
           to send response (reply) messages back to the web
           socket client that started the web socket connection. */
        HDLmElectronOne.webSocketSave = newWebSocket;
        /* Establish a message routine for handling inbound
           messages */
        newWebSocket.on('message', onMessageWebSocket);
      }
      /* Create a routine for handling inbound WebSocket messages.
         This routine is invoked for each message. This routine
         does all of the work of handling each message. */
      function onMessageWebSocket(message) {
        /* console.log('HDLmElectronOne.onMessageWebSocket', message); */
        /* Declare and define a few variables for use below */
        let nodeCopyElements = false;
        let errorDetected = false;
        let messageObj;
        let requestType;
        let urlValue;
        /* The dummy loop below is used to allow break to work */
        while (true) {
          /* Check if the message passed to this routine is a null value
             or not. We can not really handle null values (for messages)
             here. Report an error, if we have a null value. */
          if (message == null) {
            let errorText = 'Null message passed to this routine';
            HDLmUtility.setErrorText(errorText);
            errorDetected = true;
            break;
          }
          /* Check if the message passed to this routine is the 4-byte
             string, 'null'. Strangely, this can actually happen. Why
             is not clear. */
          if (message == 'null') {
            let errorText = 'Null string message passed to this routine';
            HDLmUtility.setErrorText(errorText);
            errorDetected = true;
            break;
          }
          /* Make sure the message is a valid JSON string. This is done
             using the JSON parse mechanism. If the string is not valid,
             then the JSON parse will throw an exception. */
          let jsonParseError = false;
          try {
            messageObj = JSON.parse(message);
          }
          catch (e) {
            jsonParseError = true;
          }
          if (jsonParseError) {
            let errorText = 'Message is not a valid JSON string';
            HDLmUtility.setErrorText(errorText);
            errorDetected = true;
            break;
          }
          break;
        }
        /* Check if the message has some type of error associated with it.
           We have no more work to do, if an error was detected. */
        if (errorDetected == true)
          return;
        /* Get a few values from the message object */
        if (messageObj.hasOwnProperty('HDLmCopyElements')) {
          nodeCopyElements = messageObj.HDLmCopyElements;
          delete messageObj.HDLmCopyElements;
        }
        if (messageObj.hasOwnProperty('HDLmRequestType')) {
          requestType = messageObj.HDLmRequestType;
          delete messageObj.HDLmRequestType;
        }
        if (messageObj.hasOwnProperty('HDLmUrlValue')) {
          urlValue = messageObj.HDLmUrlValue;
          delete messageObj.HDLmUrlValue;
        }
        /* console.log(requestType); */
        /* console.log(urlValue); */
        /* console.log(messageObj); */
        /* console.log(JSON.stringify(messageObj)); */
        if (messageObj.hasOwnProperty('details')) {
          if (messageObj.details.hasOwnProperty('path')) {
            let abcd = messageObj.details.path;
            /* console.log(abcd); */
          }
          /* if (messageObj.details.hasOwnProperty('pathvalue')) { */
            /* let abcd = messageObj.details.pathvalue; */
            /* console.log(abcd); */
          /* } */
        }
        /* Based on the requst type, we need to invoke a specific routine
           to handle the current message */
        switch (requestType) {
          case 'addTreeNode': {
            HDLmElectronOne.handleMessageAddTreeNode(messageObj, urlValue);
            break;
          }
          /* It doesn't look like the web socket client ever sends this
             message. It appears that the client doesn't use buildNode
             in any form. This appears to be left over from an earlier
             version of the client code. Actually it appears that
             HDLmExtensionBothManageRule_saved and HDLmExtensionBothNodeIden
             use this message. */
          case 'buildNode': {
            HDLmElectronOne.handleMessageBuildNode(messageObj, urlValue, nodeCopyElements);
            break;
          }
          /* It doesn't look like the web socket client ever sends this
             message. It appears that the client doesn't use copyNode(s)
             in any form. This appears to be left over from an earlier
             version of the client code. Actually it appears that
             HDLmExtensionBothManageRule_saved and HDLmExtensionBothNodeIden
             use this message. */
          case 'copyNode(s)': {
            HDLmElectronOne.handleMessageCopyNode(messageObj, urlValue, nodeCopyElements);
            break;
          }
          case 'deleteTreeNode': {
            HDLmElectronOne.handleMessageDeleteTreeNode(messageObj);
            break;
          }
          case 'getModPart': {
            HDLmElectronOne.handleMessageGetModPart(messageObj, urlValue);
            break;
          }
          /* It doesn't look like the web socket client ever sends this
             message. It appears that the client doesn't use getModTree
             in any form. This appears to be left over from an earlier
             version of the client code. */
          case 'getModTree': {
            HDLmElectronOne.handleMessageGetModTree(messageObj, urlValue);
            break;
          }
          /* It doesn't look like the web socket client ever sends this
             message. It appears that the client doesn't use reloadNode
             in any form. This appears to be left over from an earlier
             version of the client code. */
          case 'reloadNodes': {
            HDLmElectronOne.handleMessageReloadNodes(messageObj, urlValue);
            break;
          }
          /* It doesn't look like the web socket client ever sends this
             message. It appears that the client doesn't use updateTree
             in any form. This appears to be left over from an earlier
             version of the client code. Actually it appears that
             HDLmGEM and HDLmGXE_Saved use this message.*/
          case 'updateTree': {
            HDLmElectronOne.handleMessageUpdateTree(messageObj, urlValue);
            break;
          }
          case 'updateTreeNode': {
            HDLmElectronOne.handleMessageUpdateTreeNode(messageObj, urlValue);
            break;
          }
          /* Report an error if the request type did not match one of the expected choices */
          default: {
            let errorString = requestType;
            HDLmError.buildError('Error', 'Invalid Request Type', 51, errorString);
            break;
          }
        }
        /* What follows is a dummy loop used only to allow break to work */
        while (true) {
          break;
          /* Get the DOM element for the Fancytree. If this fails,
             build an error message and terminate the dummy loop. */
          let treeElement = document.getElementById("tree");
          if (treeElement == null) {
            let errorText = 'Tree DOM element not found';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          /* Get a reference to the entire Fancytree. If this fails,
             build an error message and terminate the dummy loop. */
          let fancyTree = $(treeElement).fancytree("getTree");
          if (fancyTree == null) {
            let errorText = 'Null Fancytree reference returned';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          /* Get the currently active Fancytree node. If this fails,
             build an error message and terminate the dummy loop.

             Actually, this is not true. We allow for the possibility
             that no Fancytree node will be active at this time. */
          let fancyNode = fancyTree.getActiveNode();
          if (fancyNode == null) {
            let errorText = 'No active Fancytree node found';
            HDLmUtility.setErrorText(errorText);
            break;
          }
          if (fancyNode != null) {
            /* Get the node path for the currently active Fancytree
               node. This value is used to verity that a site node is
               active. */
            let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
            let nodePath = fancyNode.data[nodePathName];
            if (nodePath == null) {
              let errorText = 'Node path not obtained from active Fancytree node';
              HDLmUtility.setErrorText(errorText);
              break;
            }
            /* We need to check for (and handle) a special case here.
               A modification node may be active at this point. If that
               is true, then we can just use the parent site node. */
            if (nodePath.length == 7) {
              fancyNode = fancyNode.parent;
              nodePath = fancyNode.data[nodePathName];
            }
            /* Use the node path length to determine if a site node
               is active. Report an error if a site node is not active. */
            if (nodePath.length != HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH')) {
              let errorText = 'Site node is not currently active';
              HDLmUtility.setErrorText(errorText);
              break;
            }
            /* Use the node identifier values to (help) build a node to be inserted */
            let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
            let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
            HDLmMenus.handleCmd(divDescriptions,
                                divValues,
                                fancyNode,
                                'insert',
                                message);
            HDLmElectronOne.webSocketSave.send(message);
          }
          break;
        }
      }
      /* Create a WebSocket server for handling new, inbound connections.
         Messages are sent using WebSockets with node identifier values. */
      const portNumber = HDLmConfigInfo.getPortNumberWebSocket();
      const webSocketServer = new WebSocket.Server({ port: portNumber });
      webSocketServer.on('connection', onConnectionWebSocket);
    }
  }
  /* Handle an add tree node message. The new tree node is added
     to the node tree. Intermediate (company, Rules, divsion, site)
     nodes are created as need be. Note that this routine does the
     work of updating the database. The database is not updated by
     the web page extension. This routine does not send any reply
     message. */
  static handleMessageAddTreeNode(messageObj, urlValue) {
    /* console.log('In HDLmElectronOne.handleMessageAddTreeNode'); */
    /* console.log(messageObj); */
    /* console.log(urlValue); */
    /* Check if the message object is null */
    /* messageObj.nodePath[2] = 'www.oneworldobserveratorxxx.com'; */
    /* console.log(messageObj); */
    if (messageObj == null) {
      let errorText = 'Message object passed to handleMessageAddNodeTree is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the message object is an object */
    if (typeof messageObj !== 'object') {
      let errorText = 'Message object passed to handleMessageAddNodeTree is not an object';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is null */
    if (urlValue == null) {
      let errorText = 'URL value passed to handleMessageAddNodeTree is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is a string */
    if (typeof urlValue !== 'string') {
      let errorText = 'URL value passed to handleMessageAddNodeTree is not a string';
      HDLmAssert(false, errorText);
    }
    /* The message object may or may not have a children field. This is not
       an error condition. If the children property does not exist, then we
       must add the children property here. */
    if (messageObj.hasOwnProperty('children') == false)
      messageObj.children = [];
    /* Add a tree node value to the node tree. The actual node tree has
	     several levels. The intermediate levels (company, rules, division, site)
	     may or may not exist. Create these levels if need be using the information
	     provided by the caller.

	     Add the new rule in the correct place. The higher levels may or may be
	     created by this routine. */
    let newNodePath = messageObj.nodePath;
    /* Find or create the site node that will be the parent for the
       newly created node */
    let newSiteNodePath = newNodePath.slice(0, HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH'));
    /* console.log(newSiteNodePath); */
    if (1 == 1) {
      let updateDatabaseTrue = true;
      let newSiteNode = HDLmTree.buildSiteNode(newSiteNodePath, updateDatabaseTrue, HDLmNodeTypes.rules);
      /* console.log('newSiteNode'); */
      /* console.log(newSiteNode); */
      /* console.log(newSiteNodePath); */
      if (newSiteNode == null) {
        HDLmAssertAction(false, "Null site tree node returned by buildSiteNode");
      }
    }
    /* Try to locate the parent Fancytree node */
    let parentFancytreeNode = HDLmTree.locateFancyNode(newSiteNodePath);
    /* console.log(parentFancytreeNode); */
    /* Report an error if the Fancytree node could not be found. This
       might really happen and it might be an error condition. The
       Fancytree node might not be displayed in which case the locate
       routine may return a null value. */
    if (false && parentFancytreeNode == null) {
      let nodeString = newSiteNodePath.toString();
      HDLmError.buildError('Error', 'Locate', 25, nodeString);
      return;
    }
    /* Insert the new node into the actual node tree and
       and the Fancytree */
    if (1 == 1) {
      let handlingCmdInsertFalse = false;
      let processSubNodesFalse = false;
      let updateDatabaseTrue = true;
      let usePendingInserts = true;
      HDLmMenus.insertIntoBothTrees(parentFancytreeNode, messageObj,
                                    usePendingInserts, processSubNodesFalse,
                                    updateDatabaseTrue, handlingCmdInsertFalse);
      HDLmTree.processPendingInserts();
    }
    /* We now need to add ID values to all of the nodes we may have inserted
       into the node tree */
    /* const myTimeout = setTimeout(HDLmTree.fixNodeIds, 5000); */
  }
  /* Handle a build tree node message. The new tree node is added
     to the node tree. Intermediate (company, Rules, divsion, site)
     nodes are created as need be. Note that this routine does the
     work of updating the database. The database is not updated by
     the web page extension. This routine does not send any reply
     message. */
  static handleMessageBuildNode(messageObj, urlValue, nodeCopyElements) {
    /* console.log('In HDLmElectronOne.handleMessageBuildNode'); */
    /* console.log(messageObj); */
    /* console.log(urlValue); */
    /* Check if the message object is null */
    /* messageObj.nodePath[2] = 'www.oneworldobserveratorxxx.com'; */
    /* console.log(messageObj); */
    if (messageObj == null) {
      let errorText = 'Message object passed to handleMessageBuildNode is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the message object is an object */
    if (typeof messageObj !== 'object') {
      let errorText = 'Message object passed to handleMessageBuildNode is not an object';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is null */
    if (urlValue == null) {
      let errorText = 'URL value passed to handleMessageBuildNode is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is a string */
    if (typeof urlValue !== 'string') {
      let errorText = 'URL value passed to handleMessageBuildNode is not a string';
      HDLmAssert(false, errorText);
    }
    let newSiteNode;
    /* Build a tree node value in the node tree. The actual node tree has
	     several levels. The intermediate levels (company, rules, division, site)
	     may or may not exist. Create these levels if need be using the information
	     provided by the caller.

	     Build the new rule in the correct place. The higher levels may or may be
	     created by this routine. */
    let hostName = HDLmUtility.getHostNameFromUrlWithCheck(urlValue);
    let newNodePath = [];
    newNodePath.push(HDLmDefines.getString('HDLMTOPNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMCOMPANIESNODENAME'));
    newNodePath.push(hostName);
    newNodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMDIVISIONNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMSITENODENAME'));
    /* console.log(newNodePath); */
    /* Find or create the site node that will be the parent for the
       newly created node */
    let newSiteNodePath = newNodePath.slice(0, HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH'));
    /* console.log(newSiteNodePath); */
    if (1 == 1) {
      /* Build all of the intermediate levels as need be. This call will
         update the node tree (HDLmTree) in memory and send any new nodes
         to the database as need be. */
      let updateDatabaseTrue = true;
      newSiteNode =  HDLmTree.buildSiteNode(newSiteNodePath, updateDatabaseTrue, HDLmNodeTypes.rules);
      /* console.log('newSiteNode'); */
      /* console.log(newSiteNode); */
      /* console.log(newSiteNodePath); */
      if (newSiteNode == null) {
        let errorText = 'Null site tree node returned by buildSiteNode';
        HDLmAssert(false, errorText);
      }
    }
    /* Try to locate the parent Fancytree node */
    let parentFancytreeNode = HDLmTree.locateFancyNode(newSiteNodePath);
    /* console.log(parentFancytreeNode); */
    /* Report an error if the Fancytree node could not be found. This
       might really happen and it might be an error condition. The
       Fancytree node might not be displayed in which case the locate
       routine may return a null value. */
    if (false && parentFancytreeNode == null) {
      let nodeString = newSiteNodePath.toString();
      HDLmError.buildError('Error', 'Locate', 25, nodeString);
      return;
    }
		/* We can now create the tree node for the modification rule
		   and the actual modification */
    let nodePathTree = newNodePath.slice();
    let nodeName = 'Temporary name';
    nodePathTree.push(nodeName);
    let nodeTooltip = 'Temporary tooltip';
    let nodeType = HDLmNodeTypes.mod;
    let nodeTypeStr = HDLmNodeTypes.toString(nodeType);
    let newTreeNode = new HDLmTree(nodeTypeStr, nodeTooltip);
    /* console.log(newTreeTypeStr); */
    /* console.log(newTreeNode); */
    /* console.log(newTreeNode.setNodePath); */
    /* console.log(HDLmTree); */
    /* console.log(newTreeNode); */
    /* console.log(HDLmTree.top); */
    /* Make sure the new tree node was actually created */
    if (newTreeNode == null) {
      let errorText = 'Null modification tree node returned by new tree node constructor';
      HDLmAssert(false, errorText);
    }
    /* Store a few values in the new tree node and the new modification object */
    let newModNode = HDLmElectronOne.storeTreeValues(newTreeNode, nodePathTree, messageObj);
		/* Try to obtain the new order information string from
		   the JSON object. Of course, this will only work if
		   the JSON object actually has new order information
		   in it. */
    let newOrderInfo = null;
    let  newOrderInfoKey = "HDLmOrderInfo";
    if (messageObj.hasOwnProperty(newOrderInfoKey)) {
      newOrderInfo = messageObj[newOrderInfoKey];
      delete messageObj[newOrderInfoKey];
      let newOrderInfoLength = newOrderInfo.length();
      newOrderInfo = newOrderInfo.substring(1, newOrderInfoLength - 1);
    }
	  /* We can now invoke a special routine to provide values for
	     many of the fields we could not set above. There is a
	     possible bug here. We are passing the host name, when
	     we really should be passing the URL value. */
    HDLmMenus.provideDefaultValues(HDLmOperationTypes.none,
                                   newSiteNode,
                                   newTreeNode,
                                   messageObj,
                                   urlValue,
                                   newOrderInfo,
                                   nodeCopyElements);
    /* We can now get the final name of the modification and use it */
    let newModName = newModNode.getName();
    nodePathTree[HDLmDefines.getNumber('HDLMRULESNODEPATHLENGTH')-1] = newModName;
    newTreeNode.setNodePath(nodePathTree);
    /* console.log(newTreeNode); */
    /* Insert the new node into the actual node tree and
       and the Fancytree */
    if (1 == 1) {
      let handlingCmdInsertFalse = false;
      let processSubNodesFalse = false;
      let updateDatabase = true;
      let usePendingInserts = true;
      HDLmMenus.insertIntoBothTrees(parentFancytreeNode, newTreeNode,
                                    usePendingInserts, processSubNodesFalse,
                                    updateDatabase, handlingCmdInsertFalse);
      HDLmTree.processPendingInserts();
    }
  }
  /* Handle a copy tree node message. The new tree node is added
     to the node tree. Intermediate (company, Rules, divsion, site)
     nodes are created as need be. Note that this routine does the
     work of updating the database. The database is not updated by
     the web page extension. This routine does not send any reply
     message. */
  static handleMessageCopyNode(messageObj, urlValue, nodeCopyElements) {
    /* console.log('In HDLmElectronOne.handleMessageCopyNode'); */
    /* console.log(messageObj); */
    /* console.log(nodeCopyElements); */
    /* Check if the message object is null */
    if (messageObj == null) {
      let errorText = 'Message object passed to handleMessageBuildTree is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the message object is an object */
    if (typeof messageObj !== 'object') {
      let errorText = 'Message object passed to handleMessageBuildTree is not an object';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is null */
    if (urlValue == null) {
      let errorText = 'URL value passed to handleMessageBuildTree is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is a string */
    if (typeof urlValue !== 'string') {
      let errorText = 'URL value passed to handleMessageBuildTree is not a string';
      HDLmAssert(false, errorText);
    }
    let newSiteNode;
    /* Build a tree node value in the node tree. The actual node tree has
	     several levels. The intermediate levels (company, rules, division, site)
	     may or may not exist. Create these levels if need be using the information
	     provided by the caller.

	     Build the new rule in the correct place. The higher levels may or may be
	     created by this routine. */
    let hostName = HDLmUtility.getHostNameFromUrlWithCheck(urlValue);
    let newNodePath = [];
    newNodePath.push(HDLmDefines.getString('HDLMTOPNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMCOMPANIESNODENAME'));
    newNodePath.push(hostName);
    newNodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMDIVISIONNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMSITENODENAME'));
    /* console.log(newNodePath); */
    /* Find or create the site node that will be the parent for the
       newly created node */
    let newSiteNodePath = newNodePath.slice(0, HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH'));
    /* Build all of the intermediate levels as need be. This call will
       update the node tree (HDLmTree) in memory and send any new nodes
       to the database as need be. */
    let updateDatabaseTrue = true;
    newSiteNode = HDLmTree.buildSiteNode(newSiteNodePath, updateDatabaseTrue, HDLmNodeTypes.rules);
    if (newSiteNode == null) {
      let errorText = 'Null site tree node returned by buildSiteNode';
      HDLmAssert(false, errorText);
    }
    /* Try to locate the parent Fancytree node */
    let parentFancytreeNode = HDLmTree.locateFancyNode(newSiteNodePath);
    /* console.log(parentFancytreeNode); */
    /* Report an error if the Fancytree node could not be found. This
       might really happen and it might be an error condition. The
       Fancytree node might not be displayed in which case the locate
       routine may return a null value. */
    if (false && parentFancytreeNode == null) {
      let nodeString = newSiteNodePath.toString();
      HDLmError.buildError('Error', 'Locate', 25, nodeString);
      return;
    }
		/* We can now create the tree node for the modification rule
		   and the actual modification */
    let nodePathTree = newNodePath.slice();
    let nodeName = 'Temporary name';
    nodePathTree.push(nodeName);
    let nodeTooltip = 'Temporary tooltip';
    let nodeType = 'mod';
    let newTreeNode = new HDLmTree(nodeType, nodeTooltip);
    /* Make sure the new tree node was actually created */
    if (newTreeNode == null) {
      let errorText = 'Null modification tree node returned by new tree node constructor';
      HDLmAssert(false, errorText);
    }
    /* Store a few values in the new tree node and the new modification object */
    let newModNode = HDLmElectronOne.storeTreeValues(newTreeNode, nodePathTree, {});
		/* Try to obtain the new order information string from
		   the JSON object. Of course, this will only work if
		   the JSON object actually has new order information
		   in it. */
    let newOrderInfo = null;
    let newOrderInfoKey = "HDLmOrderInfo";
    if (messageObj.hasOwnProperty(newOrderInfoKey)) {
      newOrderInfo = messageObj[newOrderInfoKey];
      delete messageObj[newOrderInfoKey];
      let newOrderInfoLength = newOrderInfo.length();
      newOrderInfo = newOrderInfo.substring(1, newOrderInfoLength - 1);
    }
	  /* We can now invoke a special routine to provide values for
	     many of the fields we could not set above. There is a
	     possible bug here. We are passing the host name, when
	     we really should be passing the URL value. */
    /* console.log(newTreeNode); */
    HDLmMenus.provideDefaultValues(HDLmOperationTypes.none,
                                   newSiteNode,
                                   newTreeNode,
                                   messageObj,
                                   urlValue,
                                   newOrderInfo,
                                   nodeCopyElements);
    /* console.log(newTreeNode); */
    /* We can now get the final name of the modification and use it */
    let newModName = newModNode.getName();
    nodePathTree[HDLmDefines.getNumber('HDLMRULESNODEPATHLENGTH') - 1] = newModName;
    newTreeNode.setNodePath(nodePathTree);
    /* console.log(newTreeNode); */
    /* Insert the new node into the actual node tree and
       and the Fancytree */
    if (1 == 1) {
      let handlingCmdInsertFalse = false;
      let processSubNodesFalse = false;
      let updateDatabaseTrue = true;
      let usePendingInserts = true;
      HDLmMenus.insertIntoBothTrees(parentFancytreeNode, newTreeNode,
                                    usePendingInserts, processSubNodesFalse,
                                    updateDatabaseTrue, handlingCmdInsertFalse);
      HDLmTree.processPendingInserts();
    }
  }
  /* Handle a delete tree node message. The tree node is deleted from
     the node tree. Note that this routine does the work of updating
     the database. The database is not updated by the web page extension.
     This routine does not send any reply message. */
  static handleMessageDeleteTreeNode(messageObj) {
    /* console.log('In HDLmElectronOne.handleMessageDeleteTreeNode'); */
    /* console.log(messageObj); */
    /* Check if the message object is null */
    if (messageObj == null) {
      let errorText = 'Message object passed to handleMessageDeleteNodeTree is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the message object is an object */
    if (typeof messageObj !== 'object') {
      let errorText = 'Message object passed to handleMessageDeleteNodeTree is not an object';
      HDLmAssert(false, errorText);
    }
    /* Make sure the inbound message has a node path */
    if (messageObj.hasOwnProperty('nodePath') == false) {
      let errorText = 'Message passed to handleMessageDeleteNodeTree does not have a node path';
      HDLmAssert(false, errorText);
    }
    /* Get the node path from the message object */
    let deleteNodePath = messageObj.nodePath;
    /* console.log(deleteNodePath); */
    /* console.log(typeof deleteNodePath); */
    /* Check if the node path value is an array */
    if (Array.isArray(deleteNodePath) == false) {
      let errorText = 'Node path value passed to handleMessageDeleteNodeTree is not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the delete node path array has the correct length */
    let deleteNodePathSize = deleteNodePath.length;
    if (deleteNodePathSize != HDLmDefines.getNumber('HDLMRULESNODEPATHLENGTH')) {
      let errorText = `Delete node path has (${deleteNodePathSize}) entries`;
      HDLmAssert(false, errorText);
    }
    /* Find the node (HDLmTree) in node tree that matches the node
       path passed by the caller */
    let deleteTreeNode = HDLmTree.locateTreeNode(deleteNodePath);
    /* console.log(deleteTreeNode); */
    /* Report an error if the node could not be found */
    if (deleteTreeNode == null) {
      let nodeString = deleteNodePath.toString();
      console.log('In handleMessageDeleteTreeNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Try to locate the Fancytree node */
    let deleteFancytreeNode = HDLmTree.locateFancyNode(deleteNodePath);
    /* console.log(deleteFancytreeNode); */
    /* Report an error if the Fancytree node could not be found. This
       might really happen and it might be an error condition. The
       Fancytree node might not be displayed in which case the locate
       routine may return a null value. */
    if (false && deleteFancytreeNode == null) {
      let nodeString = deleteNodePath.toString();
      HDLmError.buildError('Error', 'Locate', 25, nodeString);
      return;
    }
    /* Delete the tree node value from the node tree */
    HDLmTree.deleteTreeNode(deleteFancytreeNode, deleteTreeNode);
  }
  /* Handle a get mod part message. The reply to this message is a
     string with the exact format of the string returned by the
     database in response to a request for all of the rows. */
  static handleMessageGetModPart(messageObj, urlValue) {
    /* console.log('In HDLmElectronOne.handleMessageGetModPart'); */
    /* Declare and define a few variables */
    let responseObj = {};
    let responseData = [];
    let infoArray = []
    let rowCount;
    let treeTop = HDLmTree.getTreeTop();
    /* The information array can be built from the node tree */
    HDLmTree.buildInfoArray(infoArray, treeTop);
    let infoArraySize = infoArray.length;
    let contentStr = HDLmUtility.getContentString();
    for (let i = 0; i < infoArraySize; i++) {
      /* Create an empty data object */
      let dataObj = {};
      let infoEntry = infoArray[i];
      let infoObj = JSON.parse(infoEntry);
      /* console.log(infoObj.hasOwnProperty('details')); */
      /* console.log(infoObj); */
      if (infoObj.hasOwnProperty('details')) {
        if (infoObj.details.hasOwnProperty('path')) {
          /* console.log(infoObj.details.hasOwnProperty('path')); */
          infoObj.details.pathvalue = infoObj.details.path;
          delete infoObj.details.path;
          infoEntry = JSON.stringify(infoObj);
        }
      }
      /* console.log(infoObj); */
      /* Extract the node path */
      let nodePath = infoObj.nodePath;
      /* Get the name string */
      let nameStr = nodePath[nodePath.length - 1];
      /* Add a few properties to the data object */
      dataObj.content = contentStr;
      dataObj.info = infoEntry;
      dataObj.name = nameStr;
      responseData.push(dataObj);
    }
    /* Add a few properties to the response object */
    let commentsStr = 'io for a table';
    responseObj.comments = commentsStr;
    responseObj.rows_returned = infoArraySize;
    responseObj.retcode = 1;
    responseObj.data = responseData;
    let responseStr = JSON.stringify(responseObj);
    HDLmElectronOne.webSocketSave.send(responseStr);
    /* console.log(responseStr); */
  }
  /* Handle a get mod tree message. The reply to this message is a
     string with the exact format of the string returned by the
     database in response to a request for all of the rows.

     It doesn't look like the web socket client ever sends this
     message. It appears that the client doesn't use getModTree
     in any form. This appears to be left over from an earlier
     version of the client code.

     Note the use of HDLmTreeTypes.MOD below. This is probably
     obsolete code at this point in time. */
  static handleMessageGetModTree(messageObj, urlValue) {
    /* console.log('In HDLmElectronOne.handleMessageGetModTree'); */
    /* Build a JSON element with the entire rule tree and more */
    let contentType = HDLmTreeTypes.MOD.toString();
    let getJsonHostName = null;
    let responseObj = HDLmMod.getJsonTreePassThru(contentType, getJsonHostName);
    if (responseObj == null) {
      let errorText = "JSON top element not returned from getJsonTreePassThru";
      HDLmAssert(false, errorText);
    }
    responseObj.HDLmRequestType = 'getModTree';
    let responseStr = JSON.stringify(responseObj);
    HDLmElectronOne.webSocketSave.send(responseStr);
  }
  /* Handle a reload nodes message. This message was used to
     reload all of the tree (HDLmTree) nodes.

     It doesn't look like the web socket client ever sends this
     message. It appears that the client doesn't use reloadNode
     in any form. This appears to be left over from an earlier
     version of the client code. */
  static handleMessageReloadNodes(messageObj, urlValue) {
    /* console.log('In HDLmElectronOne.handleMessageReloadNodes'); */
  }
  /* Handle an update tree message. This message was used to
     update the tree (HDLmTree) of nodes.

     It doesn't look like the web socket client ever sends this
     message. It appears that the client doesn't use updateTree
     in any form. This appears to be left over from an earlier
     version of the client code. */
  static handleMessageUpdateTree(messageObj, urlValue) {
    /* console.log('In HDLmElectronOne.handleMessageUpdateTree'); */
  }
  /* Handle an update tree node message. An existing tree node
     is updated in the node tree. The database is updated as
     well. Note that this routine does the work of updating
     the database. The database is not updated by the web page
     extension. This routine does not send any reply message. */
  static handleMessageUpdateTreeNode(messageObj, urlValue) {
    /* console.log('In HDLmElectronOne.handleMessageUpdateTreeNode'); */
    /* console.log(messageObj); */
    /* console.log(urlValue); */
    /* Check if the message object is null */
    /* messageObj.nodePath[2] = 'www.oneworldobserveratorxxx.com'; */
    /* console.log(messageObj); */
    if (messageObj == null) {
      let errorText = 'Message object passed to handleMessageUpdateTreeNode is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the message object is an object */
    if (typeof messageObj !== 'object') {
      let errorText = 'Message object passed to handleMessageUpdateTreeNode is not an object';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is null */
    if (urlValue == null) {
      let errorText = 'URL value passed to handleMessageUpdateTreeNode is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the URL string value is a string */
    if (typeof urlValue !== 'string') {
      let errorText = 'URL value passed to handleMessageUpdateTreeNode is not a string';
      HDLmAssert(false, errorText);
    }
    /* The message object may or may not have a children field. This is not
       an error condition. If the children property does not exist, then we
       must add the children property here. */
    if (messageObj.hasOwnProperty('children') == false)
      messageObj.children = [];
    /* Find the node (HDLmTree) in node tree that matches the node
       passed by the caller */
    let targetTreeNode = HDLmTree.locateTreeNode(messageObj.nodePath);
    /* console.log(targetTreeNode); */
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = messageObj.nodePath.toString();
      console.log('In handleMessageUpdateTreeNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* The details sent by the client must replace the existing
       details */
    targetTreeNode.details = messageObj.details;
    /* console.log(targetTreeNode); */
    /* At this point each modified node must be updated in the
       database server */
    let processSubNodesFalse = false;
    HDLmTree.addPendingUpdates(targetTreeNode, processSubNodesFalse);
    /* At this point we can send all of the pending updates to the
       database server */
    HDLmTree.processPendingUpdates();
  }
  /* This routine stores a set of values in a modification (and HDLmMod)
     that are needed later. These values prevent various display errors
     and console errors. */
  static storeModificationValues(newModNode, messageObj) {
    /* console.log('In HDLmElectronOne.storeModificationValues'); */
    if (!newModNode.hasOwnProperty('comments'))
      newModNode.setComments('');
    if (!newModNode.hasOwnProperty('cssselector'))
      newModNode.setCssSelector('');
    newModNode.setEnabled(true);
    newModNode.setExtra('');
    newModNode.setNodeIden(messageObj);
    if (!newModNode.hasOwnProperty('find'))
      newModNode.setFinds([]);
    if (!newModNode.hasOwnProperty('xpath'))
      newModNode.setXPath('');
  }
  /* This routine stores a set of values in a tree node (and HDLmTree)
     that are needed later. This routine returns the new modification
     node (and HDLmMod) that this routine creates. */
  static storeTreeValues(newTreeNode, newNodePath, messageObj) {
    /* console.log('In HDLmElectronOne.storeTreeValues'); */
    /* Store the node path in the node tree (HDLmTree) instance */
    newTreeNode.setNodePath(newNodePath);
    /* We can now create the modification rule structure */
    let newModNode = new HDLmMod();
    /* console.log(newModNode); */
    HDLmElectronOne.storeModificationValues(newModNode, messageObj);
    newTreeNode.setDetails(newModNode);
    return newModNode;
  }
}
/* The field below is used to save the current web socket
   passed to the web socket open routine */
HDLmElectronOne.webSocketSave = null;
/* Run the Electron initialization function */
HDLmElectronOne.handleElectronInitialization();