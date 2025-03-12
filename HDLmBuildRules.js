/**
 * HDLmBuildRules short summary.
 *
 * HDLmBuildRules description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* console.log('s1'); */  
/* import React from "react"; */
/* console.log('s2'); */
/* import { createRoot } from 'react-dom/client'; */
/* console.log('s3'); */
/* The HDLmBuildRules class doesn't actually do anything. However,  
   it does define a set of static methods that are used to build  
   zero or more rules. No instances of this class can ever be 
   created. */ 
class HDLmBuildRules {
  /* This routine when called, adds an event listener to the window 
     object. The event listener is used to detect when the user
     unloads the browser. */
  static beforeUnloadAdd() {
    /* console.log('In HDLmBuildRules.beforeUnloadAdd'); */
    window.addEventListener('beforeunload', (event) => {
      HDLmBuildRules.beforeUnloadDone(event);
    });
  }
  /* This routine is called when the user unloads the browser.
     This routine handles the before unload event. The routine 
     is used to resolve the promise that was created before the 
     user unloaded the browser. */
  static beforeUnloadDone(event) {
    /* console.log('In HDLmBuildRules.beforeUnloadDone'); */
    /* console.log(event); */
    /* The line below has been commented out. This line is used
       to present a dialog box to the user. The dialog box is
       prevent the browser from closing. We don't want to prevent
       the browser from closing. */
    /* event.preventDefault(); */
    HDLmBuildRules.beforeUnloadResolveFunction('The browser was closed');
  }
  /* Build a JavaScript array with the new rules in it. For 
     now the new rules are hard-coded below. */
  static buildRulesArray() {
    let rulesArray = [];
    let rulesIndex = 0
    let newRuleStr = '';
    /* Create and add a rule in string form */       
    newRuleStr = '{"tooltip":"Checked text modification",' + 
    '"type":"mod","nodePath":["Top","Companies","www.yogadirect.com",' + 
    '"Rules","example.com","example.com","Mod Yoga Direct 1 4 Inch ' + 
    'Yoga Mat.Html Textcheckee"],"details":{"name":"Mod Yoga Direct ' + 
    '1 4 Inch Yoga Mat.Html Textcheckee","extra":"Quantity",' + 
    '"enabled":true,"type":"textchecked","created":' + 
    '"2024-07-06T05:11:07.058Z","lastmodified":' + 
    '"2024-07-06T05:11:07.058Z","pathvalue":' + 
    '"/yoga-direct-1-4-inch-yoga-mat.html","comments":"",' + 
    '"usemode":"test",' +
    '"children": [],' +
    '"cssselector":"","xpath":"","find":[],"nodeiden":' + 
    '{"type":"tag","attributes":{"tag":"label","innertext":' + 
    '"quantity"},"counts":{"tag":18},"parent":{"class":["qtybox-addcart",' + 
    '"form-group"],"tag":"div","innertext":"quantity"},"grandparent":' + 
    '{"class":["addToCartBlock","sub-section"],"tag":"div","innertext":' + 
    '"quantity"}},"parameter":2,"newtexts":["Quantities"' + 
    '' + 
    '],"updated":false}' + 
    '' + 
    '}';
    rulesArray.push(newRuleStr);
    /* Create and add a rule in string form */    
    newRuleStr = '{"tooltip":"Checked text modification",' + 
    '"type":"mod","nodePath":["Top","Companies","www.yogadirect.com",' + 
    '"Rules","example.com","example.com","Mod Yoga Direct 1 4 Inch ' + 
    'Yoga Mat.Html Textcheckef"],"details":{"name":"Mod Yoga Direct ' + 
    '1 4 Inch Yoga Mat.Html Textcheckef","extra":"Quantity",' + 
    '"enabled":true,"type":"textchecked","created":' + 
    '"2024-07-06T05:11:07.058Z","lastmodified":' + 
    '"2024-07-06T05:11:07.058Z","pathvalue":' + 
    '"/yoga-direct-1-4-inch-yoga-mat.html","comments":"",' + 
    '"usemode":"test",' +
    '"children": [],' +
    '"cssselector":"","xpath":"","find":[],"nodeiden":' + 
    '{"type":"tag","attributes":{"tag":"label","innertext":' + 
    '"quantity"},"counts":{"tag":18},"parent":{"class":["qtybox-addcart",' + 
    '"form-group"],"tag":"div","innertext":"quantity"},"grandparent":' + 
    '{"class":["addToCartBlock","sub-section"],"tag":"div","innertext":' + 
    '"quantity"}},"parameter":2,"newtexts":["Quantities"' + 
    '' + 
    '],"updated":false}' + 
    '' + 
    '}';
    rulesArray.push(newRuleStr);
    /* Create and add a rule in string form */        
    newRuleStr = '{"tooltip":"Checked text modification",' + 
    '"type":"mod","nodePath":["Top","Companies","www.yogadirect.com",' + 
    '"Rules","example.com","example.com","Mod Yoga Direct 1 4 Inch ' + 
    'Yoga Mat.Html Textcheckeg"],"details":{"name":"Mod Yoga Direct ' + 
    '1 4 Inch Yoga Mat.Html Textcheckeg","extra":"Quantity",' + 
    '"enabled":true,"type":"textchecked","created":' + 
    '"2024-07-06T05:11:07.058Z","lastmodified":' + 
    '"2024-07-06T05:11:07.058Z","pathvalue":' + 
    '"/yoga-direct-1-4-inch-yoga-mat.html","comments":"",' + 
    '"usemode":"test",' +
    '"children": [],' +
    '"cssselector":"","xpath":"","find":[],"nodeiden":' + 
    '{"type":"tag","attributes":{"tag":"label","innertext":' + 
    '"quantity"},"counts":{"tag":18},"parent":{"class":["qtybox-addcart",' + 
    '"form-group"],"tag":"div","innertext":"quantity"},"grandparent":' + 
    '{"class":["addToCartBlock","sub-section"],"tag":"div","innertext":' + 
    '"quantity"}},"parameter":2,"newtexts":["Quantities"' + 
    '' + 
    '],"updated":false}' + 
    '' + 
    '}';
    rulesArray.push(newRuleStr);
    /* Return the rules array to the caller */
    return rulesArray;
  }
  /* Construct a tree node based on the information passed 
     to this routine. The new tree node object is returned
     to the caller.  */
  static constructTreeNode(urlStr, improveWhy, markupObj) {
    let nodePathEntry;
    let nodeType = 'mod';
    let ruleType = 'script'
    let scriptValid = false;
    let stylesStr = '';
    let stylesValid = false;
    let overallValid = false;
    let overallStr = ''; 
    /* console.log('In HDLmBuildRules.constructTreeNode'); */
    /* console.log(urlStr); */
    /* console.log(improveWhy); */
    /* console.log(markupObj); */
    /* Extract some values from the markup object */
    let scriptStr = markupObj.scriptInsertions;
    let styleStr = markupObj.styleInsertions;
    /* Change the script in a few ways. The regular expressions 
       below remove the leading and trailing 'script' tags and
       some new line characters. */
    /* console.log(scriptStr); */
    scriptStr = scriptStr.replace(/^<script((\s)+type(\s)*=(\s)*(?<quotechar>'|")text\/javascript(\k<quotechar>))?>(\n)*/g, "");  
    scriptStr = scriptStr.replace(/(\n)*<\/script>/, "");   
    /* Check if the JavaScript script starts and/or ends
       with a new line. If it does, remove the new line
       from the start or end or both. This code is no
       longer needed. The regular expressions above do 
       the same work. */
    /* 
    if (scriptStr.startsWith('\n'))
      scriptStr = scriptStr.substring(1);
    if (scriptStr.endsWith('\n')) {
      let scriptStrLen = scriptStr.length;
      if (scriptStrLen > 0)
        scriptStrLen -= 1;
      scriptStr = scriptStr.substring(0, scriptStrLen);
    }
    */
    /* Check if the script is valid JavaScript */
    scriptValid = HDLmHtml.checkJavaScriptCode(scriptStr);
    /* scriptValid = false; */
    /* Check if the script is valid JavaScript. If the script is not
       valid JavaScript, then we can't do anything. */
    if (!scriptValid)  
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    /* At this point we want to work on the 'style' insertions. The first 
       step is too remove any 'style' tags and/or new line characters. */
    styleStr = styleStr.replace(/^<style>(\n)*/g, "");  
    styleStr = styleStr.replace(/(\n)*<\/style>/, "");
    /* The style string may actually contain several styles. The 
       first step is break up the style string into individual
       styles. The individual styles are return in an array. */
    let styleArray = HDLmHtml.splitCssString(styleStr);
    /* Process each of the styles */
    for (styleStr of styleArray) {
      /* The next step is to escape any single quotes in the style string.
         This is done because the style string is going to be assigned to
         a JavaScript variable. */
      styleStr = styleStr.replace(/\'/g, "\\'");
      /* The next step is to escape any new line characters in the style
         string. This is done because the style string is going to be
         assigned to a JavaScript variable. The inspiration for this code
         came from https://github.com/benjamn/recast/issues/421. */ 
      styleStr = styleStr.replace(/\n/g, "\\n");
      /* Build some more JavaScript code. This JavaScript code is used to
         add the style string to the web page. */
      let styleScript = '';
      styleScript += '\n';
      styleScript += '{\n';
      styleScript += '  var styleSheet = document.createElement("style");\n';
      styleScript += '  styleSheet.textContent = ' + "'" + styleStr + "'" + ';' + '\n';
      styleScript += '  document.head.appendChild(styleSheet);\n';
      styleScript += '}';
      /* Add the style script to the styles script string */
      stylesStr += styleScript;
    }
    /* Check if the script built to add style information 
       is valid JavaScript */
    stylesValid = HDLmHtml.checkJavaScriptCode(stylesStr);
    /* Check if the script built to add style information
       is valid JavaScript. If the script is not valid 
       JavaScript, then we can't do anything. */
    if (!stylesValid)  
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr]; 
    /* Check if the both the script string and the style string 
       are valid JavaScript. If both are valid, then the overall 
       JavaScript is valid. */
    if (scriptValid && stylesValid) {
      overallStr = scriptStr + stylesStr;
      overallValid = true;
    }
    /* Either the script string or the style string is not valid 
       JavaScript */
    else 
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];    
    /* Build a URL object from the URL string */
    let urlObj = new URL(urlStr);
    /* Get some information from the URL object */
    let urlHostName = urlObj.hostname;
    let urlPathName = urlObj.pathname;
    /* Build the node path of the parent node (site) */
    let parentNodePath = [];
    nodePathEntry = HDLmDefines.getString('HDLMTOPNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
    parentNodePath.push(nodePathEntry); 
    parentNodePath.push(urlHostName);
    nodePathEntry = HDLmDefines.getString('HDLMRULESNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMDIVISIONNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMSITENODENAME');
    parentNodePath.push(nodePathEntry);
    /* Build all of the intermediate levels as need be. This call will
       update the node tree (HDLmTree) in memory and won't send any new 
       nodes to the database. */
    let updateDatabaseFalse = false;
    let newSiteNode;
    newSiteNode = HDLmTree.buildSiteNode(parentNodePath, updateDatabaseFalse, HDLmNodeTypes.rules);
    /* Try to locate the parent node of the new tree node. The 
       parent node is needed to get the (possible) new name 
       suffix. */
    let parentTreeNode = HDLmTree.locateTreeNode(parentNodePath);
    /* Report an error if the parent node could not be found */
    if (parentTreeNode == null) {
      let nodeString = parentNodePath.toString();
      console.log('In HDLmBuildRules.constructTreeNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      /* This routine used to just return 'null' (without the quotes)
         to the caller. However, the caller expects a list with two
         values. */
      /* return null; */
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];  
    }    
    /* The URL string is modified (possibly) to remove the suffix.
       We don't want the suffix (and the period before the suffix)
       to be part of the new modification name. This is the old
       approach where the modification name was derived from the
       URL. */
    let urlStringModified = HDLmString.removeFileNameSuffix(urlStr);
    if (urlStringModified == null)
      urlStringModified = urlStr;
    /* Get the new modification name */
    let newModName = HDLmMenus.buildModificationName(parentTreeNode, 
                                                     urlStringModified,
                                                     ruleType);  
    /* Get the modification name from the why string */
    let tempWhyValue = HDLmString.getCompleteWords(improveWhy, 55);
    tempWhyValue = tempWhyValue.trim();
    newModName = HDLmMenus.buildModificationName(parentTreeNode, 
                                                 tempWhyValue,
                                                 ruleType);  
    /* console.log('New mod name = ' + newModName); */
    /* Build the tooltip for the rule */
    let longNameStr = HDLmMod.getModificationLongName(ruleType);
    let tooltipStr = HDLmString.ucFirst(longNameStr);
    tooltipStr += ' ' + 'modification'
    /* Build the node path for the rule */
    let newRuleNodePath = parentNodePath;
    newRuleNodePath.push(newModName);
    /* Creat a new node identification object for the 
       new rule. The node identification object is used
       to locate a node in the HTML. The HTML node is 
       always the head node. */
    let newNodeIdenObj = new HDLmNodeIden()
    newNodeIdenObj.type = 'tag';
    newNodeIdenObj.attributes = {};
    newNodeIdenObj.attributes.tag = 'head';
    newNodeIdenObj.counts = {};
    newNodeIdenObj.counts.tag = 1;
    newNodeIdenObj.parent = {};
    newNodeIdenObj.parent.tag = 'html';  
    /* Create a new rule/modification/details object */
    let newRuleObj = new HDLmMod(newModName, '', true, ruleType);
    newRuleObj.pathvalue = urlPathName;
    newRuleObj.comments = '';
    newRuleObj.usemode = 'test';
    newRuleObj.cssselector = '';
    newRuleObj.xpath = '';
    newRuleObj.find = [];
    newRuleObj.nodeiden = newNodeIdenObj;
    newRuleObj.parameter = 0;
    /* newRuleObj.scripts = ['let aaa = 3;\nlet bbb = 4;']; */
    newRuleObj.scripts = [overallStr];  
    newRuleObj.updated = false;
    /* Create a new tree node object */
    let treeNodeObj = new HDLmTree(nodeType, tooltipStr); 
    treeNodeObj.details = newRuleObj 
    treeNodeObj.type = nodeType
    treeNodeObj.nodePath = newRuleNodePath;
    /* Return the new tree node object to the caller */
    return [treeNodeObj, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
  }
  /* Build the UI used to get the web page URL. The 
     web page URL is provided by the user. */
  static buildWebPageUi() {
    let currentTreeNode = null;
    let currentValue;
    let currentSuggestion = null;
    let currentUrl = null;
    let newPromptWidget;
    let newUrlWidget;
    let typeDescription;
    let typeSource;
    let typeSubType;
    /* Create a temporary container widget for use below */
    let containerWidget = new HDLmContainerWidget();
    /* Create a widget for the web page URL prompt information */
    typeDescription = '';
    typeSource = 'promptSuggestionText';
    typeSubType = 'promptSuggestionText';
    currentValue = 'Please enter a suggestion (optional) below';
    newPromptWidget = HDLmMod.displayFieldIOText('iotext',
                                                  typeSubType,
                                                  currentTreeNode, containerWidget,
                                                  function () {
                                                    containerWidget.displayErrorText();
                                                  },
                                                  typeDescription, currentValue, typeSubType,
                                                  function () { },
                                                  function () { },
                                                  function () { },
                                                  function () { }
                                                );
    /* Add the new web page prompt widget */
    containerWidget.addWidget(newPromptWidget, typeSource); 
    /* Create a widget for the suggestion */
    typeDescription = '';
    typeSource = 'suggestionText';
    typeSubType = 'suggestionText';
    currentValue = '';
    newUrlWidget = HDLmMod.displayFieldIOText('iotext',
                                              typeSubType,
                                              currentTreeNode, containerWidget,
                                              function () {
                                                containerWidget.displayErrorText();
                                              },
                                              typeDescription, currentValue, typeSubType,
                                              function () { },
                                              function (newTextValue, noErrors) {
                                                /* console.log('newTextValue = ' + newTextValue); */
                                                /* console.log('noErrors = ' + noErrors); */
                                                currentSuggestion = newTextValue;
                                                /* console.log('currentSuggestion = ' + currentSuggestion); */
                                              },
                                              function () { },
                                              function () { });
    /* Add the new web page URL widget */
    containerWidget.addWidget(newUrlWidget, typeSource);  
    /* Create a widget for the web page URL prompt information */
    typeDescription = '';
    typeSource = 'promptUrlText';
    typeSubType = 'promptUrlText';
    currentValue = 'Please enter a valid URL below';
    newPromptWidget = HDLmMod.displayFieldIOText('iotext',
                                                 typeSubType,
                                                 currentTreeNode, containerWidget,
                                                 function () {
                                                   containerWidget.displayErrorText();
                                                 },
                                                 typeDescription, currentValue, typeSubType,
                                                 function () { },
                                                 function () { },
                                                 function () { },
                                                 function () { }
                                                );
    /* Add the new web page prompt widget */
    containerWidget.addWidget(newPromptWidget, typeSource);
    /* Create a widget for the URL */
    typeDescription = '';
    typeSource = 'webPageUrl';
    typeSubType = 'webPageUrl';
    currentValue = '';
    newUrlWidget = HDLmMod.displayFieldIOText('iotext',
                                              typeSubType,
                                              currentTreeNode, containerWidget,
                                              function () {
                                                containerWidget.displayErrorText();
                                              },
                                              typeDescription, currentValue, typeSubType,
                                              function () { },
                                              function (newTextValue, noErrors) {
                                                /* console.log('newTextValue = ' + newTextValue); */
                                                /* console.log('noErrors = ' + noErrors); */
                                                currentUrl = newTextValue;
                                              },
                                              function () { 
                                                /* console.log('currentUrl = ' + currentUrl); */
                                                let errorText = containerWidget.getErrorText();
                                                if (errorText == '') {
                                                  let currentObj = {}; 
                                                  currentObj.webPageUrl = currentUrl;
                                                  currentObj.suggestionText = currentSuggestion;
                                                  let currentJson = JSON.stringify(currentObj);
                                                  /* console.log(currentJson); */
                                                  HDLmBuildRules.inputDone(currentJson); 
                                                }
                                              },
                                              function () { });
    /* Add the new web page URL widget */
    containerWidget.addWidget(newUrlWidget, typeSource);  
    /* Prompt for the URL and the (optional) suggestion*/
    HDLmBuildRules.renderWidget(containerWidget);
  } 
  /* Check if a URL is minimally valid. This routine returns a error
     text message if the URL is not valid. If the URL is valid, then
     this routine returns an empty string. */
  static checkUrlValid(urlStr) {
    let errorText = '';
    /* Try to build a URL object from the URL string.
       If we can't build a URL object, we must report
       an error and return. */
    try {
      let urlObj = new URL(urlStr);
    }
    catch (errorObj) {
      errorText = errorObj.message;
      return errorText;
    }
    /* Get and check the host name string in the
       URL. If the host name is not valid, we can't
       do anything. */    
    let hostNameStr = HDLmHtml.getHostName(urlStr);
    let typeOfHost = typeof(hostNameStr);
    if (typeOfHost == 'undefined') 
      errorText = 'Hoat name is undefined'; 
    if (typeOfHost == 'null') 
      errorText = 'Hoat name is null'; 
    if (typeOfHost != 'string') 
      errorText = 'Hoat name is not a string'; 
    return errorText;
  }
  /* Get a set of headers for a fetch request. The headers are built 
     and returned to the caller as an object. */
  static getHeadersFetch(hostNameStr) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build the standard headers and add them to the headers object */
    let standardHeaders = HDLmBuildRules.getHeadersStandard(hostNameStr);
    headersObj = Object.assign(headersObj, standardHeaders);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Get a set of standard headers for any request. 
     The headers are built and returned as an object. */
  static getHeadersStandard(hostNameStr) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build a host name header and add it to headers object */
    let hostHeader = HDLmHtml.buildHostHeader(hostNameStr);
    headersObj = Object.assign(headersObj, hostHeader);
    /* Build an accept encoding header and add it to the headers object */
    let acceptValue = HDLmConfigInfo.getBuildAcceptEncoding();
    let acceptHeader = HDLmHtml.buildAcceptEncodingHeader(acceptValue);
    headersObj = Object.assign(headersObj, acceptHeader);
    /* Build a user agent header and add it to the headers object */
    let userAgentValue = HDLmConfigInfo.getBuildUserAgent();
    let userAgentHeader = HDLmHtml.buildUserAgentHeader(userAgentValue);
    headersObj = Object.assign(headersObj, userAgentHeader);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Handle overall initialization */
  static handleInitialization() {
    /* console.log('In HDLmBuildRules.handleInitialization'); */
    /* console.log(window.location); */
    /* console.log(window.location.pathname); */  
    /* This routine may been invoked to build rules or it may have 
       been invoked for some other reason. Check if the path shows 
       that what the user really wants is to build rules. */
    let buildRules = false;
    let windowlocationPathName = window.location.pathname;
    /* Under the debugger, we get somethink like */
    console.log('window.location.pathname - ' + window.location.pathname);
    /* const str = "Hello\x20World"; */
    /* console.log("Hello\x20\x22\x20World"); */
    /* l6et rv = HDLmString.getCompleteWords('The quick brown fox', 3); */
    /* console.log(rv); */
    /* console.log(windowlocationPathName); */
    /* console.log(windowlocationPathName.toLowerCase()); */
    /* console.log(esprima); */
    /* let newLine = '\n'; */
    /* console.log(HDLmString.stringToHex(newLine)); */
    /* let z; */
    /* z = 'var x = 3;'; */
    /* z += newLine; */
    /* z += 'var y = 4;'; */
    /* z += newLine; */
    /* z += 'var z = x + y;'; */
    /* let z = 'var x = 3;\nvar y = 4;\nvar z = x + y +;'; */
    /* let result = HDLmHtml.checkJavaScriptCode(z); */
    /* console.log(result); */
    /* let y1 = esprima.parse(z); */
    /* console.log(y1); */
    /* let y2 = esprima.parseScript(z); */
    /* console.log(y2); */
    /* console.log(JSON.stringify(y1)); */
    /* console.log(JSON.stringify(y2)); */
    if (windowlocationPathName.toLowerCase() == '/buildrules') 
      buildRules = true; 
    /* Check if the user wants to build rules under the debbuger */
    
    if (windowlocationPathName.endsWith('index.html'))
      buildRules = true;
    
    /* Check if we really want to build rules */
    if (!buildRules)
      return; 
    /* 
    HDLmConfig.getConfigMissing();    
    */
    /* If we are here, then we are starting to build one or more rules */
    let stage = HDLmBuildRulesStageTypes.setTitle; 
    /* stage = HDLmBuildRulesStageTypes.sendWebPageRules */
    HDLmBuildRules.nextStage(stage, '');                                 
    /* Return to the caller */
    return;
    /* Remove divs we don't need */
    if (1 == 2)
      HDLmBuildRules.removeDivs();
  }
  /* The input done function is invoked (called) when the user
     has provided the needed input using the UI. This function 
     is static and is always invoked. However, a variable 
     associated with this JavaScript file is used to locate 
     the function called by this routine. The user is prompted
     for a web page URL or a set of buttons are displayed. 
     Eventually, we can try to use the URL to get a copy of 
     the web page. */
  static inputDone(currentValue) {
    /* console.log('In HDLmBuildRules.inputDone'); */
    /* console.log(currentValue); */
    let promiseResolveFunction = HDLmBuildRules.promiseResolveFunction;
    promiseResolveFunction(currentValue);
  }
  /* This function runs the next stage of build processing. 
     The next stage is determined by many things, not the least of
     which is whether the prior stage worked or not. Note that this
     routine is highly recursive and calls itself to wait in many
     cases. */ 
  static nextStage(stage, varNext) {
    /* console.log('In HDLmBuildRules.nextStage'); */
    /* Handle the next stage of build processing. The next
       stage is always determined by the caller. */
    /* console.trace(); */
    let nextStageLoop = true;
    /* Loop handling the next stage of processing */
    while (nextStageLoop) {
      console.log(`In HDLmBuildRules.nextStage while loop ${stage}`); 
      /* console.log(stage); */
      /* The code below was used to find a bug */
      if (typeof(stage) == 'undefined') {
        stage = stage
      }
      switch (stage) { 
        /* Set the title for the current web page */
        case HDLmBuildRulesStageTypes.setTitle: {   
          /* Set the title */
          let newTitle = 'Headlamp Build Rules';
          window.document.title = newTitle;
          HDLmUtility.setHeader(newTitle);    
          stage = HDLmBuildRulesStageTypes.getModifications;
          break          
        }
        /* Get the rules/modifications from the server */
        case HDLmBuildRulesStageTypes.getModifications: {
          /* console.log('In HDLmBuildRules.handleInitialization before get modifications'); */         
          let getModificationsPromise = HDLmWebSockets.getModifications();
          /* console.log('In HDLmBuildRules.handleInitialization after get modifications', getModificationsPromise); */
          getModificationsPromise.then(function (responseText) {
            /* console.log(responseText); */
            /* Convert the JSON string passed to this routine 
               back into set of objects */
            HDLmTree.addToTree(responseText);
            /* We now have the rules. We need to turn test mode on. */
            stage = HDLmBuildRulesStageTypes.setTestModeOn;
            HDLmBuildRules.nextStage(stage, '');          
          }, function (error) {
            /* console.log(error); */
            let errorText = '';
            errorText = HDLmError.buildError('Error', 'Get modification failure', 52, error);
            HDLmUtility.setErrorText(errorText);
            /* Terminate the next stage loop and terminate the switch */
            nextStageLoop = false;
            /* break */
          });      
          /* Terminate the next stage loop and terminate the switch */
          /* console.log('Here'); */
          nextStageLoop = false;
          break; 
        }
        case HDLmBuildRulesStageTypes.setTestModeOn: {
          /* Turn test mode on for the current user */
          HDLmBuildRules.setTestModeOn();
          stage = HDLmBuildRulesStageTypes.showWebPageUi;
          break;
        }
        /* Handle the initial web page UI case. This UI is used
           to obtain the initial URL. */
        case HDLmBuildRulesStageTypes.showWebPageUi: {   
          /* Get the web page URL */
          HDLmBuildRules.buildWebPageUi(); 
          stage = HDLmBuildRulesStageTypes.waitForUrlInput;
          break          
        }
        /* Handle the initial web page UI case. This UI is used
           to obtain the initial URL. */
        case HDLmBuildRulesStageTypes.waitForUrlInput: {   
          let webUrlRejectFunction;
          let webUrlResolveFunction;
          /* Create a local promise */
          let webUrlPromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            webUrlRejectFunction = reject;
            webUrlResolveFunction = resolve;
          });
          /* Store the location of the reject function */
          HDLmBuildRules.promiseRejectFunction = webUrlRejectFunction;
          /* Store the location of the resolve function */
          HDLmBuildRules.promiseResolveFunction = webUrlResolveFunction;
          /* console.log(new Date()); */
          webUrlPromise.then(function (responseText) {
            /* console.log(new Date()); */
            /* Convert the JSON string passed to this routine 
               back into an object. */
            /* Get the URL from the response text. We need 
               to get the current value. */
            let responseObj = JSON.parse(responseText);
            /* Get and check the URL obtained from the user */
            let urlStr = responseObj.webPageUrl;
            /* Check if the URL is valid */
            let errorText = HDLmBuildRules.checkUrlValid(urlStr);
            if (errorText != '') {
              HDLmUtility.setErrorText(errorText); 
              stage = HDLmBuildRulesStageTypes.waitForUrlInput;
              HDLmBuildRules.nextStage(stage, '');
            }
            /* The URL appears to be minimally valid. The next stage
               is webpage-improver processing. */
            else {
              stage = HDLmBuildRulesStageTypes.webpageImproverServices;
              /* console.log('About to invoke nextState - ', responseObj); */
              HDLmBuildRules.nextStage(stage, responseObj);
            }
          }, function (error) {
            let errorText = '';
            errorText = HDLmError.buildError('Error', 'Retry URL input failure', 52, error);
            HDLmUtility.setErrorText(errorText);
            /* Try to get a new URL from the user */
            stage = HDLmBuildRulesStageTypes.waitForUrlInput;
            HDLmBuildRules.nextStage(stage, '');
          });      
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break; 
        }
        /* Try to run fetch on the input URL. This may or may not work.
           A proxy is used to bypass CORS issues. This code is no longer
           in use. The webpage-improver service does the actual work of 
           fetching the URL. */
        case HDLmBuildRulesStageTypes.executeFetch: {  
          /* Get the name of the proxy routine on the server */ 
          let proxyName = HDLmConfigInfo.getProxyName();
          /* Get the name of the server that is used to run the proxy routine */
          let serverName = HDLmConfigInfo.getServerName();
          /* Build the URL that is sent to the server */
          let urlStr = '';
          urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodSsl();
          urlStr += '://';
          urlStr += serverName;
          urlStr += '/';
          urlStr += proxyName;   
          /* Get the host name string from the URL */      
          let hostNameStr = HDLmHtml.getHostName(varNext);
          /* Build the headers for the fetch request */
          let buildHeaders = HDLmBuildRules.getHeadersFetch(hostNameStr);
          /* Build the post payload string passed to the host 
             server. This is the actual URL we are trying to
             fetch. We are using a proxy because of CORS 
             probelms. */ 
          let postPayloadStr = "";
          postPayloadStr += 'requesttype=URL';
          postPayloadStr += '&URL=';
          postPayloadStr += varNext;
          postPayloadStr += '&userid=&password=&type=get';
          /* console.log('In HDLmBuildRules.executeFetch'); */
          /* console.log(varNext); */
          /* Execute the fetch request. This call returns a promise. 
             The promise is resolved when the fetch request is complete. 
             The promise is rejected if the fetch request fails. */
          let buildPromise = fetch(urlStr, {  
                                             "method": "POST", 
                                             "headers": buildHeaders, 
                                             "body": postPayloadStr
                                           }
                                  );
          /* Try to wait on the promise. If the promise is resolved,
             then check the response. If the promise is rejected, then
             report an error and return to the caller. */
          buildPromise.then(function(response) {
            /* console.log('In HDLmBuildRules.executeFetch - then'); */
            /* console.log(response); */
            /* The response to the fetch request is an object
               that contains a lot of information. We are going
               to extract the status code and the status text
               from the response object. */
            let statusText = response.statusText;
            let statusCode = response.status;
            let statusOk = response.ok;
            let statusType = response.type;
            let statusBody = response.body; 
            /* console.log(statusCode); */
            /* The fetch will work in (almost) all cases. The fetch
               may return a web page or it may return some type of 
               error. The response may contain a web page or it may
               contain an error message. */ 
            if (statusOk || !statusOk) {
              /* Save the web page URL in a global variable.
                 We need to save the URL so we can use it 
                 later. */
              /* console.log(varNext); */
              HDLmBuildRules.webPageUrl = varNext;
              /* Try to convert the response to HTML */
              stage = HDLmBuildRulesStageTypes.convertResponse;
              HDLmBuildRules.nextStage(stage, response.text());
            }
            /* The URL did not work. Report the error to the user.
               Get a new URL from the user. The above code is run
               in all cases. This code is never used. */ 
            else {
              let errorText = '';
              errorText = `The URL failed with a status code of ${statusCode}`;
              HDLmUtility.setErrorText(errorText);
              /* Try to get a new URL from the user */
              stage = HDLmBuildRulesStageTypes.waitForUrlInput;
              HDLmBuildRules.nextStage(stage, '');
            }
          }, 
          function(error) {
            /* console.log('In HDLmBuildRules.executeFetch - errors'); */
            /* console.log(error); */
            let errorText = '';
            errorText = 'Fetch request (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Try to get a new URL from the user */
            stage = HDLmBuildRulesStageTypes.waitForUrlInput;
            HDLmBuildRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break; 
        }
        /* Try to convert the response. This may or may not work. 
           This code is no longer in use. The webpage-improver 
           service does the actual work of fetching the URL.*/
        case HDLmBuildRulesStageTypes.convertResponse: { 
          /* Try to wait on the promise. If the promise is resolved,
             then check the response. If the promise is rejected, then
             report an error and return to the caller. This promise is
             used to convert the response to a text string. */
          varNext.then(function(response) {
            /* console.log('In HDLmBuildRules.convertResponse - then'); */
            /* console.log(response); */
            /* console.log(varNext); */
            /* We need to consider three cases here. The first case is
               the response may show that some type of ordinary HTTP
               error occurred. The second case is the response may show
               domain name was not valid. The third case is the response
               contains the web page contents. */
            let errorDetected = false;
            let errorPosition;
            errorPosition = response.indexOf(HDLmDefines.getString('HDLMSIMULATEPROXYERROR'));
            if (errorPosition != -1) {
              errorDetected = true;
              let statusCodeStr = response.substring(errorPosition-4, errorPosition-1);             
              let errorText = `The URL failed with a status code of ${statusCodeStr}`;
              HDLmUtility.setErrorText(errorText);
              /* Try to get a new URL from the user */
              stage = HDLmBuildRulesStageTypes.waitForUrlInput;
              HDLmBuildRules.nextStage(stage, '');
            }
            /* Check for a URL failure (probably a domain name error) */
            errorPosition = response.indexOf(HDLmDefines.getString('HDLMSIMULATEPROXYFAILURE'));
            if (errorPosition != -1) {  
              errorDetected = true; 
              /* console.log(response); */
              let errorText = `The URL failed`;
              /* Try to get more information about the failure from the response */
              let skipLength = HDLmDefines.getString('HDLMSIMULATEPROXYFAILURE').length +
                               1 +
                               HDLmDefines.getString('HDLMURLFAILEDTEXT').length + 
                               2;
              let additionalErrorText = response.substring(errorPosition+skipLength);
              /* Look for the end of the title */
              let closePosition = additionalErrorText.indexOf('</');
              if (closePosition != -1) {
                additionalErrorText = additionalErrorText.substring(0, closePosition);
                /* console.log(additionalErrorText); */
                errorText += ' - ' + additionalErrorText;
              }
              /* console.log(additionalErrorText); */
              HDLmUtility.setErrorText(errorText);
              /* Try to get a new URL from the user */
              stage = HDLmBuildRulesStageTypes.waitForUrlInput;
              HDLmBuildRules.nextStage(stage, '');
            }
            /* At this point, we have the contents of the web page. We
               can construct some number of rules from the web page. */
            if (!errorDetected) {
              /* console.log('Before buildWebPageRules'); */
              /* console.log(response); */
              /* Try to build some rules */
              stage = HDLmBuildRulesStageTypes.webpageImproverServices; 
              /* stage = HDLmBuildRulesStageTypes.buildWebPageRules; */
              HDLmBuildRules.nextStage(stage, '');
            }
          },
          function(error) {
            /* console.log('In HDLmBuildRules.convertResponse - errors'); */
            let errorText = '';
            errorText = 'Response conversion (the promise) was rejected';
            /* console.log(errorText); */
            HDLmUtility.setErrorText(errorText); 
            /* Try to get a new URL from the user */
            stage = HDLmBuildRulesStageTypes.waitForUrlInput;
            HDLmBuildRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break; 
        } 
        /* Try to get the web page using the input URL. This 
           may or may not work. This case does not appear to 
           be in use. */
        case HDLmBuildRulesStageTypes.getWebPage: {  
          /* console.log('In HDLmBuildRules.nextStage.getWebPage'); */
          /* Declare and define a few variables */
          let ajaxPromise;
          /* The call below returns a Promise. The Promise is used to wait
             for the URL to execute */
          let userid = HDLmConfigInfo.getEntriesBridgeUserid();
          let password = HDLmConfigInfo.getEntriesBridgePassword();
          let requestAJAXAsyncTrue = true;
          ajaxPromise = HDLmAJAX.runAJAX('URL', 
                                         requestAJAXAsyncTrue, 
                                         varNext); 
          /* console.log(ajaxPromise); */
          /* console.log(varNext); */
          /* Try to wait on the promise. If the promise is resolved,
             then check the response. If the promise is rejected, then
             report an error and return to the caller. This promise is
             fulfilled with a text string. */
          ajaxPromise.then(function(response) {
            /* console.log('In HDLmBuildRules.nextStage.getWebPage - then'); */
            /* console.log(response); */
            /* Save the web page URL in a global variable.
               We need to save the URL so we can use it 
               later. */
            HDLmBuildRules.webPageUrl = varNext;
            /* Try to build some rules from the web page */
            stage = HDLmBuildRulesStageTypes.buildWebPageRules;
            HDLmBuildRules.nextStage(stage, '');
          },
          function(error) {
            /* console.log('In HDLmBuildRules.nextStage.getWebPage - error'); */
            /* console.log(error); */
            let errorText = '';
            errorText = 'Ajax (the promise) was rejected';
            /* console.log(errorText); */
            HDLmUtility.setErrorText(errorText); 
            /* Try to get a new URL from the user */
            stage = HDLmBuildRulesStageTypes.waitForUrlInput;
            HDLmBuildRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;  
        }
        /* The URL provided by the user is used with some of the 
           new AI code */
        case HDLmBuildRulesStageTypes.webpageImproverServices: {
          /* Save the web page URL in a global variable.
             We need to save the URL so we can use it 
             later. */
          HDLmBuildRules.suggestionText = varNext.suggestionText;
          HDLmBuildRules.webPageUrl = varNext.webPageUrl;
          /* Build some rules for the current web page. This is actually
             an async routine, which means that invoking it, produces a 
             promise. */
          let webpageImproverPromise = HDLmBuildRules.webpageImproverRunServices(HDLmBuildRules.suggestionText,
                                                                                 HDLmBuildRules.webPageUrl);
          /* Try to wait on the promise. If the promise is resolved 
             without an error, then we have the rules. If the promise
             is rejected, then we have an error. */
          webpageImproverPromise.then(function(webpageImproverRv) {
            /* console.log(webpageImproverRv); */
            /* Check if the return value show that no problems were
               encountered. */ 
            if (webpageImproverRv == true) {
              /* Run the next stage */                
              stage = HDLmBuildRulesStageTypes.buildWebPageRules;
              HDLmBuildRules.nextStage(stage, '');
            }  
            else {
              /* console.log(webpageImproverRv); */
              stage = HDLmBuildRulesStageTypes.waitForUrlInput;
              HDLmBuildRules.nextStage(stage, '');
            }             
          }, function(webpageImproverError) {
            console.log(webpageImproverError); 
            stage = HDLmBuildRulesStageTypes.waitForUrlInput;
            HDLmBuildRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Build some rules for the current web page. The webpage-
           improver service is an AI service that builds zero or
           more rules. */
        case HDLmBuildRulesStageTypes.buildWebPageRules: {
          stage = HDLmBuildRulesStageTypes.showWebPageRules;
          break;
        }
        /* Show some rules for the current web page. The webpage-
           improver service is an AI service that builds zero or
           more rules. */
        case HDLmBuildRulesStageTypes.showWebPageRules: {
          /* This is the base React code. This code runs
             the rest of the React code. */
          /* Run a timer. When the timer completes, it will 
             run some more React code. This timer gives Babel
             some time to finish modifying the JSX code. */ 
          setTimeout(() => {            
                              /* Run the later part of React */
                              stage = HDLmBuildRulesStageTypes.reactLater;
                              HDLmBuildRules.nextStage(stage, '');
                            }, 
                            20); 
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;          
        }  
        /* This case does not appear to be in use. */
        case HDLmBuildRulesStageTypes.reactBase: {
          /* console.log('In HDLmBuildRules.reactBase'); */
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break; 
        }
        case HDLmBuildRulesStageTypes.reactLater: {
          /* console.log('In HDLmBuildRules.reactLater'); */
          let reactRejectFunction;
          let reactResolveFunction;
          /* Create a local promise */
          let reactPromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            reactRejectFunction = reject;
            reactResolveFunction = resolve;
          });
          /* Store the location of the reject function */
          HDLmBuildRules.promiseRejectFunction = reactRejectFunction;
          /* Store the location of the resolve function */
          HDLmBuildRules.promiseResolveFunction = reactResolveFunction;
          /* Get the rules array for use below */
          let rulesArray = HDLmBuildRules.webpageImproverRules; 
          /* Invoke some React code. The code is in a function
             so that we can control when we run it. */
          HDLmReactThree.startReact(rulesArray);
          /* Wait for the user to finish making changes 
             to the rules. The user will click a button
             to finish making changes. The user may not
             make any changes. */
          reactPromise.then(function (responseText) {
            /* The following statement doesn't do anything. 
               It was added to remove a warning message. */
            responseText = responseText;
            /* console.log(responseText); */
            let newRulesArray = responseText;
            /* The user appears to have finished the changes */            
            stage = HDLmBuildRulesStageTypes.sendWebPageRules;
            HDLmBuildRules.nextStage(stage, newRulesArray);            
          }, function (error) {
            let errorText = '';
            errorText = HDLmError.buildError('Error', 'React failure', 52, error);
            HDLmUtility.setErrorText(errorText);
            /* Get the URL obtained from the user */
            let urlStr = HDLmBuildRules.webPageUrl;
            /* The user appears to have finished the changes */
            stage = HDLmBuildRulesStageTypes.sendWebPageRules;
            HDLmBuildRules.nextStage(stage, newRulesArray);
          });      
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Send the rules created using AI to the server */
        case HDLmBuildRulesStageTypes.sendWebPageRules: {
          /* console.log('In HDLmBuildRules.nextStage.sendWebPageRules'); */
          /* Convert the rules object into an array for use below */
          let newRulesObject = varNext;
          let newRulesArray = [];
          /* Get the rules array for use below. The rules
             array may (or may not) have been modified by
             the React code. The possibly updated rules 
             array is passed to this routine. */
          /* let newRulesArray = varNext; */
          for (let key in Object.keys(newRulesObject)) {
            /* console.log(key); */
            newRulesArray.push(newRulesObject[key]);
          }
          /* Process each of the rules */
          for (let ruleStr of newRulesArray) {
            let ruleObj = JSON.parse(ruleStr);
            /* At this point we have the rule as a object. 
               We need to either add the rule to the tree 
               or update the rule in the tree. */ 
            HDLmTree.storeTreeNode(ruleObj);
          }
          /* Build a JSON string from the rules array */          
          let newRulesStr = newRulesArray.toString();
          newRulesStr = '{"rules": ' + '[' + newRulesStr + ']' + '}';
          /* console.log(newRulesStr); */
          /* Try to send the rule to the server */
          let sendPromise = HDLmWebSockets.sendStoreTreeNodesRequest(newRulesStr);
          /* console.log(sendPromise); */
          /* Try to wait on the promise. If the promise is resolved,
             then check the response. If the promise is rejected, then
             report an error and return to the caller. */
          sendPromise.then(function(response) {
            stage = HDLmBuildRulesStageTypes.openWebPage;
            HDLmBuildRules.nextStage(stage, '');
          }, 
          function(error) {
            let errorText = '';
            errorText = 'Send request (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Wait for the browser to be unloaded */
            stage = HDLmBuildRulesStageTypes.openWebPage;
            HDLmBuildRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;          
        }        
        /* Try to open a web page using input URL. This 
           may or may not work. */
        case HDLmBuildRulesStageTypes.openWebPage: {
          /* console.log('In HDLmBuildRules.nextStage.openWebPage'); */
          window.open(HDLmBuildRules.webPageUrl);  
          stage = HDLmBuildRulesStageTypes.beforeUnload;
          break;  
        }
        /* Wait for the user to close the browser.
           This may happen quite soon or it may take
           a while. */  
        case HDLmBuildRulesStageTypes.beforeUnload: {
          /* console.log('In HDLmBuildRules.beforeUnload'); */
          /* Add an event listener to the window object. The event
             listener is used to detect when the user closes the
             browser. */
          HDLmBuildRules.beforeUnloadAdd();
          /* Define a few variables */
          let beforeUnloadRejectFunction;
          let beforeUnloadResolveFunction;  
          /* Create a local promise */
          let beforeUnloadPromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            beforeUnloadRejectFunction = reject;
            beforeUnloadResolveFunction = resolve;
          });
          /* Store the location of the resolve function */
          HDLmBuildRules.beforeUnloadResolveFunction = beforeUnloadResolveFunction;
          /* Wait for a browser close event */        
          beforeUnloadPromise.then(function(responseText) {
            /* console.log(document.visibilityState); */
            responseText = responseText;
            /* Turn off test mode  */
            stage = HDLmBuildRulesStageTypes.setTestModeOff;
            HDLmBuildRules.nextStage(stage, '');
          },          
          function(error) {
            let errorText = '';
            errorText = 'Before unload (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Turn off test mode */
            stage = HDLmBuildRulesStageTypes.setTestModeOff;
            HDLmBuildRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;          
        }
        /* Wait for the user to close the browser.
           This may happen quite soon or it may take
           a while. */  
        case HDLmBuildRulesStageTypes.visibilityChange: {
          /* console.log('In HDLmBuildRules.visibilityChange'); */
          /* Add an event listener to the window object. The event
             listener is used to detect when the user changes the
             visibility of the browser. */
          HDLmBuildRules.visibilityChangeAdd();
          /* Define a few variables */
          let visibilityChangeRejectFunction;
          let visibilityChangeResolveFunction;  
          /* Create a local promise */
          let visibilityChangePromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            visibilityChangeRejectFunction = reject;
            visibilityChangeResolveFunction = resolve;
          });
          /* Store the location of the resolve function */
          HDLmBuildRules.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
          /* Wait for a visibility change event */        
          visibilityChangePromise.then(function(responseText) {
            /* console.log(document.visibilityState); */
            responseText = responseText;
            /* Turn off test mode  */
            stage = HDLmBuildRulesStageTypes.setTestModeOff;
            HDLmBuildRules.nextStage(stage, '');
          },          
          function(error) {
            let errorText = '';
            errorText = 'Visibility change (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Turn off test mode */
            stage = HDLmBuildRulesStageTypes.setTestModeOff;
            HDLmBuildRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;          
        }
        case HDLmBuildRulesStageTypes.setTestModeOff: {
          /* Turn test mode off for the current user */
          HDLmBuildRules.setTestModeOff();
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }        
        /* Report an error if the current stage did not match one 
           of the expected choices */
        default: {
          /* console.log(stage); */
          /* console.log(typeof stage); */
          /* console.log(stage.toString()); */
          /* console.log(HDLmEnums); */
          /* console.log(HDLmEnums.HDLmBuildRulesStageTypes); */
          /* console.log(HDLmEnums.HDLmBuildRulesStageTypes[stage][0]); */
          let errorString = stage.toString();
          HDLmError.buildError('Error', 'Invalid stage', 56, errorString);
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
      }
    }
  }
  /* This routine gets rid of a bunch of divs we don't need */
  static removeDivs() {
    /* console.log('In HDLmBuildRules.removeDivs'); */
    /* Get the name of the header div. We are not going
       to remove the header div. We are going to remove
       the children of the header div. */     
    let divName = HDLmDefines.getString('HDLMLEFTANDRIGHTPAGE');
    /* console.log('divName = ' + divName); */
    const divHtml = document.getElementById(divName);  
    /* console.log('divHtml = ' + divHtml); */
    divHtml.replaceChildren();
  }
  /* The function below is used to render the current
     widget. This function is actually used to render
     the current container. */
  static renderWidget(currentWidget) {
    let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    currentWidget.render(treeIdValue, divValues);
  }
  /* This routine is used to turn test mode off for a user.
     In test mode, the user gets all of the rules, even 
     the test rules. In non-test mode, the user only gets
     the production rules. */
  static setTestModeOff() {
    /* console.log('In HDLmBuildRules.setTestModeOff'); */
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMBUILDRULESSETTESTOFF');   
    /* Send the URL to the server */
    let setPromise = fetch(urlStr, {  
                                     "method": "POST",
                                     "headers": [],
                                     "body": {}
                                   }
                          ); 
  }
  /* This routine is used to turn test mode on for a user.
     In test mode, the user gets all of the rules, even 
     the test rules. In non-test mode, the user only gets
     the production rules. */
  static setTestModeOn() {
    /* console.log('In HDLmBuildRules.setTestModeOn'); */
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMBUILDRULESSETTESTON');   
    /* Send the URL to the server */
    let setPromise = fetch(urlStr, {  
                                     "method": "POST",
                                     "headers": [],
                                     "body": {}
                                   }
                          ); 
  }
  /* This routine when called, adds an event listener to the window 
     object. The event listener is used to detect when the user
     changes the visibility of the browser. */
  static visibilityChangeAdd() {
    /* console.log('In HDLmBuildRules.visibilityChangeAdd'); */
    window.addEventListener('visibilitychange', (event) => {
      HDLmBuildRules.visibilityChangeDone(event);
    });
  }
  /* This routine is called when the user change the visibility 
     of the browser. This routine handles the visibility change
     event. The routine is used to resolve the promise that was 
     created before the user changed the visibility of the browser. */
  static visibilityChangeDone(event) {
    /* console.log('In HDLmBuildRules.visibilityChangeDone'); */
    /* console.log(event); */ 
    /* Show the document visibility state */
    /* console.log(document.visibilityState); */
    /* Count the number of times the user makes the browser hidden */
    if (document.visibilityState == 'hidden') 
      HDLmBuildRules.visibilityChangeHiddenCount++;  
    /* Count the number of times the user makes the browser visible */
    if (document.visibilityState == 'visible') 
      HDLmBuildRules.visibilityChangeVisibleCount++;
    /* Show the hidden and visible counts */
    /* console.log(HDLmBuildRules.visibilityChangeHiddenCount); */
    /* console.log(HDLmBuildRules.visibilityChangeVisibleCount); */ 
    if (document.visibilityState == 'hidden'      &&
        HDLmBuildRules.visibilityChangeHiddenCount > 1 &&
        HDLmBuildRules.visibilityChangeHiddenCount > HDLmBuildRules.visibilityChangeVisibleCount) 
      HDLmBuildRules.visibilityChangeResolveFunction('The vibility of the browser was hidden'); 
  }
  /* Get a set of standard headers for any webpage-improver service. 
     The headers are built and returned as an object. */
  static webpageImproverGetHeadersStandard(hostNameStr, contentLength) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build a host name header and add it to headers object */
    if (hostNameStr != null) {
      let hostHeader = HDLmHtml.buildHostHeader(hostNameStr);
      headersObj = Object.assign(headersObj, hostHeader);
    }
    /* Build a content type header and add it to the headers object */
    let contentType = HDLmConfigInfo. getApplicationJsonType();
    let contentHeader = HDLmHtml.buildContentTypeHeader(contentType)
    headersObj = Object.assign(headersObj, contentHeader);
    /* Build a content length header and add it to the headers object */
    let lengthHeader = HDLmHtml.buildContentLengthHeader(contentLength);
    headersObj = Object.assign(headersObj, lengthHeader);
    /* Return the headers object to the caller */
    return headersObj;
  } 
  /* Get some JSON for a get improvements service request */
  static webpageImproverGetImprovementsJson(sessionUuid, improvementsQuantity) {
    /* Build the initially empty get improvements service object */
    let getObj = {};
    /* Set a few values in the get improvements service object */
    getObj.sessionId = sessionUuid; 
    getObj.quantity = improvementsQuantity;
    /* Convert the get improvements service object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get LLM service request */
  static webpageImproverGetLlmJson(sessionUuid, llmName) {
    /* Build the initially empty get LLM service object */
    let getObj = {};
    /* Set a few values in the get LLM service object */
    getObj.sessionId = sessionUuid; 
    getObj.provider = llmName;
    /* Convert the get LLM service object to JSON and return
        the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get markup service request */
  static webpageImproverGetMarkupJson(sessionUuid, improvementStr) {
    /* Build the initially empty get markup service object */
    let getObj = {};
    /* Set a few values in the get markup service object */
    getObj.sessionId = sessionUuid; 
    getObj.improvement = improvementStr;
    /* Convert the get markup service object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get session service request */
  static webpageImproverGetSessionJson(sessionName) {
    /* Build the initially empty get session service object */
    let getObj = {};
    /* Set a few values in the get session service object */
    getObj.name = sessionName; 
    /* Convert the get session service object to JSON and return
        the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get webpage service request */
  static webpageImproverGetWebpageJson(sessionUuid, urlStr) {
    /* Build the initially empty get webpage service object */
    let getObj = {};
    /* Set a few values in the get webpage service object */
    getObj.sessionId = sessionUuid;
    getObj.url = urlStr;
    /* Convert the get webpage service object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* This routine is used to invoke one of the webpage-improver
     services */
  static webpageImproverInvokeService(servicePath, serviceHeaders, serviceJson) {
    /* console.log('In HDLmBuildRules.webpageImproverInvokeService'); */
    let webPromise = null;
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getFetchInternetMethodNoSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += ':';
    urlStr += HDLmConfigInfo.getWebpageImproverPort();
    urlStr += '/';
    urlStr += servicePath;
    console.log('urlStr is ' + urlStr); 
    console.log('JSON is ' + serviceJson);
    /* Send the URL to the service */
    webPromise = fetch(urlStr, {  
                                  "method": "POST",
                                  "headers": serviceHeaders,
                                  "body": serviceJson
                                }
                      ); 
    /* Return the promise to the caller */
    return webPromise
  }
  /* This routine is used to run a set of services */
  static async webpageImproverRunServices(suggestionText, webpageUrl) {
    let serviceData,
        serviceHeaders, 
        serviceJson, 
        serviceLength, 
        servicePath, 
        servicePromise,
        serviceQuantity,
        serviceResponse,
        serviceSessionId,
        serviceStage;
    /* Put the services in a try-catch block */
    try {
      /* Get the JSON string for the session service */
      serviceJson = HDLmBuildRules.webpageImproverGetSessionJson('Testing');
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmBuildRules.webpageImproverGetHeadersStandard(null, 
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverSessionPath();
      /* Invoke the session service */
      servicePromise = HDLmBuildRules.webpageImproverInvokeService(servicePath, 
                                                                   serviceHeaders,
                                                                   serviceJson);
      /* Wait for the session service to complete */
      serviceResponse = await servicePromise;
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      serviceData = await servicePromise;  
      HDLmBuildRules.webpageImproverSessionId = serviceData.sessionId;
      /* Get the JSON string for the LLM service */
      let llmName = HDLmConfigInfo.getOpenaiName();
      serviceSessionId = HDLmBuildRules.webpageImproverSessionId;
      serviceJson = HDLmBuildRules.webpageImproverGetLlmJson(serviceSessionId, llmName);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmBuildRules.webpageImproverGetHeadersStandard(null, 
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverLlmPath();
      /* Invoke the LLM service */
      servicePromise = HDLmBuildRules.webpageImproverInvokeService(servicePath, 
                                                                   serviceHeaders,
                                                                   serviceJson);
      /* Wait for the LLM service to complete */
      serviceResponse = await servicePromise;
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      serviceData = await servicePromise;  
      /* Get some values from the JSON object */
      HDLmBuildRules.webpageImproverProvider = serviceData.provider;  
      HDLmBuildRules.webpageImproverModel = serviceData.model;    
      /* Get the JSON string for the webpage service */
      serviceJson = HDLmBuildRules.webpageImproverGetWebpageJson(serviceSessionId, 
                                                                 webpageUrl);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmBuildRules.webpageImproverGetHeadersStandard(null, 
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverWebpagePath();
      /* Invoke the webpage service */
      servicePromise = HDLmBuildRules.webpageImproverInvokeService(servicePath, 
                                                                   serviceHeaders,
                                                                   serviceJson);
      /* Wait for the webpage service to complete */
      serviceResponse = await servicePromise;
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      serviceData = await servicePromise;  
      /* Check if the URL was valid */
      if (!serviceData.hasOwnProperty('webpage')) {
        let errorText = serviceData;
        HDLmUtility.setErrorText(errorText);
        return false;
      }
      /* Get some values from the JSON object */
      HDLmBuildRules.webpageImproverWebpage = serviceData.webpage;  
      /* Get the JSON string for the improvements service */
      serviceQuantity = 3;
      serviceJson = HDLmBuildRules.webpageImproverGetImprovementsJson(serviceSessionId, 
                                                                      serviceQuantity);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmBuildRules.webpageImproverGetHeadersStandard(null, 
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverImprovementsPath();
      /* Invoke the improvements service */
      servicePromise = HDLmBuildRules.webpageImproverInvokeService(servicePath, 
                                                                   serviceHeaders,
                                                                   serviceJson);
      /* Wait for the improvements service to complete */
      serviceResponse = await servicePromise;
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      serviceData = await servicePromise;  
      /* Check if we got any actual improvements */
      if (!serviceData.hasOwnProperty('improvements')) {
        let errorText = 'No improvements were found';
        HDLmUtility.setErrorText(errorText);
        return false;
      }
      /* Get some values from the JSON object */
      HDLmBuildRules.webpageImproverImprovements = serviceData.improvements;  
      /* The user may or may not have provided a suggestion. The 
         suggestion (if it exists) is used to build some markup. 
         The markup is used to build some rules. */
      if (HDLmBuildRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a 
         set of markup. */
      let improvementsCount = HDLmBuildRules.webpageImproverImprovements.length; 
      for (let i = 0; i < improvementsCount; i++) {
        let improvementObj = HDLmBuildRules.webpageImproverImprovements[i];
        /* console.log(improvementObj); */
        let improvementWhat = improvementObj.what;
        let improvementWhy = improvementObj.why;
        /* Get the JSON string for the improvements service */ 
        serviceJson = HDLmBuildRules.webpageImproverGetMarkupJson(serviceSessionId, 
                                                                  improvementWhat);
        serviceLength = serviceJson.length;
        serviceHeaders = HDLmBuildRules.webpageImproverGetHeadersStandard(null, 
                                                                          serviceLength);
        servicePath = HDLmConfigInfo.getWebpageImproverMarkupPath();
        /* Invoke the markup service */
        servicePromise = HDLmBuildRules.webpageImproverInvokeService(servicePath, 
                                                                     serviceHeaders,
                                                                     serviceJson);
        /* Wait for the markup service to complete */
        serviceResponse = await servicePromise;
        /* Convert the response to a JSON object */
        servicePromise = serviceResponse.json();
        serviceData = await servicePromise;  
        /* Get some values from the JSON object */
        HDLmBuildRules.webpageImproverMarkups.push(serviceData);  
      }   
      /* Convert each of the markup objects to a rule */
      let markupsCount = HDLmBuildRules.webpageImproverMarkups.length; 
      for (let i = 0; i < markupsCount; i++) {
        let improvementObj = HDLmBuildRules.webpageImproverImprovements[i];
        /* console.log(improvementObj); */
        let improvementWhat = improvementObj.what;
        let improvementWhy = improvementObj.why;
        let markupObj = HDLmBuildRules.webpageImproverMarkups[i];
        /* console.log(markupObj); */
        /* Build a tree node object from each of the markups */
        let constructList = HDLmBuildRules.constructTreeNode(HDLmBuildRules.webPageUrl, 
                                                             improvementWhy, 
                                                             markupObj);
        let treeNodeObj = constructList[0];
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* console.log('Information from constructTreeNode()', treeNodeObj, improvementWhy, markupObj, HDLmBuildRules.webPageUrl); */
        /* console.log(overallValid, scriptValid, stylesValid); */
        /* console.log(scriptStr); */
        /* console.log(stylesStr); */
        /* Check if the script value is valid */
        if (overallValid) {
          HDLmTree.storeTreeNode(treeNodeObj);
          /* Convert the tree node object to a string */
          let treeNodeStr = JSON.stringify(treeNodeObj);
          HDLmBuildRules.webpageImproverRules.push(treeNodeStr);
        }
        /* Some type of error was detected. Report the error 
           and continue processing. */
        else {
          console.log('Information from constructTreeNode()', treeNodeObj, improvementWhy, markupObj, HDLmBuildRules.webPageUrl);
          console.log(overallValid, scriptValid, stylesValid);
          console.log(scriptStr);
          console.log(stylesStr);
          let errorText = 'The generated script or style value(s) is/are not valid';
          HDLmUtility.setErrorText(errorText); 
          return false
        }
      }
      /* Return to the caller */
      return true;
    } 
    /* Handle some sort of error condition */
    catch (error) {
      console.error(error);
      let errorText = '';
      errorText = HDLmError.buildError('Error', 'Get Webpage-Improver Error', 52, error);
      HDLmUtility.setErrorText(errorText);
      return false;
    }
  }
} 
/* The function saved in the field below is invoked 
   when a promise is rejected */
HDLmBuildRules.promiseRejectFunction = null;
/* The function saved in the field below is invoked 
   when a promise is resolved */
HDLmBuildRules.promiseResolveFunction = null;
/* The suggestion text is stored in the field below */
HDLmBuildRules.suggestionText = null;
/* The following promise is used to wait for the user to 
   hide the browser. This promise is resolved when the
   user hides the browser. */
HDLmBuildRules.visibilityChangeResolveFunction = null;
/* The following counts are used to keep track of the number
   of times the user hides the browser or makes the browser 
   visible */
HDLmBuildRules.visibilityChangeHiddenCount = 0;
HDLmBuildRules.visibilityChangeVisibleCount = 0;
/* The webpage-improver improvements are stored in the field below */
HDLmBuildRules.webpageImproverImprovements = null;
/* The webpage-improver markups are stored in the array below */
HDLmBuildRules.webpageImproverMarkups = [];
/* The webpage-improver model is stored in the field below */
HDLmBuildRules.webpageImproverModel = null;
/* The webpage-improver provider is stored in the field below */
HDLmBuildRules.webpageImproverProvider = null;
/* The webpage-improver rules, created from the markups
   are stored in the array below */
HDLmBuildRules.webpageImproverRules = [];
/* The webpage-improver session ID is stored in the field below */
HDLmBuildRules.webpageImproverSessionId = null;
/* The webpage-improver webpage string is stored in the field below */
HDLmBuildRules.webpageImproverWebpage = null;
/* After a number of tests have been sucessfully completed, 
   the web page URL is stored in the field below */ 
HDLmBuildRules.webPageUrl = null;
/* Run the handle initialization function */
HDLmBuildRules.handleInitialization();