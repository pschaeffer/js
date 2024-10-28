/**
 * HDLmExtensionBothManageRules short summary.
 *
 * HDLmExtensionBothManageRules description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmExtensionBothManageRules class is not used to create any objects.
   However, it does contain code for creating and handling the node
   identifier extension menu entry and other related menu entries. */
class HDLmExtensionBothManageRules {
  /* The method below adds a new set of order information to the
     order array, if the order information is new */
  static addOrderInformation(orderArray, currentElement) {
    /* console.log('In HDLmExtensionBothManageRules.addOrderInformation', currentElement); */
    let currentElementTag = currentElement.tagName;
    /* Check if the user (accidentally) tried to add order information
       for the DOM body element. Just ignore this element. */
    if (currentElementTag == 'BODY')
      return;
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
  /* Build a set of rules for the current web page. We start at
     the top, by looking for a 'body' or 'html' tag (without the
     quotes). We then process all of the elements under the top
     level element. */
  static buildRules() {
    /* console.log('In HDLmExtensionBothManageRules.buildRules'); */
    /* Get the highest level element in the web page */
    let topElement = null;
    let domHtmlElement = document.getElementsByTagName('html')[0];
    let domBodyElement = document.getElementsByTagName('body')[0];
    /* Check which high-level elements were actually found */
    if (domBodyElement != null)
      topElement = domBodyElement;
    /* If the 'body' element (without the quotes) was not found,
       look for the 'html' element (without the quotes) */
    else if (domHtmlElement != null)
      topElement = domHtmlElement;
    /* Report an error if the top level element could not
       be found */
    else {
      let alertStr = 'Html and body elements not found';
      let errorText = HDLmError.buildError('Error', 'Find', 55, alertStr);
      alert(errorText);
      return;
    }
    /* console.log('In HDLmExtensionBothManageRules.buildRules', domHtmlElement, domBodyElement, topElement); */
    /* console.log('In HDLmExtensionBothManageRules.buildRules', topElement); */
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check if the top elmeent is set or not */
      if (topElement == null)
        break;
      /* Get all of the children of the top element */
      const topElementChildren = topElement.children;
      /* console.log(topElementChildren); */
      /* Process all of the children of the top element */
      for (const topElementChild of topElementChildren) {
        HDLmExtensionBothManageRules.buildRulesElement(topElementChild);
      }
      /* Terminate the dummy loop */
      break;
    }
  }
  /* Build the current tree node and modification */
  static buildRulesBuild(currentElement, urlStr,
                         extraValue, newModType) {
    /* console.log('In HDLmExtensionBothManageRules.buildRulesBuild'); */
    /*             currentElement, */
    /*             urlStr, */
    /*             extraValue, */
    /*             newModType); */
    /* Set a few values for use later */
    let ruleTreeInfo = null;
    let newModTypeCapitalized = HDLmString.ucFirst(newModType);
    let pathValue = HDLmUtility.getPathString(urlStr);
    let urlObj = new URL(urlStr);
    let hostName = urlObj.hostname;
    /* Set a few values for use later */
    let newActiveNodeType = 'newmod';
    HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
    /* Create the site node if need be */
    let newSiteNode = HDLmGXE.buildSiteNode(hostName, HDLmNodeTypes.rules);
    /* Get the node path from the site node */
    let newNodePath = newSiteNode.nodePath.slice();
    /* Build the path for the new rule */
    let newUrlValueStr = 'https://' + hostName + pathValue;
    /* At this point, we really don't know what the final rule name will be.
       However, we do need to build an initial modification name. So we use
       the rule type as part of the rule name. */
    let removeTailsTrue = true;
    let newName = HDLmMenus.buildModificationName(newSiteNode,
                                                  newUrlValueStr,
                                                  newModTypeCapitalized,
                                                  removeTailsTrue);
    newNodePath.push(newName);
    /* console.log(newName); */
    let newTreeType = HDLmNodeTypes.mod;
    let newTreeTypeStr = HDLmNodeTypes.toString(newTreeType);
    let newTooltip = HDLmTree.getTooltip(newActiveNodeType);
    /* Build a node identifier JSON string for the current node.
       The value is used below to try to find an existing rule
       or to build a new rule. */
    let nodeIdenJsonStr = HDLmNodeIden.getNodeIdentifier(currentElement);
    /* console.log(nodeIdenJsonStr); */
    /* If we don't have a valid node identification string, then we really
       can't go any further. Just return to the caller, if need be. */
    if (nodeIdenJsonStr == null)
      return null;
    /* Create a node identification object from the node identification 
       string */
    let nodeIdenJsonObj = JSON.parse(nodeIdenJsonStr);
    /* The creation of a new tree node below is OK because eventually (hopefully)
       we call a routine that inserts the new tree node into the overall node
       tree. This routine also sends the new tree node to the server to add the
       new tree node to the database. */
    ruleTreeInfo = new HDLmTree(newTreeTypeStr, newTooltip);
    ruleTreeInfo.nodePath = newNodePath.slice();
    /* Build the details (the actual modification) for the new rule */
    let modificationExtra = extraValue;
    /* console.log(extraValue); */
    let modificationCommentsEmpty = '';
    let modificationCssEmpty = '';
    let modificationEnabledTrue = true;
    let modificationFindsEmpty = [];
    let modificationParameterNumberNull = null;
    let modificationUseModeEmpty = '';
    let modificationXpathEmpty = '';
    let ruleModInfo = HDLmMod.buildModificationObject(newName, pathValue,
                                                      modificationExtra, modificationEnabledTrue,
                                                      modificationCssEmpty, modificationXpathEmpty,
                                                      modificationFindsEmpty, nodeIdenJsonObj,
                                                      newModType, modificationParameterNumberNull,
                                                      modificationCommentsEmpty, modificationUseModeEmpty);
    /* console.log(ruleModInfo.extra); */
    /* console.log(ruleModInfo); */
    ruleTreeInfo.details = ruleModInfo;
    return ruleTreeInfo;
  }
  /* Check the tag value passed by the caller. If this is an image
     try to get the image. If we can not get the image return false
     to the caller. If the current element is not an image try to
     get the text. If we can not get the text, return false to the
     caller. */
  static buildRulesCheckElement(currentElement, currentTagUpper) {
    let rv = false;
    /* Check if the caller passed a tag value showing that we have
       an image */
    if (currentTagUpper == 'IMG') {
      /* Get the image (if any) for the current element */
      let currentImage = HDLmExtensionBothManageRules.buildRulesGetImage(currentElement);
      if (currentImage == null)
        return rv;
      /* Check if the image is OK. Some images appear not to be really images. */
      if (HDLmExtensionBothManageRules.buildRulesCheckImage(currentImage) == false)
        return rv;
      /* Show that the current image element appears to be OK */
      rv = true;
      return rv;
    }
    /* Since the current element is not an image, we need to make sure that we can
       get some text for current element. If we can't get any text, then we just
       return false to the caller. */
    /* Get the text (if any) for the current element */
    let currentText = HDLmExtensionBothManageRules.buildRulesGetText(currentElement);
    if (currentText == null)
      return rv;
    /* Show that the current element appears to be OK */
    rv = true;
    return rv;
  }
  /* Check the image passed by the caller. The caller really doesn't
     pass an image. The caller really passes an image name. The name
     is check and true or false is returned to the caller. The actual
     image is not loaded by this routine. */
  static buildRulesCheckImage(currentImage) {
    let rv = false;
    /* Check if the caller passed a null value. Just return to
       caller in this case. */
    if (currentImage == null)
      return rv;
    if ((typeof currentImage) != 'string')
      return rv;
    /* Get the suffix of the current image name */
    let currentImageSuffix = null;
    currentImageSuffix = HDLmString.getFileNameSuffix(currentImage);
    if (currentImageSuffix == null)
      return rv;
    if ((typeof currentImageSuffix) != 'string')
      return rv;
    /* Get the type of the current image. If they type is not
       'image' (without the quotes), then just return to the
       caller. */
    let currentImageType = null;
    currentImageType = HDLmString.getFileNameType(currentImageSuffix);
    if (currentImageType == null)
      return rv;
    if ((typeof currentImageType) != 'string')
      return rv;
    /* Check if the type is actually correct */
    if (currentImageType != 'image')
      return rv;
    /* Show that the current image element appears to be OK */
    rv = true;
    return rv;
  }
  /* Check the tag value passed by the caller. If this is a tag
     value, we just ignore, return false to the caller. Otherwise
     return true to the caller. */
  static buildRulesCheckTag(currentElement, currentTagUpper) {
    /* Check if the caller passed a tag value, we just ignore */
    if (currentTagUpper == 'BR' ||
      currentTagUpper == 'SCRIPT')
      return false;
    /* Show that the tag value shows that the current element
       should be processed */
    return true;
  }
  /* Create one or more rules for the current element. The caller
     passes the current element. The rule or rules are added to
     the rule tree. The number of new rules created is returned
     to the caller. */
  static buildRulesCreate(currentElement, userUpdateRule, allowBlankText, getAdditionalText) {
    /* console.log('In HDLmExtensionBothManageRules.buildRulesCreate'); */
    /* console.log(userUpdateRule); */
    /* console.log(getAdditionalText); */
    let newRuleCount = 0;
    /* Get the image (if any) for the current element */
    let currentImage = HDLmExtensionBothManageRules.buildRulesGetImage(currentElement);
    /* console.log(currentImage); */
    /* console.log(currentElement); */
    if (currentImage != null) {
      newRuleCount = HDLmExtensionBothManageRules.buildRulesCreateImage(currentElement, userUpdateRule);
      return newRuleCount;
    }
    /* Get the text (if any) for the current element */
    let currentText = HDLmExtensionBothManageRules.buildRulesGetText(currentElement);
    /* console.log(allowBlankText); */
    /* console.log(currentText); */
    let currentTextLength = null;
    let currentTextTrimLength = null;
    if (currentText != null) {
      currentTextLength = currentText.length;
      currentTextTrimLength = currentText.trim().length;
    }
    /* console.log(currentElement, currentTextLength, currentText); */
    /* console.log(currentElement, currentText, currentTextTrimLength); */
    /* Skip all null text values */
    if (currentText == null)
      return newRuleCount;
    /* Check if blank text is allowed */
    if (allowBlankText == false &&
        currentText.trim() == '')
      return newRuleCount;
    /* console.log(currentElement, currentText); */
    if (currentText != null) {
      newRuleCount = HDLmExtensionBothManageRules.buildRulesCreateText(currentElement, 
                                                                       userUpdateRule,
                                                                       getAdditionalText);
      return newRuleCount;
    }
    return newRuleCount;
  }
  /* Create one or more image rules for the current element. The
     caller passes the current element. The rule or rules are
     added to the rule tree. The number of new rules created
     is returned to the caller.  */
  static buildRulesCreateImage(currentElement, userUpdateRule) {
    let newRuleCount = 0;
    /* Get the image (if any) for the current element */
    let currentImage = HDLmExtensionBothManageRules.buildRulesGetImage(currentElement);
    /* console.log(currentImage); */
    if (currentImage == null)
      return newRuleCount;
    /* Check the current image name */
    let currentImageCheck = HDLmExtensionBothManageRules.buildRulesCheckImage(currentImage);
    if (currentImageCheck == null ||
      currentImageCheck == false)
      return newRuleCount;
    /* Check if the current image starts with a dot and a slash.
       This is bad. The dot and the slash must be removed. */
    if (currentImage != null &&
      currentImage.length >= 2 &&
      currentImage.startsWith('./'))
      currentImage = currentImage.substr(2);
    /* The image name may not start with a protocol and have a host
       name in the image name. This needs to be fixed here. */
    let startsWithProtocol = false;
    if (currentImage.length >= 6 &&
      currentImage.startsWith('https:'))
      startsWithProtocol = true;
    else if (currentImage.length >= 5 &&
      currentImage.startsWith('http:'))
      startsWithProtocol = true;
    /* If the current image name does not start with a protocol
       then we need to fix the current image name */
    if (startsWithProtocol == false) {
      let urlStr = window.location.href;
      let urlObj = new URL(urlStr);
      let hostName = urlObj.hostname;
      currentImage = 'https://' + hostName + '/' + currentImage
      /* console.log(currentImage); */
    }
    /* console.log(currentImage); */
    let startIndex = currentImage.indexOf('://');
    if (startIndex > 0)
      currentImage = currentImage.substr(startIndex + 1);
    /* console.log(currentImage); */
    /* console.log(currentElement, currentImage); */
    /* Get the URL string from the current location */
    let urlStr = window.location.href;
    /* console.log(urlStr); */
    /* Set a few values for use later */
    let newModType = 'image';
    let newActiveNodeType = 'newmod';
    let ruleTreeInfo = HDLmExtensionBothManageRules.buildRulesBuild(currentElement,
                                                                    urlStr,
                                                                    '',
                                                                    newModType);
    /* Check if we got a null value back. Just exit if need be. */
    if (ruleTreeInfo == null)
      return newRuleCount;
    let ruleModInfo = ruleTreeInfo.details;
    ruleModInfo['images'] = [currentImage];
    ruleModInfo['parameter'] = HDLmTree.getParameterNumber(ruleTreeInfo);
    /* console.log(ruleTreeInfo); */
    /* Add the new modification to the rule tree */
    HDLmExtensionBothManageRules.buildRulesFinish(currentElement, newActiveNodeType, ruleTreeInfo);
    /* Check if we need to display the newly created rule. This is done
       in some cases to let the user modify the rule. */
    if (userUpdateRule)
      HDLmExtensionBothManageRules.buildRulesDisplay(currentElement, ruleTreeInfo);
    /* Show that a new rule was created */
    newRuleCount = 1;
    return newRuleCount;
  }
  /* Create one or more text rules for the current element. The
     caller passes the current element. The rule or rules are
     added to the rule tree. */
  static buildRulesCreateText(currentElement, userUpdateRule, getAdditionalText) {
    /* console.log('In HDLmExtensionBothManageRules.buildRulesCreateText'); */
    /* console.log(userUpdateRule); */
    /* console.log(getAdditionalText); */
    let newRuleCount = 0;
    /* console.log('In HDLmExtensionBothManageRules.buildRulesCreateText'); */
    /* Get the text (if any) for the current element */
    let currentText = HDLmExtensionBothManageRules.buildRulesGetText(currentElement);
    /* console.log(currentElement, currentText); */
    /* Build a URL object from the URL passed by the caller.
       Get the host name and path from it. */
    let urlStr = window.location.href;
    /* console.log(urlStr); */
    /* Set a few values for use later */
    let newModType = 'textchecked';
    let newActiveNodeType = 'newmod';
    /* console.log(currentText); */
    let ruleTreeInfo = HDLmExtensionBothManageRules.buildRulesBuild(currentElement,
                                                                    urlStr,
                                                                    currentText,
                                                                    newModType);
    /* console.log(ruleTreeInfo); */
    /* Check if we got a null value back. Just exit if need be. */
    if (ruleTreeInfo == null)
      return newRuleCount;
    /* console.log(ruleTreeInfo.details.extra); */
    let ruleModInfo = ruleTreeInfo.details;
    ruleModInfo['newtexts'] = [currentText];
    ruleModInfo['parameter'] = HDLmTree.getParameterNumber(ruleTreeInfo);
    /* Add the new modification to the rule tree */
    HDLmExtensionBothManageRules.buildRulesFinish(currentElement, newActiveNodeType, ruleTreeInfo);
    /* console.log(ruleTreeInfo.details.extra); */
    /* Check if we need to display the newly created rule. This is done
       in some cases to let the user modify the rule. */
    /* console.log(userUpdateRule); */
    if (userUpdateRule) {
      HDLmExtensionBothManageRules.buildRulesDisplay(currentElement, ruleTreeInfo);
      /* console.log(ruleTreeInfo.details.extra); */
    }
    /* Save a reference to the current rule tree node. This node 
       may be deleted. */ 
    HDLmExtensionBothManageRules.contentRuleTreeInfo = ruleTreeInfo;
    /* The code below is no longer in use. This code created a set of
       variations of the selected text and then sent the updated rule
       back to the server.  */
    if (getAdditionalText && 
        userUpdateRule) {
      /* console.log('In HDLmExtensionBothManageRules.buildRulesCreateText'); */
      /* console.log(window); */
      /* console.log(window.location.pathname); */
      /* console.log(urlStr); */
      let pathValueStr = ''; 
      /* Get some text choice/variants from the server */
      let newPromise = HDLmWebSockets.getTextChoices(currentText, urlStr, pathValueStr);
      newPromise.then(function (response) {
        /* Get the node path for the current modification. This will only work
           if the current modification is still displayed. If the current
           modification is gone, the call below will return null. */
        let modificationNodePath = HDLmExtensionBothManageRules.getNodePathModification();
        if (response != null &&
          modificationNodePath != null) {
          let responseObj = JSON.parse(response);
          let choicesList = responseObj['choices'];
          for (const choice of choicesList) {
            /* console.log(choice); */
            let updatedChoiceStr = HDLmString.removeQuotes(choice);
            ruleModInfo['newtexts'].push(updatedChoiceStr);
          }
          /* Clear the location of the rule tree info. We don't want
             to actually delete the rule if additional choices have 
             been addeded to the rule. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* Display the current modification with the additional text choices */
          HDLmExtensionBothManageRules.buildRulesDisplay(currentElement, ruleTreeInfo);
          /* Send the updated modifcation back to the server */
          HDLmWebSockets.sendUpdateTreeNodeRequest(ruleTreeInfo);
        }
      }, function (error) {
        HDLmError.buildError('Error', 'Get text choices failure', 52, error);
      });
    }
    /* Show that a new rule was created */
    newRuleCount = 1;
    return newRuleCount;
  }
  /* Display the current modification. The user may or may not
     make various changes to the current modification. The modification
     has already been saved at this point. */
  static buildRulesDisplay(currentElement, ruleTreeInfo) {
    /* console.log('In HDLmExtensionBothManageRules.buildRulesFinish'); */
    /* console.log(ruleTreeInfo); */
    let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    /* The active node type is set to a standard value here. This value
       will allow normal finish tree node processing to happen, if we are
       creating a new modification rule. */
    let newTreeEntryTrue = true;
    let callSource = 'HDLmExtensionBothManageRules.buildRulesDisplay';
    let handlingCmdInsertFalse = false;
    let inlineStartupFlagFalse = false;
    let possibleRuleTypesNull = null;
    HDLmMod.displayMod(divDescriptions, divValues, ruleTreeInfo,
                       possibleRuleTypesNull, currentElement,
                       HDLmGlobals.activeEditorType, newTreeEntryTrue,
                       inlineStartupFlagFalse, handlingCmdInsertFalse,
                       callSource);
  }
  /* Build zero or one rule for the current element. The current
     element may just be ignored. This routine recursively calls
     itself for all child elements of the current element. */
  static buildRulesElement(currentElement) {
    /* console.log('In HDLmExtensionBothManageRules.buildRulesElement', currentElement); */
    /* Get and check the current element tag name. We just ignore quite
       a few elements based on their tag names. Tag names always come
       back in uppercase. Why is not clear. */
    let tagNameUpper = currentElement.tagName;
    if (HDLmExtensionBothManageRules.buildRulesCheckElement(currentElement, tagNameUpper) == false)
      return;
    /* Create zero or more rules for the current element */
    let allowBlankTextFalse = false;
    let getAdditionalTextFalse = false;
    let userUpdateRuleFalse = false;
    HDLmExtensionBothManageRules.buildRulesCreate(currentElement, userUpdateRuleFalse,
                                                  allowBlankTextFalse, getAdditionalTextFalse);
    /* Get all of the child elements of the current element */
    const currentElementChildren = currentElement.children;
    /* Process all of the child elmements of the current element */
    for (const childElement of currentElementChildren) {
      HDLmExtensionBothManageRules.buildRulesElement(childElement);
    }
  }
  /* Finish the current modification. This code will cause the
     current modification to be saved. */
  static buildRulesFinish(currentElement, newActiveNodeType, ruleTreeInfo) {
    /* console.log('In HDLmExtensionBothManageRules.buildRulesFinish'); */
    /* console.log(ruleTreeInfo); */
    /*             currentElement, newActiveNodeType, ruleTreeInfo); */
    /* console.log(ruleTreeInfo); */
    /* Add the new modification to the rule tree */
    let addTreeNodeDone;
    let insertIntoDone;
    let rvStr;
    let callFromCallbackFalse = false;
    let containerAvailableFalse = false;
    /* At present, the new tree entry value is not used */
    let newTreeEntryNotUsedFalse = false;
    let handlingCmdInsertFalse = false;
    let needUserInputFalse = false;
    let possibleRuleTypesNull = null;
    /* Set the system character to a standard value */
    let systemCharacter = 'a';
    HDLmStateInfo.setEntriesSystemValues(systemCharacter);
    HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
    HDLmGlobals.setActiveNodeType(newActiveNodeType);
    /* console.log(ruleTreeInfo.details.extra); */
    [insertIntoDone, addTreeNodeDone, rvStr] =
      HDLmMenus.finishTreeNode(ruleTreeInfo, containerAvailableFalse,
        possibleRuleTypesNull, currentElement,
        newTreeEntryNotUsedFalse, handlingCmdInsertFalse,
        callFromCallbackFalse, needUserInputFalse);
    /* console.log(ruleTreeInfo.details.extra); */
    /* console.log(ruleTreeInfo); */
    /* console.log(insertIntoDone); */
    /* console.log(addTreeNodeDone); */
  }
  /* Try to get the image associated with the current element.
     This may not work. We may not have a valid image for the
     current element. Note that an invalid image is just ignored. */
  static buildRulesGetImage(currentElement) {
    /* Set a few initial values */
    let rvImage = null;
    /* Check for an image <img> tag */
    let tagStrUpper = currentElement.tagName;
    if (tagStrUpper != 'IMG')
      return rvImage;
    /* Get the value of the source attribute */
    let srcValue = currentElement.getAttribute('src');
    if (srcValue == null)
      return rvImage;
    rvImage = srcValue;
    return rvImage;
  }
  /* Try to get the text associated with the current element.
     This may not work. We may not have any valid text for the
     current element. Note that invalid text is just ignored. */
  static buildRulesGetText(currentElement) {
    /* Set a few initial values */
    let rvText = null;
    let currentElementNodes = currentElement.childNodes;
    /* console.log(typeof currentElementNodes); */
    /* console.log(currentElement, currentElementNodes); */
    /* Check all of the sub nodes of the current node. We
       are only interested in text sub nodes, and only some
       of those. */
    for (const childNode of currentElementNodes) {
      /* Check for a text node. Skip all other node types. */
      if (childNode.nodeType != Node.TEXT_NODE)
        continue;
      /* Get and check the text sub node value. Note that some
         text values just get ignored. */
      let nodeText = childNode.nodeValue;
      if (nodeText.startsWith('\n'))
        continue;
      /* Set the return value and terminate the loop */
      rvText = nodeText
      break;
    }
    return rvText;
  }
  /* Check if an event occurred inside the rule div. Return
     true, if the event occurred inside the rule dif. Return
     false, otherwise. */
  static checkEventInRuleDiv(event) {
    /* console.log('In checkEventInRuleDiv', event, event.path); */
    /* Assume that the event path will not contain the div */
    let rv = false;
    /* Get the event path. This does not work the way I originally planned.
       It turns out that event.path only existed in a few releases of some
       browsers. */
    let eventPath = event.path;
    /* console.log(event); */
    /* console.log(eventPath); */
    /* Get the event path */
    let composedPath;
    /* composedPath = event.composedPath(); */
    /* console.log(composedPath); */
    eventPath = event.composedPath();
    /* Check if the event path is iterable or not. If not,
       just return false to the caller. Several lines of 
       code were added below for debugging. The debugging
       did not work. */
    let typeOfHdlmGXE = typeof(HDLmGXE);
    let typeOfHdlmString = typeof(HDLmString);
    let typeOfHdlmUtility = typeof(HDLmUtility);
    if (typeOfHdlmUtility == 'undefined')
      rv = rv;
    let eventPathIterable = HDLmUtility.isIterable(eventPath);
    if (eventPathIterable == false)
      return rv;
    /* console.log(eventPath); */
    /* Get the field ID value of the rule div */
    let fieldIdValue;
    fieldIdValue = HDLmDefines.getString('HDLMGXEPREFIX') + 'RuleId';
    /* Scan all of the entries in the event path */
    for (let pathEntry of eventPath) {
      /* console.log(pathEntry); */
      /* Check if the HTML has attribute function can even be
         invoked. In some cases, this function can not even be
         tried. */
      if (!pathEntry.hasAttribute)
        continue;
      /* console.log(pathEntry.hasAttribute('id')); */
      /* Try to get the ID value of the path entry */
      if (!pathEntry.hasAttribute('id'))
        continue
      let idValue = pathEntry.getAttribute('id');
      /* console.log(idValue, fieldIdValue); */
      if (idValue.includes(fieldIdValue)) {
        rv = true;
        break;
      }
    }
    return rv;
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
    let parentElementTagUpper = parentElement.tagName;
    let parentElementTagLower = parentElementTagUpper.toLowerCase();
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
  /* Check if the rule div exists or not. If the rule div exists,
     return true to the caller. If the rule div does not exist,
     return false to the caler. */
  static checkRuleDivExists() {
    /* console.log('In checkRuleDivExists'); */
    /* Check if the special div used to display rules exists
       or not*/
    let fieldIdValue;
    /* Try to locate the div for the rule */
    fieldIdValue = HDLmDefines.getString('HDLMGXEPREFIX') + 'RuleId';
    let domRuleDivElement;
    domRuleDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    return (domRuleDivElement != null);
  }
  /* The following is common code use to handle a generate rule
     message. In some cases, additional text is obtained using 
     a web socket, in other cases this is not true. */ 
  static commonGenerateRule(getAdditionalText) {
    let currentElementFound = false;
    /* Get the current element from the message. The approach used
       depends on that browser we are using. For Firefox this is
       easy. For Chrome less so. */
    let browserName = HDLmHtml.getBrowserName(); 
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      let currentElement;
      if (browserName == 'Firefox')
        currentElement = document.activeElement;
      else
        currentElement = HDLmExtensionBothManageRules.contentEventTarget['currentTarget'];
      /* For some unknown reason, the current elememt is undefined in some cases.
         Why is not clear (at all). However, we must check for this case. */
      if ((typeof currentElement) == 'undefined') {
        break;
      }
      currentElementFound = true;
      /* Get all of the modifications from the server */
      let newPromise = HDLmWebSockets.getModifications()
      /* console.log('In HDLmExtensionBothManageRules.commonGenerateRule'); */
      newPromise.then(function (response) {
        HDLmGXE.updateRuleTree(response);
        /* Build the essentially fixed set of CSS rules */
        HDLmGXE.buildCSSRules();
        HDLmGXE.buildRuleArea(currentElement);
        /* Generate a rule for the current element. This code will generate
          a rule for the current element. */
        let allowBlankTextTrue = true; 
        let userUpdateRuleTrue = true;
        /* console.log('In HDLmExtensionBothManageRules.commonGenerateRule'); */
        let newRuleCount = HDLmExtensionBothManageRules.buildRulesCreate(currentElement,
                                                                         userUpdateRuleTrue,
                                                                         allowBlankTextTrue,
                                                                         getAdditionalText);
        /* Delete the DIV used to display (possibly) the rule */
        if (newRuleCount == 0) {
          let alertStr = 'A rule was not generated';
          let errorText = HDLmError.buildError('Error', 'Find', 55, alertStr);
          alert(errorText);
          HDLmGXE.deleteDiv();
        }
      }, function (error) {
        HDLmError.buildError('Error', 'Get modifications failure', 52, error);
      });
      break;
    }
    return currentElementFound;
  }
  /* This routine tries to get the current company name. The
     company name is obtained from the current node path. If
     the current node path is null, then a null value will be
     returned to the caller. */
  static getCompanyName() {
    let companyNameStr = null;
    /* Try to get the current node path */
    let currentNodePath = HDLmExtensionBothManageRules.getNodePathModification();
    if (currentNodePath == null)
      return companyNameStr;
    /* Try to get the company name from the current node path */
    let currentNodePathList = HDLmExtensionBothManageRules.getNodePathList(currentNodePath);
    if (currentNodePathList != null &&
        currentNodePathList.length >= 2)
      companyNameStr = currentNodePathList[2];
    return companyNameStr;
  }
  /* Get the last common ancestor from a list of lists of parents.
     The individual lists may contains DOM elements that are not
     parents. This list of lists must contain at least two lists
     for this routine to work. */
  static getLastCommonAncestor(lists) {
    let listsLen = lists.length;
    let lastCommonAncestor = null;
    if (listsLen < 2)
      return null;
    /* Get the last common ancestor from the first two lists */
    lastCommonAncestor = HDLmExtensionBothManageRules.getLastCommonParent(lists[0], lists[1]);
    let lastCommonAncestorList = [lastCommonAncestor];
    for (let i = 2; i < listsLen; i++) {
      lastCommonAncestor = HDLmExtensionBothManageRules.getLastCommonParent(lastCommonAncestorList, lists[i]);
      lastCommonAncestorList = [lastCommonAncestor];
    }
    return lastCommonAncestor;
  }
  /* Get the last common parent from two parent lists passed by the
     caller. This routine takes two lists of parent elements and
     finds the last (from left to right, which is also top to bottom)
     parent they have in common. */
  static getLastCommonParent(firstList, secondList) {
    let firstListLen = firstList.length;
    let secondListLen = secondList.length;
    let minListLen = Math.min(firstListLen, secondListLen);
    let lastCommonParent = null;
    for (let i = 0; i < minListLen; i++) {
      if (firstList[i] != secondList[i])
        break;
      lastCommonParent = firstList[i];
    }
    return lastCommonParent;
  }
  /* This routine gets (the possibly) updated left/right index value.
     The caller provides the current element and the direction (which
     might be 'left' or 'right' (without the quotes). */
  static getLeftRightIndex(currentElement, direction) {
    /* console.log('In HDLmExtensionBothManageRules.getLeftRightIndex', direction); */
    let leftRightIndex;
    /* Get the current left/right index value */
    if (HDLmExtensionBothManageRules.contentEventTarget.hasOwnProperty('leftRightIndex') == false)
      leftRightIndex = 0;
    else {
      if (HDLmExtensionBothManageRules.contentEventTarget['leftRightIndex'] == 'undefined' ||
          HDLmExtensionBothManageRules.contentEventTarget['leftRightIndex'] == null)
        leftRightIndex = 0;
      else
        leftRightIndex = HDLmExtensionBothManageRules.contentEventTarget['leftRightIndex'];
    }
    /* console.log('In HDLmExtensionBothManageRules.getLeftRightIndex', leftRightIndex); */
    /* Adjust the left/right index value */
    if (direction == 'left') {
      leftRightIndex -= 1;
      leftRightIndex = Math.max(0, leftRightIndex);
    }
    /* console.log('In HDLmExtensionBothManageRules.getLeftRightIndex', leftRightIndex); */
    if (direction == 'right')
      leftRightIndex += 1;
    /* console.log('In HDLmExtensionBothManageRules.getLeftRightIndex', leftRightIndex); */
    /* Check if the left/right index value is too high */
    let fullRuleNamesCount = HDLmTree.getFullRuleNamesCount(currentElement);
    /* console.log('In HDLmExtensionBothManageRules.getLeftRightIndex', fullRuleNamesCount); */
    leftRightIndex = Math.min(leftRightIndex, fullRuleNamesCount - 1);
    /* console.log('In HDLmExtensionBothManageRules.getLeftRightIndex', leftRightIndex); */
    /* Reset any negative left/right index value to zero and save the
       left/right index value */
    leftRightIndex = Math.max(0, leftRightIndex);
    HDLmExtensionBothManageRules.contentEventTarget['leftRightIndex'] = leftRightIndex;
    /* Return the final left/right index value to the caller */
    return leftRightIndex;
  }
  /* This routine tries to get the next element. The next elememt
     might actually be the current element if we can not go up from
     the top or go down. We can not go down if the current element
     has multiple child elements. We will never go up to the head,
     body, or HTML elements. */
  static getNextElement(currentElement, direction) {
    /* Create the up/down array, if need be. This routine adds and uses
       entries in the up/down array. */
    let upDownArray;
    if (HDLmExtensionBothManageRules.contentEventTarget.hasOwnProperty('upDownArray')) {
      upDownArray = HDLmExtensionBothManageRules.contentEventTarget['upDownArray'];
    }
    else {
      upDownArray = [];
      HDLmExtensionBothManageRules.contentEventTarget['upDownArray'] = upDownArray;
      /* console.log(upDownArray); */
    }
    /* The up/down array may (or may not) be empty at this point. If the
       array is empty, then we must add the current element to the array. */
    let upDownArrayLen = upDownArray.length;
    if (upDownArrayLen == 0)
      upDownArray.push(currentElement);
    /* We now need to consider the direction. Different code is used for
       each direction. */
    let indexValue;
    let nextElement;
    /* console.log(direction); */
    if (direction == 'up') {
      indexValue = upDownArray.indexOf(currentElement);
      /* console.log(indexValue); */
      /* Check if we can move up in the existing up/down array. If the
         answer is yes, then we get the next element from the up/down
         array. */
      if ((indexValue + 1) < upDownArrayLen) {
        nextElement = upDownArray[indexValue + 1];
      }
      /* At this point we must try to go up from the current element. This
         is possible in some cases, but not in others. */
      else {
        let parentElement = currentElement.parentElement;
        /* console.log(parentElement); */
        let parentElementTagUpper = parentElement.tagName;
        if (parentElementTagUpper != 'HTML' &&
            parentElementTagUpper != 'HEAD' &&
            parentElementTagUpper != 'BODY') {
          upDownArray.push(parentElement);
          nextElement = parentElement;
        }
        /* If we could not go up, then just use the current
           element as the next element */
        else
          nextElement = currentElement;
      }
    }
    /* The current direction is down. This will be true in
       some cases. */
    if (direction == 'down') {
      indexValue = upDownArray.indexOf(currentElement);
      /* Check if we can move down in the existing up/down array. If the
         answer is yes, then we get the next element from the up/down
         array. */
      if ((indexValue) > 0) {
        nextElement = upDownArray[indexValue - 1];
      }
      /* At this point we must try to go down from the current element. This
         is possible in some cases, but not in others. */
      else {
        let childElements = currentElement.children;
        let childElementsLen = childElements.length;
        if (childElementsLen > 0) {
          let firstDownElement = childElements.item(0);
          upDownArray.unshift(firstDownElement);
          nextElement = firstDownElement;
        }
        /* If we could not go down, then just use the current
           element as the next element */
        else
          nextElement = currentElement;
      }
    }
    /* The current direction is left or right. This will be true in
       some cases. */
    if (direction == 'left' || direction == 'right') {
      nextElement = currentElement;
    }
    return nextElement;
  }
  /* Get the node path from an attribute in a div. This operation
     will either return null or a node path (converted to a string). */
  static getNodePath() {
    let rv = null;
    /* Get the div element we will get the attribute from */
    let divName = HDLmDefines.getString('HDLMRIGHTDEF');
    let divRightDefElements = document.getElementsByClassName(divName);
    if (divRightDefElements == null)
      return rv;
    if (divRightDefElements.length == 0)
      return rv;
    let divRightDefElement = divRightDefElements[0];
    if (divRightDefElement == null)
      return rv;
    /* Get the node path value from the div attributes */
    let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
    if (divRightDefElement.hasAttribute(nodePathName) == false)
      return rv;
    rv = divRightDefElement.getAttribute(nodePathName);
    /* console.log(rv); */
    return rv;
  }
  /* This routine converts a node path string to a list. If
     the node path string passed by the caller is null, then
     a null value will be returned to the caller. */
  static getNodePathList(nodePath) {
    let rv = null;
    /* Check if the nost path passed by the caller is null */
    if (nodePath == null)
      return rv;
    /* Split the node path string into a list of strings */
    rv = nodePath.split(',');
    return rv;
  }
  /* Get the node path from an attribute in a div. This operation
     will either return null or a node path (converted to a string).
     This method should return null, if a modification is not
     currently displayed. So this routine will only return a
     node path if a modification is really displayed. */
  static getNodePathModification() {
    let rv = null;
    /* Get the div element we will add an attribute to */
    rv = HDLmExtensionBothManageRules.getNodePath();
    /* console.log(rv); */
    if (rv == null)
      return rv;
    /* Check if the entry descriptions are displayed. This is a
       check that determines if a modification is really shown
       (displayed) or not. */
    let entryId = HDLmDefines.getString('HDLMENTRYVALUES');
    entryId = entryId.substr(1);
    /* console.log(entryId); */
    let entryDiv = document.getElementById(entryId);
    /* console.log(entryDiv); */
    /* console.log(rv); */
    if (entryDiv == null)
      return null;
    /* console.log(rv); */
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
  /* Get the list of the parents of the current node. The list of parents
     will always include the current node as one of the parents, even
     though it is not actually a parent. The first entry in the output
     list will always be the body element. The returned list goes down
     the DOM tree from left to right. */
  static getParentList(currentDomElement) {
    let rv = [];
    while (true) {
      rv.unshift(currentDomElement);
      /* console.log('In HDLmExtensionBothManageRules.getParentList', currentDomElement); */
      let currentTagUpper = currentDomElement.tagName;
      if (currentTagUpper == 'BODY')
        break;
      currentDomElement = currentDomElement.parentElement;
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
     scripts. Of course, background scripts can not directly access the DOM or
     use the alert mechanism. As a consequence, the main thing this method does
     is to send a message to the content script. */
  static onClickedBack(info, tab) {
    /* console.log('In HDLmExtensionBothManageRules.onClickedBack', info, tab); */
    /* console.log(info); */
    /* console.log(tab); */
    /* Check for a couple of values that force a quick exit
       from this routine */
    if (info.menuItemId != 'Build/Modify Changes'     &&
        info.menuItemId != 'Add Order Information'    &&
        info.menuItemId != 'Copy Element(s) Contents' &&
        info.menuItemId != 'Create Rules'             &&
        info.menuItemId != 'Generate Rule'            &&
        info.menuItemId != 'Generate Rule Using AI'   &&
        info.menuItemId != 'Set Prod Mode'            &&
        info.menuItemId != 'Set Test Mode')
      return;
    /* In some cases, we can not really handle a background
       event. If we are running under Firefox and we did not
       get the target element, then we need to give up. */
    let browserName = HDLmHtml.getBrowserName();
    /* console.log('In onClickedBack', browserName); */
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
     mechanism. For some unknown reason, this event does not always
     occur. */
  static onClickedContent(event) {
    /* console.log('In onClickedContent'); */
    /* console.log(event); */
    /* Get the HTML current element where the click occurred */
    HDLmExtensionBothManageRules.contentEventTarget['currentTarget'] = HDLmExtensionBothManageRules.getTargetFromEvent(event);
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
     page, this code gets run. For some reason this routine is
     invoked twice when a mouse up event occurs. Why, is not
     clear. */
  static onContextMenuContent(event) {
    /* console.log('In onContextMenuContent', event); */
    /* Get the HTML current element where the click occurred */
    let currentElement = HDLmExtensionBothManageRules.getTargetFromEvent(event);
    HDLmExtensionBothManageRules.contentEventTarget['currentTarget'] = currentElement;
    /* Check if the current web page has already had rules run against it */
    if (HDLmExtensionBothManageRules.checkPage()) {
      HDLmExtensionBothManageRules.resetNodeValues();
      return;
    }
    /* Restore the DOM element background color (if any) */
    HDLmExtensionBothManageRules.restorePriorBackground();
    /* Save the current DOM element background color (if any) */
    HDLmExtensionBothManageRules.savePriorBackground(currentElement);
    HDLmExtensionBothManageRules.setCurrentBackground(currentElement);
  }
  /* This event handler is used to handle closing a content menu. A true
     context menu close event does not exists. This event is used to
     create an ersatz context menu close event. */
  static onContextMenuContentEvent(event) {
    /* console.log('In HDLmExtensionBothManageRules.onContextMenuContentEvent', event); */
    /* Get the name of the current event */
    /* console.log(event.constructor.name); */
    let eventName = event.constructor.name;
    /* console.log(eventName); */
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Check for a few critical mouse events */
      if (eventName == 'MouseEvent') {
        /* We want to ignore mouse events, if they are in a div
           that we created to display (possibly change) a rule */
        let mouseInDiv = HDLmExtensionBothManageRules.checkEventInRuleDiv(event);
        /* console.log(mouseInDiv); */
        /* Check if the mouse event was actually in the div built for adding,
           changing, and deleting rules */
        if (mouseInDiv)
          break;
        /* Check if the special div used to display rules exists
           or not. We don't want to delete the div if it does not
           exist. */
        if (HDLmExtensionBothManageRules.checkRuleDivExists()) {
          console.log('Delete the rule div');
          HDLmGXE.deleteDiv();
          /* If we updated (including deleted) any rules, the we need to reload
             the current web page */
          if (HDLmExtensionBothManageRules.rulesUpdatedGet() == true) {
            /* console.log('About to reload the current window'); */ 
            HDLmPopup.reloadCurrentWindow();
            HDLmExtensionBothManageRules.rulesUpdatedClear();
          }
        }
        HDLmExtensionBothManageRules.restorePriorBackground();
        /* console.log('s4'); */
      }
      /* Check for a few critical keyboard events */
      if (eventName == 'KeyboardEvent') {
        /* console.log(event); */
        /* We want to ignore keyboard events, if they are in a div
           that we created to display (possibly change) a rule. The
           exception is an enter keyboard event (in some cases).
           The enter keyboard event is used (in some cases) to cause
           a data value to be saved. */
        let keyboardInDiv = HDLmExtensionBothManageRules.checkEventInRuleDiv(event);
        if (keyboardInDiv                               &&
            HDLmGlobals.checkDataValueTree() == false &&
            event.key != 'Enter')
          break;
        /* console.log(eventName); */
        /* console.log(event); */
        /* We want to ignore keyboard events, if the rule div does
           not exist */
        if (!HDLmExtensionBothManageRules.checkRuleDivExists())
          break;
        /* Check if the user pressed the up or down key */
        let direction = null;
        /* console.log(event); */
        HDLmExtensionBothManageRules.restorePriorBackground();
        if (event.key == 'ArrowUp')
          direction = 'up';
        else if (event.key == 'ArrowDown')
          direction = 'down';
        else if (event.key == 'ArrowLeft')
          direction = 'left';
        else if (event.key == 'ArrowRight')
          direction = 'right';
        /* console.log(direction); */
        /* Check if direction is set, or is null */
        if (direction != null) {
          /* Restore the prior DOM element background color (if any) */
          HDLmExtensionBothManageRules.restorePriorBackground();
          let currentElement = HDLmExtensionBothManageRules.contentEventTarget['currentTarget'];
          let newElement = HDLmExtensionBothManageRules.getNextElement(currentElement, direction);
          HDLmExtensionBothManageRules.contentEventTarget['currentTarget'] = newElement;
          /* console.log(currentElement); */
          /* console.log(newElement); */
          /* Save the current DOM element background color (if any) */
          HDLmExtensionBothManageRules.savePriorBackground(newElement);
          HDLmExtensionBothManageRules.setCurrentBackground(newElement);
          /* Try to build a rule for the new element or use an existing rule
             if we are building or modifying a rule. We might be handling a
             data value. */
          if (HDLmGlobals.checkDataValueTree() == false) {
            /* Get the current left/right index value */
            let leftRightIndex = HDLmExtensionBothManageRules.getLeftRightIndex(newElement, direction);
            /* console.log(leftRightIndex); */   
            let newRuleTreeInfo = null;       
            newRuleTreeInfo = HDLmGXE.displayRule(window.location.href, 
                                                  newElement, 
                                                  leftRightIndex);
            /* console.log(newRuleTreeInfo); */
          }
          else {
            HDLmGXE.displayValue(window.location.href, newElement);
          }
        }
        /* At this point we can check for the delete key. If we are positioned
           on a DOM element with an least one associated rule, then that
           rule should be deleted. */
        if (event.key == 'Delete') {
          let currentElement = HDLmExtensionBothManageRules.contentEventTarget['currentTarget'];
          /* console.log(currentElement); */
          /* Get the current left/right index value */
          let leftRightIndex = HDLmExtensionBothManageRules.getLeftRightIndex(currentElement, direction);
          /* console.log(leftRightIndex); */
          /* Assume that we don't want an actual delete here */
          let doAnActualDelete = false
          let deleteRuleTreeInfo = HDLmExtensionBothManageRules.contentRuleTreeInfo;
          /* If we haven't added any additional choices, than a real
             delete is needed */
          if (deleteRuleTreeInfo != null)
            doAnActualDelete = true;  
          if (doAnActualDelete) {
            /* The rule may not actually exist at this point. The rule 
               may have been started, but not completed. The rule type
               may not have been specified at this point. */
            let deleteNodePath = deleteRuleTreeInfo.nodePath;
            console.log('s1');
            if (HDLmTree.locateTreeNode(deleteNodePath) != null) {
              HDLmGXE.deleteRule(window.location.href, 
                                currentElement, 
                                leftRightIndex,
                                deleteRuleTreeInfo); 
              console.log('s2');
            }
            /* At this point, we need to force a reload of the current
               page. This is done showing that the rules have been updated. */
            else {
              HDLmExtensionBothManageRules.rulesUpdatedSet(true);
            }
          }
          /* If we updated (including deleted) any rules, the we need to reload
             the current web page */
          if (doAnActualDelete) {
            console.log('s3');
            if (HDLmExtensionBothManageRules.rulesUpdatedGet() == true) {
              console.log('s4');
              /* console.log('About to reload the current window'); */
              HDLmPopup.reloadCurrentWindow();
              HDLmExtensionBothManageRules.rulesUpdatedClear();
            }
          }
        }
        /* At this point we can check for the enter key. In some cases,
           the enter key is used to show that a data value should be
           saved. Note that data values are saved here, not new rules.
           New rules are saved using a very different mechanism. */
        /* console.log(event); */
        if (event.key == 'Enter') {
          /* console.log('Got the enter key'); */
          /* console.log(event); */
          /* console.log(HDLmGlobals.checkDataValueTree()); */
          /* Check if we are creating a saved value here. We only want to
             make the call below, if we are creating a saved data value.
             If we are building a row, a very different mechanism is used. */
          if (HDLmGlobals.checkDataValueTree() == true) {
            /* Finish the current data value tree node and add it to
               the database. The call below does all of that. */
            let callFromCallbackFalse = false;
            let commonParentElementNull = null;
            let containerAvailableTrue = true;
            let handlingCmdInsertFalse = false;
            /* At present, the new tree entry value is not used */
            let newTreeEntryNotUsedTrue = true;
            let needUserInputFalse = false;
            let possibleRuleTypesNull = null;
            /* The dummy loop below is used to allow break to work */
            while (true) {
              /* Get a reference to the new data value node that we
                 will (hopefully) finish creating below */
              let nodeTreeInfo = HDLmGlobals.getDataValueTree();
              /* console.log(nodeTreeInfo); */
              if (nodeTreeInfo == null)
                break;
              /* Get some information from the container widget */
              let containerWidgetCurrent = nodeTreeInfo.containerWidget;
              /* If we don't have a container widget than we can't go any
                 further */
              if (containerWidgetCurrent == null)
                break;
              /* Try to get the current error text from the container widget */
              let errorText = containerWidgetCurrent.getErrorText();
              if (errorText != '')
                break;
              /* Finish the saved value tree node */
              HDLmMenus.finishTreeNode(nodeTreeInfo, containerAvailableTrue,
                                       possibleRuleTypesNull, commonParentElementNull,
                                       newTreeEntryNotUsedTrue, handlingCmdInsertFalse,
                                       callFromCallbackFalse, needUserInputFalse);
              /* Delete the DIV used to display the data value */
              /* console.log('Delete the DIV - Before'); */
              HDLmGXE.deleteDiv();
              /* console.log('Delete the DIV - After'); */
              /* Set the reference to the new data value tree node to a
                 null value. This prevents this code from being executed
                 more than once. */
              HDLmGlobals.setDataValueTree(null);
            }
          }
        }
        /* At this point we can check for the escape key. The div used to create,
           modify, and delete rules will be removed. Any pending order requests
           will be eliminated. */
        if (event.key == 'Escape') {
          /* console.log('About to reset some information'); */ 
          HDLmExtensionBothManageRules.resetSomeInformation();
        }
      }
      break;
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
    /* console.log('In HDLmExtensionBothManageRules.onMessageContentOneTime', message, sender, sendResponse); */
    /* This routine is invoked to handle a variety of messages. We must
       check the menu item ID to determine what type of processing is
       needed. */
    let itemId = message.menuItemId;
    /* Reset a few fields that are data value related. These fields
       are always reset here, even if we are going to build a data
       value. If we building a data value from one or more elements,
       then these fields will be set later. */
    HDLmGlobals.resetDataValues();
    /* Put all of the code below in a try block so that errors
       can be caught and reported */
    try {
      switch (itemId) {
        /* Add some node order information, if need be */
        case 'Add Order Information': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* Get the current element from the message. The approach used
             depends on that browser we are using. For Firefox this is
             easy. For Chrome less so. */
          let browserName = HDLmHtml.getBrowserName();
          let currentElement;
          if (browserName == 'Firefox')
            currentElement = document.activeElement;
          else
            currentElement = HDLmExtensionBothManageRules.contentEventTarget['currentTarget'];
          /* Save the target DOM element in an array. These DOM
             elements are (may be) used to build node order rules
             later. Note that the call below identifies duplicate
             target entries and ignores them. */
          let orderArray = HDLmExtensionBothManageRules.contentOrderElements;
          HDLmExtensionBothManageRules.addOrderInformation(orderArray, currentElement);
          /* console.log(orderArray); */
          break;
        }
        /* Add a new window, if need be. This code runs as part of the
           content script. That means that it can not do much. */
        case 'Build/Modify Changes': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* Get the current element from the message. The approach used
             depends on that browser we are using. For Firefox this is
             easy. For Chrome less so. */
          let browserName = HDLmHtml.getBrowserName();
          /* console.log(browserName); */
          let currentElement;
          let newRuleTreeInfo = null;
          if (browserName == 'Firefox')
            currentElement = document.activeElement;
          else
            currentElement = HDLmExtensionBothManageRules.contentEventTarget['currentTarget'];
          /* Build the essentially fixed set of CSS rules */
          HDLmGXE.buildCSSRules();
          /* console.log('s1'); */
          /* console.log('In onMessageContentOneTime() - Build/Modify Changes'); */
          /* Get all of the modifications from the server */
          let newPromise = HDLmWebSockets.getModifications()
          newPromise.then(function (response) {
            /* console.log('In onMessageContentOneTime() - Build/Modify Changes - then'); */
            /* console.log(response); */
            /* console.log('s2'); */
            HDLmGXE.updateRuleTree(response);
            HDLmGXE.buildRuleArea(currentElement);
            /* Display a rule for the current element. This may be an existing
               rule or it may be a new rule. */               
            let newRuleTreeInfo = null;  
            newRuleTreeInfo = HDLmGXE.displayRule(window.location.href, 
                                                  currentElement, 
                                                  0);
            /* console.log(newRuleTreeInfo); */
            /* Save a reference to the newly built rule tree info. 
               This is used to delete the rule, if need be. */
            HDLmExtensionBothManageRules.contentRuleTreeInfo = newRuleTreeInfo;
          }, function (error) {
            HDLmError.buildError('Error', 'Get modifications failure', 52, error);
          });
          break;
        }
        /* Add a new window, if need be. This code runs as part of the
           content script. That means that it can not do much. This
           routine will eventually get some JSON and send it to the
           server as a saved value. The JSON might be for one node,
           or it might be for many nodes. */
        case 'Copy Element(s) Contents': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* Get the current element from the message. The approach used
             depends on that browser we are using. For Firefox this is
             easy. For Chrome less so. */
          let browserName = HDLmHtml.getBrowserName();
          let currentElement;
          if (browserName == 'Firefox')
            currentElement = document.activeElement;
          else
            currentElement = HDLmExtensionBothManageRules.contentEventTarget['currentTarget'];
          /* Build the essentially fixed set of CSS rules */
          HDLmGXE.buildCSSRules();
          /* Get all of the modifications from the server */
          /* onMessageContentOneTime() - Copy Element(s) Contents'); */
          let newPromise = HDLmWebSockets.getModifications()
          newPromise.then(function (response) {
            HDLmGXE.updateRuleTree(response);
            HDLmGXE.buildRuleArea(currentElement);
            /* Build a URL object from the URL passed by the caller.
               Get the host name from it. */
            /*
            let urlStr = window.location.href;
            let urlObj = new URL(urlStr);
            let hostName = urlObj.hostname;
            */
            /* Copy and save the current element */
            /*
            HDLmGXE.copySaveElement(hostName, currentElement);
            */
            /* Restore the DOM element background color (if any) */
            /*
            HDLmExtensionBothManageRules.restorePriorBackground();
            */
            /* Display a window for a value. The value has a default name (that
               can be changed as need be. The value respresent one or more HTML
               nodes. The value is sent to a server and saved when the enter key
               is used. */
            HDLmGXE.displayValue(window.location.href, currentElement);
          }, function (error) {
            HDLmError.buildError('Error', 'Get modifications failure', 52, error);
          });
          break;
        }
        /* Create a set of rules for a web page. This code runs as part of the
           content script. That means that it can not do much. */
        case 'Create Rules': {
          /* console.log('In onMessageContentOneTime() - Create Rules'); */
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* Get all of the modifications from the server */
          let newPromise = HDLmWebSockets.getModifications()
          newPromise.then(function (response) {
            /* console.log('s1'); */
            HDLmGXE.updateRuleTree(response);
            /* console.log('s2'); */
            /* Build a set of rules for the current web page. This code
               will create zero or more (a lot more) rules for the current
               web page. */
            HDLmExtensionBothManageRules.buildRules();
          }, function (error) {
            HDLmError.buildError('Error', 'Get modifications failure', 52, error);
          });
          break;
        }
        /* Generate a rule for the current element. This code runs as part
           of the content script. That means that it can not do much. */
        case 'Generate Rule': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          let getAdditionalTextFalse = false;
          HDLmExtensionBothManageRules.commonGenerateRule(getAdditionalTextFalse);          
          break;
        }
        /* Generate a rule for the current element using AI. This code runs
           as part of the content script. That means that it can not do much. */
        case 'Generate Rule Using AI': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          let getAdditionalTextTrue = true;
          HDLmExtensionBothManageRules.commonGenerateRule(getAdditionalTextTrue);          
          break;
        }
        /* Check if the caller is asking for the current document to be
           reloaded. This must be done by a content script because only
           content scripts have access to the actual web page. This code
           may not really be in use. A different mechanism (see the code
           that assigns window.location.href to itself) is used in some
           cases. */
        case 'Reload Current Document': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* console.log('In onMessageContentOneTime', 'Reload Current Document'); */
          document.location.reload();
          let response = 'OK';
          sendResponse(response);
          break;
        }
        /* Set the prod (production) mode. This code calls an external routine 
           to do the actual work. This code run as part of the content script. */
        case 'Set Prod Mode': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* console.log('In onMessageContentOneTime', 'Set Prod Mode'); */
          HDLmUtility.setProdMode(true);
          break;
        }
        /* Set the test mode. This code calls an external routine to do the actual
           work. This code run as part of the content script. */
        case 'Set Test Mode': {
          /* Clear the location of the rule tree info. We don't 
             have a specific rule to delete at this point. */
          HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
          /* console.log('In onMessageContentOneTime', 'Set Test Mode'); */
          HDLmUtility.setProdMode(false);
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
      console.log(errorObj);
      HDLmError.reportError(errorObj, 'In onMessageContentOneTime', 'Error');
    }
  }
  /* This method is invoke when a mouse down event occurs anywhere in
     a document */
  static onMouseDownContent(event) {
    /* console.log('In onMouseDownContent'); */
    /* console.log(event); */
    let newStyle = '';
    /* Check if the current web page has already had rules run against it */
    if (HDLmExtensionBothManageRules.checkPage()) {
      HDLmExtensionBothManageRules.resetNodeValues();
      return;
    }
    /* Remove all style properties that have been set so far */
    HDLmExtensionBothManageRules.removeAddedStyleModifiedNodes(HDLmExtensionBothManageRules.contentModifiedNodes);
    /* Note thet the style below was solid red */
    newStyle = 'border:1px solid green';
    HDLmUtility.addStyleProperty(event.target, newStyle);
    HDLmExtensionBothManageRules.addStylePropertyToModifiedNodes(HDLmExtensionBothManageRules.contentModifiedNodes,
      event.target,
      newStyle);
    newStyle = 'background:lightblue';
    HDLmUtility.addStyleProperty(event.target, 'background:lightblue');
    HDLmExtensionBothManageRules.addStylePropertyToModifiedNodes(HDLmExtensionBothManageRules.contentModifiedNodes,
      event.target,
      newStyle);
  }
  /* This method is invoke when a mouse up event occurs anywhere in
     a document */
  static onMouseUpContent(event) {
    /* console.log('In onMouseUpContent'); */
    /* console.log(event); */
    /* Check if the current web page has already had rules run against it */
    if (HDLmExtensionBothManageRules.checkPage()) {
      HDLmExtensionBothManageRules.resetNodeValues();
      return;
    }
    /* Remove all style properties that have been set so far */
    HDLmExtensionBothManageRules.removeAddedStyleModifiedNodes(HDLmExtensionBothManageRules.contentModifiedNodes);
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
      HDLmExtensionBothManageRules.removeAddedStyleProperty(modifiedElement, modifiedStyle);
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
    /* console.log('In HDLmExtensionBothManageRules.resetNodeValues'); */
    HDLmWebSockets.resetWebSockets();
    HDLmExtensionBothManageRules.contentOrderElements = [];
  }
  /* The code below used to be part of 'escape' (without the
     quotes) processing. It was moved into a separate routine
     so that it could be invoked from several places. */
  static resetSomeInformation() {
    HDLmGXE.deleteDiv();
    HDLmExtensionBothManageRules.contentOrderElements = [];
    /* If we updated (including deleted) any rules, the we need to reload
        the current web page */
    if (HDLmExtensionBothManageRules.rulesUpdatedGet() == true) {
      /* console.log('About to reload the current window'); */ 
      HDLmPopup.reloadCurrentWindow();
      HDLmExtensionBothManageRules.rulesUpdatedClear();
    }
    return;
  }
  /* Restore the prior target background, if sufficient information
     was saved */
  static restorePriorBackground() {
    /* Restore the prior DOM element background color (if any) */
    if (HDLmExtensionBothManageRules.contentEventTarget.hasOwnProperty('priorTarget')) {
      let priorTarget = HDLmExtensionBothManageRules.contentEventTarget['priorTarget'];
      delete HDLmExtensionBothManageRules.contentEventTarget['priorTarget'];
      if (HDLmExtensionBothManageRules.contentEventTarget.hasOwnProperty('priorBackgroundColor')) {
        priorTarget.style.backgroundColor = HDLmExtensionBothManageRules.contentEventTarget['priorBackgroundColor'];
        /* Remove the saved background color so that it does not get used more than once */
        delete HDLmExtensionBothManageRules.contentEventTarget['priorBackgroundColor'];
      }
    }
  }
  /* Remove (delete) the rules updated flag, if it has been set */
  static rulesUpdatedClear() {
    if (HDLmExtensionBothManageRules.contentEventTarget.hasOwnProperty('rulesUpdated') == false)
      return;
    delete HDLmExtensionBothManageRules.contentEventTarget['rulesUpdated'];
  }
  /* Get the current value of the rules updated flag, if it has been set.
     If the value has not been set, just return false to the caller. */
  static rulesUpdatedGet() {
    if (HDLmExtensionBothManageRules.contentEventTarget.hasOwnProperty('rulesUpdated') == false)
      return false;
    return HDLmExtensionBothManageRules.contentEventTarget['rulesUpdated'];
  }
  /* Set the current value of the rules updated flag */
  static rulesUpdatedSet(newValue) {
    HDLmExtensionBothManageRules.contentEventTarget['rulesUpdated'] = newValue;
  }
  /* Save the prior target background, if sufficient information
     is available */
  static savePriorBackground(currentElement) {
    /* Save the current DOM element background color (if any) */
    HDLmExtensionBothManageRules.contentEventTarget['priorTarget'] = currentElement;
    delete HDLmExtensionBothManageRules.contentEventTarget['priorBackgroundColor'];
    if (typeof (currentElement.style.backgroundColor) != 'undefined' &&
        currentElement.style.backgroundColor != null)
      HDLmExtensionBothManageRules.contentEventTarget['priorBackgroundColor'] = currentElement.style.backgroundColor;
  }
  /* Set the current target background */
  static setCurrentBackground(currentElement) {
    /* Reset the background color of the current DOM element */
    /* LightBlue */
    /* currentElement.style.backgroundColor = "#ADD8E6"; */
    /* LightSkyBlue */
    /* currentElement.style.backgroundColor = "#87CEFA"; */
    /* DodgerBlue */
    /* currentElement.style.backgroundColor = "#1E90FF"; */
    /* DeepSkyBlue */
    currentElement.style.backgroundColor = '#' + HDLmDefines.getString('HDLMBACKGROUNDCOLORHEX');
    /* currentElement.style.outline = '#f00 solid 2px'; */
    /* currentElement.style.filter = "brightness(50%)"; */
  }
  /* The startup method is invoked to do all of the work needed to
     to add a new item to the context menu */
  static startup() {
    /* console.log('In HDLmExtensionBothManageRules.startup'); */
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
    /* console.log(browserName); */
    if (browserName == 'Unknown') {
      let errorText = "The current browser type could not be determined - " + browserName;
      HDLmError.buildError('Error', 'Browser Type', 54, errorText);
      return;
    }
    /* console.log(browserName); */
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
    /* console.log(curEnv); */
    /* console.log(chrome); */
    /* console.log(window); */
    /* console.log(window.location); */
    /* console.log(typeof chrome.contextMenus); */
    /* Add an event listener for content scripts. This event
       listener only works as part of content scripts. The
       'event' occurs each time right-click action is taken. */
    if (curEnv == 'content') {
      let useCaptureTrue = true;
      document.addEventListener("mousedown", HDLmExtensionBothManageRules.onMouseDownContent, useCaptureTrue);
      document.addEventListener("mouseup", HDLmExtensionBothManageRules.onMouseUpContent, useCaptureTrue);
      if (browserName == 'Firefox') {
        document.addEventListener("click", HDLmExtensionBothManageRules.onClickedContent, useCaptureTrue);
        try {
          browser.browserAction.onClicked.addListener(HDLmExtensionBothHideShowAlterRules.onClickedContent);
        }
        catch (errorObj) {
          console.log(errorObj);
        }
        /* console.log('In HDLmExtensionBothManageRules.startup'); */
        document.addEventListener("contextmenu", HDLmExtensionBothManageRules.onContextMenuContent, useCaptureTrue);
        browser.runtime.onMessage.addListener(HDLmExtensionBothManageRules.onMessageContentOneTime);
      }
      /* console.log(browserName); */
      if (browserName == 'Chrome') {
        /* console.log('In HDLmExtensionBothManageRules.startup'); */
        document.addEventListener("click", HDLmExtensionBothManageRules.onClickedContent, useCaptureTrue);
        document.addEventListener("contextmenu", HDLmExtensionBothManageRules.onContextMenuContent, useCaptureTrue);
        /* The next three event listeners are used solely to detect context menu close and some other
           events*/
        document.addEventListener('keyup', HDLmExtensionBothManageRules.onContextMenuContentEvent, useCaptureTrue);
        document.addEventListener('mousedown', HDLmExtensionBothManageRules.onContextMenuContentEvent, useCaptureTrue);
        document.addEventListener('focus', HDLmExtensionBothManageRules.onContextMenuContentEvent, useCaptureTrue);
        /* We only want to add the message routine as a listener if the
           addListener API really exists. For some weird reason it doesn't
           always exist. As a consequence we must check if the API really
           exists before we try to use it. Note that this appears to be a
           startup problem. This code appears to run twice. The second time
           the API is available and is used. */
        /* console.log(typeof chrome); */
        if ((typeof chrome) != 'undefined' &&
          chrome.hasOwnProperty('runtime') &&
          chrome.runtime.hasOwnProperty('onMessage') &&
          chrome.runtime.onMessage.hasOwnProperty('addListener')) {
          /* console.log('About to add listener'); */
          chrome.runtime.onMessage.addListener(HDLmExtensionBothManageRules.onMessageContentOneTime);
        }
      }
    }
    /* Create all of the context menu items. This code only works
       in background scripts. The required context menu entries
       are created below. */
    /* console.log(curEnv); */
    if (curEnv == 'background') {
      /* Check if the current browser is Firefox */
      if (browserName == 'Firefox') {
        /* Add the menu entry for building a new window */
        browser.menus.create({
          id: "Build/Modify Changes",
          title: "Build/Modify Changes",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the menu entry for building node order information */
        browser.menus.create({
          id: "Add Order Information",
          title: "Add Order Information",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the menu entry for building JSON from HTML */
        browser.menus.create({
          id: "Copy Element(s) Contents",
          title: "Copy Element(s) Contents",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the menu entry for creating a set of rules for
           a web page */
        browser.menus.create({
          id: "Create Rules",
          title: "Create Rules",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the menu entry for generating a rule for
           the current element */
        browser.menus.create({
          id: "Generate Rule",
          title: "Generate Rule",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the menu entry for generating a rule for
           the current element using AI */
        browser.menus.create({
          id: "Generate Rule Using AI",
          title: "Generate Rule Using AI",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the menu entry for setting prod (production) mode
           for the current extension */
        browser.menus.create({
          id: "Set Prod Mode",
          title: "Set Prod Mode",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the menu entry for setting test mode
           for the current extension */
        browser.menus.create({
          id: "Set Test Mode",
          title: "Set Test Mode",
          contexts: ["all"]
        }, HDLmExtensionBothManageRules.onCreatedBack);
        /* Add the required event listener for clicks. This event runs
           in a background script. */
        browser.menus.onClicked.addListener(HDLmExtensionBothManageRules.onClickedBack);
        /* Add the required event listener for messages. This event runs
           in a background script. This message handler isn't really needed
           because no messages are sent to the background script. The
           reverse is not true. The background script definitely sends
           messages to the content script. */
        browser.runtime.onMessage.addListener(HDLmExtensionBothManageRules.onMessageBack);
        /* Add the required event listener for inbound connections. This event runs
           in a background script. This event listener is not actually used. We do
           not establish connections with the background script. */
        browser.runtime.onConnect.addListener(HDLmExtensionBothManageRules.onConnectBack);
      }
      /* Check if the current browser is Chrome */
      /* console.log(browserName); */
      if (browserName == 'Chrome') {
        let createError = false;
        try {
          let createProperties;
          /* Create the Build/Modify Changes menu entry */
          createProperties = {
            id: "Build/Modify Changes",
            title: "Build/Modify Changes",
            contexts: ["all"]
          };
          /* console.log(createProperties); */
          chrome.contextMenus.create(createProperties);
          /* console.log(createProperties); */
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
          /* Create the Create Rules menu entry */
          createProperties = {
            id: "Create Rules",
            title: "Create Rules",
            contexts: ["all"]
          };
          chrome.contextMenus.create(createProperties);
          /* Create the Generate Rule menu entry */
          createProperties = {
            id: "Generate Rule",
            title: "Generate Rule",
            contexts: ["all"]
          };
          chrome.contextMenus.create(createProperties);
          /* Create the Generate Rule Using AI menu entry */
          createProperties = {
            id: "Generate Rule Using AI",
            title: "Generate Rule Using AI",
            contexts: ["all"]
          };
         chrome.contextMenus.create(createProperties);
          /* Create the Set Prod (production) Mode menu entry */
          createProperties = {
            id: "Set Prod Mode",
            title: "Set Prod Mode",
            contexts: ["all"]
          }; 
          chrome.contextMenus.create(createProperties);
          /* Create the Set Test Mode menu entry */
          createProperties = {
            id: "Set Test Mode",
            title: "Set Test Mode",
            contexts: ["all"]
          }; 
          chrome.contextMenus.create(createProperties);
          /* Add the required event listener for clicks. This event runs
             in a background script. */
          chrome.contextMenus.onClicked.addListener(HDLmExtensionBothManageRules.onClickedBack);
          /* Add the required event listener for medssages. This event runs
		         in a background script. */
          chrome.runtime.onMessage.addListener(HDLmExtensionBothManageRules.onMessageBack);
        }
        catch (errorObj) {
          console.log(errorObj);
          createError = true;
        }
      }
    }
  }
}
/* Set a few class specific values to an empty value or a null value */
HDLmExtensionBothManageRules.contentEventTarget = {};
HDLmExtensionBothManageRules.contentModifiedNodes = []
HDLmExtensionBothManageRules.contentOrderElements = [];
HDLmExtensionBothManageRules.contentRuleTreeInfo = null;
/* Run the startup function */
HDLmExtensionBothManageRules.startup();