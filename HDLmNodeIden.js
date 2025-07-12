/**
 * HDLmNodeIden short summary.
 *
 * HDLmNodeIden description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmNodeIden class is not used to create any objects.
   However, it does contain code for creating and handling node
   identifiers. */
class HDLmNodeIden {
  /* This method build a set of node identifier values for a DOM element
     node. This information can be used to find the DOM element node
     later. The information is returned to the caller as a JSON string. */
  static buildNodeIdentifier(currentElement) {
    /* console.log('In HDLmNodeIden.buildNodeIdentifer', currentElement); */
    /* Create an empty object that will contain all of the
       count values for each type of search */
    let counts = HDLmNodeIden.getCounts(currentElement);
    /* console.log('In buildNodeIdentifer', counts); */
    /* Find the key with the lowest count value */
    let minKey = HDLmNodeIden.getLowestCount(counts);
    /* console.log(minKey); */
    /* Get all of the attributes of the current element */
    let currentAttrsObj = HDLmNodeIden.getAttributes(currentElement);
    /* console.log(currentAttrsObj); */
    currentAttrsObj = HDLmNodeIden.updateAttrsFields(currentAttrsObj);
    /* console.log(currentAttrsObj); */
    /* We need to find the best class in some cases. The best class is
       the class with the fewest matching nodes. Note that this call
       also sets the best class. */
    currentAttrsObj = HDLmNodeIden.findBestClass(currentAttrsObj); 
    /* console.log(currentAttrsObj); */
    /* Try to get the HTML attributes of the parent HTML element. Of course,
       we may not have a parent HTML element. */
    let parentAttrsObj = {};
    let parentElement = currentElement.parentElement;
    if (parentElement != null) {
      parentAttrsObj = HDLmNodeIden.getAttributes(parentElement);
      parentAttrsObj = HDLmNodeIden.updateAttrsFields(parentAttrsObj);
    }
    /* Try to get the HTML attributes of the grant parent HTML element. Of course,
       we may not have a grand parent HTML element. Indeed we may not even have a
       parent element. */
    let grandElement = null;
    let grandAttrsObj = {};
    if (parentElement != null) {
      grandElement = parentElement.parentElement;
      if (grandElement != null) {
        grandAttrsObj = HDLmNodeIden.getAttributes(grandElement);
        grandAttrsObj = HDLmNodeIden.updateAttrsFields(grandAttrsObj);
      }
    }
    /* Add the tag as an attribute of the current element. The tag is not
       really an attribute of the current element. Howver, we treat the tag
       as an attribute anyway. */
    /* console.log(currentAttrsObj); */
    /* console.log('tag'); */
    /* console.log(currentElement); */
    currentAttrsObj['tag'] = currentElement.tagName.toLowerCase();
    /* Check if the current DOM element has any inner text. If it does,
       save the inner text as an attribute. Of course, inner text is not
       not really an attribute. However, treating inner text as an attribute
       makes the rest of the code much simpler. Note that the inner text (if
       any) is always converted to lower case. This is because the inner text
       has a bad habit of changing case, as the browser window changes size.
       To make the inner text more stable, we always convert it to lower case. */
    let currentIndexOf;
    let currentInnerText = currentElement.innerText;
    if ((typeof currentInnerText) == 'undefined')
      currentInnerText = null;
    if (currentInnerText != null) {
      currentIndexOf = currentInnerText.indexOf('¦');
      if (currentIndexOf >= 0)
        currentInnerText = currentInnerText.substring(0, currentIndexOf);
      currentIndexOf = currentInnerText.indexOf('\n');
      if (currentIndexOf >= 0)
        currentInnerText = currentInnerText.substring(0, currentIndexOf);
      currentInnerText = currentInnerText.toLowerCase().trim();
      let maxNodeIdenTextLength = HDLmDefines.getNumber('HDLMMAXIDENTEXTLEN');
      if (currentInnerText.length > maxNodeIdenTextLength)
        currentInnerText = currentInnerText.substring(0, maxNodeIdenTextLength);
    }
    currentAttrsObj['innertext'] = currentInnerText;
    /* Add the tag as an attribute of the parent element. The tag is not
       really an attribute of the parent element. Howver, we treat the tag
       as an attribute anyway. */
    if (parentElement != null) {
      parentAttrsObj['tag'] = parentElement.tagName.toLowerCase();
      /* Check if the parent DOM element has any inner text. If it does,
         save the inner text as an attribute. Of course, inner text is not
         not really an attribute. However, treating inner text as an attribute
         makes the rest of the code much simpler. Note that the inner text (if
		     any) is always converted to lower case. This is because the inner text
		     has a bad habit of changing case, as the browser window changes size.
         To make the inner text more stable, we always convert it to lower case.*/
      let parentIndexOf;
      let parentInnerText = parentElement.innerText;
      if ((typeof parentInnerText) == 'undefined')
        parentInnerText = null;
      if (parentInnerText != null) {
        parentIndexOf = parentInnerText.indexOf('¦');
        if (parentIndexOf >= 0)
          parentInnerText = parentInnerText.substring(0, parentIndexOf);
        parentIndexOf = parentInnerText.indexOf('\n');
        if (parentIndexOf >= 0)
          parentInnerText = parentInnerText.substring(0, parentIndexOf);
        parentInnerText = parentInnerText.toLowerCase().trim();
        let maxNodeIdenTextLength = HDLmDefines.getNumber('HDLMMAXIDENTEXTLEN');
        if (parentInnerText.length > maxNodeIdenTextLength)
          parentInnerText = parentInnerText.substring(0, maxNodeIdenTextLength);
      }
      parentAttrsObj['innertext'] = parentInnerText;
    }
    /* Add the tag as an attribute of the grand parent element. The tag is not
       really an attribute of the grand parent element. Howver, we treat the tag
       as an attribute anyway. */
    if (grandElement != null) {
      grandAttrsObj['tag'] = grandElement.tagName.toLowerCase();
      /* Check if the grand parent DOM element has any inner text. If it does,
         save the inner text as an attribute. Of course, inner text is not
         not really an attribute. However, treating inner text as an attribute
         makes the rest of the code much simpler. Note that the inner text (if
		     any) is always converted to lower case. This is because the inner text
		     has a bad habit of changing case, as the browser window changes size.
         To make the inner text more stable, we always convert it to lower case.*/
      let grandIndexOf;
      let grandInnerText = grandElement.innerText;
      if ((typeof grandInnerText) == 'undefined')
        grandInnerText = null;
      if (grandInnerText != null) {
        grandIndexOf = grandInnerText.indexOf('¦');
        if (grandIndexOf >= 0)
          grandInnerText = grandInnerText.substring(0, grandIndexOf);
        grandIndexOf = grandInnerText.indexOf('\n');
        if (grandIndexOf >= 0)
          grandInnerText = grandInnerText.substring(0, grandIndexOf);
        grandInnerText = grandInnerText.toLowerCase().trim();
        let maxNodeIdenTextLength = HDLmDefines.getNumber('HDLMMAXIDENTEXTLEN');
        if (grandInnerText.length > maxNodeIdenTextLength)
          grandInnerText = grandInnerText.substring(0, maxNodeIdenTextLength);
      }
      grandAttrsObj['innertext'] = grandInnerText;
    }
    /* Build the final node informaton object */
    let nodeIden = {};
    nodeIden['type'] = minKey;
    nodeIden['attributes'] = currentAttrsObj;
    nodeIden['counts'] = counts;
    if (JSON.stringify(parentAttrsObj) != '{}')
      nodeIden['parent'] = parentAttrsObj;
    if (JSON.stringify(grandAttrsObj) != '{}')
      nodeIden['grandparent'] = grandAttrsObj;
    let jsonStr = JSON.stringify(nodeIden);
    /* console.log(jsonStr); */
    /* console.log(currentAttrsObj); */
    return jsonStr;
  }  
  /* This method checks if a node ID is valid or not. This method 
     returns true if the node ID is valid and false if the node ID
     is not valid. This method does not check if the node ID is 
     unique. Other methods will have to do that. */
  static checkNodeIdValid(nodeIdStr) {
    /* Check the node ID string */ 
    let numCount = HDLmString.numericCount(nodeIdStr);
    if (numCount > 0 || nodeIdStr.length < 3)
      return false;
    return true;       
  }
  /* Find the best class in the current attribute object.
     If a best class is found, set the best class field
     accordingly. */
  static findBestClass(currentAttrsObj) {
    /* console.log('In HDLmNodeIden.findBestClass'); */
    /* console.trace(); */
    /* console.log(currentAttrsObj); */
    /* At this point, we may want to make some changes to JSON object.
       If the JSON uses some class values, then they need to be removed. */
    if (currentAttrsObj.hasOwnProperty('class') == false)
      return currentAttrsObj;
    let classSplit = currentAttrsObj.class;
    /* console.log(classSplit); */
    let classSplitLen = classSplit.length;
    let maxValue = Number.POSITIVE_INFINITY;
    /* Search the class list (list of classes) looking for
       the class with the lowest count (of number of nodes)
       that have that class */
    let bestClass = null;
    for (let i = 0; i < classSplitLen; i++) {
      let classCurrent = classSplit[i];
      let nodeList = document.getElementsByClassName(classCurrent);
      let nodeListCount = nodeList.length;
      /* Check if the current node list count is lower than the 
         current lowest value. If that is true, we have a new 
         lowest value. */
      if (nodeListCount < maxValue) {
        maxValue = nodeListCount
        bestClass = classCurrent;
      }
    }
    /* Check if we found the best class */
    if (bestClass != null)
      currentAttrsObj['bestclass'] = bestClass;
    return currentAttrsObj;
  }
  /* This JavaScript function tries to find a set of HTML elements
     (DOM elements) that match the node identifier passed by the
     caller. The DOM is always searched using one of the built-in
     DOM functions.

     A copy of this code is use to find DOM elements that may need to
     be changed in the inserted JavaScript program. The code in the
     copy is a slightly modified version of this code. */
  static findNodeIden(nodeIdenObj, nodeIdenTracing) {
    /* console.log('In HDLmNodeIden.findNodeIden', nodeIdenObj, nodeIdenTracing); */
    let nodeElement;
    let nodeElements = [];
    let nodeIden = nodeIdenObj;
    let nodeList = [];
    let nodeAttributes = nodeIden.attributes;
    let nodeCounts = nodeIden.counts;
    let nodeType = nodeIden.type;
    /* nodeIdenTracing = HDLmNodeIdenTracing.all; */
    /* We need to use a different function depending on the type
       of the node identifier */
    switch (nodeType) {
      /* We may be searching by tag name. This might work in some
         cases. */
      case 'tag': {
        let nodeTag = nodeAttributes.tag;
        nodeElements = document.getElementsByTagName(nodeTag);
        break;
      }
      /* We may be searching by id. This will only work if the id
         values are permanent, rather than generated. Generated id
         values change each time a web page is loaded. As a consequence,
         they can not be used. */
      case 'id': {
        let nodeId = nodeAttributes.id;
        nodeElement = document.getElementById(nodeId);
        if (nodeElement != null)
          nodeElements = [nodeElement];
        else
          nodeElements = []
        break;
      }
      /* We may be searching by class name. Class names tend to be
         relatively permanent and hence are a good thing to search
         for. Of course, an HTML DOM node can have more than one
         class name. The first class name is used unless the best
         class name is specified. */
      case 'class': {
        let nodeClass;
        if (nodeAttributes.hasOwnProperty('bestclass'))
          nodeClass = nodeAttributes.bestclass;
        else {
        let nodeClassList = nodeAttributes.class;
          nodeClass = nodeClassList[0];
        }
        nodeElements = document.getElementsByClassName(nodeClass);
        /* console.log(nodeClass); */
        /* console.log(nodeElements); */
        /* console.log(nodeElements); */
        break;
      }
      /* We may be searching by name. This will work in some cases. */
      case 'name': {
        let nodeName = nodeAttributes.name;
        nodeElements = document.getElementsByName(nodeName);
        break;
      }
      default: {
        let errorText = 'Invalid node identifier type value - ' + nodeType;
        HDLmError.buildError('Error', 'NodeIden', 40, errorText);
        break;
      }
    }
    /* Save the number of node elements found in a local variable. This variable
       is used in several places below. */
    let nodeElementsLength = nodeElements.length;
    /* Check if node identifier tracing is active or not. Trace the
       number of nodes, if need be. */
    if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
      let errorText = `Node identifier - get for (${nodeType}) returned (${nodeElementsLength}) nodes`;
      HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
    }
    /* Check for a very special case. If the original node identifier collection
       found just one DOM HTML element for the current type and if current document
       search also found just one DOM HTML element for the current type, then we
       are done. We don't need to check any attributes. */
    if (nodeCounts[nodeType] == 1 && nodeElementsLength == 1)
      return nodeElements;
    /* At this point we have a set of HTML node elements. Some of them
       may really match the node identifier criteria. Others may not. */
    nodeList = HDLmNodeIden.findNodeIdenCheck(nodeElements,
                                              nodeIden,
                                              nodeIdenTracing);
    return nodeList;
  }
  /* This routine takes a list of HTML node elements and checks each one.
     If an HTML node matches the current attributes (well enough), it is
     added to the output list of HTML nodes that is returned to the caller. */
  static findNodeIdenCheck(nodeElements, nodeIden, nodeIdenTracing) {
    /* console.log('In HDLmNodeIden.findNodeIdenCheck'); */
    /* console.log(nodeElements); */
    /* console.log(nodeIden); */
    /* console.log(nodeIdenTracing); */
    let nodeList = [];
    for (let currentElement of nodeElements) {
      let nodeCurrentIdenAttributes = nodeIden.attributes;
      let currentMatchValue = HDLmNodeIden.findNodeIdenMatch(currentElement,
                                                             nodeCurrentIdenAttributes,
                                                             nodeIdenTracing);
      /* Check if node identifier tracing is active or not. Trace the
         match value, if need be. */
      if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
        let errorText = `Node identifier - current match value (${currentMatchValue}) for element (${currentElement})`;
        HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
      }
      if (currentMatchValue < 0.95)
        continue;
      /* We now need to check the attributes of the parent of the current
         HTML DOM element, if possible */
      let parentElement = currentElement.parentElement;
      if (parentElement != null) {
        let nodeParentAttributes = nodeIden.parent;
        /* console.log(nodeIden.parent); */
        let parentMatchValue = HDLmNodeIden.findNodeIdenMatch(parentElement,
                                                              nodeParentAttributes,
                                                              nodeIdenTracing);
        /* Check if node identifier tracing is active or not. Trace the
           match value, if need be. */
        if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
          let errorText = `Node identifier - parent match value (${parentMatchValue}) for element (${parentElement})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
        }
        if (parentMatchValue < 0.95)
          continue;
      }
      /* We now need to check the attributes of the grand parent of the current
         HTML DOM element, if possible */
      let grandElement = null;
      if (parentElement != null)
        grandElement = parentElement.parentElement;
      if (grandElement != null) {
        let nodeGrandAttributes = nodeIden.grandparent;
        let grandMatchValue = HDLmNodeIden.findNodeIdenMatch(grandElement,
                                                             nodeGrandAttributes,
                                                             nodeIdenTracing);
        /* Check if node identifier tracing is active or not. Trace the
           match value, if need be. */
        if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
          let errorText = `Node identifier - grand parent match value (${grandMatchValue}) for element (${grandElement})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
        }
        if (grandMatchValue < 0.95)
          continue;
      }
      nodeList.push(currentElement);
    }
    return nodeList;
  }
  /* This routine takes one HTML node element and checks how well it matches
     a set of attributes. The final match score is returned to the caller.
     The final match score is a floating-point value in the range of 0.0
     to 1.0. The HTML DOM element (node element) and the expected node
     attributes are passed by the caller. */
  static findNodeIdenMatch(nodeElement, nodeIdenAttributes, nodeIdenTracing) {
    /* console.log('In HDLmNodeIden.findNodeIdenMatch'); */
    /* console.log(nodeElement); */
    /* console.log(nodeIdenAttributes); */
    /* console.log(nodeIdenTracing); */
    let denominator = 0.0;
    let nodeActualValue;
    let nodeIdenAttributeTagUpper = nodeIdenAttributes.tag.toUpperCase();
    let numerator = 0.0;
    let numeratorIncrementValue;
    /* Check for a quick exit. If the tag name doesn't match, then
       we are done. We insist that the tag name match immediately
       and exactly. */
    if (nodeElement.tagName != nodeIdenAttributeTagUpper)
      return 0.0;
    /* Check all of the attributes passed by the caller. Get the
       set of keys for each of the attributes. The keys are used
       to obtain the expected and actual value of each attribute. */
    let nodeIdenAttributeKeys = Object.keys(nodeIdenAttributes);
    for (let nodeIdenAttributeKey of nodeIdenAttributeKeys) {
      /* console.log(nodeIdenAttributeKey); */
      /* We need to check for a very special case here. The key
         value might be 'bestclass' (without the quotes). This 
         is not a real key. We just skip this value. */
      if (nodeIdenAttributeKey == 'bestclass')
        continue;
      numeratorIncrementValue = 0.0;
      /* Always bump the denominator. This is done for all
         attributes including those that don't match. */
      denominator++;
      /* Get the current node attributes expected value from the node
         attributes passed by the caller. Note that these are the
         expected values. For most attributes this is a string. For
         class attributes, this is an array of class names. */
      let nodeIdenAttributeValue = nodeIdenAttributes[nodeIdenAttributeKey];
      /* Check if the attribute we want is the tag. The tag is not really
         an attribute. Special case code is needed to handle the tag.
         A special call is needed to get the actual tag name of the
         DOM element. This call will always return the tag name in
         uppercase. As a consequence, the expected value must also be
         changed to uppercase. */
      if (nodeIdenAttributeKey == 'tag') {
        nodeActualValue = nodeElement.tagName;
        nodeIdenAttributeValue = nodeIdenAttributeValue.toUpperCase();
        /* Check if node identifier tracing is active or not. Trace the
           attribute values, if need be. */
        if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
          let errorText;
          let traceValue = 0.0;
          if (nodeActualValue != null &&
            nodeIdenAttributeValue == nodeActualValue)
            traceValue = 1.0;
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) actual (${nodeActualValue}) expected (${nodeIdenAttributeValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) comparison value (${traceValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
        }
        /* If we don't have a value that we can compare, then we are done */
        if (nodeActualValue == null)
          continue;
        /* Compare the expected value and the actual value. If they are the
           same, then we can increment the numerator. */
        if (nodeIdenAttributeValue == nodeActualValue)
          numeratorIncrementValue = 1.0;
      }
      /* Check if the attribute we want is the class. The class in the
         DOM element is always just one string. However, the DOM class
         string can have several class names in it. The code below
         extracts the first actual (DOM) class name and the first
         expected class name. */
      else if (nodeIdenAttributeKey == 'class') {
        let nodeActualValueString = nodeElement.getAttribute('class');
        /* console.log('In findNodeIdenMatch', nodeActualValueString); */
        if (false && nodeActualValueString != null) {
            nodeActualValueString = HDLmNodeIden.removeClassStrings(nodeActualValueString);   
          /* console.log('In findNodeIdenMatch', nodeActualValueString); */
          if (nodeActualValueString == '')
            nodeActualValueString = null;
        }
        /* console.log('In findNodeIdenMatch', nodeActualValueString); */
        if (nodeActualValueString != null) {
          let nodeActualValueSplit = nodeActualValueString.split(' ');
          nodeActualValue = nodeActualValueSplit[0];
        }
        else
          nodeActualValue = null;
        /* Check if node identifier tracing is active or not. Trace the
           attribute values, if need be. */
        if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
          let errorText;
          let traceValue = 0.0;
          if (nodeActualValue != null &&
            nodeIdenAttributeValue.includes(nodeActualValue))
            traceValue = 1.0;
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) actual (${nodeActualValue}) expected (${nodeIdenAttributeValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) comparison value (${traceValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
        }
        /* If we don't have a value that we can compare, then we are done */
        if (nodeActualValue == null)
          continue;
        /* Check if the actual value (the first actual class value) is one of
           the expected class values. If this is true, then we can increment
           the numerator. */
        if (nodeIdenAttributeValue.includes(nodeActualValue))
          numeratorIncrementValue = 1.0;
      }
      /* Check if the attribute we want is the inner text. The inner
         text is not really an attribute. Special case code is needed
         to handle the inner text. A special call is needed to get the
         actual inner text (if any) for a DOM element. Note that the
         inner text (if any) is always converted to lower case. This
         is because the inner text has a bad habit of changing case,
         as the browser window changes size. To make the inner text
         more stable, we always convert it to lower case.*/
      else if (nodeIdenAttributeKey == 'innertext') {
        let nodeIndexOf;
        let nodeInnerText = nodeElement.innerText;
        if ((typeof nodeInnerText) == 'undefined')
          nodeInnerText = null;
        if (nodeInnerText != null) {
          nodeIndexOf = nodeInnerText.indexOf('¦');
          if (nodeIndexOf >= 0)
            nodeInnerText = nodeInnerText.substring(0, nodeIndexOf);
          nodeIndexOf = nodeInnerText.indexOf('\n');
          if (nodeIndexOf >= 0)
            nodeInnerText = nodeInnerText.substring(0, nodeIndexOf);
          nodeInnerText = nodeInnerText.toLowerCase().trim();
          let maxNodeIdenTextLength = HDLmDefines.getNumber('HDLMMAXIDENTEXTLEN');
          if (nodeInnerText.length > maxNodeIdenTextLength)
            nodeInnerText = nodeInnerText.substring(0, maxNodeIdenTextLength);
        }
        nodeActualValue = nodeInnerText;
        /* Check if node identifier tracing is active or not. Trace the
           attribute values, if need be. */
        if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
          let errorText;
          let traceValue = 0.0;
          if (nodeActualValue != null &&
            HDLmString.compareCaseInsensitive(nodeIdenAttributeValue,
                                              nodeActualValue))
            traceValue = 1.0;
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) actual (${nodeActualValue}) expected (${nodeIdenAttributeValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) comparison value (${traceValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
        }
        /* If we don't have a value that we can compare, then we are done */
        if (nodeActualValue == null)
          continue;
        /* Compare the expected value and the actual value. If they are the
           same, then we can increment the numerator. */
        if (HDLmString.compareCaseInsensitive(nodeIdenAttributeValue,
                                              nodeActualValue))
          numeratorIncrementValue = 1.0;
      }
      /* For all other attributes, we can just extract the actual
         attribute value from the DOM element */
      else {
        nodeActualValue = nodeElement.getAttribute(nodeIdenAttributeKey);
        /* console.log(nodeElement); */
        /* console.log(nodeIdenAttributeKey, nodeActualValue); */
        /* Check if the attribute we want is href. Special case code
           is needed for handling href. Basically, we need to remove
           the protocol and host before we do any matching on href.
           This was done in building the node identifier. */
        if (nodeIdenAttributeKey == 'href') {
          /* Somewhat weirdly we get a null value for href if the
             href value is something like '#1.'. Of course, we need
             to be able to handle this (very strange) case. */
          if (nodeActualValue != null     &&
              nodeActualValue.length >= 7 &&
              nodeActualValue.startsWith('mailto:'))
            nodeActualValue = nodeActualValue;
          else if (nodeActualValue != null     &&
                   nodeActualValue.length >= 4 &&
                   nodeActualValue.startsWith('tel:'))
            nodeActualValue = nodeActualValue;
          else {
            if (nodeActualValue != null)
              nodeActualValue = HDLmUtility.removeHost(nodeActualValue);
          }
        }
        /* Check if node identifier tracing is active or not. Trace the
           attribute values, if need be. */
        if (nodeIdenTracing == HDLmNodeIdenTracing.all) {
          let errorText;
          let traceValue = 0.0;
          if (nodeActualValue != null &&
            nodeIdenAttributeValue == nodeActualValue)
            traceValue = 1.0;
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) actual (${nodeActualValue}) expected (${nodeIdenAttributeValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
          errorText = `Node identifier - key (${nodeIdenAttributeKey}) comparison value (${traceValue})`;
          HDLmError.buildError('Trace', 'NodeIden', 41, errorText);
        }
        /* If we don't have a value that we can compare, then we are done */
        if (nodeActualValue == null)
          continue;
        /* Compare the expected value and the actual value. If they are the
           same, then we can increment the numerator. */
        if (nodeIdenAttributeValue == nodeActualValue)
          numeratorIncrementValue = 1.0;
      }
      /* Possibly increment the numerator */
      numerator += numeratorIncrementValue;
    }
    return numerator / denominator;
  }
  /* Get the attribute values for the DOM element passed by the caller.
     This routine returns an object with a property for each DOM element
     attribute. The property name is the attribute name. The property
     value is the attribute value. */
  static getAttributes(element) {
    let attrsObj = {};
    let elementAttrs = element.attributes;
    let elementAttrsLength = elementAttrs.length;
    for (let i = 0; i < elementAttrsLength; i++) {
      /* Get the name and value of the current attribute */
      let attrsObjName = elementAttrs[i].name;
      let attrsObjValue = elementAttrs[i].value;
      /* Check if the attribute name starts with a special string. These
         attriutes are created by our code and we definitely don't want
         to check them. These attributes must be bypassed and not treated
         as normal attributes. */
      if (attrsObjName.startsWith('hdlmupdated'))
        continue;
      /* We need some very special case code for the class attribute. The
         class attribute in actually a simple string. However, we don't
         want to treat the class attribute as a simple string. We want
         to create an array with each of the class values in it. */
      if (attrsObjName == 'class') {
        let attrsObjValueSplit = attrsObjValue.split(' ');
        let attrsObjValueSplitLength = attrsObjValueSplit.length;
        let attrsObjValueList = []
        for (let i = 0; i < attrsObjValueSplitLength; i++) {
          /* Add the current class value to the class value array.
             However, we don't want to add zero-length class values
             to the class value array. Check the length of the current
             class value and skip it, if it is a zero-length class
             value. */
          let attrsObjValueSplitValue = attrsObjValueSplit[i];
          /* We need to check the current class value to see if it
             ends with a newline character. If we find a newline
             character at the end of the current class value, then
             we need to remove it. */
          if (attrsObjValueSplitValue.endsWith('\n')) {
            let attrsObjValueSplitValueLen = attrsObjValueSplitValue.length;
            attrsObjValueSplitValue = attrsObjValueSplitValue.substr(0, attrsObjValueSplitValueLen - 1);
          }
          /* Check if the remaining length is greater than zero */
          if (attrsObjValueSplitValue.length > 0)
            attrsObjValueList.push(attrsObjValueSplitValue);
        }
        attrsObjValue = attrsObjValueList;
      }
      /* We need to use some special case code for href attributes. The
         problem is that we always want to use relative names, not href
         values that have a host name in them. */
      if (attrsObjName == 'href') {
        if (attrsObjValue.length >= 7 &&
            attrsObjValue.startsWith('mailto:'))
          attrsObjValue = attrsObjValue;
        else if (attrsObjValue.length >= 4 &&
                 attrsObjValue.startsWith('tel:'))
          attrsObjValue = attrsObjValue;
        else
          attrsObjValue = HDLmUtility.removeHost(attrsObjValue);
      }
      /* Generally we use all attributes. However, some attributes are just
         too dangerous to use. For example, an id (note, lower case) attribute 
         with a generated numeber value that was probably generated. It will 
         change each time it is used. We should not use it as a consequence. */
      if (attrsObjName == 'id') {
        if (HDLmNodeIden.checkNodeIdValid(attrsObjValue) == false)
          continue;
      }
      attrsObj[attrsObjName] = attrsObjValue;
    }
    return attrsObj;
  }  
  /* Get the count values for the current element. This is the number of
     times the tag, id, class, and name occur in the current DOM. Of course,
     special case code is used to handle (ignore) generated id (note, lower 
     case) values. The current element may have more than one class or it
     may have zero classes or it may have just one class. The best (lowest 
     number of matches) class is used. */
  static getCounts(element) {
    /* Create an empty object that will contain all of the
       count values for each type of search */
    let counts = {};
    /* Get the count of DOM elements with the current tag name */
    /* console.log('In HDLmNodeIden.getCounts', element); */
    let elementTag = element.tagName;
    let nodeList = document.getElementsByTagName(elementTag);
    let nodeListCount = nodeList.length;
    counts['tag'] = nodeListCount;
    /* Get the count of DOM elements with the current element id (note, lower 
       case) value. Of course, this number should always be one. Id values are 
       supposed to be unique. In real life, they aren't always unique (because 
       of bugs). This assumes that the current DOM element has an id value (not
       always true) and that the id value can be used. If the id value
       has any numeric characters, then we will not use it. */
    let elementId = element.id;
    if (elementId != null) {
      if (HDLmNodeIden.checkNodeIdValid(elementId) == true) {
        counts['id'] = 1;
      }
    }
    /* Get the count of DOM elements with the current class value. In
       real life, class values can actually contain multiple class
       values. We check all of the class values at this point. */
    let elementClassString = element.getAttribute('class');
    /* Remove any leading and/or trailing blanks from the class string.
       This is done to get rid of all-blank class strings. */ 
    if (elementClassString != null &&
        elementClassString != '')         
      elementClassString = elementClassString.trim();
    /* console.log('In getCounts', elementClassString); */
    if (elementClassString != null) {
      elementClassString = HDLmNodeIden.removeClassStrings(elementClassString);   
      /* console.log('In getCounts', elementClassString); */
      if (elementClassString == '')
        elementClassString = null;
    }
    /* console.log('In getCounts', elementClassString); */
    if (elementClassString != null) {
      let elementClassSplit = elementClassString.split(' ');
      let elementClassSplitLen = elementClassSplit.length;
      /* console.log('In getCounts', elementClassSplitLen, 'x' + elementClassString + 'x'); */
      let maxValue = Number.POSITIVE_INFINITY;
      /* Search the class list (list of classes) looking for
         the class with the lowest count (of number of nodes)
         that have that class */
      for (let i = 0; i < elementClassSplitLen; i++) {
        let elementClassCurrent = elementClassSplit[i];
        nodeList = document.getElementsByClassName(elementClassCurrent);
        nodeListCount = nodeList.length;
        /* Check if the current node list count is lower than the 
           current lowest value. If that is true, we have a new 
           lowest value. */
        if (nodeListCount < maxValue) {
          maxValue = nodeListCount;
          /* console.log('In getCounts', maxValue, elementClassCurrent, nodeListCount); */
        }
      }
      counts['class'] = maxValue;
    }
    /* Get the count of DOM elements with the current name value. In
       real life, not all DOM elements have a name. */
    let elementName = element.getAttribute('name');
    if (elementName != null) {
      nodeList = document.getElementsByName(elementName);
      nodeListCount = nodeList.length;
      counts['name'] = nodeListCount;
    }
    return counts;
  }
  /* The next routine finds the object property with the lowest value
     and returns the property to the caller. In practice, this routine
     finds the most specific type of search and returns it to the caller. */
  static getLowestCount(counts) {
    let keys = Object.keys(counts);
    let maxValue = Number.POSITIVE_INFINITY;
    let minKey;
    for (let key of keys) {
      /* Check if the count value is less than one. We don't want to
         use any count value that is less than one (for example zero). */
      if (counts[key] < 1.0)
        continue;
      if (counts[key] < maxValue) {
        minKey = key;
        maxValue = counts[key];
      }
    }
    return minKey;
  }
  /* This routine gets and checks the node identifier for a specific DOM element.
     Note that if the node identifier is not unique (matches more then one DOM
     element) or does not match any DOM elements, then this routine will return
     a null value. */
  static getNodeIdentifier(currentElement) {
    /* console.log('In getNodeIdentifier', currentElement); */
    /* Get some JSON for the current element */
    let jsonStr = HDLmNodeIden.buildNodeIdentifier(currentElement);
    /* console.log('In getNodeIdentifier', jsonStr); */
    /* Check if the new node identifier uniquely identifies just one
       DOM element, or many DOM elements. Report an error if the node
       identifier is not unambiguous. */
    let matchCount = HDLmNodeIden.testNodeIdenInformation(jsonStr);
    /* console.log(jsonStr); */
    /* console.log(matchCount); */
    if (matchCount != 1) {
      jsonStr = null;
    }
    /* console.log('In getNodeIdentifier', jsonStr); */
    /* console.log('In getNodeIdentifier', matchCount); */
    return jsonStr;
  }   
  /* This method removes a set of fixed class strings from a 
     string passed to it */
  static removeClassStrings(haystack) {
    haystack = HDLmNodeIden.removePaddedString(haystack,
                                               'HDLmClassPrimary');
    haystack = HDLmNodeIden.removePaddedString(haystack,
                                               'HDLmClassBackground');

    return haystack;
  }
  /* This method removes all traces of one string from another. One
     leading or trailing blank is removed as need be. The return value
     is the modified string. */
  static removePaddedString(haystack, needle) {
    /* console.log('In removeString', haystack, needle); */
    haystack = haystack.replace(' ' + needle, '');
    /* console.log('In removeString', haystack); */
    haystack = haystack.replace(needle + ' ', '');
    /* console.log('In removeString', haystack); */
    haystack = haystack.replace(needle, '');
    /* console.log('In removeString', haystack); */
    return haystack;
  }
  /* This method tests a set of node identifier values against the current DOM.
     The number of matches is returned to the caller. If the match count is greater
     than one, the current set of node identifier information is ambiguous. */
  static testNodeIdenInformation(nodeIdenStr) {
    /* console.log('In HDLmNodeIden.testNodeIdenInformation', nodeIdenStr); */
    /* Convert the JSON node identifier string to a JavaScript object */
    let nodeIdenObj = JSON.parse(nodeIdenStr);
    /* Get the list of matching nodes */
    let nodeTracingFalse = false; 
    let matchList = HDLmNodeIden.findNodeIden(nodeIdenObj, nodeTracingFalse);
    return matchList.length;
  }
  /* Update a set of fields in the current object. The goal is too 
     update/remove fields that only have internal values. These 
     values are not needed/cause problems later. */
  static updateAttrsFields(elementObjAttrs) {
    /* console.log('In HDLmNodeIden.updateAttrsFields'); */
    /* console.log(elementObjAttrs); */
    elementObjAttrs = HDLmNodeIden.updateClassField(elementObjAttrs);
    /* console.log(elementObjAttrs); */
    elementObjAttrs = HDLmNodeIden.updateStyleField(elementObjAttrs);
    /* console.log(elementObjAttrs); */
    elementObjAttrs = HDLmNodeIden.updateInternalAttrs(elementObjAttrs);
    /* console.log(elementObjAttrs); */
    return elementObjAttrs;
  }
  /* Update the class field (probably a DOM element) by removing certain
     internal classes. In some cases (many cases) there will be nothing 
     left. The class field is deleted in this case. */
  static updateClassField(elementObjAttrs) {
    /* console.log('In HDLmNodeIden.updateClassField'); */
    /* console.trace(); */
    /* console.log(elementObjAttrs); */
    /* At this point, we may want to make some changes to JSON object.
       If the JSON uses some class values, then they need to be removed. */
    if (elementObjAttrs.hasOwnProperty('class')) {
      let classValue = elementObjAttrs.class;
      /* console.log(classValue); */
      /* In some cases, for some unknown reason, the class value
         may not be an array at this point. We need to fix this
         and make sure we have an array to process below. */
      if (Array.isArray(classValue) == false) {
        let classValueArray = [];
        classValueArray.push(classValue);
        classValue = classValueArray;
      }
      /* console.log(classValue); */
      /* Try to remove the first internal class */
      let firstIndex = classValue.indexOf('HDLmClassPrimary');
      if (firstIndex >= 0)
        classValue.splice(firstIndex, 1);
      /* Try to remove the second internal class */
      let secondIndex = classValue.indexOf('HDLmClassBackground');
      if (secondIndex >= 0)
        classValue.splice(secondIndex, 1);
      /* console.log(classValue); */
      /* Remove the entire class field, if need be */
      let classValueLen = classValue.length;
      if (classValueLen == 0)
        delete elementObjAttrs.class;
    }
    return elementObjAttrs;
  }
  /* Remove any attributes that were added for internal use. We don't 
     want to keep these attributes in some (many) cases. */
  static updateInternalAttrs(elementObjAttrs) {
    /* console.log('In HDLmNodeIden.removeInternalAttrs'); */
    /* console.log(elementObjAttrs); */
    /* Check all of the attributes */
    let hdlmPrefixLower = HDLmDefines.getString('HDLMPREFIX').toLowerCase();
    for (let curKey in elementObjAttrs) {
      /* console.log(curKey); */
      let curKeyLower = curKey.toLowerCase();
      /* Skip any attributes that were not added by our code */
      if (curKeyLower.startsWith(hdlmPrefixLower) == false)
        continue;
      delete elementObjAttrs[curKey];
    }
    /* console.log(elementObjAttrs); */
    return elementObjAttrs;
  }
  /* Update the style field (probably a DOM element) by removing certain
     internal styles. In some cases (many cases) there will be nothing
     left. The style field is deleted in this case. */
  static updateStyleField(elementObjAttrs) {
    /* console.log('In updateStyleField', elementObjAttrs); */
    /* console.trace(); */
    /* At this point, we may want to make some changes to JSON object.
       If the JSON uses some style values, then they need to be removed. */
    if (elementObjAttrs.hasOwnProperty('style')) {
      let styleValue = elementObjAttrs.style;
      /* console.log(styleValue); */ 
      /* Try to remove the first internal style */  
      let internalBackgroundStr = 'background-color: rgb(';
      internalBackgroundStr += HDLmDefines.getString('HDLMBACKGROUNDCOLORRGB');
      internalBackgroundStr += ');';
      styleValue = styleValue.replace(internalBackgroundStr, '');
      /* console.log(styleValue); */
      /* Remove the entire style field, if need be */
      let styleValueLen = styleValue.length;
      /* console.log(styleValueLen); */
      if (styleValueLen == 0)
        delete elementObjAttrs.style;
    }
    return elementObjAttrs;
  }
}