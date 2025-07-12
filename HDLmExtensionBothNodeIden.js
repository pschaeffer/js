/**
 * HDLmExtensionBothNodeIden short summary.
 *
 * HDLmExtensionBothNodeIden description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmExtensionBothNodeIden class is not used to create any objects.
   However, it does contain code for creating and handling the node
   identifier extension menu entry and other related menu entries. */
class HDLmExtensionBothNodeIden {
  /* The method below adds a new set of order information to the
     order array, if the order information is new */
  static addOrderInformation(orderArray, currentElement) {
    let orderArrayIndexOf = orderArray.indexOf(currentElement);
    /* Check if order information has already been added to the order
       information array. Remove the existing, order information if
       need be. */
    if (orderArrayIndexOf >= 0)
      orderArray.splice(orderArrayIndexOf, 1);
    orderArray.push(currentElement);
  }
  /* Add a new style property change to the array of style property
     changes. We keep track of the target DOM element and the style
     that was added. We need Fire pieces of information to remove
     the style(s) later. */
  static addStylePropertyToModifiedNodes(modifiedNodes, targetElement, property) {
    /* Declare and define a few variable */
    let modifiedNode = new Object();
    /* Add the property values */
    modifiedNode.element = targetElement;
    modifiedNode.style = property;
    modifiedNodes.push(modifiedNode);
  }
  /* Check if the current web page has a certain variable set. If this
     variable has already been set, then the current web page may have
     already been modified (in other words, rules may have been run
     against the current page). Return true if the web page may have
     been modified. Return false, if the web page appears not to have
     been modified. */
  static checkPage() {
    /* Declare and define a few local variables */
    let rv = false;
    if ((typeof window.wrappedJSObject) == 'undefined')
      return rv;
    /* Check if a specific variable has been set. If this variable
       has been set, then the current web page may have been modified. */
    if ((typeof window.wrappedJSObject.HDLmCheckVariable) == 'boolean') {
      let alertStr = `Web page may have already been modified by modifications`;
      alert(alertStr);
      rv = true;
    }
    return rv;
  }
  /* This method gets and checks the parent element of a set of
     elements */
  static checkParentElement(elementArray) {
    let rv = null;
    /* Make sure the element array passed to this routine has at least
       two entries */
    let elementArrayLen = elementArray.length;
    if (elementArrayLen < 2) {
      let errorText = `Element array only has (${elementArrayLen}) entries`;
      HDLmError.buildError('Error', 'Array', 43, errorText);
      return rv;
    }
    /* Get the parent of the first two elements */
    let firstElement = elementArray[0];
    let secondElement = elementArray[1];
    let parentElement = HDLmHtml.getParentElement(firstElement, secondElement);
    if (parentElement == null) {
      let errorText = `Parent element is null`;
      HDLmError.buildError('Error', 'Parent', 44, errorText);
      return rv;
    }
    let parentElementTag = parentElement.tagName;
    let parentElementTagLower = parentElementTag.toLowerCase();
    /* The check below has been disabled for now. The parent element
       is the BODY element in some cases. */
    if (false && (parentElementTagLower == 'html' ||
                  parentElementTagLower == 'body' ||
                  parentElementTagLower == 'head')) {
      let errorText = `Parent element tag name (${parentElementTag}) is invalid`;
      HDLmError.buildError('Error', 'Tag', 45, errorText);
      return rv;
    }
    /* Check if parent element found above is also the parent element of all
       of the other elements (if any) */
    for (let i = 2; i < elementArrayLen; i++) {
      let nextElement = elementArray[i];
      let nextParent = HDLmHtml.getParentElement(firstElement, nextElement);
      if (nextParent == null) {
        let errorText = `Next parent element is null`;
        HDLmError.buildError('Error', 'Parent', 44, errorText);
        return rv;
      }
      /* Check if the new parent element is the same as the old one */
      if (parentElement != nextParent) {
        let errorText = `Next parent element does not match old parent element`;
        HDLmError.buildError('Error', 'Parent', 46, errorText);
        return rv;
      }
    }
    /* Return the final parent element to the caller */
    rv = parentElement;
    return rv;
  }
  /* This routine gets a set of order information from a parent element
     and a set of child elements. The order information is returned to
     the caller as a string. The child elements need not be direct
     children of the parent element. */
  static getOrderInformation(parentElement, childElements) {
    let rv = '';
    let childElmentsLen = childElements.length;
    /* Process each of the child elements */
    for (let i = 0; i < childElmentsLen; i++) {
      /* Add a separtor comma, if need be */
      if (rv != '')
        rv += ',';
      /* Handle the current child element */
      let childElement = childElements[i];
      /* Try to get the child element number for the current child element */
      let childNumber = HDLmHtml.getChildNumber(parentElement, childElement);
      if (childNumber == null) {
        let errorText = `Child number not found for child element`;
        HDLmError.buildError('Error', 'Child', 47, errorText);
        return null;
      }
      /* Add the current child element number to the return value */
      rv += childNumber.toString();
    }
    return rv;
  }
  /* Get the target from the current event. This is the current HTML
     element where the event occurred. */
  static getTargetFromEvent(event) {
    /* Check if the current event has a target property. If a target
       property is available, use it to set the current target. */
    if (('target' in event) == false)
      return null;
    else
      return event.target;
  }
  /* The click event listener, where we perform the appropriate action given the
     ID of the menu item that was clicked. This event only occurs in background
     scripts. Of course, backgound scripts can not directly access the DOM or
     use the alert mechanism. As a consequence, the main thing this method does
     is to send a message to the content script. */
  static onClickedBack(info, tab) {
    /* console.log('In HDLmExtensionBothNodeIden.onClickedBack'); */
    /* console.log(info); */
    /* console.log(tab); */
    /* Check for a couple of values that force a quick exit
       from this routine */
    if (info.menuItemId != 'Build Node Identifier' &&
        info.menuItemId != 'Build/Modify Changes'  &&
        info.menuItemId != 'Add Order Information' &&
        info.menuItemId != 'Copy Element(s) Contents')
      return;
    /* In some cases, we can not really handle a background
       event. If we are running under Firefox and we did not
       get the target element, then we need to give up. */
    let browserName = HDLmHtml.getBrowserName();
    if (browserName == 'Firefox') {
      if (info.hasOwnProperty('targetElementId') == false)
        return;
      let sending = browser.tabs.sendMessage(tab.id, info);
    }
    /* We must be running under the Chrome browser */
    else {
      /* Send the message to the current window */
      chrome.tabs.sendMessage(tab.id, info);
    }
  }
  /* The click event listener, where we keep track of where a click
     took place. This event only occurs in content scripts. Of course,
     content scripts can directly access the DOM and can use the alert
     mechanism.  */
  static onClickedContent(event) {
    /* console.log('In onClickedContent'); */
    /* console.log(event); */
    /* Get the HTML current element where the click occurred */
    HDLmExtensionBothNodeIden.contentEventTarget = HDLmExtensionBothNodeIden.getTargetFromEvent(event);
  }
  /* This method is the connect event handler. This method
     is invoked when a connect event occurs. This method
     does all of the work needed to handle a connect event.
     This routine runs in a background script and it not
     actually used. */
  static onConnectBack(connectPort) {
    /* console.log('In onConnectBack'); */
    /* console.log(connectPort); */
  }
  /* This method is the context menu event handler. This method
     is invoked when a context menu event occurs. This method
     does all of the work needed to handle a context menu event.
     What this means is that when a user right clicks on a web
     page, this code gets run. */
  static onContextMenuContent(event) {
    /* console.log('In onContextMenuContent', event); */
    /* Get the HTML current element where the click occurred */
    HDLmExtensionBothNodeIden.contentEventTarget = HDLmExtensionBothNodeIden.getTargetFromEvent(event);
    /* Check if the current web page has already had rules run against it */
    if (HDLmExtensionBothNodeIden.checkPage()) {
      HDLmExtensionBothNodeIden.resetNodeValues();
      return;
    }
    /* Put all of the code below in a try block so that errors
       can be caught and reported */
    try {
      /* let jsonStr = HDLmNodeIden.getNodeIdentifier(event.target); */
      /* console.log('In onContextMenuContent', jsonStr); */
    }
    catch (errorObj) {
      HDLmError.reportError(errorObj, 'onContextMenuContent');
    }
  }
  /* Called when the item has been created, or when creation failed due to an error.
     We'll just log success/failure here. */
  static onCreatedBack() {
    /* console.log('In onCreatedBack'); */
    if (browser.runtime.lastError) {
      console.log(`Error: ${browser.runtime.lastError}`);
    }
    else {
      console.log("Item created successfully");
    }
  }
  /* Called when there was an error. We'll just log the error here. */
  static onErrorBack(error) {
    /* console.log('In onErrorBack'); */
    /* console.log(error); */
    console.log(`Error: ${error}`);
  }
  /* This method is the message event handler. This method is invoked
     when a message event occurs. This method does all of the work needed
     to handle a message event. The message value is stored in a class
     static variable. This method runs in the background. This message
     handler isn't really needed because no messages are sent to the
     background script. The reverse is not true. The background script
     definitely sends messages to the content script. */
  static onMessageBack(message) {
    /* console.log('In onMessageBack'); */
    /* console.log(message); */
  }
  /* This method is the message event handler. This method is invoked
     when a message event occurs. This method does all of the work needed
     to handle a message event. The message value is stored in a class
     static variable. The method runs as part of a content script. */
  static onMessageContentOneTime(message, sender, sendResponse) {
    /* console.log('s3'); */
    /* console.log('In onMessageContentOneTime', message, sender, sendResponse); */
    /* This routine is invoked to handle a variety of messages. We must
       check the menu item ID to determine what type of processing is
       needed. */
    let itemId = message.menuItemId;
    /* Put all of the code below in a try block so that errors
       can be caught and reported */
    try {
      switch (itemId) {
        /* Add some node order information, if need be */
        case 'Add Order Information': {
          /* Get the current element from the message. The approach used
             depends on that browser we are using. For Firefox this is
             easy. For Chrome less so. */
          let browserName = HDLmHtml.getBrowserName();
          let currentElement;
          if (browserName == 'Firefox')
            currentElement = document.activeElement;
          else
            currentElement = HDLmExtensionBothNodeIden.contentEventTarget;
          /* Save the target DOM element in an array. These DOM
             elements are (may be) used to build node order rules
             later. Note that the call below identifies duplicate
             target entries and ignores them. */
          let orderArray = HDLmExtensionBothNodeIden.contentNodeElements;
          HDLmExtensionBothNodeIden.addOrderInformation(orderArray, currentElement);
          /* console.log(orderArray); */
          break;
        }
        /* Build a set of node identifier values, if need be. The node
           identifier values may be a general node identifier or it may
           be for building an order rule. */
        case 'Build Node Identifier': {
          /* console.log('s4'); */
          /* console.log('Handling Build Node Identifier'); */
          /* console.log(itemId); */
          /* Get the current element from the message. The approach used
             depends on that browser we are using. For Firefox this is
             easy. For Chrome less so. */
          let browserName = HDLmHtml.getBrowserName();
          let currentElement;
          if (browserName == 'Firefox')
            currentElement = document.activeElement;
          else
            currentElement = HDLmExtensionBothNodeIden.contentEventTarget;
          /* console.log('s5'); */
          /* console.log(currentElement); */
          let jsonStr = HDLmNodeIden.getNodeIdentifier(currentElement);
          /* console.log('s6'); */
          /* console.log(jsonStr); */
          /* Check if the JSON string is really a JSON string. In some cases,
             error messages are stored in the JSON string. */
          /* console.log('Handling Build Node Identifier'); */
          /* console.log('About to display a JSON string 1'); */
          if (typeof(jsonStr)   == 'string' &&
              jsonStr.length    > 0         &&
              jsonStr.charAt(0) != '{') {
            /* console.log('About to display a JSON string 2'); */
            /* console.log(jsonStr); */
            /* Write the JSON string to the console so that we can see it */
            alert(jsonStr);
            HDLmExtensionBothNodeIden.resetNodeValues();
            break;
          }
          /* console.log(itemId); */
          /* Check if we need to (can) build an order rule */
          /* console.log('s1'); */
          let nodeElementsLength = HDLmExtensionBothNodeIden.contentNodeElements.length;
          /* console.log('s2'); */
          /* console.log(nodeElementsLength); */
          if (nodeElementsLength > 0) {
            /* We must have at least two node elements to determine order information */
            if (nodeElementsLength < 2) {
              let alertStr = `At least two DOM elements are needed to build an order rule`;
              alert(alertStr);
              HDLmExtensionBothNodeIden.resetNodeValues();
              break;
            }
            /* console.log(itemId); */
            /* We must check for duplicate DOM elements at this point */
            let rvDuplicates = HDLmUtility.checkDuplicates(HDLmExtensionBothNodeIden.contentNodeElements);
            if (rvDuplicates == true) {
              let alertStr = `All DOM elements must be unique to build an order rule`;
              alert(alertStr);
              HDLmExtensionBothNodeIden.resetNodeValues();
              break;
            }
            /* console.log(itemId); */
            /* Try to get the parent element for all of the DOM elements we
               have collected so far */
            let nodeElements = HDLmExtensionBothNodeIden.contentNodeElements;
            /* console.log(nodeElements); */
            let parentElement = HDLmExtensionBothNodeIden.checkParentElement(nodeElements);
            /* console.log(parentElement); */
            if (parentElement == null)
              break;
            /* Get some JSON for the current parent element */
            jsonStr = HDLmNodeIden.getNodeIdentifier(parentElement);
            /* Convert the JSON string back to an object so we can add the order
               information */
            let nodeIden = JSON.parse(jsonStr);
            let orderInfo = HDLmExtensionBothNodeIden.getOrderInformation(parentElement, nodeElements);
            if (orderInfo == null)
              break;
            /* console.log(itemId); */
            nodeIden['HDLmOrderInfo'] = orderInfo;
            jsonStr = JSON.stringify(nodeIden);
            /* console.log(jsonStr); */
            /* console.log('Handling Build Node Identifier', jsonStr); */
          }
          /* console.log(itemId); */
          /* Open a connnection to another process */
          /* console.log('About to display a JSON string', jsonStr); */
          /* jsonStr = jsonStr.replaceAll('\n', ''); */
          /* let jsonHex = jsonStr.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(""); */
          /* console.log(jsonHex); */
          /* Write the JSON string to the console so that we can see it */
          /* console.log(jsonStr); */
          alert(jsonStr);
          HDLmWebSockets.sendCurrentRequest(jsonStr, 'buildNode'); 
          break
        }
        /* Add a new window, if need be. This code runs as part of the
           content script. That means that it can not do much. We just
           ignore the message here. */
        case 'Build/Modify Changes': {
          /* Get the current element from the message. The approach used
             depends on that browser we are using. For Firefox this is
             easy. For Chrome less so. */
          let browserName = HDLmHtml.getBrowserName();
          let currentElement;
          if (browserName == 'Firefox')
            currentElement = document.activeElement;
          else
            currentElement = HDLmExtensionBothNodeIden.contentEventTarget;
          /* Build a node identifier JSON string for the current node.
             The value is used below to try to find an existing rule
             or to build a new rule. */
          let nodeIdenJsonStr = HDLmNodeIden.getNodeIdentifier(currentElement);
          /* Build the essentially fixed set of CSS rules and the button area */
          HDLmGEM.buildCSSRules();
          HDLmGEM.buildButtonArea(currentElement);
          /* Get all of the modifications from the server */
          let newPromise = HDLmWebSockets.getModifications()
          newPromise.then(function (response) {
            HDLmGEM.updateRuleTree(response,
                                   window.location.href,
                                   currentElement,
                                   nodeIdenJsonStr);
          }, function (error) {
            HDLmError.buildError('Error', 'Get modifications failure', 52, error);
          });
          break;
        }
        /* Get some JSON from the current HTML node */
        case 'Copy Element(s) Contents': {
          /* Get the current element from the message. The approach used
             depends on that browser we are using. For Firefox this is
             easy. For Chrome less so. */
          let browserName = HDLmHtml.getBrowserName();
          let currentElement;
          if (browserName == 'Firefox')
            currentElement = document.activeElement;
          else
            currentElement = HDLmExtensionBothNodeIden.contentEventTarget;
          /* Get the current element from the message */
          /* Get an object that contains the entire current element. Convert the
             object to JSON. */
          let recursionWantedTrue = true;
          let elementObj = HDLmHtml.buildObjectFromNode(currentElement, recursionWantedTrue);
          /* The code for using the computed style has been disabled for now.
             Of course, this code could be used in the future. */
          if (1 == 2) {
            /* Get the specified styles for the current HTML element and the
               computed CSS styles. The computed CSS styles are all of the
               styles that apply to the current HTML element. Of course, most
               of these styles are probably inherited from actual CSS styles
               and are not specified inline. Combine them and build a string
               with all of the CSS style information. */
            let styleObject = HDLmHtml.getStyleObject(currentElement);
            let computedStyleObject = HDLmHtml.getComputedStyle(currentElement);
            let mergeObject = HDLmUtility.mergeObjects(styleObject, computedStyleObject);
            let mergeStr = HDLmString.buildStringFromObject(mergeObject, ':', ';');
            /* Add the style to the current element as need be */
            if (!elementObj.hasOwnProperty('attributes'))
                elementObj['attributes'] = {};
            elementObj.attributes.style = mergeStr;
          }
          /* At this point, we may want to make some changes to JSON object.
             If the JSON uses some class values, then they need to be removed. */
          if (elementObj.hasOwnProperty('attributes')) {
            /* console.log('In HDLmExtensionBothNodeIden.onMessageContentOneTime'); */
            /* console.log(elementObj.attributes); */
            HDLmNodeIden.updateClassField(elementObj.attributes);
          }
          /* Convert the object to JSON */
          let elementJson = JSON.stringify(elementObj);
          /* Save the JSON where it can be sent to another application */
          elementJson = HDLmUtility.updateJsonStr(elementJson, 'HDLmRequestType', 'copyNode(s)');
          let valueStrJson = true;
          elementJson = HDLmUtility.updateJsonStr(elementJson, 'HDLmCopyElements', valueStrJson);
          elementJson = HDLmUtility.updateJsonStr(elementJson, 'HDLmUrlValue', window.location.href);
          /* console.log('In Copy Element(s) Contents', elementJson); */
          HDLmWebSockets.contentSendValue.push(elementJson);
          /* Open a connnection to another process. This will cause the
             JSON to be sent to another application. */
          let webSocketsMessageCallbackNull = null;
          HDLmWebSockets.openWebSocketConnection(webSocketsMessageCallbackNull);
          break;
        }
        /* Check if the caller is asking for the current document to be
           reloaded. This must be done by a content script because only
           content scripts have access to the actual web page. This code
           may not really be in use. A different mechanism (see the code
           that assigns window.location.href to itself) is used in some
           cases. */
        case 'Reload Current Document': {
          /* console.log('In onMessageContentOneTime', 'Reload Current Document'); */
          document.location.reload();
          let response = 'OK';
          sendResponse(response);
          break;
        }
        default: {
          let errorText = 'Invalid menu item ID value - ' + itemId;
          HDLmError.buildError('Error', 'ItemId', 42, errorText);
          break;
        }
      }
    }
    catch (errorObj) {
      /* console.log(errorObj); */
      HDLmError.reportError(errorObj, 'onMessageContentOneTime');
    }
  }
  /* This method is invoke when a mouse down event occurs anywhere in
     a document */
  static onMouseDownContent(event) {
    /* console.log('In onMouseDownContent'); */
    /* console.log(event); */
    let newStyle = '';
    /* Check if the current web page has already had rules run against it */
    if (HDLmExtensionBothNodeIden.checkPage()) {
      HDLmExtensionBothNodeIden.resetNodeValues();
      return;
    }
    /* Remove all style properties that have been set so far */
    HDLmExtensionBothNodeIden.removeAddedStyleModifiedNodes(HDLmExtensionBothNodeIden.contentModifiedNodes);
    newStyle = 'border:1px solid red';
    HDLmUtility.addStyleProperty(event.target, newStyle);
    HDLmExtensionBothNodeIden.addStylePropertyToModifiedNodes(HDLmExtensionBothNodeIden.contentModifiedNodes,
      event.target,
      newStyle);
    newStyle = 'background:lightblue';
    HDLmUtility.addStyleProperty(event.target, 'background:lightblue');
    HDLmExtensionBothNodeIden.addStylePropertyToModifiedNodes(HDLmExtensionBothNodeIden.contentModifiedNodes,
      event.target,
      newStyle);
  }
  /* This method is invoke when a mouse up event occurs anywhere in
     a document */
  static onMouseUpContent(event) {
    /* console.log('In onMouseUpContent'); */
    /* console.log(event); */
    /* Check if the current web page has already had rules run against it */
    if (HDLmExtensionBothNodeIden.checkPage()) {
      HDLmExtensionBothNodeIden.resetNodeValues();
      return;
    }
    /* Remove all style properties that have been set so far */
    HDLmExtensionBothNodeIden.removeAddedStyleModifiedNodes(HDLmExtensionBothNodeIden.contentModifiedNodes);
  }
  /* Called when the item has been removed. We'll just log success here. */
  static onRemovedBack() {
    console.log("Item removed successfully");
  }
  /* Remove a set of specific CSS properties from the inline styles
     for a set of HTML elements. The number of properties to be removed
     may be zero, one, or more than one. The properties to be removed
     are removed in LIFO order. In other words, the last added property
     is the first one to be removed. This routine removes all of the
     properties in the array passed to it. */
  static removeAddedStyleModifiedNodes(modifiedNodes) {
    /* Declare and define a few variable */
    let ModifiedNodesLength = modifiedNodes.length;
    /* Remove each property */
    while (true) {
      let modifiedNode = modifiedNodes.pop();
      if ((typeof modifiedNode) == 'undefined')
        break;
      /* Remove the lst added tyle property */
      let modifiedElement = modifiedNode.element;
      let modifiedStyle = modifiedNode.style;
      HDLmExtensionBothNodeIden.removeAddedStyleProperty(modifiedElement, modifiedStyle);
    }
  }
  /* Remove a specific CSS property from the inline style for an HTML
     element. If the style has nothing left, just remove the style
     attribute from the HTML element. Otherwise, store the updated
     style with property removed. Note that this code assumes that
     the property in question will be the last style property and
     that the property will be preceeded by a semicolon. If the
     passed property is found and removed, this routine returns
     true. Otherwise, this ruotine returns false. */
  static removeAddedStyleProperty(targetElement, property) {
    /* Declare and define a few variable */
    let rv = false;
    let propertyLength = property.length;
    /* Get the existing inline style, if any */
    let targetStyle = HDLmHtml.getStyleString(targetElement);
    if (targetStyle == null)
      return rv;
    let targetStyleLength = targetStyle.length;
    /* Search for the last occurrence of property in the style */
    let lastIndex = targetStyle.lastIndexOf(property);
    if (lastIndex < 0)
      return rv;
    /* We should have a semicolon just before the property */
    lastIndex -= 1;
    if (lastIndex < 0)
      return rv;
    /* Check if we should just remove the style property */
    if (lastIndex == 0 &&
      (propertyLength + 1) == targetStyleLength) {
      targetElement.removeAttribute('style');
      rv = true;
      return rv;
    }
    /* Remove the property from the style and store the updated
       style */
    let newTargetStyle = targetStyle.substring(0, lastIndex) +
      targetStyle.substring(lastIndex + 1 + propertyLength);
    targetElement.setAttribute('style', newTargetStyle);
    /* Set the return value and return to the caller */
    rv = true;
    return rv;
  }
  /* The next routine resets a set (group) of fields that should
     be reset together */
  static resetNodeValues() {
    HDLmWebSockets.resetWebSockets();
    HDLmExtensionBothNodeIden.contentNodeElements = [];
  }
  /* The startup method is invoked to do all of the work needed to
     to add a new item to the context menu */
  static startup() {
    /* console.log('In HDLmExtensionBothNodeIden.startup'); */
    /* Check if we are running outside of the normal browser environment.
       If we are, then no real startup is possible. Just return to the
       caller. This code is sometimes copied/used in places outside of
       a browser. This function will only work inside a browser. */
    if ((typeof browser) == 'undefined' &&
      (typeof chrome) == 'undefined')
      return;
    /* For some reason, 'chrome' is defined when we are running under
       Chrome (which really makes sense), but the call to get the
       current browser name does not work (which does not make sense).
       This happens when this code is just running, but not as part
       of either a background or content script. */
    if ((typeof browser) == 'undefined' &&
      (typeof chrome) != 'object')
      return;
    /* Get the current browser name (really type of browser). Much of
       the code depends on knowing what type of browser we are running
       under. This should not be true, but is true. */
    let browserName = HDLmHtml.getBrowserName();
    /* Declare and define a few local variables */
    let rv;
    /* Check the current environment. We may be running as a content
       script of we may be running as a background script. Set a
       variable showing the current environment. */
    let curEnv = 'content';
    /* Check if we are running Firefox vs. Chrome. The detection
       approach is quite different for either. */
    if (browserName == 'Firefox') {
      if ((typeof browser.menus.create) == 'function')
        curEnv = 'background';
    }
    /* If the browser name is not 'Firefox', then we will assume
       that we are running under Chrome */
    else {
      /* This is a dummy test (always true) to avoid extension
         loading problems. */
      if (1 == 1) {
        if ((typeof chrome.contextMenus) != 'undefined')
          curEnv = 'background';
      }
    }
    /* Add an event listener for content scripts. This event
       listener only works as part of content scripts. The
       'event' occurs each time right-click action is taken. */
    if (curEnv == 'content') {
      let useCaptureTrue = true;
      document.addEventListener("mousedown", HDLmExtensionBothNodeIden.onMouseDownContent, useCaptureTrue);
      document.addEventListener("mouseup", HDLmExtensionBothNodeIden.onMouseUpContent, useCaptureTrue);
      if (browserName == 'Firefox') {
        document.addEventListener("click", HDLmExtensionBothNodeIden.onClickedContent, useCaptureTrue);
        try {
          browser.browserAction.onClicked.addListener(HDLmExtensionBothHideShowAlterRules.onClickedContent);
        }
        catch (errorObj) {
          console.log(errorObj);
        }
        document.addEventListener("contextmenu", HDLmExtensionBothNodeIden.onContextMenuContent, useCaptureTrue);
        browser.runtime.onMessage.addListener(HDLmExtensionBothNodeIden.onMessageContentOneTime);
      }
      if (browserName == 'Chrome') {
        /* console.log('In Chrome'); */
        document.addEventListener("click", HDLmExtensionBothNodeIden.onClickedContent, useCaptureTrue);
        document.addEventListener("contextmenu", HDLmExtensionBothNodeIden.onContextMenuContent, useCaptureTrue);
        document.addEventListener('contextmenu', HDLmExtensionBothNodeIden.onContextMenuContent);
        /* We only want to add the message routine as a listener if the
           addListener API really exists. For some weird reason it doesn't
           always exist. As a consequence we must check if the API really
           exists before we try to use it. Note that this appears to be a
           startup problem. This code appears to run twice. The second time
           the API is available and is used. */
        if ((typeof chrome) != 'undefined' &&
          chrome.hasOwnProperty('runtime') &&
          chrome.runtime.hasOwnProperty('onMessage') &&
          chrome.runtime.onMessage.hasOwnProperty('addListener')) {
          chrome.runtime.onMessage.addListener(HDLmExtensionBothNodeIden.onMessageContentOneTime);
        }
      }
    }
    /* Create all of the context menu items. This code only works
       in background scripts. The required context menu entries
       are created below. */
    if (curEnv == 'background') {
      /* Check if the current browser is Firefox */
      if (browserName == 'Firefox') {
        /* Add the menu entry for building a general node identifier */
        browser.menus.create({
          id: "Build Node Identifier",
          title: "Build Node Identifier",
          contexts: ["all"]
        }, HDLmExtensionBothNodeIden.onCreatedBack);
        /* Add the menu entry for building a new window */
        browser.menus.create({
          id: "Build/Modify Changes",
          title: "Build/Modify Changes",
          contexts: ["all"]
        }, HDLmExtensionBothNodeIden.onCreatedBack);
        /* Add the menu entry for building node order information */
        browser.menus.create({
          id: "Add Order Information",
          title: "Add Order Information",
          contexts: ["all"]
        }, HDLmExtensionBothNodeIden.onCreatedBack);
        /* Add the menu entry for building JSON from HTML */
        browser.menus.create({
          id: "Copy Element(s) Contents",
          title: "Copy Element(s) Contents",
          contexts: ["all"]
        }, HDLmExtensionBothNodeIden.onCreatedBack);
        /* Add the required event listener for clicks. This event runs
           in a background script. */
        browser.menus.onClicked.addListener(HDLmExtensionBothNodeIden.onClickedBack);
        /* Add the required event listener for messages. This event runs
           in a background script. This message handler isn't really needed
           because no messages are sent to the background script. The
           reverse is not true. The background script definitely sends
           messages to the content script. */
        browser.runtime.onMessage.addListener(HDLmExtensionBothNodeIden.onMessageBack);
        /* Add the required event listener for inbound connections. This event runs
           in a background script. This event listener is not actually used. We do
           not establish connections with the background script. */
        browser.runtime.onConnect.addListener(HDLmExtensionBothNodeIden.onConnectBack);
      }
      /* Check if the current browser is Chrome */
      if (browserName == 'Chrome') {
        let createError = false;
        try {
          let createProperties;
          /* Create the Build Node Identifier menu entry */
          createProperties = {
            id: "Build Node Identifier",
            title: "Build Node Identifier",
            contexts: ["all"]
          };
          chrome.contextMenus.create(createProperties);
          /* Create the Build/Modify Changes menu entry */
          createProperties = {
            id: "Build/Modify Changes",
            title: "Build/Modify Changes",
            contexts: ["all"]
          };
          chrome.contextMenus.create(createProperties);
          /* Create the Add Order Information menu entry */
          createProperties = {
            id: "Add Order Information",
            title: "Add Order Information",
            contexts: ["all"]
          };
          chrome.contextMenus.create(createProperties);
          /* Create the Copy Element(s) Contents menu entry */
          createProperties = {
            id: "Copy Element(s) Contents",
            title: "Copy Element(s) Contents",
            contexts: ["all"]
          };
          chrome.contextMenus.create(createProperties);
          /* Add the required event listener for clicks. This event runs
             in a background script. */
          chrome.contextMenus.onClicked.addListener(HDLmExtensionBothNodeIden.onClickedBack);
          /* Add the required event listener for messages. This event runs
		         in a background script. */
          chrome.runtime.onMessage.addListener(HDLmExtensionBothNodeIden.onMessageBack);
        }
        catch (errorObj) {
          console.log(errorObj);
          createError = true;
        }
      }
    }
  }
}
/* Run the startup function */
HDLmExtensionBothNodeIden.startup();
/* Set a few class specific values to a null value */
HDLmExtensionBothNodeIden.contentEventTarget = null;
HDLmExtensionBothNodeIden.contentModifiedNodes = []
HDLmExtensionBothNodeIden.contentNodeElements = [];