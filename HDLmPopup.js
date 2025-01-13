/**
 * HDLmPopup short summary.
 *
 * HDLmPopup description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following JSON data structure is used to build the editor
   for each type of Popup definition. The Popup type is used 
   as the property name to obtain each set of Popup data. */
const HDLmPopupInfoData =
{
  "newcomppopup": {
    "fields":
      [
        {
          "description": "Company Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablecomppopupname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        }
      ]
  },
  "top": {
    "fields":
      [
      ]
  }
}
/* The next JSON object lists the types of rules that are 
   supported for each tag name. This list may well be in-
   complete and/or wrong. New tag names and rule types can
   and should be added as need be. */
const HDLmPopupTagChoices = {
  "a": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
        "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "b": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
        "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "button": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
        "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "div": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
          "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "em": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
         "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "footer": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
             "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "h1": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
         "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "h2": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
         "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "h3": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
         "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "h4": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
         "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "h5": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
         "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "h6": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
         "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "header": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
             "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "img": ["image"],
  "p": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
        "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "section": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
              "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "span": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
           "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "textarea": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
               "height", "notify", "style", "text", "textchecked", "title", "visit", "width"],
  "u": ["attribute", "extract", "fontcolor", "fontfamily", "fontkerning", "fontsize", "fontstyle", "fontweight",
        "height", "notify", "style", "text", "textchecked", "title", "visit", "width"]
};
/* The HDLmPopup class doesn't actually do anything. However, it
   does define a set of static methods that are used to build the
   Popup rule editor. No instances of this class can ever be created. */
class HDLmPopup {
  /* This routine builds the dummmy DOM node. The dummy DOM node simulates
     a real DOM node for testing. Note that an object, not a DOM element is
     returned to the caller. */
  static buildDummyDomNodeObject() {
    let nodeJsonStr;
    nodeJsonStr = '{ "type": "Element", "tag": "a", "attributes": { "href": "/en-US/buy-tickets", ' +
                  '  "class": "s-slider-slide__button HDLmClassPrimary HDLmClassBackground", ' +
                  '  "target": "_self", "data-track-element": "CTA", "data-track-slide-position": ' +
                  '  "1", "data-track-title": "", ' +
                  '  "hdlmupdatedwww໒oneworldobservatory໒com໓example໒com໓example໒com໓ວໄວ໐ດome໐ຂottom໐ລotify໐ສurchase໐-໐ຽູ": "1", ' +
                  '  "hdlmupdatedwww໒oneworldobservatory໒com໓example໒com໓example໒com໓ວໄວ໐ດome໐ຂottom໐ູtyle໐ຄolor໐-໐ຽູ": "2", "style": "background-image: ' +
                  '  linear-gradient(to left, rgb(251, 214, 172), rgb(249, 132, 4)); background-repeat: ' +
                  '  no-repeat; background-size: cover;" }, "text": null, "subnodes": null }';
    nodeJsonStr = '{ "type": "Element", "tag": "a", "attributes": { "href": "/en-US/buy-tickets", ' +
                  '  "class": "s-slider-slide__button HDLmClassPrimary HDLmClassBackground", ' +
                  '  "target": "_self", "data-track-element": "CTA", "data-track-slide-position": ' +
                  '  "1", "data-track-title": "", ' +
                  '  ' +
                  '  "style": "background-image: ' +
                  '  linear-gradient(to left, rgb(251, 214, 172), rgb(249, 132, 4)); background-repeat: ' +
                  '  no-repeat; background-size: cover;" }, "text": null, "subnodes": null }';
    nodeJsonStr = '{ "type": "Element", "tag": "a", "attributes": { "href": "/en-US/buy-tickets", ' +
                  '  "class": "s-slider-slide__button HDLmClassPrimary HDLmClassBackground", ' +
                  '  "target": "_self", "data-track-element": "CTA", "data-track-slide-position": ' +
                  '  "1", "data-track-title": "", ' +
                  '  "hdlmupdatedwww໒oneworldobservatory໒com໓example໒com໓example໒com໓ວໄວ໐ດome໐ຂottom໐ລotify໐ສurchase໐-໐ຽູ": "1", ' +
                  '  "hdlmupdatedwww໒oneworldobservatory໒com໓example໒com໓example໒com໓ວໄວ໐ດome໐ຂottom໐ູtyle໐ຄolor໐-໐ຽູ": "2", "style": "background-image: ' +
                  '  linear-gradient(to left, rgb(251, 214, 172), rgb(249, 132, 4)); background-repeat: ' +
                  '  no-repeat; background-size: cover;" }, "text": null, "subnodes": null }';
    /* 
    nodeJsonStr = '{ "type": "Element", "tag": "a", "attributes": { "href": "/en-US/buy-tickets", ' +
                  '  "class": "s-slider-slide__button HDLmClassPrimary HDLmClassBackground", ' +
                  '  "target": "_self", "data-track-element": "CTA", "data-track-slide-position": ' +
                  '  "1", "data-track-title": "", ' +
                  '  ' +
                  '  "style": "background-image: ' +
                  '  linear-gradient(to left, rgb(251, 214, 172), rgb(249, 132, 4)); background-repeat: ' +
                  '  no-repeat; background-size: cover;" }, "text": null, "subnodes": null }';
    */
    let nodeJson = JSON.parse(nodeJsonStr);
    return nodeJson;
  }
  /* This routine builds the dummmy node identifer string. The dummy node identifier 
     string is for the same dummy DOM element used above. This string is returned to
     the caller. */
  static buildDummyDomNodeIdentifier() {
    let nodeIdenStr = '{ "type": "class", "attributes": { "href": "/en-US/buy-tickets", ' +
                      '"class": ["s-slider-slide__button", "HDLmClassPrimary", "HDLmClassBackground"], ' +
                      '"target": "_self", "data-track-element": "CTA", "data-track-slide-position": "1", ' +
                      '"data-track-title": "", "style": "background-image: linear-gradient(to left, ' +
                      'rgb(240, 91, 131), rgb(0, 63, 108)); background-repeat: no-repeat; background-size: ' +
                      'cover;", "tag": "a", "innertext": "buy tickets" }, "counts": { "tag": 15, "class": 1 ' +
                      '}, "parent": { "class": ["s-slider-slide__footer"], "tag": "footer", "innertext": "buy tickets" } }';
    return nodeIdenStr;
  }
  /* Build a modified path value that can be used as part of 
     a rule name. This code makes a set of changes to a path
     name so that the modified name can be used to build a 
     rule name. */
  static buildModifiedPathValue(pathValue) {
    /* Get some information about the path value */
    let pathValueLength = pathValue.length;
    if (pathValueLength > 0 &&
        pathValue.charAt(0) == '/')
      pathValue = pathValue.substr(0);
    return pathValue;
  }
  /* Build a Popup related object from the values passed 
     by the caller. This code is only called for leaf nodes,
     in other words modification nodes. */
  static buildPopupObject(name, type) {
    /* Check if the caller asked for a new modification object.
       This request is handled here. */
    if (type == 'newmod') {
      let modificationCommentsEmpty = '';
      let modificationCssEmpty = '';
      let modificationExtraEmpty = '';
      let modificationEnabledTrue = true;
      let modificationFindsEmpty = [];
      let modificationNodeIdenEmpty = '';
      let modificationParameterNumberNull = null;
      let modificationPathStringEmpty = '';
      let modificationUseModeEmpty = '';
      let modificationXpathEmpty = '';
      let newMod = HDLmMod.buildModificationObject(name, modificationPathStringEmpty, 
                                                   modificationExtraEmpty, modificationEnabledTrue, 
                                                   modificationCssEmpty, modificationXpathEmpty,
                                                   modificationFindsEmpty, modificationNodeIdenEmpty, 
                                                   type, modificationParameterNumberNull, 
                                                   modificationCommentsEmpty, modificationUseModeEmpty);
      return newMod;
    }
  }
  /* This routine checks if the node identifier value is valid 
     or not. If the node identifier is valid, this routine will
     return true. If the node identifier is not valid, then this
     routine will return false. */
  static checkNodeIdentifier(nodeIden) {
    if (nodeIden == null)
      return false;
    return (nodeIden.length > 2);
  }
  static fancyTreeInitialize(event, data) {
    /* Check if we really have any work to do here. If one or 
       more rules, fired for the current DOM element, then we
       have no more work to do. */
    let domNodeObject = HDLmPopup.getDomNodeObject();
    /* Get the rule names from the real or simulated DOM node object.
       If we actually have any rule names, then at least one rule
       fired for the current DOM element and we have no more work
       to do here. */
    let fullRuleNames = HDLmTree.getFullRuleNames(domNodeObject);
    if (fullRuleNames.length > 0)
      return null;
    /* It looks like we need to do an insert on the Top (top) node */
    let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    let nodeIdenGemOrGxe = '';
    let nodePath = [];
    let topNodeName = HDLmDefines.getString('HDLMTOPNODENAME');
    nodePath.push(topNodeName);
    /* Search for the Top (top) node in the node tree */
    let topNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (topNode == null) {
      let topNodeString = nodePath.toString();
      console.log('In HDLmPopup.fancyTreeInitialize', topNodeString);
      HDLmError.buildError('Error', 'Locate', 9, topNodeString);
      return null;
    }
    let inlineStartupFlagTrue = true;
    HDLmMenus.cmdInsert(divDescriptions, 
                        divValues,  
                        topNode, 
                        topNode.type, 
                        nodeIdenGemOrGxe,
                        inlineStartupFlagTrue);
  }
  /* Get the default comment for the current DOM node. The default
     comment will be an empty string, at least for now. */
  static getDefaultModComments() {
    return '';
  }
  /* Get the default name for a modification object. The default
     rule uses the path value to build the default name. We have
     the path value at this point. We don't have the final rule
     type which may not have been set at this point. */
  static getDefaultModName(parentTreeNode) {
    let defaultShortModName = HDLmDefines.getString('HDLMSHORTMODNAME');
    /* Get the (possibly modified) path value */
    let pathValue = HDLmPopup.getDefaultModPathValueString();
    pathValue = HDLmPopup.buildModifiedPathValue(pathValue);
    /* Build the final modification name */
    let modName = defaultShortModName + ' ' + pathValue;
    /* Change the first character of each word to uppercase */
    modName = HDLmString.ucFirstSentence(modName);
    /* Adjust the modification name (by adding a numeric suffix in parenthesis), if
       need be */
    let removeTailsFalse = false;
    modName = HDLmMenus.adjustTreeNodeName(modName, parentTreeNode, removeTailsFalse);
    return modName;
  }
  /* Get the default node identifier for the current DOM node */
  static getDefaultModNodeIdenString() { 
    return HDLmGlobals.nodeIdenString; 
  }
  /* Get the default parameter number for the current DOM node.
     This parameter number might be deleted later if the rule
     type does not use parameter numbers. */
  static getDefaultModParameterNumber(parentTreeNode) {
    /* Get all of the current children of the parent node */
    let childList = parentTreeNode.children;
    let minParameterNumber = null;
    /* Build a map that shows how many times each parameter number 
       is used */
    let parmMapObj = HDLmTree.buildParameterMap(childList);
    if (parmMapObj != null) {
      minParameterNumber = HDLmTree.findLowestParameter(parmMapObj);
    }
    return minParameterNumber;
  }
  /* Get the default path value for the current DOM node. The default
     path value, may or may not be returned as a regex. Some path values
     can only be handled as regexes, others do not have to be treated 
     as regexes. */
  static getDefaultModPathValue() {
    let pathValue = HDLmPopup.getDefaultModPathValueString();
    /* console.log(pathValue); */
    /* We need to check if current path value must be handled as
       a regex */
    let pattern = new RegExp('[.*+?^${}()|[\\]\\\\]|\\s');
    let patternTest = pattern.test(pathValue);
    let forwardSlashPresence = (pathValue.indexOf('/') > -1);
    /* console.log(pathValue); */
    if (patternTest == false && forwardSlashPresence == false)
      return pathValue;
    /* console.log(pathValue); */
    /* The path value needs to be converted to a value that 
       will work with regex */
    if (patternTest) {
      pathValue = pathValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      pathValue = pathValue.replace(/\s/g, "\\s");
    }
    /* console.log(pathValue); */
    /* Replace forward slash characters with a sequence that 
       includes a regex escape. This approach will work correctly
       with regex matching. */
    if (forwardSlashPresence) {
      pathValue = pathValue.replaceAll('/', '\\/');
    }
    /* console.log(pathValue); */
    /* Add two leading forward slashes and a trailing forward slash */
    pathValue = '//' + pathValue + '/';
    /* console.log(pathValue); */
    return pathValue;
  }
  /* Get the default path value for the current web page. The name 
     may be obtained from the current environment or a default value 
     may be used in the test (debugger) environment. */
  static getDefaultModPathValueString() {
    let pathValue;
    /* Check if a browser extension window environment is active. 
       If this is true, then we can get the actual current path value. 
       Otherwise, we have to use a default simulated path value. */
    if (HDLmGlobals.checkActiveExtensionWindow() == true) 
      pathValue = HDLmGlobals.windowInfoObject.pathvalue;
    /* If a browser extension window environment is not active, we can 
       just use a dummy (simulated) path value */
    else
      pathValue = '/en-US/';
    return pathValue;
  }
  /* This routine provides default values for a modification object. The 
     idea is that the default values will be good enough in many, if not
     most cases. */
  static getDefaultModValues(parentTreeNode, modObj) {
    /* console.log(modObj); */
    /* Get the default name for a modification object */
    let modName = HDLmPopup.getDefaultModName(parentTreeNode);
    modObj.name = modName;
    /* console.log(modName); */
    let modPathValue = HDLmPopup.getDefaultModPathValue();
    /* console.log(modPathValue); */
    modObj.pathvalue = modPathValue;
    let modNodeComments = HDLmPopup.getDefaultModComments();
    modObj.comments = modNodeComments;
    let modNodeIdenString = HDLmPopup.getDefaultModNodeIdenString();
    modObj.nodeiden = JSON.parse(modNodeIdenString);
    let modNodeParameterNumber = HDLmPopup.getDefaultModParameterNumber(parentTreeNode);
    modObj.parameter = modNodeParameterNumber;
  }
  /* Get the DOM node object that will become the subnodes of the
     Top (top) Fancytree node. Note that the Top (top) Fancytree
     node may have zero, one, two, or more subnodes. If the test 
     environment, the DOM node object is just a simulated value.
     In the browser extension window environment, this is the 
     actual DOM node object. */
  static getDomNodeObject() {
    /* At this point we may need to use the dummy DOM node object
       or we may use a real DOM node object obtained from the DOM.
       If we are running in a browser extension window environment,
       then we want to use a real DOM node. Otherwise we use a 
       simuleted DOM node. */
    let domNodeObject;
    /* Check if the browser extension window environment is active. 
       If this is true, then an object representing the current active 
       node, should be stored in a variable that can be accessed here. */
    if (HDLmGlobals.checkActiveExtensionWindow() == true) {       
      domNodeObject = HDLmGlobals.domNodeObject;       
    }
    /* If the browser extension window environment is not active, 
       we can just use a dummy (simulated) DOM object */
    else
      domNodeObject = HDLmPopup.buildDummyDomNodeObject();
    return domNodeObject;
  }  
  /* Return the Popup information to the caller */
  static get HDLmPopupInfo() {
    return HDLmPopupInfoData;
  }
  /* Get the list of Popup types supported by this code. The
     list of types is returned to the caller as an array. Note
     that we don't have any Popup types (per se) at this time.

     However, if the caller provides a DOM element, then a list
     of rule types appropriate for the DOM element will be returned
     to the caller. Of course, this list is not the same for each
     type of DOM element. */ 
  static getPopupTypeList(domElement) {
    /* console.log('In getPopuptypeList'); */
    /* console.log(domElement); */
    if (domElement == null) {
      let selectOptionValues = HDLmMod.getModificationTypeList();
      /* console.log(selectOptionValues); */
      return selectOptionValues;
    }
    /* At this point, we need to get a rule type list that is
       appropriate for the current DOM element. Of course, the
       rule type list is different for each type of DOM element. */
    if (!domElement.hasOwnProperty('tag')) {
      let selectOptionValues = HDLmMod.getModificationTypeList();
      /* console.log(selectOptionValues); */
      return selectOptionValues;
    }
    let tagStr = domElement.tag;
    /* At this point we have a tag string for the DOM element. 
       Using the tag string, we should be able to get a list
       of rule types that are valid for the current tag value. */
    let tagChoices = HDLmPopupTagChoices;
    /* console.log(tagChoices); */
    /* console.log(tagStr); */
    if (!tagChoices.hasOwnProperty(tagStr)) {
      let selectOptionValues = HDLmMod.getModificationTypeList();
      return selectOptionValues;
    }
    return tagChoices[tagStr];
  }
  /* Get a site node that is the parent of the first subnode of
     of the Fancytree node. The Fancytree node will be the Top
     (top) node in this case. The Fancytree node may or may have
     been expanded at this point. The first Fancytree child node
     will actually (if it exists) be a rule leaf node (a modification). 
     We need to get the main tree (not the Fancytree) parent of the
     leaf tree node. */
  static getSiteNode() {
    /* console.log('getSiteNode'); */
    /* console.trace(); */
    let siteTreeNode;
    /* In some cases, we won't have anything that we can use
       to get the site node. This can happen in no rules fired
       for the current node. In these cases, we have to invent
       the path to the site node. */
    let buildComplete = false;
    let domNodeObject = HDLmPopup.getDomNodeObject();
    /* Get the rule names from the real or simulated DOM node object */
    let fullRuleNames = HDLmTree.getFullRuleNames(domNodeObject);
    if (fullRuleNames.length == 0)
      buildComplete = true;
    /* Check if we need to build the full node path to the site node */
    if (buildComplete) {
      /* Build the node path for getting the site node */
      let nodePath = [];
      let topNodeName = HDLmDefines.getString('HDLMTOPNODENAME');
      nodePath.push(topNodeName);
      let companiesNodeName = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
      nodePath.push(companiesNodeName);
      /* At this point we need to either locate or create the node
         for the current company */
      let hostName = HDLmGlobals.windowInfoObject.hostname;
      /* The code below is really used only for testing */
      if (hostName == 'localhost') {
        hostName = 'www.oneworldobservatory.com';
        /* hostName = 'www.oneworldobservatoryxxxx.com'; */
      }
      nodePath.push(hostName);
      nodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
      /* Add the division and site nodes, if need be */
      let divisionNodeName = HDLmDefines.getString('HDLMDIVISIONNODENAME');
      nodePath.push(divisionNodeName);
      /* Add the site node, if need be */
      let siteNodeName = HDLmDefines.getString('HDLMSITENODENAME');
      nodePath.push(siteNodeName);
      let updateDatabaseFalse = false;
      siteTreeNode = HDLmTree.buildSiteNode(nodePath, updateDatabaseFalse, HDLmNodeTypes.rules);
    }
    /* At least one rule fired for the current DOM node. We can use
       the first rule that actually fired to find the site node. */
    else {
      /* Handle the first full rule name */
      let fullRuleName = fullRuleNames[0];
      let fullCurrentTreeNode = HDLmTree.getTreeNode(fullRuleName);
      let fullCurrentNodePath = fullCurrentTreeNode.nodePath;
      let fullParentTreeNode = HDLmTree.locateTreeParentNode(fullCurrentNodePath);
      /* Report an error if the parent node could not be found */
      if (fullParentTreeNode == null) {
        let nodeString = currentNodePath.toString();
        console.log('In HDLmPopup.getSiteNode', nodeString);
        HDLmError.buildError('Error', 'Locate', 9, nodeString);
        return null;
      }
      siteTreeNode = fullParentTreeNode;
    }
    return siteTreeNode;
  }
  /* This routine returns the tag choices object to the caller. 
     The tag choices object can not be directly used by other 
     routines. This routine provides access to the tag choices
     object. */
  static getTagChoices() {
    return HDLmPopupTagChoices;
  }  
  /* Get the updated name for a modification object. The name
     can not be built until the mdoification type is known.
     At the outset, the modification type is not known. When
     this routine is called, the modification type is known
     and the final rule name can be built. */
  static getUpdatedModName(parentTreeNode, typeName) {
    let defaultShortModName = HDLmDefines.getString('HDLMSHORTMODNAME');
    /* Build the final modification name */
    let modName = defaultShortModName + ' ' + typeName;
    /* Change the first character of each word to uppercase */
    modName = HDLmString.ucFirstSentence(modName);
    /* Adjust the modification name (by adding a numeric suffix in parenthesis), if
       need be */
    let removeTailsFalse = false;
    modName = HDLmMenus.adjustTreeNodeName(modName, parentTreeNode, removeTailsFalse);
    return modName;
  }
  /* This routine does the work neeed to reload the current
     window. Note that this is the current window of the  
     content script. For some unknown reason, this code 
     does not work if the GEM editor or the GUI editor 
     is active. Why is not clear. */
  static reloadCurrentWindow() {
    /* console.log('In HDLmPopup.reloadCurrentWindow'); */
    /* console.log(HDLmGlobals.activeEditorType); */
    /* We really only want to reload the current window if one 
       of the inline editors is active and we are running in a
       browser extension window. Note that a browser extension 
       window is not the current content windows. */ 
    if (HDLmGlobals.activeEditorType != HDLmEditorTypes.gem &&
        HDLmGlobals.activeEditorType != HDLmEditorTypes.gxe) {
      if (HDLmGlobals.checkForInlineEditor() == false ||
          HDLmGlobals.checkActiveExtensionWindow() == false)
        return;
    }
    /* Check for the GUI extended editor (GXE) and reload the 
       current page with a direct call if need be */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
      document.location.reload();
    }
    /* console.log('In HDLmPopup.reloadCurrentWindow', 'Reload Current Document'); */
    /* Send a message (asynchronously) that will reload the current page */
    else {
      let message = {};
      message['menuItemId'] = 'Reload Current Document';
      HDLmHtml.sendMessageAsync(message);
    }
  }
  /* The function below does all of the work needed to handle keyboard
     events */
  static windowOnDown(event) {
    /* Handle a ctrl-s (save) keyboard operation */
    if (event.key == 's' &&
        event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
      /* console.log('Window event ctrl-s'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('HDLmPopup.windowOnDown', currentFancyNodeNull, 'ctrl+s');
      event.preventDefault();
    }
    /* Handle a ctrl-x (cut) keyboard operation */
    if (event.key == 'x' &&
        event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
      /* console.log('Window event ctrl-x'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('HDLmPopup.windowOnDown', currentFancyNodeNull, 'ctrl+x');
    }
    /* Handle a ctrl-y (redo) keyboard operation */
    if (event.key == 'y' &&
        event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
      /* console.log('Window event ctrl-y'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('HDLmPopup.windowOnDown', currentFancyNodeNull, 'ctrl+y');
    }
    /* Handle a ctrl-z (undo) keyboard operation */
    if (event.key == 'z' &&
        event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
        /* console.log('Window event ctrl-z'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('HDLmPopup.windowOnDown', currentFancyNodeNull, 'ctrl+z');
    }
    /* Handle an escape keyboard operation */
    if (event.key == 'Escape') {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
      /* console.log('Window event escape'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('HDLmPopup.windowOnDown', currentFancyNodeNull, 'esc');
    }
  }  
}