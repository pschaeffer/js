/**
 * HDLmExtensionBothHideShowAlterRules short summary.
 *
 * HDLmExtensionBothHideShowAlterRules description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmExtensionBothHideShowAlterRules class is not used to create any objects.
   However, it does contain code for toggling on and off the CSS classes that
   show which DOM elements have been modified. This class also has code for
   building rules and/or modifying rules. */
class HDLmExtensionBothHideShowAlterRules {
  /* This routine adds a set of entries to the context menu for the
     current browser. The caller must take care to make sure that
     the current environment allows entries to be added to context
     menus. */
  static addToContextMenu(browserName) {
	  /* Check if the current browser is Firefox */
	  if (browserName == 'Firefox') {
	    /* Add the menu entry for showing changes to the DOM */
	    browser.menus.create({
		    id: "Show HTML Changes",
		    title: "Show HTML Changes",
		    contexts: ["all"]
	    }, HDLmExtensionBothHideShowAlterRules.onCreatedBack);
	    /* Add the menu entry for hiding changes to the DOM */
	    browser.menus.create({
		    id: "Hide HTML Changes",
		    title: "Hide HTML Changes",
		    contexts: ["all"]
	    }, HDLmExtensionBothHideShowAlterRules.onCreatedBack);
	    /* Add the menu entry for building/modifying rules */
	    browser.menus.create({
	      id: "Build/Modify Rules",
	  	  title: "Build/Modify Rules",
	  	  contexts: ["all"]
	    }, HDLmExtensionBothHideShowAlterRules.onCreatedBack);
    }
	  /* Check if the current browser is Chrome */
	  if (browserName == 'Chrome') {
	    let createError = false;
	    try {
		    let createProperties;
	      /* Add the menu entry for showing changes to the DOM */
		    createProperties = {
		      id: "Show HTML Changes",
		      title: "Show HTML Changes",
		      contexts: ["all"]
		    };
		    chrome.contextMenus.create(createProperties);
		    /* Add the menu entry for hiding changes to the DOM */
		    createProperties = {
		      id: "Hide HTML Changes",
		      title: "Hide HTML Changes",
		      contexts: ["all"]
		    };
		    chrome.contextMenus.create(createProperties);
		    /* Add the menu entry for building/modifying rules */
		    createProperties = {
		      id: "Build/Modify Rules",
		      title: "Build/Modify Rules",
		      contexts: ["all"]
		    };
		    chrome.contextMenus.create(createProperties);
	    }
	    catch (errorObj) {
		    createError = true;
        HDLmError.reportError(errorObj, 'addToContextMenu');
	    }
	  }
  }
  /* Check if pop-up environment is active or not. Return a value showing
     if the pop-up environment is active. The routine will return true, if
     the pop-up environment is active, and false otherwise. */
  static checkPopupEnvironment() {
    return (window.location.pathname == '/HDLmPopup.html');
  }
  /* This routine runs asynchronously. That means that it will return a 
     promise and return at some unknown point in the future. This routine
     finds the active DOM element and gets an object for that DOM element. 
     The object is stored in a location where other routines can use it. 

     Note that this routine does not appear to be in use. This routine is
     very Chrome specific. */
  static async getActiveDomNodeObjectChrome() {
    /* Check if we are running in the actual pop-up environment. If this is
       not true, then we must use a dummy DOM element object */
    if (!HDLmExtensionBothHideShowAlterRules.checkPopupEnvironment()) {
      HDLmExtensionBothHideShowAlterRules.domNodeObject = HDLmPopup.buildDummyDomNodeObject();
      return;
    } 
    /* Get a promise for the output of the extension all windows
       (and all tabs in all windows) API call */
    let allPromise = HDLmExtensionBothHideShowAlterRules.getWindowsAllPromiseChrome()
    let allWindows = await allPromise; 
    let currentTab = HDLmExtensionBothHideShowAlterRules.getActiveTab(allWindows);
    /* Send a message that will get the active DOM element as an object */
    let message = {};
    message['menuItemId'] = 'Get JSON For Current Element';
    chrome.tabs.sendMessage(currentTab.id, message, function (response) {
      HDLmExtensionBothHideShowAlterRules.domNodeObject = response;
    });      
  }
  /* This routine runs asynchronously. That means that it will return a 
     promise and return at some unknown point in the future. This routine
     finds the active DOM element and gets (if possible) the node identifier
     for that DOM element. The node identifier string is stored in a location
     where other routines can use it. The returned node identifier will always
     be unique. In other words, it will always locate exactly one DOM node. 

     Note that this routine does not appear to be in use. This routine is 
     very Chrome specific. */ 
  static async getActiveNodeIdenStringChrome() { 
    /* Check if we are running in the actual pop-up environment. If this is
       not true, then we must use a dummy node identifier string. */
    if (!HDLmExtensionBothHideShowAlterRules.checkPopupEnvironment()) {
      HDLmExtensionBothHideShowAlterRules.nodeIdenString = HDLmPopup.buildDummyDomNodeIdentifier();
      return;
    } 
    /* Get a promise for the output of the extension all windows
       (and all tabs in all windows) API call */
    let allPromise = HDLmExtensionBothHideShowAlterRules.getWindowsAllPromiseChrome()
    let allWindows = await allPromise;
    let currentTab = HDLmExtensionBothHideShowAlterRules.getActiveTab(allWindows);
    /* Send a message that will get the node identifier for the active DOM
       element as an object */
    let message = {};
    message['menuItemId'] = 'Get Node Identifier For Current Element';
    chrome.tabs.sendMessage(currentTab.id, message, function (response) { 
      HDLmExtensionBothHideShowAlterRules.nodeIdenString = response;
    });
  }
  /* This routine looks through all of the windows and tabs for each 
     window and returns the first active tab. If an appropriate tab 
     can not be found, a null value is returned to the caller. */
  static getActiveTab(windows) {
    /* Scan all of the windows looking for a 'normal' window */
    for (let i = 0; i < windows.length; i++) {
      let window = windows[i];
      if (window.type != 'normal')
        continue;
      let tabs = window.tabs;
      for (let j = 0; j < tabs.length; j++) {
        let tab = tabs[j];
        if (!tab.active)
          continue;
        return tab;        
      }
    }
    return null;
  }
  /* Get some window (browser window, not Windows) information and return
     it to the caller. This is the low-level routine that actually gets
     window information. This routine runs synchronously and returns an
     object. */
  static getWindowInfo() {
    /* Build a JSON object with a set of window information */
    let jsonObj = {};
    jsonObj.href = window.location.href;
    jsonObj.hostname = window.location.hostname;
    jsonObj.pathvalue = window.location.pathname;
    jsonObj.protocol = window.location.protocol;
    jsonObj.port = window.location.port;
    jsonObj.search = window.location.search;
    jsonObj.baseURI = window.document.baseURI;
    jsonObj.title = window.document.title;
    jsonObj.URL = window.document.URL;
    jsonObj.appName = window.navigator.appName;
    jsonObj.height = window.screen.height;
    jsonObj.width = window.screen.width;       
    return jsonObj;
  }
  /* This routine runs asynchronously. That means that it will return a 
     promise and return at some unknown point in the future. This routine
     gets a set of window (browser window, not Windows) information. The
     window information is stored in a location where other routines can 
     use it. 

     Note that this routine does not appear to be in use. This routine is
     very Chrome specific. */
  static async getWindowInfoObjectChrome() {
    /* Check if we are running in the actual pop-up environment. If this is
       not true, then we must get the window information directly. */
    if (!HDLmExtensionBothHideShowAlterRules.checkPopupEnvironment()) {
      let jsonObj = HDLmExtensionBothHideShowAlterRules.getWindowInfo();
      HDLmExtensionBothHideShowAlterRules.windowInfoObject = jsonObj;
      return;
    }
    /* Get a promise for the output of the extension all windows
       (and all tabs in all windows) API call */
    let allPromise = HDLmExtensionBothHideShowAlterRules.getWindowsAllPromiseChrome()
    let allWindows = await allPromise;
    let currentTab = HDLmExtensionBothHideShowAlterRules.getActiveTab(allWindows);
    /* Send a message that will get the active DOM element as an object */
    let message = {};
    message['menuItemId'] = 'Get Window Information';
    chrome.tabs.sendMessage(currentTab.id, message, function (response) {
      HDLmExtensionBothHideShowAlterRules.windowInfoObject = response;
    });
  }
  /* Get a list of all of the browser windows and the tabs for each window.
     The list (actually a promise that returns the list when the promise is
     fulfilled) is returned to the caller. This routine uses promises. This
     routine returns a promise that will be fulfilled when the list of
     browser windows is available. 

     Note that this routine is definitely in use (by other routines that are
     not in use). This routine is highly Chrome specific. */ 
  static getWindowsAllPromiseChrome() {
    let getAllPromise = chrome.windows.getAll({ populate: true });
    return getAllPromise;
  }
  /* The click event listener, where we perform the appropriate action given the
     ID of the menu item that was clicked. This event only occurs in background
     scripts. Of course, backgound scripts can not directly access the DOM or
     use the alert mechanism. As a consequence, the main thing this method does
     is to send a message to the content script. */
  static onClickedBack(info, tab) {
    /* Check for a couple of values that force a quick exit
       from this routine */
    if (info.menuItemId != 'Show HTML Changes' &&
        info.menuItemId != 'Hide HTML Changes' &&
        info.menuItemId != 'Build/Modify Rules')
      return;
    /* We need to determine which browser is currently active */
    let browserName = HDLmHtml.getBrowserName();
	  /* In one very important case, we need to know what the user clicked
	     on. If we don't have this information we can not go anywhere further. */
	  if (info.menuItemId == 'Build/Modify Rules' &&
	      browserName     == 'Firefox') {
	    if (info.hasOwnProperty('targetElementId') == false)
		    return;
	  }
    if (browserName == 'Firefox') {
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
    if (('target' in event) == false)
      HDLmExtensionBothHideShowAlterRules.contentEventTarget = null;
    else 
	    HDLmExtensionBothHideShowAlterRules.contentEventTarget = event.target;
  }
  /* Called when the item has been created, or when creation failed due to an error.
     We'll just log success/failure here. */
  static onCreatedBack() {
    if (browser.runtime.lastError) {
      console.log(`Error: ${browser.runtime.lastError}`);
    }
    else {
      console.log("Item created successfully");
    }
  }
  /* This method is used to handle installed event(s). There are two types
     of installed events. They are 'install' and 'update'. This routine
     handles both of them. Note that the current browser type is passed
     to this routine so that browser specific APIs can be used as need
     be. Note that this routine runs in the background. */
  static onInstalledBack(details) {
	  /* Get the current browser name (really type of browser). Much of
	     the code depends on knowing what type of browser we are running
	     under. This should not be true, but is true. */
      let browserName = HDLmHtml.getBrowserName();
      /* Check the details */
      if (details.reason == "install" ||
	        details.reason == "update") {
	    /* Add the context menu entries */
	    HDLmExtensionBothHideShowAlterRules.addToContextMenu(browserName);
	  }
  }
  /* This method is the message event handler. This method is invoked
     when a message event occurs. This method does all of the work needed
     to handle a message event. This method runs in the background. */
  static onMessageBack(request, sender, sendResponse) {
    /* console.log('oMB', request, sender, sendResponse); */
    /* We need to determine which browser is currently active */
    let browserName = HDLmHtml.getBrowserName();
	  /* Check if a request to open a window was sent */
    if (request.itemId == 'Build/Modify Rules') {
      if (browserName == 'Firefox') 
        browser.windows.create({ url: "HDLmHide.html", type: "popup", height: 750, width: 1250 });
      else
        chrome.windows.create({ url: "HDLmHide.html", type: "popup", height: 750, width: 1250 });
    }
  }
  /* This method is the message event handler. This method is invoked
     when a message event occurs. This method does all of the work needed
     to handle a message event. The method runs as part of a content script. */
  static onMessageContentOneTime(message, sender, sendResponse) {
    /* console.log('onMessageContentOneTime', message, sender, sendResponse); */ 
    /* This routine is invoked to handle a variety of messages. We must
       check the menu item ID to determine what type of processing is
       needed. */
    let itemId = message.menuItemId;
    /* Put all of the code below in a try block so that errors
       can be caught and reported */
    try {
      let titleValue = HDLmDefines.getString('HDLMSESSIONCLASSES');
      switch (itemId) {
        /* Build or modify rules based on where the right button was clicked */
        case 'Build/Modify Rules': {
          /* We need to determine which browser is currently active */
          let browserName = HDLmHtml.getBrowserName();
		      /* Send a message to the background script telling the
		         background script to open a pop-up window */
          if (browserName == 'Firefox')
            browser.runtime.sendMessage({ itemId: itemId });
          else
            chrome.runtime.sendMessage({ itemId: itemId });
          break;
        }
        /* Check if the caller is asking for the JSON for the current
           DOM element. This type of request could come from anywhere.
           At present, it comes from the pop-up built by the Popup
           editor. */
        case 'Get JSON For Current Element': {
          /* We need to determine which browser is currently active */
          let browserName = HDLmHtml.getBrowserName();
          let domNode;
          if (browserName == 'Firefox')
            domNode = document.activeElement;
          else
            domNode = HDLmExtensionBothHideShowAlterRules.contentEventTarget;
          let recursionWantedFalse = false; 
          let jsonDom = HDLmHtml.buildObjectFromNode(domNode, recursionWantedFalse);
          sendResponse(jsonDom);
          break;
        }
        /* Check if the caller is asking for the node identifier for the current
           DOM element. This type of request could come from anywhere. At present, 
           it comes from the pop-up built by the Popup editor. Note that the 
           code below will only return a non-null value if the node identifier 
           matches exactly 1 DOM element. */
        case 'Get Node Identifier For Current Element': {
          /* We need to determine which browser is currently active */
          let browserName = HDLmHtml.getBrowserName();
          let domNode;
          if (browserName == 'Firefox')
            domNode = document.activeElement;
          else
            domNode = HDLmExtensionBothHideShowAlterRules.contentEventTarget;
          let jsonDom = HDLmNodeIden.getNodeIdentifier(domNode);
          sendResponse(jsonDom);
          break;
        }
        /* Check if the caller is asking for window (not Windows) information.
           Get the window information and return it to the caller as a JSON
           object. This type of request could come from anywhere. At present, 
           it comes from the pop-up built by the Popup editor.  */
        case 'Get Window Information': {
          let jsonObj = HDLmExtensionBothHideShowAlterRules.getWindowInfo();
          sendResponse(jsonObj);
          break;
        }
        /* Hide (unmark actually) the HTML elements that have been changed.
           This is actually done by disabling a CSS class. Disabling the CSS
           class causes the appearance of the modified HTML elements to
           change back to normal. Note that HTML elements don't really
           disappear. However, their appearance should change back to
           normal. */
        case 'Hide HTML Changes': {
          var disabledStatus = true;
          HDLmExtensionBothHideShowAlterRules.resetStyleSheetEnablement(titleValue, disabledStatus);
          sessionStorage.setItem(titleValue + 'Disabled', disabledStatus);
          break;
        }
        /* Check if the caller is asking for the current document to be 
           reloaded. This must be done by a content script because only 
           content scripts have access to the actual web page. */
        case 'Reload Current Document': {
          document.location.reload();
          let response = 'OK';
          sendResponse(response);
          break;
        }
        /* Show (mark actually) the HTML elements that have been changed.
           This is actually done by enabling a CSS class. Enabling the CSS
           class causes the appearance of the modified HTML elements to
           change. */
        case 'Show HTML Changes': {
          var disabledStatusFalse = false;
          /* console.log('SHC'); */
          /* console.log(titleValue); */
          /* console.log(disabledStatusFalse); */
          HDLmExtensionBothHideShowAlterRules.resetStyleSheetEnablement(titleValue, disabledStatusFalse);
          sessionStorage.setItem(titleValue + 'Disabled', disabledStatus);
          break;
        }
        /* Handle the default case. Of course, this should never
           happen. However, experience has shown that it does 
           happen. */
        default: {
          let errorText = "Invalid menu item ID value - " + itemId;
          HDLmError.buildError('Error', 'ItemId', 42, errorText);
          break;
        }
      }
    }
    catch (errorObj) {
      HDLmError.reportError(errorObj, 'onMessageContentOneTime');
    }
  }
  /* The next routine resets a set (group) of fields that should
     be reset together */
  static resetNodeValues() {
    HDLmWebSockets.resetWebSockets();
  }
  /* This function resets the enablement status of a
     style sheet to a value passed by the caller */
  static resetStyleSheetEnablement(titleValue, disableStatus) {
    /* console.log('rSSE', titleValue, disableStatus); */
    /* Find the style sheet */
    var styleSheetList = document.styleSheets;
    for (let i = 0; i < styleSheetList.length; i++) {
      var styleSheet = styleSheetList[i];
      if (styleSheet.title != null &&
          styleSheet.title == titleValue) {
        /* console.log(styleSheet); */
        styleSheet.disabled = disableStatus;
      }
    }
  }
  /* Send a message and return the associated promise to the caller. 
     When the promise is fulfilled the response to the message will
     be available. 

     Note that this routine does not appear to be in use. This routine is
     very Chrome specific. */
  static sendMessagePromiseChrome(tab, messageObject) {
    let sendPromise = chrome.tabs.sendMessage(tab.id, messageObject);
    return sendPromise;
  }
  /* The startup method is invoked to do all of the work needed to
     to add a new item to the context menu */
  static startup() { 
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
        (typeof chrome)  != 'object')
      return;
    /* Get the current browser name (really type of browser). Much of
       the code depends on knowing what type of browser we are running
       under. This should not be true, but is true. */
    let browserName = HDLmHtml.getBrowserName();
    if (browserName == 'Unknown') {
      let errorText = "The current browser type could not be determined - " + browserName;
      HDLmError.buildError('Error', 'Browser Type', 54, errorText);
      return;
    }
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
      if (browserName == 'Firefox') {
        browser.runtime.onMessage.addListener(HDLmExtensionBothHideShowAlterRules.onMessageContentOneTime);
        let useCaptureTrue = true;
        document.addEventListener("click", HDLmExtensionBothHideShowAlterRules.onClickedContent, useCaptureTrue);
        browser.browserAction.onClicked.addListener(HDLmExtensionBothHideShowAlterRules.onClickedContent);
      }
      if (browserName == 'Chrome') {
        /* console.log('HideShowAlterRules.startup'); */
        /* console.log(chrome); */
        /* console.log(chrome.runtime); */
        /* console.log(chrome.runtime.onMessage); */
	      chrome.runtime.onMessage.addListener(HDLmExtensionBothHideShowAlterRules.onMessageContentOneTime);
	      document.addEventListener('contextmenu', HDLmExtensionBothHideShowAlterRules.onClickedContent);
      }
    }
    /* Create all of the context menu items. This code only works
       in background scripts. The required context menu entries
       are created below. */
    if (curEnv == 'background') {
      /* Check if the current browser is Firefox */
      if (browserName == 'Firefox') {
		    /* Add the context menu entries */
		    HDLmExtensionBothHideShowAlterRules.addToContextMenu(browserName);
        /* Add the required event listener for clicks. This event runs
           in a background script. */
        browser.menus.onClicked.addListener(HDLmExtensionBothHideShowAlterRules.onClickedBack);
		    /* Add the required event listener for messages. This event runs
		       in a background script. */
        browser.runtime.onMessage.addListener(HDLmExtensionBothHideShowAlterRules.onMessageBack);
      }
      /* Check if the current browser is Chrome */
      if (browserName == 'Chrome') {
	      chrome.runtime.onInstalled.addListener(HDLmExtensionBothHideShowAlterRules.onInstalledBack);
        let createError = false;
        try {
	        /* Add the required event listener for clicks. This event runs
             in a background script. */
          chrome.contextMenus.onClicked.addListener(HDLmExtensionBothHideShowAlterRules.onClickedBack);
          /* Add the required event listener for messages. This event runs
		         in a background script. */
          chrome.runtime.onMessage.addListener(HDLmExtensionBothHideShowAlterRules.onMessageBack);
        }
        catch (errorObj) {
          createError = true;
          HDLmError.reportError(errorObj, 'startup');
        }
      }
    }
  }
}
/* Run the startup function */
HDLmExtensionBothHideShowAlterRules.startup();
/* Set a few class specific values to a null value */
HDLmExtensionBothHideShowAlterRules.contentEventTarget = null;
/* The DOM node object is set (at tome point) with data
   from the actual DOM */ 
HDLmExtensionBothHideShowAlterRules.domNodeObject = {};
HDLmExtensionBothHideShowAlterRules.nodeIdenString = '';
HDLmExtensionBothHideShowAlterRules.windowInfoObject = {};