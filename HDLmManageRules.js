/**
 * HDLmManageRules short summary.
 *
 * HDLmManageRules description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
const actionsList = [
                      { name:   'Generate URL variants', 
                        action: 'actionGenerateVariants' },      
                      { name:   'Test a variant', 
                        action: 'actionTestVariant' },  
                      { name:   'Move a variant from test into production', 
                        action: 'actionMoveVariantIntoProduction' },  
                      { name:   'Move a variant from production into test', 
                        action: 'actionMoveVariantIntoTest' },
                      { name:   'Delete a variant', 
                        action: 'actionDeleteVariant' },      
                      { name:   'Enable a variant', 
                        action: 'actionEnableVariant' },  
                      { name:   'Disable a variant', 
                        action: 'actionDisableVariant' },  
                      { name:   'Show just production variants', 
                        action: 'actionShowProductionVariants' },  
                      { name:   'Show just test variants', 
                        action: 'actionShowTestVariants' },  
                      { name:   'Show all variants', 
                        action: 'actionShowAllVariants' }, 
                    ];
/* The HDLmManageRules class doesn't actually do anything. However, it
   does define a set of static methods that are used to build/manage 
   one or more rules. No instances of this class can ever be
   created. */
class HDLmManageRules {
  /* This routine when called, adds an event listener to the window
     object. The event listener is used to detect when the user
     unloads the browser. */
  static beforeUnloadAdd() {
    /* console.log('In HDLmManageRules.beforeUnloadAdd'); */
    window.addEventListener('beforeunload', (event) => {
      HDLmManageRules.beforeUnloadDone(event);
    });
  }
  /* This routine is called when the user unloads the browser.
     This routine handles the before unload event. The routine
     is used to resolve the promise that was created before the
     user unloaded the browser. */
  static beforeUnloadDone(event) {
    /* console.log('In HDLmManageRules.beforeUnloadDone'); */
    /* console.log(event); */
    /* The line below has been commented out. This line is used
       to present a dialog box to the user. The dialog box is
       prevent the browser from closing. We don't want to prevent
       the browser from closing. */
    /* event.preventDefault(); */
    HDLmManageRules.beforeUnloadResolveFunction('The browser was closed');
  }
  /* Build a JavaScript array with the new rules in it. For
     now the new rules are hard-coded below. */
  static ManageRulesArray() {
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
    '"prob":100.0,' +
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
    '"prob":100.0,' +
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
    '"prob":100.0,' +
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
                                                  HDLmManageRules.inputDone(currentJson);
                                                }
                                              },
                                              function () { });
    /* Add the new web page URL widget */
    containerWidget.addWidget(newUrlWidget, typeSource);
    /* Prompt for the URL and the (optional) suggestion*/
    HDLmManageRules.renderWidget(containerWidget);
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
    /* console.log('In HDLmManageRules.constructTreeNode'); */
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
    /* If the script is not valid JavaScript, log the script to the
       console. This is useful for debugging purposes. */
    if (!scriptValid)
      HDLmUtility.logStringInParts('Script', scriptStr);
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
    /* If the styles string is not valid JavaScript, log the
       styles string to the console. This is useful for
       debugging purposes. */
    if (!stylesValid)
      HDLmUtility.logStringInParts('Styles', stylesStr);
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
      /* console.log('In HDLmManageRules.constructTreeNode', nodeString); */
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
    let removeTailsFalse = false;
    let quoteCharsSingleQuote = "'";
    let ignoreSomeSingleQuotesTrue = true;
    let newModName = HDLmMenus.buildModificationName(parentTreeNode,
                                                      urlStringModified,
                                                      ruleType,
                                                      removeTailsFalse,
                                                      quoteCharsSingleQuote,
                                                      ignoreSomeSingleQuotesTrue);
    /* Get the modification name from the why string */
    let tempWhyValue = HDLmString.getCompleteWords(improveWhy, 55);
    tempWhyValue = tempWhyValue.trim();
    newModName = HDLmMenus.buildModificationName(parentTreeNode,
                                                  tempWhyValue,
                                                  ruleType,
                                                  removeTailsFalse,
                                                  quoteCharsSingleQuote,
                                                  ignoreSomeSingleQuotesTrue);
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
    newRuleObj.probability = 100.0;
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
  /* This routine builds an action React element from 
     a single action. The action object is passed to 
     this as a parameter. The React element is returned 
     to the caller. */
  static buildActionElement(actionEntry) {  
    /* console.log('In HDLmManageRules.buildActionsElement'); */
    /* console.log(actionEntry); */
    /* Get the action text from the current action entry */
    let actionText = actionEntry.name; 
    /* Create the React element for just one action */  
    let actionElement = HDLmReactFour.buildManageActionElement(null, 
                                                               actionText);
    /* Return the action element to the caller */
    return actionElement;
  }
  /* This routine builds an actions React element from 
     an array of actions. The actions array is
     passed to this routine as a parameter. The React 
     element is returned to the caller. */
  static buildActionsElement(actionsArray, 
                             belowTopPixels,
                             fromLeftPixels) { 
    /* console.log('In HDLmManageRules.buildActionssElement'); */
    /* console.log(actionsArray); */
    /* Create an array to hold the action elements */
    let actionsArrayElements = [];
    /* Process each of the companies in the companies array */
    for (let actionEntry of actionsArray) {
      /* Create a React element for the current action */
      let actionElement = HDLmManageRules.buildActionElement(actionEntry); 
      /* Add the new element to the array of action elements */
      actionsArrayElements.push(actionElement);              
    }
    /* Create the React element that hold all of
       the action elements */  
    const divStyle = { 'position': 'absolute',
                       'top': belowTopPixels.toString() + 'px',
                       'left': fromLeftPixels.toString() + 'px',};               
    let divPropsValue = {style: divStyle};
    let actionsElement = HDLmReactFour.buildManageActionsElement(null, 
                                                                 divPropsValue,
                                                                 actionsArrayElements);
    /* Return the actions element to the caller */
    return actionsElement;
  }
  /* This routine builds a companies React element from 
     an array of companies. The companies array is
     passed to this routine as a parameter. The React 
     element is returned to the caller. */
  static buildCompaniesElement(companiesArray) {  
    /* console.log('In HDLmManageRules.buildCompaniesElement'); */
    /* console.log(companiesArray); */
    /* Create an array to hold the company elements */
    let companiesArrayElements = [];
    /* Process each of the companies in the companies array */
    for (let companyEntry of companiesArray) {
      /* Get the company name from the current entry */
      let companyName = companyEntry.name; 
      /* Create a React element for the current company */
      let companyElement = HDLmManageRules.buildCompanyElement(companyEntry); 
      /* Add the new element to the array of company elements */
      companiesArrayElements.push(companyElement);              
    }
    /* Create the React element that hold all of
       the company elements */  
    let companiesElement = HDLmReactFour.buildManageCompaniesElement(null, 
                                                                     companiesArrayElements);
    /* Return the companies element to the caller */
    return companiesElement;
  }
  /* This routine builds a React element for just one 
     company. The company object is passed to this 
     routine as a parameter. The React element is
     returned to the caller. */
  static buildCompanyElement(oneCompany) {
    /* console.log('In HDLmManageRules.buildCompanyElement'); */
    /* Get the company name for the current company */
    let companyName = oneCompany.name; 
    /* Get the fragment element for the current company   
       that will include the company name and a break */
    /*
    let companyNameElement = HDLmReactFour.buildManageCompanyWBreakElement(null, 
                                                                           companyName);
    */
    let companyNameElement = HDLmManageRules.buildCompanyNameElement(companyName);
    /* Build all of the table rows for the current company */
    let tableRowsArray = [];
    /* Build the table header row */
    let statusThElement = HDLmReactFour.buildThElement(null, 'Status');
    let ruleThElement = HDLmReactFour.buildThElement(null, 'Rule name');
    let headerTrElement = HDLmReactFour.buildTrElement(null, 
                                                       [statusThElement, 
                                                        ruleThElement]);
    tableRowsArray.push(headerTrElement);
    /* Build a row for each rule in the current company */
    let companyRulesArray = oneCompany.rules;
    for(let companyRule of companyRulesArray) {
      /* Get some information about the current rule */
      let ruleNodepath = companyRule.nodePath;    
      let ruleNodepathLength = ruleNodepath.length;   
      let ruleName = ruleNodepath[ruleNodepathLength - 1];  
      let ruleUseMode = companyRule.details.usemode;
      /* Set the value to 'none' if the use mode is not set */
      if (!ruleUseMode)
        ruleUseMode = 'none';
      /* Build a table row for the current rule */
      let ruleStatusThElement = HDLmReactFour.buildThElement(null, ruleUseMode);
      let ruleNameThElement = HDLmReactFour.buildThElement(null, ruleName);
      let ruleTrElement = HDLmReactFour.buildTrElement(null, 
                                                        [ruleStatusThElement, 
                                                         ruleNameThElement]);
      tableRowsArray.push(ruleTrElement);
    }  
    /* Build a table with all of the rules for the current company */
    const tableStyle = { 'margin-left': '20px'};               
    let tablePropsValue = {style: tableStyle};
    let companyTableElement = HDLmReactFour.buildTableElement(tablePropsValue,
                                                              tableRowsArray);
    /* Build a React company element for the company */
    let companyElement = HDLmReactFour.buildManageCompanyElement(null,
                                                                 companyNameElement,
                                                                 companyTableElement);
    /* Return the React company element to the caller */
    return companyElement; 
  }
  /* This routine builds a React element for the company
     name. The React element is returned to the caller. */
  static buildCompanyNameElement(companyName) {
    /* console.log('In HDLmManageRules.buildCompanyNameElement'); */
    /* Create a set of properties for the company name */
    let companyNameProps = {value: companyName,
                            readOnly: true,
                            style: {fontWeight: 'bold'}}; 
    /* Create a React element for the company name */
    let companyNameElement = React.createElement('input', companyNameProps);
    /* Return the React element to the caller */
    return companyNameElement;
  }
  /* This routine builds an overall web UI React element. 
     The overall web UI React element is built from 
     various sub-elements. The overall web UI React 
     element is returned to the caller. */
  static buildWebUiElement() {  
    /* console.log('In HDLmManageRules.buildWebUiElement'); */
    /* Get the React element for the prompts */
    let promptElement = HDLmManageRules.getSuggestionUrl();   
    /* Get the React element for the companies */  
    let companiesArray = HDLmManageRules.companiesArray;
    let companiesElement = HDLmManageRules.buildCompaniesElement(companiesArray);
    /* Get the React element for the action buttons */
    let actionsElement = HDLmManageRules.buildActionsElement(actionsList,
                                                             150, 
                                                             500); 
    /* Create a break element to go between the prompt
       element and the companies element */
    let breakElement = HDLmReactFour.buildBreakElement();
    /* Create a React fragment element to hold all of
       the sub-elements */
    let tempFragment = HDLmReactFour.putElementsInFragment([breakElement, 
                                                            promptElement, 
                                                            breakElement, 
                                                            companiesElement,
                                                            actionsElement
                                                           ]);
    /* Return the React fragment element to the caller */ 
    return tempFragment;
  }
  /* This routine tries to get the access cookie that may 
     have a userid in it. If the access cookie can be 
     found, it is returned to the caller. If the access
     cookie can not be found, then a null value is returned
     to the caller. */ 
  static getAccessCookie() {
    /* console.log('In getAccessCookie'); */
    /* Set the default return value */
    let rv = null;
    /* Check if the name of the Headlamp access cookie
       has been set or not */
    if (HDLmManageRules.accessCookieName == null)
      /* Save the name of access cookie */
      HDLmManageRules.accessCookieName = HDLmDefines.getString('HDLMACCESSCOOKIE');
    let localName = HDLmManageRules.accessCookieName;
    /* Get all of the cookies */
    let cookiesStr = document.cookie;
    /* console.log("'" + cookiesStr + "'"); */
    /* The code below was added just for testing under Windows because the document.cookie
       might be empty in some testing environments. This ensures that the function has
       a cookie string to work with during development and testing. */
    if (cookiesStr == '' && false) 
      cookiesStr = 'HDLmAccessCookie=PsFedeDOuKGII%2BB6sJU%2FfnZB0%2BvzxyHtUVQx78BqvnKXdO21hj3smrXbBwswEmKqDO8Y1Nrdsqe7GYUn';
    /* console.log(cookiesStr); */
    /* Search the cookies for the one we are looking for */
    let cookiesArray = cookiesStr.split(";");
    /* console.log(cookiesArray); */
    for(let cookieStr of cookiesArray) {
      if (cookieStr.includes(localName)) {
        let cookieContents = cookieStr.split("=");
        rv = cookieContents[1];
        /* console.log("'" + rv + "'"); */
        break;
      }
    }
    /* console.log('x', "'" + cookies + "'"); */
    return rv;
  }
  /* Get a set of headers for a fetch request. The headers are built
     and returned to the caller as an object. */
  static getHeadersFetch(hostNameStr) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build the standard headers and add them to the headers object */
    let standardHeaders = HDLmManageRules.getHeadersStandard(hostNameStr);
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
  /* This routine tries to get a new password from a user */ 
  static getNewPassword() {
    /* console.log('In getNewPassword'); */
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;
     /* This function handles a key down event in the new password
        field */
    function newPasswordKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the new password in all cases, even if the current
         key is not the enter key. This approach ensures that the 
         new password field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessNewPassword = fieldValue;
      else
        HDLmManageRules.accessNewPassword = fieldValue + eventKey;
      if (eventKey == 'Enter') {
        /* Check if new password has been entered. If so 
           we can go onto the next stage. */
        let localNewPassword = HDLmManageRules.accessNewPassword;
        if (typeof(localNewPassword) != 'undefined' &&
            localNewPassword         != null        &&
            localNewPassword         != '')
          HDLmManageRules.inputDone('New password done');  
      }
    }
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let reactRoot = HDLmReactFour.getRootContainer('entryValues');
    let newPasswordElement = HDLmReactFour.buildInputWLabel(newPasswordKeyDown, 'New Password', 'Enter New Password', true);  
    HDLmReactFour.renderReact(reactRoot, newPasswordElement);
    /* Return the React promise to the caller. This promise
       is never fufilled. */ 
    return reactPromise;
  }
  /* This routine tries to get a URL and a suggestion
     from a user. The URL and suggestion are checked
     (in practice, only the URL is checked) to make
     sure they are valid. */ 
  static getSuggestionUrl() {
    /* console.log('In getUrlSuggestion'); */
    /* This function handles a key down event in the suggestion
       field */
    function suggestionKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the suggestion in all cases, even if the current key  
         is not the enter key. This approach ensures that the 
         suggestion field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.promptSuggestion = fieldValue;
      else
        HDLmManageRules.promptSuggestion = fieldValue + eventKey;
    }
    /* This function handles a key down event in the URL
       field */
    function urlKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the userid in all cases, even if the current key  
         is not the enter key. This approach ensures that the 
         userid field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.PromptUrl = fieldValue;
      else
        HDLmManageRules.PromptUrl = fieldValue + eventKey;      
    }
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let suggestionElement = HDLmReactFour.buildInputWLabel(suggestionKeyDown, 
                                                           'Please enter a suggestion (optional)',  
                                                           'Enter suggestion text', 
                                                           true); 
    let urlElement = HDLmReactFour.buildInputWLabel(urlKeyDown,
                                                    'Please enter a valid URL', 
                                                    'Enter web page URL', 
                                                    false); 
    let breakElement = HDLmReactFour.buildBreakElement();
    let tempFragment = HDLmReactFour.putElementsInFragment([suggestionElement, 
                                                            breakElement, 
                                                            urlElement]);
    /* Return the React fragment element to the caller */ 
    return tempFragment;
  }
  /* This routine tries to get the userid and the password 
     from a user. The userid and password combination are 
     checked to make sure they are valid. */ 
  static getUseridPassword() {
    /* console.log('In getUseridPassword'); */
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;
     /* This function handles a key down event in the password
        field */
    function passwordKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the password in all cases, even if the current key  
         is not the enter key. This approach ensures that the 
         password field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessPassword = fieldValue;
      else
        HDLmManageRules.accessPassword = fieldValue + eventKey;
      if (eventKey == 'Enter') {
        /* Check if both the userid and the password have
           been entered. If both have been entered, then
           we can go onto the next stage. */
        let localUserid = HDLmManageRules.accessUserid;
        let localPassword = HDLmManageRules.accessPassword;
        if (typeof(localUserid) != 'undefined'   &&
            localUserid != null                  &&
            localUserid != ''                    &&
            typeof(localPassword) != 'undefined' &&
            localPassword != null                &&
            localPassword != '')
          HDLmManageRules.inputDone('Userid/Password done');  
      }
    }
    /* This function handles a key down event in the userid
       field */
    function useridKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the userid in all cases, even if the current key  
         is not the enter key. This approach ensures that the 
         userid field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessUserid = fieldValue;
      else
        HDLmManageRules.accessUserid = fieldValue + eventKey;
      if (eventKey == 'Enter') {
        /* Check if both the userid and the password have
           been entered. If both have been entered, then
           we can go onto the next stage. */
        let localUserid = HDLmManageRules.accessUserid;
        let localPassword = HDLmManageRules.accessPassword;
        if (typeof(localUserid) != 'undefined'   &&
            localUserid != null                  &&
            localUserid != ''                    &&
            typeof(localPassword) != 'undefined' &&
            localPassword != null                &&
            localPassword != '')
          HDLmManageRules.inputDone('Userid/Password done');       
      }
    }
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let reactRoot = HDLmReactFour.getRootContainer('entryValues');
    let useridElement = HDLmReactFour.buildInputWLabel(useridKeyDown, 'Userid', 'Enter Userid', true); 
    let passwordElement = HDLmReactFour.buildInputWLabel(passwordKeyDown, 'Password', 'Enter Password', false); 
    let breakElement = HDLmReactFour.buildBreakElement();
    let tempFragment = HDLmReactFour.putElementsInFragment([useridElement, breakElement, passwordElement])
    HDLmReactFour.renderReact(reactRoot, tempFragment);
    /* Return the React promise to the caller. This promise
       is never fufilled. */ 
    return reactPromise;
  }
  /* This routine tries to get a verification code from a user */ 
  static getVerificationCode() {
    /* console.log('In getVerificationCode'); */
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;
     /* This function handles a key down event in the verification code
        field */
    function verificationCodeKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the verification code in all cases, even if the current
         key is not the enter key. This approach ensures that the 
         verification code field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessVerificationCode = fieldValue;
      else
        HDLmManageRules.accessVerificationCode = fieldValue + eventKey;
      if (eventKey == 'Enter') {
        /* Check if verification code has been entered. If so 
           we can go onto the next stage. */
        let localVerificationCode = HDLmManageRules.accessVerificationCode;
        if (typeof(localVerificationCode) != 'undefined' &&
            localVerificationCode         != null        &&
            localVerificationCode         != '')
          HDLmManageRules.inputDone('Verification code done');  
      }
    }
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let reactRoot = HDLmReactFour.getRootContainer('entryValues');
    let verificationCodeElement = HDLmReactFour.buildInputWLabel(verificationCodeKeyDown, 
                                                                 'Verification Code', 
                                                                 'Enter Verification Code',
                                                                 true);  
    HDLmReactFour.renderReact(reactRoot, verificationCodeElement);
    /* Return the React promise to the caller. This promise
       is never fufilled. */ 
    return reactPromise;
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
    /* console.log('In HDLmManageRules.inputDone'); */
    /* console.log(currentValue); */
    /* Get rid of any existing error text */
    HDLmUtility.setErrorText('');
    let promiseResolveFunction = HDLmManageRules.promiseResolveFunction;
    promiseResolveFunction(currentValue);
  }
  /* Check if the current key value can (will) be added to 
     text fields. Many keys (such as letters) will be added
     to text fields. Many keys (such as enter) will not be
     added to text fields. */
  static keyValidForTextField(keyValue) {
    /* console.log(keyValue); */
    /* Set a default value for the return value */
    let rv = false;
    /* Check for key value that are longer than one */
    if (keyValue.length > 1)
      return rv;
    /* Check for a lowercase letter */
    if (keyValue >= 'a' && keyValue <= 'z')
      rv = true;
    /* Check for an uppercase letter */
    if (keyValue >= 'A' && keyValue <= 'Z')
      rv = true;
    /* Check for numbers */
    if (keyValue >= '0' && keyValue <= '9')
      rv = true;
    /* Check for a few special values */
    if (keyValue >= '!' && keyValue <= '/')
      rv = true;
    /* Check for a few special values */
    if (keyValue >= ':' && keyValue <= '@')
      rv = true;
    /* Check for a few special values */
    if (keyValue >= '[' && keyValue <= '`')
      rv = true;
      /* Check for a few special values */
    if (keyValue >= '{' && keyValue <= '~')
      rv = true;
    /* Return a value to the caller */
    /* console.log(rv); */
    return rv;
  }    
  /* Provide the main routine */
  static main() {
    /* This routine may been invoked to manage rules or it may have
       been invoked for some other reason. Check if the path shows
       that what the user really wants is to manage rules. */
    let manageRules = false;
    let windowlocationPathName = window.location.pathname;
    if (windowlocationPathName.toLowerCase() == '/managerules')
      manageRules = true;
    /* Check if the user wants to manage rules under the debugger */
    if (windowlocationPathName.endsWith('index.html'))
      manageRules = true;
    /* Check if we really want to manage rules */
    /* console.log('manageRules', manageRules); */
    if (!manageRules)
      return;  
    /* If we are here, then we are starting to manage one or more rules */
    let stage = HDLmManageRulesStageTypes.getConfigs; 
    HDLmManageRules.nextStage(stage, null);
    /* Return to the caller */
    return;
  }
  /* This function runs the next stage of manage rules processing.
     The next stage is determined by many things, not the least of
     which is whether the prior stage worked or not. Note that this
     routine is highly recursive and calls itself to wait in many
     cases. */
  static async nextStage(stage, varNext) {
    /* console.log('In HDLmManageRules.nextStage'); */
    /* Handle the next stage of manage processing. The next
       stage is always determined by the caller. */
    /* console.trace(); */
    let nextStageLoop = true;
    /* Loop handling the next stage of processing */
    while (nextStageLoop) {
      console.log(`In HDLmManageRules.nextStage while loop ${stage}`);
      /* console.log(stage); */
      /* The code below was used to find a bug */
      if (typeof(stage) == 'undefined') 
        stage = stage;
      /* Switch on the current stage */
      switch (stage) {
        /* Get the configs */
        case HDLmManageRulesStageTypes.getConfigs: {
          /* Get a Promise that will resolve to the configuration settings text.
             The configuration settings are expected to be in JSON format. The
             call below returns a Promise that resolves to a string containing
             the configuration data in JSON format. */
          let configsObj = await HDLmConfig.getConfigs();
          /* Add all of the configuration setting to an object in the
             HDLmConfig module. This allows the rest of the application
             to access and chanage configuration settings easily. */
          HDLmConfig.addConfigs(configsObj);
          /* Set either production mode on or off depening on what URL 
             was used to lanch this code */
          let localMode;
          /* We may neet to set a few configuration values based on the
             server name. We may (or may not be) running in test mode. 
             We need to check for test mode and make some changes if we
             are running in test mode. Note that under the debugger, the
             window location is an empty string. */
          let windowlocationHostName = window.location.hostname;
          if (windowlocationHostName != null      && 
              windowlocationHostName != undefined && 
              windowlocationHostName.indexOf('t') > 0) 
            localMode = false;
          else 
            localMode = true;
          /* Set production mode to either true (production) or false (test) */
          HDLmUtility.setProdMode(localMode);
          /* Move to the next stage */
          stage = HDLmManageRulesStageTypes.setTitle;
          break;
        }
        /* Set the title for the current web page */
        case HDLmManageRulesStageTypes.setTitle: {
          /* Set the title */
          let newTitle = 'Headlamp Manage Rules';
          window.document.title = newTitle;
          HDLmUtility.setHeader(newTitle);
          stage = HDLmManageRulesStageTypes.sendBuildCookie;
          break
        }
        /* Send a request to the server to build a cookie and setn
           the cookie back to the client */
        case HDLmManageRulesStageTypes.sendBuildCookie: {
          await HDLmManageRules.sendBuildCookie(); 
          /* Try to get the access cookie */ 
          stage = HDLmManageRulesStageTypes.getAccessCookie;
          break;
        }
        /* This case does not appear to be in use */
        case HDLmManageRulesStageTypes.sendBuildCookieResponse: 
        /* Get the cookie that the user may have set. The cookie
           may have a userid in it. This eliminates the need for 
           the user to login each time. */
        case HDLmManageRulesStageTypes.getAccessCookie: {
          let localValueOfCookie = HDLmManageRules.getAccessCookie(); 
          /* console.log(localValueOfCookie); */
          /* Check if we were able to get the encrypted cooke value
             from the access cookie. If this is true, the we don't 
             need to promp the user for a userid and password. */
          if (localValueOfCookie == null) {
            stage = HDLmManageRulesStageTypes.getUseridPassword;
            break;
          }
          /* We were able to get the access cookie. The cookie
             is descrtped below and use. */ 
          else {
            /* Show that we were about to get access information
               from the access cookie */
            HDLmManageRules.getFromCookie = true;
            /* Convert the cookie value to binary. More work 
               is needed later. */
            if (localValueOfCookie.indexOf('%') >= 0) {
               /* console.log(localValueOfCookie); */
               localValueOfCookie = HDLmHttp.uriDecode(localValueOfCookie);
               /* console.log(localValueOfCookie); */
            }
            let encryptedValueString = atob(localValueOfCookie); 
            /* console.log(typeof(encryptedValue)); */  
            /* console.log(encryptedValueString); */ 
            /* Create a Uini8 array from the output of atob. This array
               is later passed to the standard description code. Note 
               that some special code was obtained from Stack Overflow
               ("How to convert uint8 Array to base64 Encoded String?").*/
            let encryptedArrayUint8 = new Uint8Array([...encryptedValueString].map(c => c.charCodeAt()));
            /* console.log(typeof(encryptedValue)); */
            /* console.log(encryptedArrayUint8); */
            /* Get a local copy of the AES secret encryption key */
            let localKey = HDLmConfigInfo.getSecretEncryptionKey();
            /* console.log(localKey); */
            /* Try to decrypt the cookie value */
            let decryptView = await HDLmEncryption.decrypt(localKey, encryptedArrayUint8);
            /* We now have a view of the actual decrypted data. */ 
            /* console.log(decryptView); */
            let decoder = new TextDecoder('utf-8'); 
            let decodedStr = decoder.decode(decryptView); 
            /* console.log(decodedStr); */
            let decryptObj = JSON.parse(decodedStr)
            /* console.log(decryptObj); */
            /* Get a few values from the object */
            HDLmManageRules.accessPassword = decryptObj.password;
            HDLmManageRules.accessUserid = decryptObj.userid;
            /* Now that we have access information we can get
               some or all of the modifications. */
            stage = HDLmManageRulesStageTypes.getModifications;
            break;          
          }
        }
        /* Get the userid and the password from the user. The combination
           must be valid. */
        case HDLmManageRulesStageTypes.getUseridPassword: {
          /* Wait for the user to finish entering the userid
             and password. The userid and password combination
             may or may not be valid. */
          await HDLmManageRules.getUseridPassword(); 
          /* The user appears to have entered the userid/password combination */
          stage = HDLmManageRulesStageTypes.checkUseridPassword;
          break;
        } 
        /* Check the usedid and the password obtained from the user. 
           The combination must be valid. */
        case HDLmManageRulesStageTypes.checkUseridPassword: {
          /* Check the userid and the password */
          let localUserid = HDLmManageRules.accessUserid;
          let localPassword = HDLmManageRules.accessPassword;
          /* Wait for the server to finish check the userid
             and password. */
          let responseObj = await HDLmSecurity.checkUsernamePasswordServer(localUserid, localPassword);       
          /* console.log(responseObj); */ 
          /* Check if the status code from the call, shows
             that the call succeeded */
          let responseStatus = responseObj.status;
          /* check if the userid/password combination were even
             minimally valid. If they were not even minimally 
             valid, we need to get a new combination of userid
             and password. */
          if (responseStatus != 200) {
            let errorText = 'The Userid / Password combination was invalid';
            HDLmUtility.setErrorText(errorText);
            stage = HDLmManageRulesStageTypes.getUseridPassword;
            break;
          }
          /* The reponse body will have additional information */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            let responseRead = await responseReader.read();
            stage = HDLmManageRulesStageTypes.checkUseridPasswordResponse;
            HDLmManageRules.nextStage(stage, responseRead);
            /* Terminate the next stage loop and terminate the switch */
            nextStageLoop = false;
            break;
          }     
        } 
        /* Check the usedid and the password response obtained from 
           the server. The combination must be valid. */
        case HDLmManageRulesStageTypes.checkUseridPasswordResponse: {  
          /* Wait for the server to send back a response */ 
          /* console.log(responseObj); */
          let responseObj = varNext;
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          /* The following code was added to circumvent a bug
             in AWS. The response value should not be undefined. 
             
             The comment above appears to be wrong. The bug was 
             acutally in my code (or so I think). What happens is
             that the userid / password combination is locally 
             checked (and passes) on the Java server. The combination
             is never sent to the AWS. As a oonsequence the 'value' 
             is undefined in the reply. */ 
             /* console.log("'" + responseValue + "'"); */
          if (typeof(responseValue) == 'undefined' ||
              responseValue == null                ||
              responseValue == '') {
            stage = HDLmManageRulesStageTypes.setAccessCookie;
            break;             
          }
          /* Check if the rest of this code should be executed */
          if (true) {
            /* console.log(typeof(responseValue)); */
            /* console.log("'" + responseValue + "'"); */
            let responseJson = new TextDecoder().decode(responseValue);
            /* console.log("'" + responseJson + "'"); */
            responseObj = JSON.parse(responseJson); 
            /* Check if the response has a challenge */
            if (responseObj.hasOwnProperty('ChallengeName')) {
              let responseChallenge = responseObj.ChallengeName;
              /* Check if a new password is needed */
              if (responseChallenge == 'NEW_PASSWORD_REQUIRED') { 
                stage = HDLmManageRulesStageTypes.getNewPassword;
                break;
              }
              /* Check if a verification code is needed */
              if (responseChallenge == 'SMS_MFA') { 
                HDLmManageRules.accessChallengeName = responseChallenge;
                HDLmManageRules.sessionId = responseObj.Session;
                stage = HDLmManageRulesStageTypes.getVerificationCode;
                break;
              }
            }          
            /* The user appears to have entered a valid combination of 
               a userid and password */
            else {
              stage = HDLmManageRulesStageTypes.setAccessCookie;
              break;
            }
          }
        } 
        /* Get the new password from the user */
        case HDLmManageRulesStageTypes.getNewPassword: {
          /* Wait for the user to finish entering the new password */
          await HDLmManageRules.getNewPassword();      
          /* console.log(responseText); */
          /* The user appears to have entered the new password */
          stage = HDLmManageRulesStageTypes.setNewPassword;
          break;
        } 
        /* Store the new password obtained from the user */
        case HDLmManageRulesStageTypes.setNewPassword: {
          /* Store the new password */
          let localUserid = HDLmManageRules.accessUserid;
          let localNewPassword = HDLmManageRules.accessNewPassword;
          /* Wait for the server to finish storing the new password */ 
          let responseObj = await HDLmSecurity.adminSetPasswordServer(localUserid, localNewPassword);
          /* console.log(responseObj); */ 
          /* Check if the status code from the call, shows
             that the call succeeded */
          let responseStatus = responseObj.status;
          /* check if the new password was even minimally valid. 
             If it was not even minimally valid, we need to get 
             a new combination of userid and password. */
          if (responseStatus != 200) {
            let errorText = 'The new password was invalid';
            HDLmUtility.setErrorText(errorText);
            stage = HDLmManageRulesStageTypes.getNewPassword;
            break;
          }
          /* The reponse body will have additional information
             that we can ignore */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            let responseRead = await responseReader.read();
            HDLmManageRules.accessPassword = HDLmManageRules.accessNewPassword;
            stage = HDLmManageRulesStageTypes.setAccessCookie;
            break;
          }
        } 
        /* This case does not appear to be in use */
        case HDLmManageRulesStageTypes.setNewPasswordResponse: 
        /* Get the verification code from the user */
        case HDLmManageRulesStageTypes.getVerificationCode: {
          /* Wait for the user to finish entering the verification code */
          let responseText = await HDLmManageRules.getVerificationCode(); 
          /* console.log(responseText); */
          /* The user appears to have entered the verification code */
          stage = HDLmManageRulesStageTypes.sendVerificationCode;
          break;           
        } 
        /* Send the verification code obtained from the user */
        case HDLmManageRulesStageTypes.sendVerificationCode: {
          /* Send the verification code */
          let localChallengeName = HDLmManageRules.accessChallengeName;
          let localSessionId = HDLmManageRules.sessionId;
          let localUserid = HDLmManageRules.accessUserid;
          let localVerificationCode = HDLmManageRules.accessVerificationCode;
          /* Wait for the server to finish checking the verification code */
          let responseObj = await HDLmSecurity.checkVerificationCodeServer(localChallengeName,
                                                                           localUserid, 
                                                                           localVerificationCode,
                                                                           localSessionId);
          /* console.log(responseObj); */ 
          /* Check if the status code from the call, shows
             that the call succeeded */
          let responseStatus = responseObj.status;
          /* check if the verification code was even minimally valid.
             If it was not even minimally valid, we need to get a new
             combination of userid and password. */
          if (responseStatus != 200) {
            let errorText = 'The verification code was invalid';
            HDLmUtility.setErrorText(errorText);
            stage = HDLmManageRulesStageTypes.getVerificationCode;
            break;
          }
          /* The reponse body will have additional information 
             that we will ignore */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            let responseRead = await responseReader.read();
            stage = HDLmManageRulesStageTypes.setAccessCookie;
            break;
          }
        } 
        /* This case does not appear to be in use */
        case HDLmManageRulesStageTypes.sendVerificationCodeResponse: 
        /* Set the access cookie. This eliminates the need for the 
           user to login each time. */
        case HDLmManageRulesStageTypes.setAccessCookie: {
          /* This code is only really needed if we were not 
             able to use the access cookie. This code stores
             the access cookie. */
          if (HDLmManageRules.getFromCookie == false) {
            /* Get a local copy of the AES secret encryption key */
            let localKey = HDLmConfigInfo.getSecretEncryptionKey();
            /* Get local copies of the userid and password */
            let localUserid = HDLmManageRules.accessUserid;
            let localPassword = HDLmManageRules.accessPassword;
            /* Build an object that contains the userid and password */
            let localObject = { "userid": localUserid,
                                "password": localPassword };
            /* Convert the object to a string and encrypt the string */
            let localJson = JSON.stringify(localObject);
            /* Wait for the encryption process to complete. The result 
               is a view of the actual encrypted data. */ 
            let responseView = await HDLmEncryption.encrypt(localKey, localJson); 
            /* console.log(responseView); */
            /* Convert the response view to as base 64 ASCII string by base 64
               encoding it. Note that some special code was obtained from Stack
               Overflow ("How to convert uint8 Array to base64 Encoded String?"). */
            let responseB64 = btoa(String.fromCharCode.apply(null, responseView));
            /* console.log(responseB64); */
            HDLmManageRules.setAccessCookie(responseB64);
            /* The server appears to have stored the session cookie */
            stage = HDLmManageRulesStageTypes.getModifications;
            break;
          } 
          /* We were able to use the access cookie. In that case,
             we can just go to the next step. */  
          else {
            stage = HDLmManageRulesStageTypes.getModifications;
            break
          }
        }
        /* Get the rules/modifications from the server */
        case HDLmManageRulesStageTypes.getModifications: {
          /* console.log('In HDLmManageRules.nextStage before get modifications'); */
          let responseText = await HDLmTree.passReadSomeRows(HDLmManageRules.accessUserid, 
                                                             HDLmManageRules.accessPassword);
          /* console.log('In HDLmManageRules.nextStage after get modifications', responseText); */
          /* console.log(responseText); */
          /* Convert the JSON string obtained by the call above 
             back into set of objects */
          HDLmTree.addToTree(responseText);
          /* Get the top of the tree */
          let treeTop = HDLmTree.getTreeTop();             
          /* Build the companies/rules array. The array has one
             entry for each company in the true that actually 
             has one or more rules. */
          let companiesArray = HDLmTree.buildCompaniesArray(treeTop);
          HDLmManageRules.companiesArray = companiesArray;
          /* We now have the rules. We need to turn test mode on. */
          stage = HDLmManageRulesStageTypes.setTestModeOn;
          break;
        }
        case HDLmManageRulesStageTypes.setTestModeOn: {
          /* Turn test mode on for the current user */
          await HDLmManageRules.setTestModeOn();
          stage = HDLmManageRulesStageTypes.showWebPageUi;
          break;
        }
        /* Handle the initial web page UI case. This UI is used
           to obtain the initial URL. */
        case HDLmManageRulesStageTypes.showWebPageUi: {
          /* 
          let tdElement = HDLmReactFour.buildTdElement(null, "male");
          let thElement = HDLmReactFour.buildThElement(null, "Name");
          let trtdElement = HDLmReactFour.buildTrElement(null, [tdElement]);
          let trthElement = HDLmReactFour.buildTrElement(null, [thElement]);
          let tableElement = HDLmReactFour.buildTableElement(null, [trthElement, trtdElement]);
          */
          /*
          let companyAElement = HDLmReactFour.buildManageCompanyWBreakElement(null, 'Company A');
          let companyBElement = HDLmReactFour.buildManageCompanyWBreakElement(null, 'Company B');
          let companiesArray = [companyAElement, companyBElement];
          let companiesElement = HDLmReactFour.buildManageCompaniesElement(null, companiesArray);
          */
          /* 
          let companiesArray = HDLmManageRules.companiesArray;
          let companiesElement = HDLmManageRules.buildCompaniesElement(companiesArray);
          */
          let fragmentElement = HDLmManageRules.buildWebUiElement();
          let reactRoot = HDLmReactFour.getRootContainer('leftAndRightPage');
          HDLmReactFour.renderReact(reactRoot, fragmentElement);
          
          /* Get the web page URL */
          HDLmManageRules.buildWebPageUi();
          stage = HDLmManageRulesStageTypes.waitForUrlInput;
          break
        }
        /* Handle the initial web page UI case. This UI is used
           to obtain the initial URL. */
        case HDLmManageRulesStageTypes.waitForUrlInput: {
          let webUrlRejectFunction;
          let webUrlResolveFunction;
          /* Create a local promise */
          let webUrlPromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            webUrlRejectFunction = reject;
            webUrlResolveFunction = resolve;
          });
          /* Store the location of the reject function */
          HDLmManageRules.promiseRejectFunction = webUrlRejectFunction;
          /* Store the location of the resolve function */
          HDLmManageRules.promiseResolveFunction = webUrlResolveFunction;
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
            let errorText = HDLmManageRules.checkUrlValid(urlStr);
            if (errorText != '') {
              HDLmUtility.setErrorText(errorText);
              stage = HDLmManageRulesStageTypes.waitForUrlInput;
              HDLmManageRules.nextStage(stage, null);
            }
            /* The URL appears to be minimally valid. The next stage
               is webpage-improver processing. */
            else {
              stage = HDLmManageRulesStageTypes.webpageImproverServices;
              /* console.log('About to invoke nextState - ', responseObj); */
              HDLmManageRules.nextStage(stage, responseObj);
            }
          }, function (error) {
            let errorText = '';
            errorText = HDLmError.buildError('Error', 'Retry URL input failure', 52, error);
            HDLmUtility.setErrorText(errorText);
            /* Try to get a new URL from the user */
            stage = HDLmManageRulesStageTypes.waitForUrlInput;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Try to run fetch on the input URL. This may or may not work.
           A proxy is used to bypass CORS issues. This code is no longer
           in use. The webpage-improver service does the actual work of
           fetching the URL. */
        case HDLmManageRulesStageTypes.executeFetch: {
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
          let buildHeaders = HDLmManageRules.getHeadersFetch(hostNameStr);
          /* Build the post payload string passed to the host
             server. This is the actual URL we are trying to
             fetch. We are using a proxy because of CORS
             probelms. */
          let postPayloadStr = "";
          postPayloadStr += 'requesttype=URL';
          postPayloadStr += '&URL=';
          postPayloadStr += varNext;
          postPayloadStr += '&userid=&password=&type=get';
          /* console.log('In HDLmManageRules.executeFetch'); */
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
            /* console.log('In HDLmManageRules.executeFetch - then'); */
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
              HDLmManageRules.webPageUrl = varNext;
              /* Try to convert the response to HTML */
              stage = HDLmManageRulesStageTypes.convertResponse;
              HDLmManageRules.nextStage(stage, response.text());
            }
            /* The URL did not work. Report the error to the user.
               Get a new URL from the user. The above code is run
               in all cases. This code is never used. */
            else {
              let errorText = '';
              errorText = `The URL failed with a status code of ${statusCode}`;
              HDLmUtility.setErrorText(errorText);
              /* Try to get a new URL from the user */
              stage = HDLmManageRulesStageTypes.waitForUrlInput;
              HDLmManageRules.nextStage(stage, null);
            }
          },
          function(error) {
            /* console.log('In HDLmManageRules.executeFetch - errors'); */
            /* console.log(error); */
            let errorText = '';
            errorText = 'Fetch request (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Try to get a new URL from the user */
            stage = HDLmManageRulesStageTypes.waitForUrlInput;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Try to convert the response. This may or may not work.
           This code is no longer in use. The webpage-improver
           service does the actual work of fetching the URL.*/
        case HDLmManageRulesStageTypes.convertResponse: {
          /* Try to wait on the promise. If the promise is resolved,
             then check the response. If the promise is rejected, then
             report an error and return to the caller. This promise is
             used to convert the response to a text string. */
          varNext.then(function(response) {
            /* console.log('In HDLmManageRules.convertResponse - then'); */
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
              stage = HDLmManageRulesStageTypes.waitForUrlInput;
              HDLmManageRules.nextStage(stage, null);
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
              stage = HDLmManageRulesStageTypes.waitForUrlInput;
              HDLmManageRules.nextStage(stage, null);
            }
            /* At this point, we have the contents of the web page. We
               can construct some number of rules from the web page. */
            if (!errorDetected) {
              /* console.log('Before buildWebPageRules'); */
              /* console.log(response); */
              /* Try to build some rules */
              stage = HDLmManageRulesStageTypes.webpageImproverServices;
              /* stage = HDLmManageRulesStageTypes.buildWebPageRules; */
              HDLmManageRules.nextStage(stage, null);
            }
          },
          function(error) {
            /* console.log('In HDLmManageRules.convertResponse - errors'); */
            let errorText = '';
            errorText = 'Response conversion (the promise) was rejected';
            /* console.log(errorText); */
            HDLmUtility.setErrorText(errorText);
            /* Try to get a new URL from the user */
            stage = HDLmManageRulesStageTypes.waitForUrlInput;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Try to get the web page using the input URL. This
           may or may not work. This case does not appear to
           be in use. */
        case HDLmManageRulesStageTypes.getWebPage: {
          /* console.log('In HDLmManageRules.nextStage.getWebPage'); */
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
            /* console.log('In HDLmManageRules.nextStage.getWebPage - then'); */
            /* console.log(response); */
            /* Save the web page URL in a global variable.
               We need to save the URL so we can use it
               later. */
            HDLmManageRules.webPageUrl = varNext;
            /* Try to build some rules from the web page */
            stage = HDLmManageRulesStageTypes.buildWebPageRules;
            HDLmManageRules.nextStage(stage, null);
          },
          function(error) {
            /* console.log('In HDLmManageRules.nextStage.getWebPage - error'); */
            /* console.log(error); */
            let errorText = '';
            errorText = 'Ajax (the promise) was rejected';
            /* console.log(errorText); */
            HDLmUtility.setErrorText(errorText);
            /* Try to get a new URL from the user */
            stage = HDLmManageRulesStageTypes.waitForUrlInput;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* The URL provided by the user is used with some of the
           new AI code */
        case HDLmManageRulesStageTypes.webpageImproverServices: {
          /* Save the web page URL in a global variable.
             We need to save the URL so we can use it
             later. */
          HDLmManageRules.suggestionText = varNext.suggestionText;
          HDLmManageRules.webPageUrl = varNext.webPageUrl;
          /* Build some rules for the current web page. This is actually
             an async routine, which means that invoking it, produces a
             promise. */
          let webpageImproverPromise = HDLmManageRules.webpageImproverRunServices(HDLmManageRules.suggestionText,
                                                                                  HDLmManageRules.webPageUrl);
          /* Try to wait on the promise. If the promise is resolved
             without an error, then we have the rules. If the promise
             is rejected, then we have an error. */
          webpageImproverPromise.then(function(webpageImproverRv) {
            /* console.log(webpageImproverRv); */
            /* Check if the return value show that no problems were
               encountered. */
            if (webpageImproverRv == true) {
              /* Run the next stage */
              stage = HDLmManageRulesStageTypes.buildWebPageRules;
              HDLmManageRules.nextStage(stage, null);
            }
            else {
              /* console.log(webpageImproverRv); */
              stage = HDLmManageRulesStageTypes.waitForUrlInput;
              HDLmManageRules.nextStage(stage, null);
            }
          }, function(webpageImproverError) {
            /* console.log(webpageImproverError); */
            stage = HDLmManageRulesStageTypes.waitForUrlInput;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Build some rules for the current web page. The webpage-
           improver service is an AI service that builds zero or
           more rules. */
        case HDLmManageRulesStageTypes.buildWebPageRules: {
          stage = HDLmManageRulesStageTypes.showWebPageRules;
          break;
        }
        /* Show some rules for the current web page. The webpage-
           improver service is an AI service that builds zero or
           more rules. */
        case HDLmManageRulesStageTypes.showWebPageRules: {
          /* This is the base React code. This code runs
             the rest of the React code. */
          /* Run a timer. When the timer completes, it will
             run some more React code. This timer gives Babel
             some time to finish modifying the JSX code. */
          setTimeout(() => {
                             /* Run the later part of React */
                             stage = HDLmManageRulesStageTypes.reactLater;
                             HDLmManageRules.nextStage(stage, null);
                           },
                           20);
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* This case does not appear to be in use. */
        case HDLmManageRulesStageTypes.reactBase: {
          /* console.log('In HDLmManageRules.reactBase'); */
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        case HDLmManageRulesStageTypes.reactLater: {
          /* console.log('In HDLmManageRules.reactLater'); */
          let reactRejectFunction;
          let reactResolveFunction;
          /* Create a local promise */
          let reactPromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            reactRejectFunction = reject;
            reactResolveFunction = resolve;
          });
          /* Store the location of the reject function */
          HDLmManageRules.promiseRejectFunction = reactRejectFunction;
          /* Store the location of the resolve function */
          HDLmManageRules.promiseResolveFunction = reactResolveFunction;
          /* Get the rules array for use below */
          /* 
          let rulesArray = HDLmManageRules.webpageImproverRules;
          */
          /* Invoke some React code. The code is in a function
             so that we can control when we run it. */
          let reactRoot = HDLmReactFour.getRootContainer('entryValues');
          let useridElement = HDLmReactFour.buildInputWLabel('Userid', 'Enter Userid'); 
          let passwordElement = HDLmReactFour.buildInputWLabel('Password', 'Enter Password'); 
          let breakElement = HDLmReactFour.buildBreakElement();
          let tempFragment = HDLmReactFour.putElementsInFragment([useridElement, breakElement, passwordElement])
          HDLmReactFour.renderReact(reactRoot, tempFragment);
          /* Wait for the user to finish making changes
             to the rules. The user will click a button
             to finish making changes. The user may not
             make any changes. */
          reactPromise.then(function (responseText) {
            /* console.log(responseText); */
            let newRulesArray = responseText;
            /* The user appears to have finished the changes */
            stage = HDLmManageRulesStageTypes.sendWebPageRules;
            HDLmManageRules.nextStage(stage, newRulesArray);
          }, function (error) {
            let errorText = '';
            errorText = HDLmError.buildError('Error', 'React failure', 52, error);
            HDLmUtility.setErrorText(errorText);
            /* Get the URL obtained from the user */
            let urlStr = HDLmManageRules.webPageUrl;
            /* The user appears to have finished the changes */
            stage = HDLmManageRulesStageTypes.sendWebPageRules;
            HDLmManageRules.nextStage(stage, newRulesArray);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Send the rules created using AI to the server */
        case HDLmManageRulesStageTypes.sendWebPageRules: {
          /* console.log('In HDLmManageRules.nextStage.sendWebPageRules'); */
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
          /* console.log(newRulesArray); */
          /* console.log(newRulesStr); */
          /* console.log(newRulesStr); */
          /* Try to send the rule to the server */
          /* */
          let sendPromise = HDLmWebSockets.sendStoreTreeNodesRequest(newRulesStr);
          /* */
          /* console.log(sendPromise); */
          /* Try to wait on the promise. If the promise is resolved,
             then check the response. If the promise is rejected, then
             report an error and return to the caller. */
          sendPromise.then(function(response) {
            stage = HDLmManageRulesStageTypes.openWebPage;
            HDLmManageRules.nextStage(stage, null);
          },
          function(error) {
            let errorText = '';
            errorText = 'Send request (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Wait for the browser to be unloaded */
            stage = HDLmManageRulesStageTypes.openWebPage;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Try to open a web page using input URL. This
           may or may not work. */
        case HDLmManageRulesStageTypes.openWebPage: {
          /* console.log('In HDLmManageRules.nextStage.openWebPage'); */
          window.open(HDLmManageRules.webPageUrl);
          stage = HDLmManageRulesStageTypes.beforeUnload;
          break;
        }
        /* Wait for the user to close the browser.
           This may happen quite soon or it may take
           a while. */
        case HDLmManageRulesStageTypes.beforeUnload: {
          /* console.log('In HDLmManageRules.beforeUnload'); */
          /* Add an event listener to the window object. The event
             listener is used to detect when the user closes the
             browser. */
          HDLmManageRules.beforeUnloadAdd();
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
          HDLmManageRules.beforeUnloadResolveFunction = beforeUnloadResolveFunction;
          /* Wait for a browser close event */
          beforeUnloadPromise.then(function(responseText) {
            /* console.log(document.visibilityState); */
            responseText = responseText;
            /* Turn off test mode  */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, null);
          },
          function(error) {
            let errorText = '';
            errorText = 'Before unload (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Turn off test mode */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Wait for the user to close the browser.
           This may happen quite soon or it may take
           a while. */
        case HDLmManageRulesStageTypes.visibilityChange: {
          /* console.log('In HDLmManageRules.visibilityChange'); */
          /* Add an event listener to the window object. The event
             listener is used to detect when the user changes the
             visibility of the browser. */
          HDLmManageRules.visibilityChangeAdd();
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
          HDLmManageRules.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
          /* Wait for a visibility change event */
          visibilityChangePromise.then(function(responseText) {
            /* console.log(document.visibilityState); */
            responseText = responseText;
            /* Turn off test mode  */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, null);
          },
          function(error) {
            let errorText = '';
            errorText = 'Visibility change (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Turn off test mode */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, null);
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        case HDLmManageRulesStageTypes.setTestModeOff: {
          /* Turn test mode off for the current user */
          HDLmManageRules.setTestModeOff();
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
          /* console.log(HDLmEnums.HDLmManageRulesStageTypes); */
          /* console.log(HDLmEnums.HDLmManageRulesStageTypes[stage][0]); */
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
    /* console.log('In HDLmManageRules.removeDivs'); */
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
  /* This routine is used to send a build cookie request
     to the server. The server builds the cookie and sends
     it back. */  
  static sendBuildCookie() {
    /* console.log('In HDLmManageRules.setTestModeOff'); */
    /* Build an object that can be sent to the server 
       as the post (an HTTP method) body */
    let cookieObj = new Object
    cookieObj.cookieName = HDLmDefines.getString('HDLMDUMMYCOOKIE');
    cookieObj.maxAge = HDLmConfigInfo.getCookieMaxAge();
    cookieObj.password = 'Dummy';
    cookieObj.path = '/Dummy';
    cookieObj.secure = true;
    cookieObj.sameSite = 'None';
    cookieObj.userid = 'Dummy';
    let cookieJson = JSON.stringify(cookieObj);
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMMANAGERULESBUILDCOOKIE');
    /* Send the URL to the server */
    let sendPromise = fetch(urlStr, {
                                      "method": "POST",
                                      "headers": [],
                                      "body": cookieJson
                                    }
                           );
    /* Return the promise build above to the caller */
    return sendPromise;                      
  }
  /* This routine tries to set the access cookie to a value
     passed by the caller */  
  static setAccessCookie(passedCookieValue) {
    /* console.log('In setAccessCookie'); */
    /* Check if the name of the Headlamp access cookie
       has been set or not */
    if (HDLmManageRules.accessCookieName == null)
      /* Save the name of access cookie */
      HDLmManageRules.accessCookieName = HDLmDefines.getString('HDLMACCESSCOOKIE');
    /* Try to store the access cookie */
    let cookieName = HDLmManageRules.accessCookieName;
    /* Build the cookie value */
    let localValue = cookieName;
    localValue += "=";
    localValue += passedCookieValue;
    localValue += " ";
    localValue += ";";
    localValue += "Path=/; Max-Age=28800; Secure; SameSite=None "; 
    /* Store the new cookie value */
    /* localValue = "username=John Doe "; */
    document.cookie = localValue;
    /* console.log('x', "'" + passedCookieValue + "'"); */
    /* console.log('x', "'" + document.cookie + "'"); */
    return null;
  }
  /* This routine is used to turn test mode off for a user.
     In test mode, the user gets all of the rules, even
     the test rules. In non-test mode, the user only gets
     the production rules. */
  static setTestModeOff() {
    /* console.log('In HDLmManageRules.setTestModeOff'); */
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMMANAGERULESSETTESTOFF');
    /* Send the URL to the server */
    let setPromise = fetch(urlStr, {
                                     "method": "POST",
                                     "headers": [],
                                     "body": {}
                                   }
                          );
    return setPromise;
  }
  /* This routine is used to turn test mode on for a user.
     In test mode, the user gets all of the rules, even
     the test rules. In non-test mode, the user only gets
     the production rules. */
  static setTestModeOn() {
    /* console.log('In HDLmManageRules.setTestModeOn'); */
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMMANAGERULESSETTESTON');
    /* Send the URL to the server */
    let setPromise = fetch(urlStr, {
                                     "method": "POST",
                                     "headers": [],
                                     "body": {}
                                   }
                          );
    return setPromise;
  }
  /* This routine when called, adds an event listener to the window
     object. The event listener is used to detect when the user
     changes the visibility of the browser. */
  static visibilityChangeAdd() {
    /* console.log('In HDLmManageRules.visibilityChangeAdd'); */
    window.addEventListener('visibilitychange', (event) => {
      HDLmManageRules.visibilityChangeDone(event);
    });
  }
  /* This routine is called when the user change the visibility
     of the browser. This routine handles the visibility change
     event. The routine is used to resolve the promise that was
     created before the user changed the visibility of the browser. */
  static visibilityChangeDone(event) {
    /* console.log('In HDLmManageRules.visibilityChangeDone'); */
    /* console.log(event); */
    /* Show the document visibility state */
    /* console.log(document.visibilityState); */
    /* Count the number of times the user makes the browser hidden */
    if (document.visibilityState == 'hidden')
      HDLmManageRules.visibilityChangeHiddenCount++;
    /* Count the number of times the user makes the browser visible */
    if (document.visibilityState == 'visible')
      HDLmManageRules.visibilityChangeVisibleCount++;
    /* Show the hidden and visible counts */
    /* console.log(HDLmManageRules.visibilityChangeHiddenCount); */
    /* console.log(HDLmManageRules.visibilityChangeVisibleCount); */
    if (document.visibilityState == 'hidden'      &&
        HDLmManageRules.visibilityChangeHiddenCount > 1 &&
        HDLmManageRules.visibilityChangeHiddenCount > HDLmManageRules.visibilityChangeVisibleCount)
      HDLmManageRules.visibilityChangeResolveFunction('The vibility of the browser was hidden');
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
    let contentType = HDLmConfigInfo.getApplicationJsonType();
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
    /* console.log('In HDLmManageRules.webpageImproverInvokeService'); */
    let webPromise = null;
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getFetchInternetMethodNoSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    /*
    urlStr += '127.0.0.1';
    */
    urlStr += ':';
    urlStr += HDLmConfigInfo.getWebpageImproverPort();
    urlStr += '/';
    urlStr += servicePath;
    /* console.log('urlStr is ' + urlStr); */
    /* console.log('JSON is ' + serviceJson); */
    let serviceHeadersJsonKeys = Object.keys(serviceHeaders);
    /* console.log(serviceHeaders); */
    /* console.log('serviceHeaders keys length is ' + serviceHeadersJsonKeys.length); */
    serviceHeadersJsonKeys.forEach((item) => { /* console.log('Key name is', item, */
                                               /*             'Key value is', serviceHeaders[item]); */ });
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
      serviceJson = HDLmManageRules.webpageImproverGetSessionJson('Testing');
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverSessionPath();
      /* Invoke the session service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                    serviceHeaders,
                                                                    serviceJson);
      /* Wait for the session service to complete */
      serviceResponse = await servicePromise;
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      serviceData = await servicePromise;
      HDLmManageRules.webpageImproverSessionId = serviceData.sessionId;
      /* Get the JSON string for the LLM service */
      let llmName = HDLmConfigInfo.getOpenAIName();
      serviceSessionId = HDLmManageRules.webpageImproverSessionId;
      serviceJson = HDLmManageRules.webpageImproverGetLlmJson(serviceSessionId, llmName);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverLlmPath();
      /* Invoke the LLM service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                    serviceHeaders,
                                                                    serviceJson);
      /* Wait for the LLM service to complete */
      serviceResponse = await servicePromise;
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      serviceData = await servicePromise;
      /* Get some values from the JSON object */
      HDLmManageRules.webpageImproverProvider = serviceData.provider;
      HDLmManageRules.webpageImproverModel = serviceData.model;
      /* Get the JSON string for the webpage service */
      serviceJson = HDLmManageRules.webpageImproverGetWebpageJson(serviceSessionId,
                                                                 webpageUrl);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverWebpagePath();
      /* Invoke the webpage service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
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
      HDLmManageRules.webpageImproverWebpage = serviceData.webpage;
      /* Get the JSON string for the improvements service */
      serviceQuantity = 3;
      serviceJson = HDLmManageRules.webpageImproverGetImprovementsJson(serviceSessionId,
                                                                      serviceQuantity);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                        serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverImprovementsPath();
      /* Invoke the improvements service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
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
      HDLmManageRules.webpageImproverImprovements = serviceData.improvements;
      /* The user may or may not have provided a suggestion. The
         suggestion (if it exists) is used to build some markup.
         The markup is used to build some rules. */
      if (HDLmManageRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a
         set of markup. */
      let improvementsCount = HDLmManageRules.webpageImproverImprovements.length;
      for (let i = 0; i < improvementsCount; i++) {
        let improvementObj = HDLmManageRules.webpageImproverImprovements[i];
        /* console.log(improvementObj); */
        let improvementWhat = improvementObj.what;
        let improvementWhy = improvementObj.why;
        /* Get the JSON string for the improvements service */
        serviceJson = HDLmManageRules.webpageImproverGetMarkupJson(serviceSessionId,
                                                                  improvementWhat);
        serviceLength = serviceJson.length;
        serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                          serviceLength);
        servicePath = HDLmConfigInfo.getWebpageImproverMarkupPath();
        /* Invoke the markup service */
        servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                     serviceHeaders,
                                                                     serviceJson);
        /* Wait for the markup service to complete */
        serviceResponse = await servicePromise;
        /* Convert the response to a JSON object */
        servicePromise = serviceResponse.json();
        serviceData = await servicePromise;
        /* Get some values from the JSON object */
        HDLmManageRules.webpageImproverMarkups.push(serviceData);
      }
      /* Convert each of the markup objects to a rule */
      let markupsCount = HDLmManageRules.webpageImproverMarkups.length;
      for (let i = 0; i < markupsCount; i++) {
        let improvementObj = HDLmManageRules.webpageImproverImprovements[i];
        /* console.log(improvementObj); */
        let improvementWhat = improvementObj.what;
        let improvementWhy = improvementObj.why;
        let markupObj = HDLmManageRules.webpageImproverMarkups[i];
        /* console.log(markupObj); */
        /* Build a tree node object from each of the markups */
        let constructList = HDLmManageRules.constructTreeNode(HDLmManageRules.webPageUrl,
                                                              improvementWhy,
                                                              markupObj);
        let treeNodeObj = constructList[0];
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* console.log('Information from constructTreeNode', treeNodeObj, improvementWhy, markupObj, HDLmManageRules.webPageUrl); */
        /* console.log(overallValid, scriptValid, stylesValid); */
        /* console.log(scriptStr); */
        /* console.log(stylesStr); */
        /* Check if the script value is valid */
        if (overallValid) {
          HDLmTree.storeTreeNode(treeNodeObj);
          /* Convert the tree node object to a string */
          let treeNodeStr = JSON.stringify(treeNodeObj);
          HDLmManageRules.webpageImproverRules.push(treeNodeStr);
        }
        /* Some type of error was detected. Report the error
           and continue processing. */
        else {
          /* console.log('Information from constructTreeNode', treeNodeObj, improvementWhy, markupObj, HDLmManageRules.webPageUrl); */
          /* console.log(overallValid, scriptValid, stylesValid); */
          /* console.log(scriptStr); */
          /* console.log(stylesStr); */
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
HDLmManageRules.promiseRejectFunction = null;
/* The function saved in the field below is invoked
   when a promise is resolved */
HDLmManageRules.promiseResolveFunction = null;
/* The suggestion text is stored in the field below */
HDLmManageRules.suggestionText = null;
/* The following promise is used to wait for the user to
   hide the browser. This promise is resolved when the
   user hides the browser. */
HDLmManageRules.visibilityChangeResolveFunction = null;
/* The following counts are used to keep track of the number
   of times the user hides the browser or makes the browser
   visible */
HDLmManageRules.visibilityChangeHiddenCount = 0;
HDLmManageRules.visibilityChangeVisibleCount = 0;
/* The webpage-improver improvements are stored in the field below */
HDLmManageRules.webpageImproverImprovements = null;
/* The webpage-improver markups are stored in the array below */
HDLmManageRules.webpageImproverMarkups = [];
/* The webpage-improver model is stored in the field below */
HDLmManageRules.webpageImproverModel = null;
/* The webpage-improver provider is stored in the field below */
HDLmManageRules.webpageImproverProvider = null;
/* The webpage-improver rules, created from the markups
   are stored in the array below */
HDLmManageRules.webpageImproverRules = [];
/* The webpage-improver session ID is stored in the field below */
HDLmManageRules.webpageImproverSessionId = null;
/* The webpage-improver webpage string is stored in the field below */
HDLmManageRules.webpageImproverWebpage = null;
/* After a number of tests have been sucessfully completed,
   the web page URL is stored in the field below */
HDLmManageRules.webPageUrl = null;
/* The access challenge name is stored in the field
   below */
HDLmManageRules.accessChallengeName = null;
/* The name of the access cookie is stored in the field
   below */
HDLmManageRules.accessCookieName = null;
/* The new password (if one is available) is stored in the field
   below */
HDLmManageRules.accessNewPassword = null;
/* The password (if one is available) is stored in the field
   below */
HDLmManageRules.accessPassword = null;
/* The userid (if one is available) is stored in the field
   below */
HDLmManageRules.accessUserid = null;
/* The verification code is stored in the field 
   below */
HDLmManageRules.accessVerificationCode = null;
/* The companies array is stored in the field below.
   The companies array has information about each 
   company that has one or more rules. */
HDLmManageRules.companiesArray = null;
/* The next field shows if the access cookie was 
   used or if it needs to be stored */
HDLmManageRules.getFromCookie = false;
/* The function saved in the field below is invoked
   when a promise is rejected */
HDLmManageRules.promiseRejectFunction = null;
/* The function saved in the field below is invoked
   when a promise is resolved */
HDLmManageRules.promiseResolveFunction = null;
/* The suggestion text (if any) is stored in the field 
   below. The suggestion text (if any) is used to help 
   guide the LLM in creating improvements. */
HDLmManageRules.promptSuggestion = null;
/* The web page URL is stored in the field 
   below. The web page URL is used to access  
   a page on the Internet. */
HDLmManageRules.promptUrl = null;
/* The session ID (which is a string) is stored in the field
   below */
HDLmManageRules.sessionId = null;