/**
 * HDLmGEM short summary.
 *
 * This module is used to implement the GUI editor for web pages. GEM
 * stands for GUI Editor Module.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
const HDLmGEMRuleTypesA = ['text', 'textchecked'];
const HDLmGEMRuleTypesImage = ['image'];
const HDLmGEMInfoData =
{
  "a":          { "type": HDLmGEMRuleTypesA, "description": "Defines a hyperlink" },
  "abbr":       { "type": null, "description": "Defines an abbreviation or an acronym" },
  "acronym":    { "type": null, "description": "Not supported in HTML5. Use <abbr> instead. Defines an acronym." },
  "address":    { "type": null, "description": "Defines contact information for the author / owner of a document" },
  "applet":     { "type": null, "description": "Not supported in HTML5. Use <embed> or <object> instead. Defines an embedded applet" },
  "area":       { "type": null, "description": "Defines an area inside an image map" },
  "article":    { "type": null, "description": "Defines an article" },
  "aside":      { "type": null, "description": "Defines content aside from the page content" },
  "audio":      { "type": null, "description": "Defines embedded sound content" },
  "b":          { "type": null, "description": "Defines bold text" },
  "base":       { "type": null, "description": "Specifies the base URL / target for all relative URLs in a document" },
  "basefont":   { "type": null, "description": "Not supported in HTML5 .Use CSS instead. Specifies a default color, size, and font for all text in a document" },
  "bdi":        { "type": null, "description": "Isolates a part of text that might be formatted in a different direction from other text outside it" },
  "bdo":        { "type": null, "description": "Overrides the current text direction" },
  "big":        { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines big text" },
  "blockquote": { "type": null, "description": "Defines a section that is quoted from another source" },
  "body":       { "type": null, "description": "Defines the document's body" },
  "br":         { "type": null, "description": "Defines a single line break" },
  "button":     { "type": null, "description": "Defines a clickable button" },
  "canvas":     { "type": null, "description": "Used to draw graphics, on the fly, via scripting (usually JavaScript)" },
  "caption":    { "type": null, "description": "Defines a table caption" },
  "center":     { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines centered text" },
  "cite":       { "type": null, "description": "Defines the title of a work" },
  "code":       { "type": null, "description": "Defines a piece of computer code" },
  "col":        { "type": null, "description": "Specifies column properties for each column within a <colgroup> element" },
  "colgroup":   { "type": null, "description": "Specifies a group of one or more columns in a table for formatting" },
  "data":       { "type": null, "description": "Adds a machine-readable translation of a given content" },
  "datalist":   { "type": null, "description": "Specifies a list of pre-defined options for input controls" },
  "dd":         { "type": null, "description": "Defines a description/value of a term in a description list" },
  "del":        { "type": null, "description": "Defines text that has been deleted from a document" },
  "details":    { "type": null, "description": "Defines additional details that the user can view or hide" },
  "dfn":        { "type": null, "description": "Specifies a term that is going to be defined within the content" },
  "dialog":     { "type": null, "description": "Defines a dialog box or window" },
  "dir":        { "type": null, "description": "Not supported in HTML5. Use <ul> instead. Defines a directory list" },
  "div":        { "type": null, "description": "Defines a section in a document" },
  "dl":         { "type": null, "description": "Defines a description list" },
  "dt":         { "type": null, "description": "Defines a term/name in a description list" },
  "em":         { "type": null, "description": "Defines emphasized text" },
  "embed":      { "type": null, "description": "Defines a container for an external application" },
  "fieldset":   { "type": null, "description": "Groups related elements in a form" },
  "figcaption": { "type": null, "description": "Defines a caption for a <figure> element" },
  "figure":     { "type": null, "description": "Specifies self-contained content" },
  "font":       { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines font, color, and size for text" },
  "footer":     { "type": null, "description": "Defines a footer for a document or section" },
  "form":       { "type": null, "description": "Defines an HTML form for user input" },
  "frame":      { "type": null, "description": "Not supported in HTML5. Defines a window(a frame) in a frameset" },
  "frameset":   { "type": null, "description": "Not supported in HTML5. Defines a set of frames" },
  "h1":         { "type": HDLmGEMRuleTypesImage, "description": "Defines an HTML heading" },
  "h2":         { "type": HDLmGEMRuleTypesImage, "description": "Defines an HTML heading" },
  "h3":         { "type": HDLmGEMRuleTypesImage, "description": "Defines an HTML heading" },
  "h4":         { "type": HDLmGEMRuleTypesImage, "description": "Defines an HTML heading" },
  "h5":         { "type": HDLmGEMRuleTypesImage, "description": "Defines an HTML heading" },
  "h6":         { "type": HDLmGEMRuleTypesImage, "description": "Defines an HTML heading" },
  "head":       { "type": null, "description": "Contains metadata/information for the document" },
  "header":     { "type": null, "description": "Defines a header for a document or section" },
  "hr":         { "type": null, "description": "Defines a thematic change in the content" },
  "html":       { "type": null, "description": "Defines the root of an HTML document" },
  "i":          { "type": null, "description": "Defines a part of text in an alternate voice or mood" },
  "iframe":     { "type": null, "description": "Defines an inline frame" },
  "img":        { "type": HDLmGEMRuleTypesImage, "description": "Defines an image" },
  "input":      { "type": null, "description": "Defines an input control" },
  "ins":        { "type": null, "description": "Defines a text that has been inserted into a document" },
  "kbd":        { "type": null, "description": "Defines keyboard input" },
  "label":      { "type": null, "description": "Defines a label for an <input> element" },
  "legend":     { "type": null, "description": "Defines a caption for a <fieldset> element" },
  "li":         { "type": null, "description": "Defines a list item" },
  "link":       { "type": null, "description": "Defines the relationship between a document and an external resource (most used to link to style sheets)" },
  "main":       { "type": null, "description": "Specifies the main content of a document" },
  "map":        { "type": null, "description": "Defines an image map" },
  "mark":       { "type": null, "description": "Defines marked/highlighted text" },
  "meta":       { "type": null, "description": "Defines metadata about an HTML document" },
  "meter":      { "type": null, "description": "Defines a scalar measurement within a known range (a gauge)" },
  "nav":        { "type": null, "description": "Defines navigation links" },
  "noframes":   { "type": null, "description": "Not supported in HTML5. Defines an alternate content for users that do not support frames" },
  "noscript":   { "type": null, "description": "Defines an alternate content for users that do not support client-side scripts" },
  "object":     { "type": null, "description": "Defines a container for an external application" },
  "ol":         { "type": null, "description": "Defines an ordered list" },
  "optgroup":   { "type": null, "description": "Defines a group of related options in a drop-down list" },
  "option":     { "type": null, "description": "Defines an option in a drop-down list" },
  "output":     { "type": null, "description": "Defines the result of a calculation" },
  "p":          { "type": null, "description": "Defines a paragraph" },
  "param":      { "type": null, "description": "Defines a parameter for an object" },
  "picture":    { "type": null, "description": "Defines a container for multiple image resources" },
  "pre":        { "type": null, "description": "Defines preformatted text" },
  "progress":   { "type": null, "description": "Represents the progress of a task" },
  "q":          { "type": null, "description": "Defines a short quotation" },
  "rp":         { "type": null, "description": "Defines what to show in browsers that do not support ruby annotations" },
  "rt":         { "type": null, "description": "Defines an explanation/pronunciation of characters (for East Asian typography)" },
  "ruby":       { "type": null, "description": "Defines a ruby annotation (for East Asian typography)" },
  "s":          { "type": null, "description": "Defines text that is no longer correct" },
  "samp":       { "type": null, "description": "Defines sample output from a computer program" },
  "script":     { "type": null, "description": "Defines a client-side script" },
  "section":    { "type": null, "description": "Defines a section in a document" },
  "select":     { "type": null, "description": "Defines a drop-down list" },
  "small":      { "type": null, "description": "Defines smaller text" },
  "source":     { "type": null, "description": "Defines multiple media resources for media elements (<video> and <audio>)" },
  "span":       { "type": null, "description": "Defines a section in a document" },
  "strike":     { "type": null, "description": "Not supported in HTML5. Use <del> or <s> instead. Defines strikethrough text" },
  "strong":     { "type": null, "description": "Defines important text" },
  "style":      { "type": null, "description": "Defines style information for a document" },
  "sub":        { "type": null, "description": "Defines subscripted text" },
  "summary":    { "type": null, "description": "Defines a visible heading for a <details> element" },
  "sup":        { "type": null, "description": "Defines superscripted text" },
  "svg":        { "type": null, "description": "Defines a container for SVG graphics" },
  "table":      { "type": null, "description": "Defines a table" },
  "tbody":      { "type": null, "description": "Groups the body content in a table" },
  "td":         { "type": null, "description": "Defines a cell in a table" },
  "template":   { "type": null, "description": "Defines a container for content that should be hidden when the page loads" },
  "textarea":   { "type": null, "description": "Defines a multiline input control (text area)" },
  "tfoot":      { "type": null, "description": "Groups the footer content in a table" },
  "th":         { "type": null, "description": "Defines a header cell in a table" },
  "thead":      { "type": null, "description": "Groups the header content in a table" },
  "time":       { "type": null, "description": "Defines a specific time (or datetime)" },
  "title":      { "type": null, "description": "Defines a title for the document" },
  "tr":         { "type": null, "description": "Defines a row in a table" },
  "track":      { "type": null, "description": "Defines text tracks for media elements (<video> and <audio>)" },
  "tt":         { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines teletype text" },
  "u":          { "type": null, "description": "Defines some text that is unarticulated and styled differently from normal text" },
  "ul":         { "type": null, "description": "Defines an unordered list" },
  "var":        { "type": null, "description": "Defines a variable" },
  "video":      { "type": null, "description": "Defines embedded video content" },
  "wbr":        { "type": null, "description": "Defines a possible line-break" }
};
class HDLmGEM {
  /* This routine starts the process of building a button list
     (in a div) for all of the choices for a DOM element. */
  static buildButtonArea(currentElement) {
    /* console.log('In buildButtonArea'); */
    let attrName;
    let attrValue;
    let domBodyElement;
    let domDivElement;
    let fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonId';
    /* console.log('In buildButtonArea', fieldIdValue); */
    domDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    /* console.log('In buildButtonArea', domDivElement); */
    domBodyElement = document.getElementsByTagName('body')[0]
    /* console.log('In buildButtonArea', domBodyElement); */
    /* Get the size of the browser window */
    let browserSize = HDLmHtml.getBrowserSize();
    let browserWidth = browserSize.x;
    let browserHeight = browserSize.y;
    /* Get the location of the current element */
    let currentLocation = HDLmHtml.getDomLocationBounding(currentElement);
    let currentX = currentLocation.x + 30;
    let currentY = Math.max(0, currentLocation.y - 30);
    /* Adjust the current location, if need be */
    currentLocation = HDLmGEM.getWindowLocation(browserWidth, browserHeight,
      currentX, currentY,
      30, 30);
    currentX = currentLocation.x;
    currentY = currentLocation.y;
    /* console.log('In buildButtonArea', currentX, currentY); */
    /* Clear the GUI element, if it already exists */
    if (domDivElement != null) {
      HDLmHtml.removeDomChildren(domDivElement);
    }
    /* Since the button DOM element does not exist, we must create it */
    else {
      domDivElement = HDLmHtml.createDomElement('div');
      domDivElement.addEventListener('keydown', HDLmGEM.buttonKeydown);
      HDLmHtml.setDomAttribute(domDivElement, 'id', fieldIdValue);
      HDLmHtml.setDomAttribute(domDivElement, 'contenteditable', 'true');
      attrName = 'style';
      attrValue = 'position:absolute;';
      HDLmHtml.setDomAttribute(domDivElement, attrName, attrValue);
      HDLmHtml.setDomStyle(domDivElement, 'left', String(currentX) + 'px');
      HDLmHtml.setDomStyle(domDivElement, 'top', String(currentY) + 'px');
      HDLmHtml.setDomStyle(domDivElement, 'background-color', 'white');
      HDLmHtml.setDomStyle(domDivElement, 'border', '1px solid black');
      HDLmHtml.setDomStyle(domDivElement, 'padding', '5px');
      HDLmHtml.setDomStyle(domDivElement, 'z-index', 10);
      domBodyElement.appendChild(domDivElement);
    }
  }
  /* This routine builds that actual list of buttons in the button
     area. This routine constructs the button list based on the
     values passed to it. */
  static buildButtonList(hostName, pathValue, nodeIdenStr, fullRuleNameStr, tagStr) {
    /* console.log('In HDLmGEM.buildButtonList'); */
    /* console.log(pathValue); */
    /* console.log(nodeIdenStr); */
    /* console.log(fullRuleNameStr); */
    /* console.log(tagStr); */
    let fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonId';
    /* console.log('In buildButtonList', fieldIdValue); */
    let domDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    if (domDivElement == null)
      HDLmAssert(false, 'Div element for button list is null');
    /* Create all of the buttons that are part of the HTML element. The
       tag type is forced to a specific value, at least for now. */
    let tagTypesList = HDLmGEM.getTypeFromTag(tagStr);
    /* console.log('In buildButtonList', tagStr, tagTypesList); */
    if (tagTypesList == null)
      HDLmAssert(false, 'Tag string did not match any known DOM types');
    /* The buttons created below are added to a JavaScript map */
    let buttonMap = new Map();
    for (let ruleType of tagTypesList) {
      /* Check if we can find a rule for the current full Name,
         path value, modification name, and rule type */
      let ruleTreeInfo = HDLmGEM.findRule(fullRuleNameStr, ruleType, pathValue);
      /* console.log('In buildButtonList', ruleTreeInfo, fullRuleNameStr, ruleType, pathValue); */
      /* Create a special value that shows what the button is for. This
         special value is obtained later when the button is clicked. */
      let specialValue = '';
      if (fullRuleNameStr != null)
        specialValue += "'" + fullRuleNameStr + "' ";
      else
        specialValue += "'" + hostName + "' ";
      specialValue += "'" + pathValue + "' ";
      specialValue += "'" + nodeIdenStr + "' ";
      specialValue += "'" + ruleType + "' ";
      /* console.log('In buildButtonList', specialValue); */
      /* Check what type of operation is requested. Note that delete is treated
         as part of modify. */
      let buttonLabel;
      let newButton;
      if (ruleTreeInfo == null) {
        buttonLabel = 'Create ' + ruleType;
        /* console.log(buttonLabel); */
        newButton = HDLmGEM.createButton(specialValue + "'Create'", buttonLabel);
        /* console.log(buttonLabel); */
        buttonMap.set(buttonLabel, newButton);
        /* console.log(buttonMap); */
      }
      else {
        buttonLabel = 'Delete ' + ruleType;
        newButton = HDLmGEM.createButton(specialValue + "'Delete'", buttonLabel);
        buttonMap.set(buttonLabel, newButton);
        buttonLabel = 'Modify ' + ruleType;
        newButton = HDLmGEM.createButton(specialValue + "'Modify'", buttonLabel);
        buttonMap.set(buttonLabel, newButton);
      }
    }
    /* Create a new map where all of the entries are in ascending key order */
    /* console.log(buttonMap); */
    buttonMap = new Map([...buttonMap].sort((a, b) => String(a[0]).localeCompare(b[0])));
    /* console.log(buttonMap); */
    /* Add each button to the div */
    for (let buttonValue of buttonMap.values()) {
      /* console.log(buttonValue); */
      domDivElement.appendChild(buttonValue);
    }
  }
  /* This routine builds a CSS style element with a set of styles
     that are used later. This routine must be called at least
     once, but can be called many times, if will do nothing if
     the required CSS styles have already been created. */
  static buildCSSRules() {
    let cssClass;
    let cssPrefix = HDLmDefines.getString('HDLMGEMPREFIX');
    let cssText;
    let domCssElement;
    let fieldIdValue;
    let styleSheet;
    /* Try to find the CSS style element. This may or may not work. */
    fieldIdValue = cssPrefix + 'CssId';
    domCssElement = HDLmHtml.getDomElementById(fieldIdValue);
    /* Create the CSS style element, if need be */
    if (domCssElement == null) {
      /* Create the style DOM element and add it to the head part
         of the HTML page */
      domCssElement = HDLmHtml.createDomElement('style');
      HDLmHtml.setDomAttribute(domCssElement, 'id', fieldIdValue);
      document.head.appendChild(domCssElement);
      /* Get the style sheet for the current CSS style */
      styleSheet = domCssElement.sheet;
      cssClass = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonClass';
      cssText = '.' + cssClass + ' ' + '{background-color: white}';
      styleSheet.insertRule(cssText);
      cssText = '.' + cssClass + ':hover' + ' ' + '{background-color: red}';
      styleSheet.insertRule(cssText);
      cssText = 'input:valid' + ' ' + '{}';
      styleSheet.insertRule(cssText);
      cssText = 'input:invalid' + ' ' + '{border: 2px solid red;}';
      styleSheet.insertRule(cssText);
      cssText = '.leftDef' + ' ' + '{float: left; height: 100%; width: 0%;}';
      styleSheet.insertRule(cssText);
      cssText = '.rightDef' + ' ' + '{float: right; height: 100%; width: 100%;}';
      styleSheet.insertRule(cssText);
      cssText = '.rightPage' + ' ' + '{background-color: #ffffff; height: 100%; overflow-x: hidden; padding: 10px; position: absolute; right:0; top:0; width: 75%; z-index: 11;}';
      /*
      styleSheet.insertRule(cssText);
      cssText = '.' + cssPrefix + 'Container' + '{position: relative; display: block;}';
      styleSheet.insertRule(cssText);
      cssText = '.' + cssPrefix + 'Cover' + '{width: 100%;height: 100%;background: transparent;position: absolute;z-index: 2;display: none;}';
      styleSheet.insertRule(cssText);
      cssText = '.' + cssPrefix + 'Container' + ' ' + '.' + cssPrefix + 'Cover' + '{position: relative; display: block;}';
      styleSheet.insertRule(cssText);
      */
    }
  }
  /* This routine starts the process of building a rule area */
  static buildRuleArea() {
    /* console.log('In buildRuleArea'); */
    let attrName;
    let attrValue;
    let fieldIdValue;
    /* Get the element for the HTML page body */
    let domBodyElement = document.getElementsByTagName('body')[0];
    /* We need to start by finding the div used for the buttons.
       The div for the rule will be located relative to the div
       used for the buttons. */
    fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonId';
    let domButtonDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    if (domButtonDivElement == null)
      HDLmAssert(false, 'Button div not found');
    let domButtonRect = HDLmHtml.getDomLocationBounding(domButtonDivElement);
    if (domButtonRect == null)
      HDLmAssert(false, 'Button div rectangle not obtained');
    let xLocation = domButtonRect['x'];
    let yLocation = domButtonRect['y'];
    xLocation += 30;
    yLocation -= 30;
    yLocation = Math.max(0, yLocation);
    /* Try to locate the div for the rule */
    fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'RuleId';
    /* console.log('In buildRuleArea', fieldIdValue); */
    let domRuleDivElement;
    domRuleDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    /* console.log('In buildRuleArea', domRuleDivElement); */
    /* Clear the GUI element, if it already exists */
    if (domRuleDivElement != null) {
      HDLmHtml.removeDomChildren(domRuleDivElement);
    }
    /* Since the rule DOM element does not exist, we must create it */
    else {
      domRuleDivElement = HDLmHtml.createDomElement('div');
      /* domRuleDivElement.addEventListener('keydown', HDLmGEM.ruleKeydown); */
      HDLmHtml.setDomAttribute(domRuleDivElement, 'id', fieldIdValue);
      HDLmHtml.setDomAttribute(domRuleDivElement, 'contenteditable', 'true');
      HDLmHtml.setDomAttribute(domRuleDivElement, 'class', 'rightPage');
      attrName = 'style';
      attrValue = 'position:absolute;';
      HDLmHtml.setDomAttribute(domRuleDivElement, attrName, attrValue);
      HDLmHtml.setDomStyle(domRuleDivElement, 'left', String(xLocation) + 'px');
      HDLmHtml.setDomStyle(domRuleDivElement, 'top', String(yLocation) + 'px');
      HDLmHtml.setDomStyle(domRuleDivElement, 'background-color', 'white');
      HDLmHtml.setDomStyle(domRuleDivElement, 'border', '1px solid black');
      HDLmHtml.setDomStyle(domRuleDivElement, 'padding', '5px');
      HDLmHtml.setDomStyle(domRuleDivElement, 'z-index', 11);
      domBodyElement.appendChild(domRuleDivElement);
      let domRuleParentDescrDivElement = HDLmHtml.createDomElement('div');
      HDLmHtml.setDomAttribute(domRuleParentDescrDivElement, 'class', 'leftDef');
      domRuleDivElement.appendChild(domRuleParentDescrDivElement);
      let domRuleDescrDivElement = HDLmHtml.createDomElement('div');
      let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
      HDLmHtml.setDomAttribute(domRuleDescrDivElement, 'id', divDescriptions.substr(1));
      domRuleParentDescrDivElement.appendChild(domRuleDescrDivElement);
      let domRuleParentValueDivElement = HDLmHtml.createDomElement('div');
      HDLmHtml.setDomAttribute(domRuleParentValueDivElement, 'class', 'rightDef');
      domRuleDivElement.appendChild(domRuleParentValueDivElement);
      let domRuleValueDivElement = HDLmHtml.createDomElement('div');
      let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
      HDLmHtml.setDomAttribute(domRuleValueDivElement, 'id', divValues.substr(1));
      domRuleParentValueDivElement.appendChild(domRuleValueDivElement);
    }
  }
  /* This routihe handles button clicks. When a user clicks on a
     button, this routine is invoked. This routine should display
     the rule information. */
  static buttonClick(event) {
    /* console.log('In buildClick', event); */
    /* Get some information about the button that was just clicked */
    let buttonElement = event.originalTarget;
    if ((typeof buttonElement) == 'undefined')
      buttonElement = event.target;
    if (buttonElement == null)
      HDLmAssert(false, 'Button element is null in button click');
    if ((typeof buttonElement) == 'undefined')
      HDLmAssert(false, 'Button element is undefined in button click');
    let fieldName = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonSpecial';
    fieldName = fieldName.toLowerCase();
    /* Get the special value that shows what this button was/is used
       for */
    let specialValue = buttonElement.getAttribute(fieldName);
    /* Build a token vector from attribute field. The token vector is
       used in several ways. */
    let tokenVec = HDLmString.getTokens(specialValue);
    /* console.log('In buttonClick', tokenVec); */
    let tokenLen = tokenVec.length;
    /* The full rule name will just be the host name for create
       operations. We only know the host name at this point if
       we are handling a create operation. */
    let fullRuleName = tokenVec[0].value;
    let pathValue = tokenVec[2].value;
    let nodeIdenStr = tokenVec[4].value;
    let ruleType = tokenVec[6].value;
    let currentOperation = tokenVec[8].value;
    /* console.log('In buttonClick', fullRuleName, fullRuleName.length,
                   pathValue, nodeIdenStr, ruleType, currentOperation); */
    /* Handle the current operation, as need be */
    switch (currentOperation) {
      /* Handle a Create operation. This operation creates a new
         rule. */
      case 'Create': {
        /* Build an area for the new rule */
        HDLmGEM.buildRuleArea();
        /* The full rule name will just be the host name for create
           operations. We only know the host name at this point. */
        let hostName = fullRuleName;
        /* Build the path for the new rule */
        let newUrlValueStr = 'https://' + hostName + pathValue;
        /* Create a complete path to the node we are about to create */
        let newNodePath = [];
        newNodePath.push(HDLmDefines.getString('HDLMTOPNODENAME'));
        newNodePath.push(HDLmDefines.getString('HDLMCOMPANIESNODENAME'));
        newNodePath.push(hostName);
        newNodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
        newNodePath.push(HDLmDefines.getString('HDLMDIVISIONNODENAME'));
        newNodePath.push(HDLmDefines.getString('HDLMSITENODENAME'));
        /* Find or create the site node that will be the parent for the
            newly created node */
        let newSiteNodePath = newNodePath.slice(0, HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH'));
        /* console.log(newSiteNodePath); */
        let updateDatabaseFalse = false;
        let newSiteNode = HDLmTree.buildSiteNode(newSiteNodePath, updateDatabaseFalse, HDLmNodeTypes.rules);
        /* console.log(newSiteNode); */
        /* console.log('In buttonClick', ruleType); */
        let removeTailsTrue = true;
        let newName = HDLmMenus.buildModificationName(newSiteNode, newUrlValueStr, ruleType, removeTailsTrue);
        newNodePath.push(newName);
        /* console.log('In buttonClick', newName); */
        /* console.log(newName); */
        let newTreeType = HDLmNodeTypes.mod;
        let newTreeTypeStr = HDLmNodeTypes.toString(newTreeType);
        let newNodePathLength = newNodePath.length;
        let newTooltip = 'Dummy tooltip';
        /* The creation of a new tree node below is OK because eventually (hopefully)
            we call a routine that inserts the new tree node into the overall node
            tree. This routine also sends the new tree node to the server to add the
            new tree node to the database. */
        let ruleTreeInfo = new HDLmTree(newTreeTypeStr, newTooltip);
        ruleTreeInfo.nodePath = newNodePath.slice();
        /* Build the details (the actual modification) for the new rule */
        let modificationCommentsEmpty = '';
        let modificationCssEmpty = '';
        let modificationExtraEmpty = '';
        let modificationEnabledTrue = true;
        let modificationFindsEmpty = [];
        let modificationParameterNumberNull = null;
        let modificationUseModeEmpty = '';
        let modificationXpathEmpty = '';
        let ruleModInfo = HDLmMod.buildModificationObject(newName, pathValue,
                                                          modificationExtraEmpty, modificationEnabledTrue,
                                                          modificationCssEmpty, modificationXpathEmpty,
                                                          modificationFindsEmpty, JSON.parse(nodeIdenStr),
                                                          'newmod', modificationParameterNumberNull,
                                                          modificationCommentsEmpty, modificationUseModeEmpty);
        let arrayName = HDLmMod.getModificationArrayName(ruleType);
        ruleModInfo.type = ruleType;
        ruleModInfo[arrayName] = [];
        ruleTreeInfo.details = ruleModInfo;
        HDLmTree.addToTreeFix(ruleTreeInfo);
        /* At this point we can add the event listener for the div */
        let eventHandler = HDLmGEM.getRuleKeydownHandler(currentOperation, ruleTreeInfo);
        /* Try to locate the div for the rule */
        let fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'RuleId';
        let domRuleDivElement;
        domRuleDivElement = HDLmHtml.getDomElementById(fieldIdValue);
        domRuleDivElement.addEventListener('keydown', eventHandler);
        /* The call below may fail for any number of reasons. We need to
           catch any failures and report them. */
        let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
        let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
        try {
          HDLmTree.clearPendingInserts();
          let systemCharacter = 'a';
          HDLmStateInfo.setEntriesSystemValues(systemCharacter);
          /* The active node type is set to a standard value here. This value
             will allow normal finish tree node processing to happen, if we are
             creating a new modification rule. */
          let newTreeEntryTrue = true;
          HDLmGlobals.setActiveNodeType('newmod');
          HDLmGlobals.activeEditorType = HDLmEditorTypes.gem;
          /* console.log('about to displaymod'); */
          let callSource = 'HDLmGEM.buttonClick';
          let currentDomElementNull = null;
          let handlingCmdInsertFalse = false;
          let inlineStartupFlagFalse = false;
          let possibleRuleTypesNull = null;
          /* console.log('In buttonClick', ruleTreeInfo); */
          HDLmMod.displayMod(divDescriptions, divValues, ruleTreeInfo,
                             possibleRuleTypesNull, currentDomElementNull,
                             HDLmGlobals.activeEditorType, newTreeEntryTrue,
                             inlineStartupFlagFalse, handlingCmdInsertFalse,
                             callSource);
        }
        catch (errorObj) { 
          console.log(errorObj); 
        }
        break;
      }
      /* Handle a Delete operation. This operation deletes an existing rule. */
      case 'Delete': {
        /* Set the active editor type */
        HDLmGlobals.activeEditorType = HDLmEditorTypes.gem;
        /* Try to find the rule we are going to delete */
        let ruleTreeInfo = HDLmGEM.findRule(fullRuleName, ruleType, pathValue);
        if (ruleTreeInfo == null)
          HDLmAssert(false, 'Rule not found in GEM extension for delete');
        let currentFancyNode = null;
        HDLmTree.deleteTreeNode(currentFancyNode, ruleTreeInfo);
        /* Cleanup anything left over from extension processing */
        HDLmGEM.cleanup();
        break;
      }
      /* Handle a Modify operation. This operation modifies an existsing
         rule. */
      case 'Modify': {
        /* Build the rule area, if need be */
        HDLmGEM.buildRuleArea();
        /* Try to find the rule we need might modify */
        let ruleTreeInfo = HDLmGEM.findRule(fullRuleName, ruleType, pathValue);
        if (ruleTreeInfo == null)
          HDLmAssert(false, 'Rule not found in GEM extension for modify');
        /* console.log(ruleTreeInfo, fullRuleName, pathValue); */
        /* At this point we can add the event listener for the div */
        let eventHandler = HDLmGEM.getRuleKeydownHandler(currentOperation, ruleTreeInfo);
        /* Try to locate the div for the rule */
        let fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'RuleId';
        let domRuleDivElement;
        domRuleDivElement = HDLmHtml.getDomElementById(fieldIdValue);
        domRuleDivElement.addEventListener('keydown', eventHandler);
        /* The call below may fail for any number of reasons. We need to
           catch any failures and report them. */
        let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
        let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
        try {
          HDLmTree.clearPendingInserts();
          let systemCharacter = 'a';
          HDLmStateInfo.setEntriesSystemValues(systemCharacter);
          /* The active node type is set to a standard value here. This value
             will allow normal finish tree node processing to happen, if we are
             creating a new modification rule. This will not be true for modify
             processing. */
          let newTreeEntryFalse = false;
          HDLmGlobals.setActiveNodeType('newmod');
          HDLmGlobals.activeEditorType = HDLmEditorTypes.gem;
          /* console.log('about to displaymod'); */
          let callSource = 'HDLmGEM.buttonclick';
          let currentDomElementNull = null;
          let handlingCmdInsertFalse = false;
          let inlineStartupFlagFalse = false;
          let possibleRuleTypesNull = null;
          HDLmMod.displayMod(divDescriptions, divValues, ruleTreeInfo,
                             possibleRuleTypesNull, currentDomElementNull,
                             HDLmGlobals.activeEditorType, newTreeEntryFalse,
                             inlineStartupFlagFalse, handlingCmdInsertFalse,
                             callSource);
        }
        catch (errorObj) { 
          console.log(errorObj); 
        }
        break;
      }
      /* Report an error if the current operation type did not match
         one of the expected choices */
      default: {
        let errorString = currentOperation;
        HDLmError.buildError('Error', 'Invalid type', 53, errorString);
        break;
      }
    }
  }
  /* This routine handles key down events. When a user presses any
     key, this routine is invoked. Of course, we really only want
     to handle the delete, enter, and escape keys. This routine is
     button specific. Note that we don't have a current tree node,
     if we are handling a button (or the button area). */
  static buttonKeydown(event) {
    /* console.log('In buttonKeyDown', event); */
    let currentTreeNodeNull = null;
    let operationTypeNull = null;
    HDLmGEM.handleKeyboard(operationTypeNull, currentTreeNodeNull, event);
  }
  /* The next routine does some cleanup work to remove anything
     created by the extension */
  static cleanup() {
    /* The next statement forces the current window to be reloaded. This is
       done here as part of enter processing so that the newest (possibly)
       modified rules will be applied to the current window. */
    window.location.href = window.location.href;
    /* Clear any pending create node operations */
    HDLmMenus.clearPending();
    /* Try remove the divs */
    HDLmGEM.deleteDivs();
  }
  /* This routine creates a button and returns the button to the
     caller. The caller provides all of the information needed
     to create the new button. */
  static createButton(specialValue, firstPartOfName) {
    /* console.log('In createButton', specialValue, firstPartOfName); */
    /* Get the name of the HTML class used by all of the buttons */
    let cssButtonClass = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonClass';
    /* Create the DOM element for the new button */
    let domChildElement = HDLmHtml.createDomElement('button');
    /* console.log('In createButton', specialValue); */
    let fieldName = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonSpecial';
    HDLmHtml.setDomAttribute(domChildElement, fieldName, specialValue);
    domChildElement.addEventListener("click", HDLmGEM.buttonClick);
    domChildElement.addEventListener('keydown', HDLmGEM.buttonKeydown);
    /* Add the rest of the button attributes */
    HDLmHtml.setDomAttribute(domChildElement, 'class', cssButtonClass);
    HDLmHtml.setDomAttribute(domChildElement, 'spellcheck', 'false');
    HDLmHtml.setDomAttribute(domChildElement, 'type', 'button');
    HDLmHtml.setDomStyle(domChildElement, 'display', 'block');
    HDLmHtml.setDomStyle(domChildElement, 'margin', '5px');
    /* Set the text content of the button */
    domChildElement.textContent = firstPartOfName + ' ' + 'rule';
    return domChildElement;
  }
  /* This routine trys to delete the div areas that may have beeen
     built for creating or modifying a rule. This routine can be
     used to remove the div areas at any time. */
  static deleteDivs() {
    /* console.log('In deleteDivs'); */
    /* console.trace(); */
    /* Try remove the rule div. If this works, then we are done. */
    let fieldIdValue;
    /* Try to locate the div for the rule */
    fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'RuleId';
    let domRuleDivElement;
    domRuleDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    if (domRuleDivElement != null) {
      domRuleDivElement.parentNode.removeChild(domRuleDivElement);
    }
    /* Try remove the buttons div. If this works, then we are done. */
    /* Try to locate the div for the buttons */
    fieldIdValue = HDLmDefines.getString('HDLMGEMPREFIX') + 'ButtonId';
    let domButtonDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    if (domButtonDivElement != null) {
      domButtonDivElement.parentNode.removeChild(domButtonDivElement);
    }
  }
  /* This routine searches the rule tree for a rule with the correct
     full rule name, rule type, and path value. This search may or may
     not work. The search may fail because the correct node may not exist
     at this point. If the search fails, a null value will be returned to
     the caller. If the search succeeds, the target tree element will be
     returned to the caller. */
  static findRule(fullRuleName, ruleType, pathValue) {
    /* console.log('In findRule', fullRuleName, pathValue); */
    /* Check if the full rule name is null. If the full rule name is
       null, then we can not find the rule we are looking for. */
    if (fullRuleName == null)
      return null;
    let hostName, divisionName, siteName, modName;
    [hostName, divisionName, siteName, modName] = HDLmTree.getPartsfromFull(fullRuleName);
    /* Build the node path for the rule we are looking for */
    let topNodeName = HDLmDefines.getString('HDLMTOPNODENAME');
    let companiesNodeName = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
    let rulesNodeName = HDLmDefines.getString('HDLMRULESNODENAME')
    let ruleNodePath = [topNodeName, companiesNodeName, hostName, rulesNodeName, divisionName, siteName, modName];
    /* console.log('In findRule', ruleNodePath); */
    /* Try to find the rule node. This should never fail because we
       are passed a full rule name. */
    let ruleTreeNode = HDLmTree.locateTreeNode(ruleNodePath);
    /* Report an error if the rule node could not be found */
    if (ruleTreeNode == null) {
      let nodeString = ruleNodePath.toString();
      console.log('In HDLmGEM.findRule', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return null;
    }
    /* Get the rule details. This is an HDLmMod instance. */
    let ruleDetails = ruleTreeNode.details;
    /* Check if the rule type is correct */
    /* console.log('In findRule', ruleDetails.type, ruleType); */
    if (ruleDetails.type != ruleType)
      return null;
    /* The path in the rule details might be a regex or it
       might not be. We need to handle both cases. */
    let pathUsesRegex = false;
    let pathStringsMatch = false;
    let pathLength = ruleDetails.pathvalue.length;
    if (pathLength >= 3 &&
        ruleDetails.pathvalue.charAt(0) == '/' &&
        ruleDetails.pathvalue.charAt(1) == '/' &&
        ruleDetails.pathvalue.charAt(pathLength - 1) == '/')
      pathUsesRegex = true;
    /* console.log(pathUsesRegex); */
    /* Check if the child details path uses regex */
    if (pathUsesRegex) {
      let testPathRegex = new RegExp(ruleDetails.pathvalue.substr(2, pathLength - 3));
      /* console.log(testPathRegex); */
      pathStringsMatch = testPathRegex.test(pathValue);
      /* console.log(pathStringsMatch); */
    }
    /* Check if the path strings are equal or not */
    else
      pathStringsMatch = (ruleDetails.pathvalue == pathValue);
      /* console.log('s6'); */
      /* console.log(ruleDetails); */
      /* console.log(pathStringsMatch); */
      /* console.log(ruleDetails.type); */
    if (pathStringsMatch != true)
      return null;
    /* If we did not get a match in the loop above, just
       return a null value */
    return ruleTreeNode;
  }
  /* This routine returns an event handler that can handle
     key down events. The event handler is actually a closure
     that has the current tree node available to it. */
  static getRuleKeydownHandler(operationType, currentTreeNode) {
    let eventHandler = (event) => {
      HDLmGEM.handleKeyboard(operationType, currentTreeNode, event);
    }
    return eventHandler;
  }
  /* Get the type (this is a general types, not a rule type) from a
     DOM tag. The caller must pass a valid tag. If an invalid tag is
     passed a null value will be returned. */
  static getTypeFromTag(tagStr) {
    /* console.log('In HDLmGEM.getTypeFromTag'); */
    /* console.log(tagStr); */
    /* console.log(HDLmGEMInfoData); */
    /* console.log(HDLmGEMInfoData['button']); */
    /* console.log(tagStr == 'button'); */
    /* console.log(tagStr in HDLmGEMInfoData); */
    /* if (true) { */
    if (tagStr in HDLmGEMInfoData) {   
      /* console.trace(); */
      return HDLmGEMInfoData[tagStr].type;
    }
    else { 
      return null;
    }
  }
  /* This routine is used to handle keyboard events from the GUI rule
     editor. It doesn't really do any of the work. It just passes (in
     some cases) the keyboard events to other routines. */
  static handleKeyboard(operationType, currentTreeNode, event) {
    /* console.log('In handleKeyboard', operationType, currentTreeNode, event); */
    /* We need to make sure that the current event is only handled
       once. They call below does this. */
    event.stopPropagation();
    /* Their are many different types of key operations. Each key operation
       is handled by a separate set of code. */
    let eventStr = event.key;
    if (event.key == 's' &&
      event.ctrlKey)
      eventStr = 'ctrl+s';
    switch (eventStr) {
      /* Handle a ctrl+s (save) keyboard operation */
      case 'ctrl+s':
        HDLmGEM.handleKeyboardSave(operationType, currentTreeNode, event);
        break;
      /* Handle an enter keyboard operation */
      case 'Enter':
        HDLmGEM.handleKeyboardEnter(operationType, currentTreeNode, event);
        break;
      /* Handle an esc (Escape) keyboard operation */
      case 'Escape':
        HDLmGEM.handleKeyboardEscape(operationType, currentTreeNode, event);
        break;
      /* Don't report an error if the key operation did not match one
         of the expected choices */
      default:
        break;
    }
  }
  /* This routine is used to handle keyboard enter events from the GUI rule
     editor */
  static handleKeyboardEnter(operationType, currentTreeNode, event) {
    /* console.log('In handleKeyboardEnter', operationType, currentTreeNode, event); */
    /* Cleanup anything left over from extension processing */
    HDLmGEM.cleanup();
  }
  /* This routine is used to handle keyboard escape events from the GUI rule
     editor. This routine actually handles escape processing. */
  static handleKeyboardEscape(operationType, currentTreeNode, event) {
    /* Cleanup anything left over from extension processing */
    HDLmGEM.cleanup();
  }
  /* This routine is used to handle keyboard ctrl+s events from the GUI rule
     editor. This routine actually handles ctrl+s processing. Note that this
     code does not actually save anything. Actually, this code does not do
     anything at present. */
  static handleKeyboardSave(operationType, currentTreeNode, event) {
    /* console.log('handleKeyboardSave'); */
    /* console.log(operationType); */
    /* console.log(currentTreeNode); */
    /* console.log(event); */
    let jsonStr;
    /* Check if we were passed an actual tree node or null. The tree node
       will be null, if this event originated from a button. This is not an
       error condition. */
    if (currentTreeNode == null)
      return;
    /* Since we have an actual tree node, we can check the status of the
       tree node. */
    let currentContainer = currentTreeNode.containerWidget;
    let errorText = currentContainer.getErrorText();
    /* console.log(errorText); */
    if (errorText != '')
      return;
    /* The current event should be modified in at least one way to
       prevent this event from percolating up and causing some sort
       of (unwanted) default action */
    /* console.log(errorText); */
    event.preventDefault();
    /* console.log(errorText); */
    /* Some addition work is needed here to actually create a new
       rule tree node. We must add the new rule tree node to the
       tree maintained inside this code. The call below does this,
       but only if we are actually creating a new rule tree node. */
    if (operationType == 'Create') {
      try {
        /*
        let systemCharacter = 'a';
        HDLmStateInfo.setEntriesSystemValues(systemCharacter);
        let callFromCallbackFalse = false;
        let containerAvailableTrue = true;
        let currentDomElementNull = null;
        let newTreeEntryTrue = true;
        let handlingCmdInsertFalse = false;
        let needUserInputTrue = true;
        let possibleRuleTypesNull = null;
        HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                 possibleRuleTypesNull, currentDomElementNull,
                                 newTreeEntryTrue, handlingCmdInsertFalse,
                                 callFromCallbackFalse, needUserInputTrue);
        */
      }
      catch (errorObj) { 
        console.log(errorObj); 
      }
    }
    /* We can now actually save the current tree node. If the current
       tree node already existed, we have much less work to do. This
       code sends the (possibly new) rule to the server (not the database)
       and updates the node tree in memory. The database was actually
       updated by other code earlier.

       Note that this code is no longer executed. If a new rule is created,
       then a different set of code saves the rule. If an existing rule is
       modified, then a different set of code handles the modification. */
    if (1 == 2) {
      let tempPos = {};
      /* Create a temporary copy of the current tree node. This is
         done so that we can make changes to the temporary copy that
         will not affect the original tree node. */
      tempPos = Object.assign(tempPos, currentTreeNode);
      if (tempPos.hasOwnProperty('children'))
        delete tempPos.children;
      if (tempPos.hasOwnProperty('containerWidget'))
        delete tempPos.containerWidget;
      if (tempPos.hasOwnProperty('id'))
        delete tempPos.id;
      /* Remove the saved details from the current node, if need be */
      if (tempPos.hasOwnProperty('savedDetails'))
        delete tempPos.savedDetails;
      try { jsonStr = JSON.stringify(tempPos); }
      catch (errorObj) { 
        console.log(errorObj); 
      }
      HDLmWebSockets.sendCurrentRequest(jsonStr, 'UpdateTree');
      /* Try remove the divs */
      HDLmGEM.deleteDivs();
    }
  }
  /* This routine is used to get the correct position for a new window
     (probably just a div) on the current screen. The caller provides
     the current dimensions of the screen, the size of the new window
     and where the new window "should" be located. The code determines
     if the window can be located in the desired position, and returns
     a location where the new window will actually fit. */
  static getWindowLocation(screenWidth, screenHeight,
    newWindowX, newWindowY,
    newWindowWidth, newWindowHeight) {
    /* Declare and define a few variables */
    let rv = {};
    /* As a first guess, the current window position should be OK */
    rv['x'] = newWindowX;
    rv['y'] = newWindowY;
    /* Check if the width of the new window will fit on the screen */
    if ((newWindowX + newWindowWidth) > screenWidth) {
      newWindowX = screenWidth - newWindowWidth;
      rv['x'] = newWindowX;
    }
    /* Check if the height of the new window will fit on the screen */
    if ((newWindowY + newWindowHeight) > screenHeight) {
      newWindowY = screenHeight - newWindowHeight;
      rv['y'] = newWindowY;
    }
    /* Return the possibly updated new window locations */
    return rv;
  }
  /* This routine is passed the JSON for all of the rules (and more). The
     rule tree is updated using the passed JSON. */
  static updateRuleTree(ruleTreeJsonStr, urlStr, currentElement, nodeIdenStr) {
    /* console.log('In HDLMGEM.updateRuleTree'); */
    /* console.log('In updateRuleTree', ruleTreeJsonStr, urlStr, currentElement, nodeIdenStr); */
    try {
      /* console.log(ruleTreeJsonStr); */
      HDLmTree.addToTree(ruleTreeJsonStr);
      /* let treeTop = HDLmTree.getTreeTop(); */
      /* console.log(treeTop); */
      /* console.log(ruleTreeJsonStr); */
      let fullRuleNameStr = HDLmTree.getFullRuleName(currentElement);
      /* console.log(fullRuleNameStr); */
      /* Build a URL object from the URL passed by the caller.
         Get the host name and path from it. */
      let urlObj = new URL(urlStr);
      let hostName = urlObj.hostname;
      let pathValue = HDLmUtility.getPathString(urlStr);
      let tagStr = currentElement.tagName.toLowerCase();
      /* console.log(tagStr); */
      HDLmGEM.buildButtonList(hostName, pathValue, nodeIdenStr, fullRuleNameStr, tagStr);
    }
    catch (errorObj) { 
      console.log(errorObj); 
    }
  }
}