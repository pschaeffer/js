/**
 * HDLmGXE short summary.
 *
 * This module is used to implement the GUI extended editor for web pages.
 * GXE stands for GUI eXtended Editor.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
const HDLmGXERuleTypesA = ['text', 'textchecked', 'remove', 'replace'];
const HDLmGXERuleTypesDiv = ['text', 'textchecked', 'remove', 'replace'];
const HDLmGXERuleTypesH = ['text', 'textchecked', 'remove', 'replace'];
const HDLmGXERuleTypesImage = ['image', 'remove', 'replace'];
const HDLmGXERuleTypesLabel = ['text', 'textchecked', 'remove', 'replace'];
const HDLmGXERuleTypesStandard = ['text', 'textchecked', 'remove', 'replace'];
const HDLmGXEInfoData =
{
  "a": { "type": HDLmGXERuleTypesA, "description": "Defines a hyperlink" },
  /* An abbr tag seems to work like a text tag */
  "abbr": { "type": null, "description": "Defines an abbreviation or an acronym" },
  /* See the description below. This tag has been deprecated */
  "acronym": { "type": null, "description": "Not supported in HTML5. Use <abbr> instead. Defines an acronym." },
  /* Address has innerHTML and innerText. Actually does work and has been tested */
  "address": { "type": null, "description": "Defines contact information for the author / owner of a document" },
  /* See the description below. This tag has been deprecated */
  "applet": { "type": null, "description": "Not supported in HTML5. Use <embed> or <object> instead. Defines an embedded applet" },
  /* An image map, with clickable areas */
  "area": { "type": null, "description": "Defines an area inside an image map" },
  /* Articles have independent, self-contained content. Areas have innerHTML and innerText. */
  "article": { "type": null, "description": "Defines an article" },
  /* Asides seem like divs. Asides have innerHTML and innerText. */
  "aside": { "type": null, "description": "Defines content aside from the page content" },
  /* Audio tags have other tags inside them */
  "audio": { "type": null, "description": "Defines embedded sound content" },
  /* An b tag seems to work like a text tag, but make the text bold (without marking it as important) */
  "b": { "type": null, "description": "Defines bold text" },
  /* This tag specifies a default URL and a default target for all links on a page */
  "base": { "type": null, "description": "Specifies the base URL / target for all relative URLs in a document" },
  /* This tag was used in HTML4 to specify a default text - color, font- size or font-family for all the text in an HTML document */
  "basefont": { "type": null, "description": "Not supported in HTML5 .Use CSS instead. Specifies a default color, size, and font for all text in a document" },
  /* This tag is called the Bidirectional Isolate element */
  "bdi": { "type": null, "description": "Isolates a part of text that might be formatted in a different direction from other text outside it" },
  /* This tag is called the Bi-Directional Override tag. An attribute called dir is used to specify the desired direction */
  "bdo": { "type": null, "description": "Overrides the current text direction" },
  /* In HTML4 this tag was used for big text. This tag has been deprecated. */
  "big": { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines big text" },
  /* This tag seems to be some sort of text */
  "blockquote": { "type": null, "description": "Defines a section that is quoted from another source" },
  /* This tag represents an HTML body element */
  "body": { "type": null, "description": "Defines the document's body" },
  /* This tag insert a single line breaks in a text */
  "br": { "type": null, "description": "Defines a single line break" },
  /* This tag creates a clickable button */
  "button": { "type": null, "description": "Defines a clickable button" },
  /* This tag is used to draw graphics */
  "canvas": { "type": null, "description": "Used to draw graphics, on the fly, via scripting (usually JavaScript)" },
  /* This tag defines a table caption */
  "caption": { "type": null, "description": "Defines a table caption" },
  /* This tag was used in HTML4 to center-align text. This tag has been deprecated. */
  "center": { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines centered text" },
  /* This tag defines the title of a work */
  "cite": { "type": null, "description": "Defines the title of a work" },
  /* This tag defines some text as computer code in a document */
  "code": { "type": null, "description": "Defines a piece of computer code" },
  /* This tag is used to set the background color of one or more columns */
  "col": { "type": null, "description": "Specifies column properties for each column within a <colgroup> element" },
  /* This tag is used to specify a group of one or more columns in a table for formatting */
  "colgroup": { "type": null, "description": "Specifies a group of one or more columns in a table for formatting" },
  /* This tag (data-*) is used to store custom data private to the page or application */
  "data": { "type": null, "description": "Adds a machine-readable translation of a given content" },
  /* This tag is used to provide pre-defined options (for an <input> element) */
  "datalist": { "type": null, "description": "Specifies a list of pre-defined options for input controls" },
  /* This tag is used to provide a description list */
  "dd": { "type": null, "description": "Defines a description/value of a term in a description list" },
  /* This tag is used to define a text with a deleted part */
  "del": { "type": null, "description": "Defines text that has been deleted from a document" },
  /* This tag is used to provide details that the user can open and close on demand */
  "details": { "type": null, "description": "Defines additional details that the user can view or hide" },
  /* This tag is used to mark up a term */
  "dfn": { "type": null, "description": "Specifies a term that is going to be defined within the content" },
  /* This tag is used to specify a dialog box or window */
  "dialog": { "type": null, "description": "Defines a dialog box or window" },
  /* This tag was used in HTML4 to specify directory titles text. This tag has been deprecated. */
  "dir": { "type": null, "description": "Not supported in HTML5. Use <ul> instead. Defines a directory list" },
  /* This tag defines a section in a document. Typically, this tag has other tags inside it. */
  "div": { "type": HDLmGXERuleTypesDiv, "description": "Defines a section in a document" },
  /* This tag is used to specify a description list */
  "dl": { "type": null, "description": "Defines a description list" },
  /* This tag is used to provide a description list */
  "dt": { "type": null, "description": "Defines a term/name in a description list" },
  /* This tag is used to emphsize some text in a document */
  "em": { "type": null, "description": "Defines emphasized text" },
  /* This tag is used to specify an embedded image */
  "embed": { "type": null, "description": "Defines a container for an external application" },
  /* This tag is used to group related elements in a form */
  "fieldset": { "type": null, "description": "Groups related elements in a form" },
  /* This tag is used to mark up a photo in a document by providing a caption */ 
  "figcaption": { "type": null, "description": "Defines a caption for a <figure> element" },
  /* This tag is used to mark up a photo in a document */
  "figure": { "type": null, "description": "Specifies self-contained content" },
  /* This tag was used in HTML 4 to specify the font face, font size, and color of text. This tag has been deprecated. */
  "font": { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines font, color, and size for text" },
  /* This tag is used to provide a document footer */
  "footer": { "type": null, "description": "Defines a footer for a document or section" },
  /* This tag is used to specify an HTML form */
  "form": { "type": null, "description": "Defines an HTML form for user input" },
  /* This tag was used in HTML4 to define one particular window within a frameset. This tag has been deprecated. */
  "frame": { "type": null, "description": "Not supported in HTML5. Defines a window(a frame) in a frameset" },
  /* This tag was used in HTML4 to define a frameset. This tag has been deprecated. */
  "frameset": { "type": null, "description": "Not supported in HTML5. Defines a set of frames" },
  /* This tag is used to display text with a size */
  "h1": { "type": HDLmGXERuleTypesH, "description": "Defines an HTML heading" },
  /* This tag is used to display text with a size */
  "h2": { "type": HDLmGXERuleTypesH, "description": "Defines an HTML heading" },
  /* This tag is used to display text with a size */
  "h3": { "type": HDLmGXERuleTypesH, "description": "Defines an HTML heading" },
  /* This tag is used to display text with a size */
  "h4": { "type": HDLmGXERuleTypesH, "description": "Defines an HTML heading" },
  /* This tag is used to display text with a size */
  "h5": { "type": HDLmGXERuleTypesH, "description": "Defines an HTML heading" },
  /* This tag is used to display text with a size */
  "h6": { "type": HDLmGXERuleTypesH, "description": "Defines an HTML heading" },
  /* This tag represents an HTML head element */
  "head": { "type": null, "description": "Contains metadata/information for the document" },
  /* This tag is used to provide a header for a document */
  "header": { "type": null, "description": "Defines a header for a document or section" },
  /* This tag is used to specify thematic changes in a document */
  "hr": { "type": null, "description": "Defines a thematic change in the content" },
  /* This tag represents an HTML html element */
  "html": { "type": null, "description": "Defines the root of an HTML document" },
  /* This tag is used to mark up text that is set off from the normal prose in a document */
  "i": { "type": null, "description": "Defines a part of text in an alternate voice or mood" },
  /* This tag is used to specify an inline frame */
  "iframe": { "type": null, "description": "Defines an inline frame" },
  /* This tag is used to insert an image */
  "img": { "type": HDLmGXERuleTypesImage, "description": "Defines an image" },
  /* This tag is used to specify an input area */
  "input": { "type": null, "description": "Defines an input control" },
  /* This tag is used to specify some text to be inserted */
  "ins": { "type": null, "description": "Defines a text that has been inserted into a document" },
  /* This tage is used to specify some text as keyboard input in a document */
  "kbd": { "type": null, "description": "Defines keyboard input" },
  /* This tag is used to provide labels for radio buttons or oher input elments */
  "label": { "type": HDLmGXERuleTypesLabel, "description": "Defines a label for an <input> element" },
  /* This tag is used to group related items in a form */
  "legend": { "type": null, "description": "Defines a caption for a <fieldset> element" },
  /* This tag is used to specify a list item */
  "li": { "type": null, "description": "Defines a list item" },
  /* This tag is used to link to an external style sheet */
  "link": { "type": null, "description": "Defines the relationship between a document and an external resource (most used to link to style sheets)" },
  /* This tag is used to specify the main content of a document */
  "main": { "type": null, "description": "Specifies the main content of a document" },
  /* This tag is used to specify an image with clickable areas */
  "map": { "type": null, "description": "Defines an image map" },
  /* This tag is used to mark (highlight) parts of a text */
  "mark": { "type": null, "description": "Defines marked/highlighted text" },
  /* This tag is used to define metadata within an HTML document */
  "meta": { "type": null, "description": "Defines metadata about an HTML document" },
  /* This tag is used to measure data within a given range (a gauge) */
  "meter": { "type": null, "description": "Defines a scalar measurement within a known range (a gauge)" },
  /* This tag is used to specify a set of navigation links */
  "nav": { "type": null, "description": "Defines navigation links" },
  /* This tag was used in HTML4 to act as a fallback tag for browsers that did not support frames. This tag has been deprecated. */
  "noframes": { "type": null, "description": "Not supported in HTML5. Defines an alternate content for users that do not support frames" },
  /* This tag is used for browsers that don't support JavaScript */
  "noscript": { "type": null, "description": "Defines an alternate content for users that do not support client-side scripts" },
  /* This tag is used for embedded images */
  "object": { "type": null, "description": "Defines a container for an external application" },
  /* This tag is used to specify an ordered list */ 
  "ol": { "type": null, "description": "Defines an ordered list" },
  /* This tag is used to specify a group of related items */
  "optgroup": { "type": null, "description": "Defines a group of related options in a drop-down list" },
  /* This tag is used to specify a drop-down list with options */
  "option": { "type": null, "description": "Defines an option in a drop-down list" },
  /* This tag is used perform a calculation and show the result */
  "output": { "type": null, "description": "Defines the result of a calculation" },
  /* This tag defines a paragraph. Typically a paragraph has other tags inside it. */
  "p": { "type": HDLmGXERuleTypesStandard, "description": "Defines a paragraph" },
  /* This tag is used to define and set a parameter for an object */
  "param": { "type": null, "description": "Defines a parameter for an object" },
  /* This tag is used to specify multiple images, for different browser sizes */
  "picture": { "type": null, "description": "Defines a container for multiple image resources" },
  /* This tag is used to specify preformatted text */
  "pre": { "type": null, "description": "Defines preformatted text" },
  /* This tag is used to specify a progress meter */
  "progress": { "type": null, "description": "Represents the progress of a task" },
  /* This tag is used to mark up a short quotation */
  "q": { "type": null, "description": "Defines a short quotation" },
  /* This tag is used for Ruby annotations */
  "rp": { "type": null, "description": "Defines what to show in browsers that do not support ruby annotations" },
  /* This tag is used for Ruby annotations */
  "rt": { "type": null, "description": "Defines an explanation/pronunciation of characters (for East Asian typography)" },
  /* This tag is used for Ruby annotations */
  "ruby": { "type": null, "description": "Defines a ruby annotation (for East Asian typography)" },
  /* This tag is used to mark up text that is no longer correct */
  "s": { "type": null, "description": "Defines text that is no longer correct" },
  /* This tag is used to define some text as sample output from a computer program in a document */
  "samp": { "type": null, "description": "Defines sample output from a computer program" },
  /* This tag is used embed a client-side script (JavaScript) */
  "script": { "type": null, "description": "Defines a client-side script" },
  /* This tag defines a section in a document */
  "section": { "type": null, "description": "Defines a section in a document" },
  /* This tag is used to create a drop-down list */
  "select": { "type": null, "description": "Defines a drop-down list" },
  /* This tag is used to define smaller text */
  "small": { "type": null, "description": "Defines smaller text" },
  /* This tag is used to specify multiple media resources for media elements, such as video, audio, and pictures */
  "source": { "type": null, "description": "Defines multiple media resources for media elements (<video> and <audio>)" },
  /* This tag is an inline container used to mark up a part of a text, or a part of a document */
  "span": { "type": HDLmGXERuleTypesStandard, "description": "Defines a section in a document" },
  /* This tag was used in HTML4 to define strikethrough text. This tag has been deprecated. */
  "strike": { "type": null, "description": "Not supported in HTML5. Use <del> or <s> instead. Defines strikethrough text" },
  /* This tag is used to define important text in a document */
  "strong": { "type": null, "description": "Defines important text" },
  /* This tag is used to define style information (CSS) for a document */
  "style": { "type": null, "description": "Defines style information for a document" },
  /* This tag is used to define subscript text */
  "sub": { "type": null, "description": "Defines subscripted text" },
  /* This tag is used to provide a summary tag that defines a visible heading for the details element */ 
  "summary": { "type": null, "description": "Defines a visible heading for a <details> element" },
  /* This tag is used to define superscript text */
  "sup": { "type": null, "description": "Defines superscripted text" },
  /* This tag is used to define a container for svg graphics */
  "svg": { "type": null, "description": "Defines a container for SVG graphics" },
  /* This tag is used to define a table */
  "table": { "type": null, "description": "Defines a table" },
  /* This tag is used to group the body content in an HTML table */
  "tbody": { "type": null, "description": "Groups the body content in a table" },
  /* This tag is used to define a standard data cell in an HTML table */
  "td": { "type": null, "description": "Defines a cell in a table" },
  /* This tag is used as a container to hold some HTML content hidden from the user when the page loads */
  "template": { "type": null, "description": "Defines a container for content that should be hidden when the page loads" },
  /* This tag is defines a multi-line text input control */
  "textarea": { "type": null, "description": "Defines a multiline input control (text area)" },
  /* This tag is used to group footer content in an HTML table */
  "tfoot": { "type": null, "description": "Groups the footer content in a table" },
  /* This tag defines a header cell in an HTML table */
  "th": { "type": null, "description": "Defines a header cell in a table" },
  /* This tag is used to group header content in an HTML table */
  "thead": { "type": null, "description": "Groups the header content in a table" },
  /* This tag defines a specific time (or datetime) */
  "time": { "type": null, "description": "Defines a specific time (or datetime)" },
  /* This tag defines the title of the document. The title must be text-only, 
     and it is shown in the browser's title bar or in the page's tab. */
  "title": { "type": null, "description": "Defines a title for the document" },
  /* This tag defines a row in an HTML table */
  "tr": { "type": null, "description": "Defines a row in a table" },
  /* This tag specifies text tracks for audio or video elements */
  "track": { "type": null, "description": "Defines text tracks for media elements (<video> and <audio>)" },
  /* This tag was used in HTML4 to define teletype text. This tag has been deprecated. */
  "tt": { "type": null, "description": "Not supported in HTML5. Use CSS instead. Defines teletype text" },
  /* This tag represents some text that is unartSSSSiculated and styled differently from 
     normal text, such as misspelled words or proper names in Chinese text */
  "u": { "type": null, "description": "Defines some text that is unarticulated and styled differently from normal text" },
  /* This tag is used to specify an unordered list */
  "ul": { "type": null, "description": "Defines an unordered list" },
  /* This tag is used to display variables (really just text) in italics */
  "var": { "type": null, "description": "Defines a variable" },
  /* Video tags have other tags inside them */
  "video": { "type": null, "description": "Defines embedded video content" },
  /* This is the word/weak break tag that tells browswers where to break long text */
  "wbr": { "type": null, "description": "Defines a possible line-break" }
};
class HDLmGXE {  
  /* This routine builds a CSS style element with a set of styles
     that are used later. This routine must be called at least
     once, but can be called many times, if will do nothing if
     the required CSS styles have already been created. */
  static buildCSSRules() {
    let cssClass;
    let cssPrefix = HDLmDefines.getString('HDLMGXEPREFIX');
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
      cssClass = HDLmDefines.getString('HDLMGXEPREFIX') + 'RuleClass';
      cssText = '.' + cssClass + ' ' + '{background-color: white}';
      styleSheet.insertRule(cssText);
      cssText = '.' + cssClass + ':hover' + ' ' + '{background-color: red}';
      styleSheet.insertRule(cssText);
      cssText = 'input:valid' + ' ' + '{}';
      styleSheet.insertRule(cssText);
      /* The style below was solid red */
      cssText = 'input:invalid' + ' ' + '{border: 2px solid red;}';
      styleSheet.insertRule(cssText);
      cssText = '.leftDef' + ' ' + '{float: left; height: 100%; width: 0%;}';
      styleSheet.insertRule(cssText);
      cssText = '.rightDef' + ' ' + '{float: right; height: 100%; width: 100%; resize:horizontal;}';
      styleSheet.insertRule(cssText);
      /* console.log(cssText); */
      cssText = '.rightPage' + ' ' + '{background-color: #ffffff; height: 100%; overflow-x: hidden; ' +
                'resize:horizontal; ' +
                'padding: 10px; position: absolute; right:0; top:0; width: 75%; z-index: 11;}';
      /* styleSheet.insertRule(cssText); */
      /* console.log(cssText); */
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
  /* Build an order rule using information passed by the caller */
  static buildOrderRule(orderElements, hostName, pathValue) {
    /* console.log('In HDLmGXE.buildOrderRule', orderElements, hostName, pathValue); */
    /* Delete the div that is normally used to build a rule. Since 
       we are not going to get any information from the user, we
       don't need the div. */
    HDLmGXE.deleteDiv();
    /* Check if we need to (can) build an order rule */
    let orderElementsLength = orderElements.length;
    /* We must have at least two node elements to determine order information */
    if (orderElementsLength < 2) {
      let alertStr = `At least two DOM elements are needed to build an order rule`;
      let errorText = HDLmError.buildError('Error', 'Order', 55, alertStr);
      alert(errorText);
      HDLmExtensionBothManageRules.resetNodeValues();
      return;
    }
    /* console.log(itemId); */
    /* We must check for duplicate DOM elements at this point */
    let rvDuplicates = HDLmUtility.checkDuplicates(orderElements);
    if (rvDuplicates == true) {
      let alertStr = `All DOM elements must be unique to build an order rule`;
      let errorText = HDLmError.buildError('Error', 'Order', 55, alertStr);
      alert(errorText);
      HDLmExtensionBothManageRules.resetNodeValues();
      return;
    }
    /* Get a list of parent elements for each order element. The list 
       returned in each case includes the order element as the last
       entry in the list. */
    let lists = [];
    for (let i = 0; i < orderElementsLength; i++) {
      /* console.log('In HDLmGXE.buildOrderRule', orderElements, i); */
      let orderElement = orderElements[i]
      let orderElementList = HDLmExtensionBothManageRules.getParentList(orderElement);
      lists.push(orderElementList);
    }
    /* Get the first common parent element of all of the order elements */
    let commonParentElement = HDLmExtensionBothManageRules.getLastCommonAncestor(lists);
    /* console.log('In HDLmGXE.buildOrderRule', lists, commonParentElement); */
    /* Get some JSON for the common parent element */
    let nodeIdenJsonStr = HDLmNodeIden.getNodeIdentifier(commonParentElement);
    let orderInfo = HDLmExtensionBothManageRules.getOrderInformation(commonParentElement, orderElements);
    if (orderInfo == null)
      return;
    /* console.log('In HDLmGXE.buildOrderRule', orderInfo); */
    /* Build the path for the new rule */
    let newUrlValueStr = 'https://' + hostName + pathValue;
    let newSiteNode = HDLmGXE.buildSiteNode(hostName, HDLmNodeTypes.rules);
    let newNodePath = HDLmGXE.buildSiteNodePath(hostName, HDLmNodeTypes.rules);
    /* console.log(newSiteNode); */
    /* At this point, we really don't know what the final rule type will be.
       However, we do need to build an initial modification name. So we use
       the tag string as the rule type. */
    let newRuleType = 'order';
    let removeTailsTrue = true;
    let newName = HDLmMenus.buildModificationName(newSiteNode, newUrlValueStr,
                                                  newRuleType, removeTailsTrue);
    newNodePath.push(newName);
    /* console.log(newName); */
    let newTreeType = HDLmNodeTypes.mod;
    let newTreeTypeStr = HDLmNodeTypes.toString(newTreeType);
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
    let modificationEnabledTrue = true; 
    let modificationExtraEmpty = '';
    let modificationFindsEmpty = [];
    let modificationParameterNumberNull = null;
    let modificationUseModeEmpty = '';
    let modificationXpathEmpty = '';
    let ruleModInfo = HDLmMod.buildModificationObject(newName, pathValue, 
                                                      modificationExtraEmpty, modificationEnabledTrue,
                                                      modificationCssEmpty, modificationXpathEmpty, 
                                                      modificationFindsEmpty, JSON.parse(nodeIdenJsonStr),
                                                      newRuleType, modificationParameterNumberNull,
                                                      modificationCommentsEmpty, modificationUseModeEmpty);
    /* Set the parameter number field, if need be */
    let newParameterNumber = HDLmTree.getParameterNumber(ruleTreeInfo);
    ruleModInfo['parameter'] = newParameterNumber;
    ruleModInfo['orders'] = [orderInfo];
    ruleTreeInfo.details = ruleModInfo;
    /* The call below may fail for any number of reasons. We need to
       catch any failures and report them. */
    try {
      HDLmTree.clearPendingInserts();
      let systemCharacter = 'a';
      HDLmStateInfo.setEntriesSystemValues(systemCharacter);
      /* The active node type is set to a standard value here. This value 
         will allow normal finish tree node processing to happen, if we are
         creating a new modification rule. */
      HDLmGlobals.setActiveNodeType('newmod');
      /* console.log(HDLmGlobals.activeEditorType); */
      HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
      /* console.log(HDLmGlobals.activeEditorType); */
      /* console.log('about to finishTreeNode'); */
      /* console.log(ruleTreeInfo); */
      let callFromCallbackFalse = false;
      let containerAvailableFalse = false;
      let handlingCmdInsertFalse = false;
      let newTreeEntryTrue = true;
      let needUserInputFalse = false;
      let possibleRuleTypesNull = null;
      HDLmMenus.finishTreeNode(ruleTreeInfo, containerAvailableFalse,
                               possibleRuleTypesNull, commonParentElement,
                               newTreeEntryTrue, handlingCmdInsertFalse,
                               callFromCallbackFalse, needUserInputFalse);
    }
    catch (errorObj) { 
      console.log(errorObj); 
    }
  }
  /* This routine handles the process of building a rule area
     (in a div) for all fields of a new or existing rule. A
     DOM element can be used to build many types of rules. 
     This div should be able to handle them all. */
  static buildRuleArea(currentElement) {
    /* console.log('In HDLmGXE.buildRuleArea', currentElement); */
    let attrName;
    let attrValue;
    let domBodyElement;
    domBodyElement = document.getElementsByTagName('body')[0]
    /* console.log('In HDLmGXEbuildRuleArea', domBodyElement); */
    /* Get the size of the browser window */
    let browserSize = HDLmHtml.getBrowserSize();
    let browserWidth = browserSize.x;
    let browserHeight = browserSize.y;
    /* console.log(browserWidth, browserHeight); */
    /* Get the location of the current element */
    let currentLocation = HDLmHtml.getDomLocationBounding(currentElement);
    let currentX = currentLocation.x + 30;
    let currentY = Math.max(0, currentLocation.y - 30);
    /* console.log(currentX, currentY); */
    /* Adjust the current location, if need be */
    currentLocation = HDLmGXE.getWindowLocation(browserWidth, browserHeight,
                                                currentX, currentY,
                                                30, 30);
    currentX = currentLocation.x;
    currentY = currentLocation.y;
    /* console.log(currentX, currentY); */
    /* console.log(currentY); */
    /* console.log(window.visualViewport); */
    /* console.log(window.visualViewport.pageTop); */
    /* The visual viewport may or may not be at the top of 
       the current web page. If the viewport has been moved
       down, then we must take this into account. */
    if (window.hasOwnProperty('visualViewport')) {
      currentY += window.visualViewport.pageTop;
      currentX += window.visualViewport.pageLeft;
    }
    /* console.log('In buildRuleArea', currentX, currentY); */
    /* Try to locate the div for the rule */
    let fieldIdValue = HDLmDefines.getString('HDLMGXEPREFIX') + 'RuleId';
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
      HDLmHtml.setDomAttribute(domRuleDivElement, 'id', fieldIdValue);
      /* console.log(fieldIdValue); */
      HDLmHtml.setDomAttribute(domRuleDivElement, 'contenteditable', 'true');
      HDLmHtml.setDomAttribute(domRuleDivElement, 'class', 'rightPage');
      attrName = 'style';
      attrValue = 'position:absolute;';
      /* attrValue = 'position:fixed;'; */
      HDLmHtml.setDomAttribute(domRuleDivElement, attrName, attrValue);
      HDLmHtml.setDomStyle(domRuleDivElement, 'left', String(currentX) + 'px');
      HDLmHtml.setDomStyle(domRuleDivElement, 'top', String(currentY) + 'px');
      HDLmHtml.setDomStyle(domRuleDivElement, 'background-color', 'white');
      HDLmHtml.setDomStyle(domRuleDivElement, 'border', '1px solid black');
      HDLmHtml.setDomStyle(domRuleDivElement, 'padding', '5px');
      HDLmHtml.setDomStyle(domRuleDivElement, 'z-index', 11);
      /* console.log(currentX, currentY); */
      domBodyElement.appendChild(domRuleDivElement);
      /* console.log(domBodyElement, domRuleDivElement); */
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
      /* console.log('s3'); */
    }
  }
  /* Create (if need be) the new site node, that will be the parent
     of the new node we are creating */
  static buildSiteNode(hostName, nodeType) {
    /* console.log('In HDLmGXE.buildSiteNode'); */
    /* console.log(hostName); */
    /* Find or create the site node that will be the parent for the 
       newly created node */
    let newSiteNodePath = HDLmGXE.buildSiteNodePath(hostName, nodeType);
    /* console.log(newSiteNodePath); */
    let updateDatabaseFalse = false;
    let newSiteNode = HDLmTree.buildSiteNode(newSiteNodePath, updateDatabaseFalse, nodeType);
    return newSiteNode;
  }
  /* This routine does all of the work needed to build a new node path 
     for a site node. The site node path is returned to the caller. */
  static buildSiteNodePath(hostName, nodeType) {
    /* Create a complete path to the node we are about to create (perhaps) */
    let newNodePath = [];
    newNodePath.push(HDLmDefines.getString('HDLMTOPNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMCOMPANIESNODENAME'));
    newNodePath.push(hostName);
    /* Check if we are building a node path for a rule or a data value */
    if (nodeType == HDLmNodeTypes.data)
      newNodePath.push(HDLmDefines.getString('HDLMDATANODENAME'));
    if (nodeType == HDLmNodeTypes.rules)
      newNodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMDIVISIONNODENAME'));
    newNodePath.push(HDLmDefines.getString('HDLMSITENODENAME'));
    /* Find or create the site node that will be the parent for the 
       newly created node */
    let newSiteNodePath = newNodePath.slice(0, HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH'));
    return newSiteNodePath;
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
    /* Try remove the div */
    HDLmGXE.deleteDiv();
  }  
  /* Copy an element or elements. The element or elements are converted
     to JSON and returned to the caller. */ 
  static copyElementOrElements(currentElement) {
    /* console.log('In HDLmGXE.copyElementOrElements'); */
    /* Get an object that contains the entire current element. Convert the
       object to JSON. */
    let recursionWantedTrue = true;
    let elementObjBase = HDLmHtml.buildObjectFromNode(currentElement, recursionWantedTrue);
    /* The next line was just test code that is no longer in use */
    /* elementObjBase.attributes["class"] = "HDLmClassPrimary"; */
    /* let elementObjCopy = JSON.parse(JSON.stringify(elementObjBase)); */
    let elementObjCopy = structuredClone(elementObjBase);
    /* The next two lines are just for testing. They are no longer
       in use. */
    /* let elementObjSecondCopy = structuredClone(elementObjBase); */
    /* elementObjCopy.subnodes.push(elementObjSecondCopy); */
    /* console.log(elementObjCopy); */
    /* At this point, we may want to make some changes to current object.
       We have a routine for this. */
    HDLmGXE.removeInternalAttributes(elementObjCopy);
    /* console.log(elementObjCopy); */
    /* Convert the object to JSON */
    let elementJsonStr = JSON.stringify(elementObjCopy);
    return elementJsonStr;
  }
  /* Copy an element. A new tree node is either created for the copy
     of the element or an existing tree node is reused. This routine
     does not appear to be in use. */
  static copySaveElement(hostName, currentElement) {
    /* console.log('In HDLmGXE.copySaveElement'); */
    /* Get the JSON for the current element or elements */
    let elementObjJsonStr = HDLmGXE.copyElementOrElements(currentElement);
    /* Try to save the current data value */
    HDLmGXE.saveDataValue(hostName, elementObjJsonStr);
  }
  /* This routine trys to delete the div area that may have beeen
     built for creating or modifying a rule. This routine can be
     used to remove the div area at any time. */
  static deleteDiv() {
    /* console.log('In HDLmGXE.deleteDiv'); */
    /* console.trace(); */
    /* Try remove the rule div. If this works, then we are done. */
    let fieldIdValue;
    /* Try to locate the div for the rule */
    fieldIdValue = HDLmDefines.getString('HDLMGXEPREFIX') + 'RuleId';
    let domRuleDivElement;
    domRuleDivElement = HDLmHtml.getDomElementById(fieldIdValue);
    if (domRuleDivElement != null) {
      domRuleDivElement.parentNode.removeChild(domRuleDivElement);
    }
  }  
  /* This routine deletes an existing rule. The caller provides 
     the current element. The existing rule is either obtained
     from the current HTML node or it is passed by called. The 
     caller passes a specific node to be deleted. */
  static deleteRule(urlStr, currentElement, leftRightIndex, ruleTreeInfo) {
    console.log('In HDLmGXE.deleteRule');
    /* console.log(urlStr, currentElement, leftRightIndex); */
    console.log(ruleTreeInfo);
    /* console.trace(); */
    /* Check if the caller passed a specific rule tree node to be deleted.
       If the caller did not pass a specific rule tree node, then the current 
       HTML node is used to find the rule tree node to be deleted. Otherwise,
       the rule tree node passed by the caller is uses. */ 
   if (ruleTreeInfo == null) { 
      let pathValue = HDLmUtility.getPathString(urlStr);
      /* Get the current DOM element as an object */
      let recursionWantedFalse = false;
      let domNodeObject = HDLmHtml.buildObjectFromNode(currentElement, recursionWantedFalse);
      /* Get the array of full rule names for the current element. 
         This array may be empty or not large enough. */
      /* We may or may not be able to get a non-empty full rule names 
         array at this point. If no rules have fired for the current 
         DOM elememnt, then the full rule names array will be empty. */ 
      let fullRuleNamesArray = HDLmTree.getFullRuleNames(domNodeObject);
      /* console.log('In HDLmGXE.deleteRule', urlStr, currentElement, fullRuleNamesArray); */
      /* Check if the array is empty. This will happen if no rules fired 
         for the current DOM node. In this case we want to get rid of the
         DIV and continue processing. */
      if (fullRuleNamesArray.length == 0) {
         /* console.log('About to reset some information'); */
         HDLmExtensionBothManageRules.resetSomeInformation();
         return;
      }
      /* We may or may not be able to get a full rule name at this
         point */
      let fullRuleNameStr;
      if (leftRightIndex > (fullRuleNamesArray.length - 1))
         return;
      fullRuleNameStr = fullRuleNamesArray[leftRightIndex];
      /* console.log('In HDLmGXE.deleteRule', urlStr, currentElement, fullRuleNameStr); */
      /* console.log('In HDLmGXE.deleteRule', fullRuleNameStr); */
      /* Check if at least one rule fired for the current element */
      if (fullRuleNameStr == null)
         return;
      /* Check if we can find a rule for the current full Name,
         path value, modification name, and rule type. Note that
         a null value is passed for the rule type so that no rule
         type checking will actually be done. */
      let findRuleType = null;
      let ruleTreeInfo = HDLmGXE.findRule(fullRuleNameStr, findRuleType, pathValue);
      /* console.log('In HDLmGXE.deleteRule', fullRuleNameStr, pathValue); */
      if (ruleTreeInfo == null) {
         let errorText = 'Rule not found in the rule tree';
         HDLmAssert(false, errorText);
      }
    }
    /* The caller passed a specific rule tree node to be deleted. 
       The code below will delete the rule tree node. */
    else { }
    /* The call below may fail for any number of reasons. We need to
       catch any failures and report them. */
    try {
      /* Clear any pending inserts. It is not clear if this needs to be
         done. However, it does not do any harm. */
      HDLmTree.clearPendingInserts();
      /* Set the system character to a standard value */
      let systemCharacter = 'a';
      HDLmStateInfo.setEntriesSystemValues(systemCharacter);
      /* The current rule will displayed in a div. Removing 
         the div gets rid of the display. */
      HDLmGXE.deleteDiv();
      /* At this point we need to show that we are running the 
         GUI extended editor (GXE) */
      HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
      /* At this point we can actually delete the tree node */
      let currentFancyNodeNull = null;
      HDLmTree.deleteTreeNode(currentFancyNodeNull, ruleTreeInfo)
    }
    catch (errorObj) {
      console.log(errorObj);
    }    
  }
  /* This routine displays a new or existing rule in an existing div area. 
     The caller provides the current element. This routine displays the rule. 
     If a new rule is built, then a reference to it, is returned to the caller. */
  static displayRule(urlStr, currentElement, leftRightIndex) {
    /* console.log('In HDLmGXE.displayRule'); */
    /* console.log(urlStr, currentElement, leftRightIndex); */
   
    /* console.trace(); */
    /* Build a URL object from the URL passed by the caller.
       Get the host name and path from it. */
    let urlObj = new URL(urlStr);
    let hostName = urlObj.hostname;
    let newRuleTreeInfo = null;
    /* Build a node identifier JSON string for the current node.
       The value is used below to try to find an existing rule
       or to build a new rule. */
    let nodeIdenJsonStr = HDLmNodeIden.getNodeIdentifier(currentElement);
    let pathValue = HDLmUtility.getPathString(urlStr);
    let tagStrLower = currentElement.tagName.toLowerCase();
    /* console.log(nodeIdenJsonStr, pathValue, tagStrLower); */
    /* console.log(tagStrLower); */
    /* We need to consider one very special case here. We may need to 
       build an order rule. If this is true, a special routine is used
       to do all of the needed work. */
    if (HDLmExtensionBothManageRules.contentOrderElements.length > 0) {
      HDLmGXE.buildOrderRule(HDLmExtensionBothManageRules.contentOrderElements, hostName, pathValue);
      return;
    }
    /* Get the current DOM element as an object */
    let recursionWantedFalse = false;
    let domNodeObject = HDLmHtml.buildObjectFromNode(currentElement, recursionWantedFalse);
    /* console.log(domNodeObject); */
    /* We may or may not be able to get a full rule name at this
       point. If no rule has fired for the current DOM elememnt,
       then we won't get a full rule name at this point. */
    let fullRuleNamesArray = HDLmTree.getFullRuleNames(domNodeObject);
    /* console.log('In HDLmGXE.displayRule', fullRuleNamesArray); */
    /* Check if at least one rule fired for the current element */
    if (fullRuleNamesArray.length == 0) {
      /* Build the path for the new rule */
      let newUrlValueStr = 'https://' + hostName + pathValue;
      let newSiteNode = HDLmGXE.buildSiteNode(hostName, HDLmNodeTypes.rules);
      /* console.log(newSiteNode); */
      let newNodePath = newSiteNode.nodePath.slice();
      /* At this point, we really don't know what the final rule type will be.
         However, we do need to build an initial modification name. So we use
         the tag string as the rule type. */
      let removeTailsTrue = true;
      let newName = HDLmMenus.buildModificationName(newSiteNode, 
                                                    newUrlValueStr, 
                                                    tagStrLower, 
                                                    removeTailsTrue);
      newNodePath.push(newName);
      /* console.log(newName); */
      let newTreeType = HDLmNodeTypes.mod;
      let newTreeTypeStr = HDLmNodeTypes.toString(newTreeType);
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
      let modificationEnabledTrue = true; 
      let modificationExtraEmpty = '';
      let modificationFindsEmpty = [];
      let modificationParameterNumberNull = null;
      let modificationUseModeEmpty = '';
      let modificationXpathEmpty = '';
      let ruleModInfo = HDLmMod.buildModificationObject(newName, pathValue, 
                                                        modificationExtraEmpty, modificationEnabledTrue,
                                                        modificationCssEmpty, modificationXpathEmpty, 
                                                        modificationFindsEmpty, JSON.parse(nodeIdenJsonStr),
                                                        'newmod', modificationParameterNumberNull,
                                                        modificationCommentsEmpty, modificationUseModeEmpty);
      ruleTreeInfo.details = ruleModInfo;
      /* console.log(ruleTreeInfo); */
      /* Save a reference to the new rule tree node. This reference is
         returned to the caller. */
      newRuleTreeInfo = ruleTreeInfo;
      /* The call below may fail for any number of reasons. We need to
         catch any failures and report them. */
      try {
        let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
        let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
        HDLmTree.clearPendingInserts();
        let systemCharacter = 'a';
        HDLmStateInfo.setEntriesSystemValues(systemCharacter);
        /* The active node type is set to a standard value here. This value 
           will allow normal finish tree node processing to happen, if we are
           creating a new modification rule. */
        let newTreeEntryTrue = true;
        HDLmGlobals.setActiveNodeType('newmod');
        /* console.log(HDLmGlobals.activeEditorType); */
        HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
        /* console.log(HDLmGlobals.activeEditorType); */
        /* console.log('about to displayMod'); */
        let callSource = 'HDLmGXE.displayRule';
        let handlingCmdInsertFalse = false;
        let inlineStartupFlagFalse = false;
        let possibleRuleTypes = HDLmGXE.getPossibleRuleType(tagStrLower);
        /* console.log(HDLmGlobals.activeEditorType); */
        /* console.log(ruleTreeInfo); */
        /* console.log(divDescriptions, divValues); */
        HDLmMod.displayMod(divDescriptions, divValues, ruleTreeInfo,
                           possibleRuleTypes, currentElement,
                           HDLmGlobals.activeEditorType, newTreeEntryTrue,
                           inlineStartupFlagFalse, handlingCmdInsertFalse,
                           callSource);
      }
      catch (errorObj) { 
        console.log(errorObj); 
      }
    }
    /* At least one rule did fire for the current DOM element. 
       We must handle this case. */
    else {   
      /* Check if we can find a rule for the current full Name,
         path value, modification name, and rule type. Note that
         a null value is passed for the rule type so that no rule
         type checking will actually be done. */
      let findRuleType = null;
      let fullRuleNameStr = fullRuleNamesArray[leftRightIndex];
      let ruleTreeInfo = HDLmGXE.findRule(fullRuleNameStr, findRuleType, pathValue);
      /* console.log('In displayRule', fullRuleNameStr, pathValue); */
      if (ruleTreeInfo == null) {
        let errorText = 'Rule not found in the rule tree';
        HDLmAssert(false, errorText);
      }
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
        let newTreeEntryFalse = false;
        /* console.log(HDLmGlobals.activeEditorType); */
        HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
        /* console.log(HDLmGlobals.activeEditorType); */
        /* console.log('about to displaymod'); */
        let callSource = 'HDLmGXE.displayRule';
        let handlingCmdInsertFalse = false;
        let inlineStartupFlagFalse = false;
        let possibleRuleTypesNull = null;
        /* console.log(HDLmGlobals.activeEditorType); */
        /* console.log(ruleTreeInfo); */
        HDLmMod.displayMod(divDescriptions, divValues, ruleTreeInfo,
                           possibleRuleTypesNull, currentElement,
                           HDLmGlobals.activeEditorType, newTreeEntryFalse,
                           inlineStartupFlagFalse, handlingCmdInsertFalse,
                           callSource);
      }
      catch (errorObj) { 
        console.log(errorObj); 
      }
    }
    /* console.log(newRuleTreeInfo); */
    return newRuleTreeInfo;
  }
  /* This routine displays a value with a default name. The 
     name can be changed as need be. The value is saved (sent
     to a server for inclusion in a database) when the enter
     key is used. */
  static displayValue(urlStr, currentElement) {
    /* console.log('In HDLmGXE.displayValue', urlStr, currentElement); */
    /* console.trace(); */
    /* Build a URL object from the URL passed by the caller.
       Get the host name from it. */
    let urlObj = new URL(urlStr);
    let hostName = urlObj.hostname; 
    /* Build the path for the new save data value */
    let newSiteNode = HDLmGXE.buildSiteNode(hostName, HDLmNodeTypes.data);
    /* console.log(newSiteNode); */
    let newNodePath = newSiteNode.nodePath.slice();
    /* console.log(newNodePath); */
    /* At this point, we really don't know what the final save value name
       will be. However, we do need to build an initial save value name. */
    let removeTailsTrue = true;
    let newName = HDLmMenus.buildValueName(newSiteNode, removeTailsTrue);
    newNodePath.push(newName);
    /* console.log(newNodePath); */
    let dataValue = HDLmGXE.copyElementOrElements(currentElement);
    /* console.log(dataValue); */
    /* Search for the current node in the node tree */
    let currentTreeNode = HDLmTree.locateTreeNode(newNodePath);
    /* Check if the data value tree node already exists */
    if (currentTreeNode != null) {
      let valueDetails = currentTreeNode.details;
      /* Store the actual data value */
      valueDetails['value'] = dataValue;
      return;
    }
    let newTreeType = HDLmNodeTypes.value;
    let newTreeTypeStr = HDLmNodeTypes.toString(newTreeType);
    let newTooltip = 'Dummy tooltip';
    /* The creation of a new tree node below is OK because eventually (hopefully)
       we call a routine that inserts the new tree node into the overall node 
       tree. This routine also sends the new tree node to the server to add the
       new tree node to the database. */
    let nodeTreeInfo = new HDLmTree(newTreeTypeStr, newTooltip);
    HDLmGlobals.setDataValueTree(nodeTreeInfo);
    nodeTreeInfo.nodePath = newNodePath.slice();
    /* Build the details (the actual data value) for the new node */
    let nodeExtraEmpty = '';
    let nodeInfo = HDLmMod.buildValueObject(newName, nodeExtraEmpty, 'newvalue');
    /* Store the actual data value */
    nodeInfo['value'] = dataValue;
    nodeTreeInfo.details = nodeInfo;
    /* console.log(nodeTreeInfo); */
    /* The call below may fail for any number of reasons. We need to
       catch any failures and report them. */
    try {
      let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
      let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
      HDLmTree.clearPendingInserts();
      let systemCharacter = 'a';
      HDLmStateInfo.setEntriesSystemValues(systemCharacter);
      /* The active node type is set to a standard value here. This value 
         will allow normal finish tree node processing to happen, if we are
         creating a new value node. */
      let newTreeEntryTrue = true;
      HDLmGlobals.setActiveNodeType('newvalue');
      /* console.log(HDLmGlobals.activeEditorType); */
      HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
      /* console.log(HDLmGlobals.activeEditorType); */
      /* console.log('About to invoke displayMod()'); */
      let callSource = 'HDLmGXE.displayValue';
      let handlingCmdInsertFalse = false;
      let inlineStartupFlagFalse = false;
      let possibleNodeTypes = ['value'];
      /* console.log(HDLmGlobals.activeEditorType); */
      /* console.log(nodeTreeInfo); */
      /* console.log(nodeInfo); */
      /* console.log(currentElement); */
      HDLmMod.displayMod(divDescriptions, divValues, nodeTreeInfo,
                         possibleNodeTypes, nodeTreeInfo,
                         HDLmGlobals.activeEditorType, newTreeEntryTrue,
                         inlineStartupFlagFalse, handlingCmdInsertFalse,
                         callSource);
      /* console.log(nodeTreeInfo); */
    }
    catch (errorObj) { 
      console.log(errorObj); 
    }
  }
  /* This routine searches the rule tree for a rule with the correct
     full rule name, rule type, and path value. This search may or may
     not work. The search may fail because the correct node may not exist
     at this point. If the search fails, a null value will be returned to 
     the caller. If the search succeeds, the target tree element will be
     returned to the caller. The rule type can be passed as a null value.
     If this is correct, then the rule type will not be check. */
  static findRule(fullRuleName, ruleType, pathValue) {
    /* console.log('In HDLmGXE.findRule', fullRuleName, ruleType, pathValue); */
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
      console.log('In HDLmGXE.findRule', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return null;
    }
    /* Get the rule details. This is an HDLmMod instance. */
    let ruleDetails = ruleTreeNode.details;
    /* Check if the rule type is correct */
    /* console.log('In findRule', ruleDetails.type, ruleType); */
    if (ruleType != null &&      
        ruleDetails.type != ruleType)
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
  /* Get the possible rule types for the current tag. Different tag types
     support different rule types. This routine either returns a list of 
     possible rule types, or it returns a null value. The caller must pass 
     a valid tag. If an invalid tag is passed a null value will be returned. */
  static getPossibleRuleType(tagStrLower) {
    /* Check if we actually know about the tag string or not */
    if ((tagStrLower in HDLmGXEInfoData) == false) 
      return null;
    /* Return the list of possible types (which may be null) */
    return HDLmGXEInfoData[tagStrLower].type; 
  }
  /* This routine is used to handle keyboard events from the GUI extended
     rule editor. It doesn't really do any of the work. It just passes (in
     some cases) the keyboard events to other routines. */
  static handleKeyboard(currentTreeNode, event) {
    /* console.log('In HDLmGXE.handleKeyboard', currentTreeNode, event); */
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
      /* Handle an enter keyboard operation */
      case 'Enter':
        HDLmGXE.handleKeyboardEnter(event);
        break;
      /* Handle an esc (Escape) keyboard operation */
      case 'Escape':
        HDLmGXE.handleKeyboardEscape(event);
        break;
      /* Don't report an error if the key operation did not match one
         of the expected choices */
      default:
        break;
    }
  }
  /* This routine is used to handle keyboard enter events from the GUI extended
     rule editor */
  static handleKeyboardEnter(event) {
    /* console.log('In handleKeyboardEnter', currentTreeNode, event); */
    /* Cleanup anything left over from extension processing */
    HDLmGXE.cleanup();
  }
  /* This routine is used to handle keyboard escape events from the GUI extended
     rule editor. This routine actually handles escape processing. */
  static handleKeyboardEscape(event) {
    /* Cleanup anything left over from extension processing */
    HDLmGXE.cleanup();
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
      /* console.log('out of bounds'); */
    }
    /* Check if the height of the new window will fit on the screen */
    if ((newWindowY + newWindowHeight) > screenHeight) {
      newWindowY = screenHeight - newWindowHeight;
      rv['y'] = newWindowY;
      /* console.log('out of bounds'); */
    }
    /* Return the possibly updated new window locations */
    return rv;
  }
  /* Remove internal attributes. This includes classes, styles, and
     other attributes. Note that this routine recursively calls itself
     to handle nodes within nodes. */
  static removeInternalAttributes(elementObjCopy) {
    /* console.log('In HDLmExtensionBothManageRules.removeInternalAttributes'); */
    /* console.log(elementObjCopy); */
    /* At this point, we may want to make some changes to current object.
       If the current object uses some values, then they need to be removed. */
    if (elementObjCopy.hasOwnProperty('attributes') &&
        elementObjCopy.attributes != null)
      HDLmNodeIden.updateAttrsFields(elementObjCopy.attributes);
    /* This routine recursively calls itself to handle all sub nodes
       (if any) of the current node */
    if (elementObjCopy.hasOwnProperty('subnodes'))
      elementObjCopy.subnodes.forEach(HDLmGXE.removeInternalAttributes);
    /* console.log(elementObjCopy); */
  }
  /* Set the current value of the rules updated flag */
  static rulesUpdatedSet() { 
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) 
      HDLmExtensionBothManageRules.rulesUpdatedSet(true);
  }
  /* Save some data. A new tree node is either created for the data
     or an existing tree node is reused. This routine is called by
     another routine the does not appear to be in use. */
  static saveDataValue(hostName, dataValue) {
    /* console.log('In HDLmGXE.saveDataValue'); */
    /* Delete the div that is normally used to build a rule. Since 
       we are not going to get any information from the user, we
       don't need the div. */
    HDLmGXE.deleteDiv();    
    HDLmGlobals.activeEditorType = HDLmEditorTypes.gxe;
    /* Build (if need be) a new site node for the data value */
    let newSiteNode = HDLmGXE.buildSiteNode(hostName, HDLmNodeTypes.data);
    let newNodePath = HDLmGXE.buildSiteNodePath(hostName, HDLmNodeTypes.data);
    /* console.log(newSiteNode); */
    /* we need to build an initial data value name */
    let removeTailsTrue = true;
    let newName = HDLmMenus.buildValueName(newSiteNode, removeTailsTrue);
    newNodePath.push(newName);
    /* console.log(newName); */
    /* Search for the current node in the node tree */
    let currentTreeNode = HDLmTree.locateTreeNode(newNodePath);
    /* Check if the data value tree node already exists */
    if (currentTreeNode != null) {
      let valueDetails = currentTreeNode.details;
      /* Store the actual data value */
      valueDetails['value'] = dataValue;
      return;
    }
    /* The code below may contain an error. The tree node type 
       is set to 'value' (without the quotes) and eventually the
       modification type is also set to 'value' (without the quotest).
       The modification type should probably be set to 'newvalue'. */
    let newTreeType = HDLmNodeTypes.value;
    let newTreeTypeStr = HDLmNodeTypes.toString(newTreeType);
    let newTooltip = 'Dummy tooltip';
    /* The creation of a new tree node below is OK because eventually (hopefully)
       we call a routine that inserts the new tree node into the overall node 
       tree. This routine also sends the new tree node to the server to add the
       new tree node to the database. */
    let ruleTreeInfo = new HDLmTree(newTreeTypeStr, newTooltip);
    ruleTreeInfo.nodePath = newNodePath.slice();
    /* Build the details (the actual data value) for the new node */
    let ruleModExtraEmpty = '';
    let ruleModInfo = HDLmMod.buildValueObject(newName, ruleModExtraEmpty, newTreeTypeStr); 
    /* Store the actual data value */
    ruleModInfo['value'] = dataValue;
    ruleTreeInfo.details = ruleModInfo;
    /* The call below may fail for any number of reasons. We need to
       catch any failures and report them. */
    try {
      HDLmTree.clearPendingInserts();
      let systemCharacter = 'a';
      HDLmStateInfo.setEntriesSystemValues(systemCharacter);
      /* The active node type is set to a standard value here. This value 
         will allow normal finish tree node processing to happen, if we are
         creating a new data value node. */
      HDLmGlobals.setActiveNodeType('newvalue');
      let callFromCallbackFalse = false;
      let commonParentElementNull = null;
      let containerAvailableFalse = false;
      let handlingCmdInsertFalse = false;
      let newTreeEntryTrue = true;
      let needUserInputFalse = false;
      let possibleRuleTypesNull = null;
      HDLmMenus.finishTreeNode(ruleTreeInfo, containerAvailableFalse,
                               possibleRuleTypesNull, commonParentElementNull,
                               newTreeEntryTrue, handlingCmdInsertFalse,
                               callFromCallbackFalse, needUserInputFalse);
    }
    catch (errorObj) { 
      console.log(errorObj); 
    }
  }
  /* This routine is passed the JSON for all of the rules (and more). The
     rule tree is updated using the passed JSON. */
  static updateRuleTree(ruleTreeJsonStr) {
    /* console.log('In HDLMGXE.updateRuleTree'); */
    /* console.log('In updateRuleTree', ruleTreeJsonStr); */
    try {
      /* console.log(ruleTreeJsonStr); */
      HDLmTree.addToTree(ruleTreeJsonStr);
    }
    catch (errorObj) { 
      console.log(errorObj); 
    }
  }
}