"use strict";
let useAIVersionWimWIV1;
useAIVersionWimWIV1 = 'openRouterWimWIV1';
const headingWimWIV1 = { 'pageText': 'Page Revenue Improver Improvements' };
const helpTextWimWIV1 = { 'url': 'Enter URL to improve', 'suggestion': 'Suggestion (optional)', 'directory': 'Enter a directory where improved webpages will be saved', 'improve': 'Improve (generate HTML)', 'saveHtml': 'Save (generated HTML)', 'saveImprovements': 'Save (improvements)', 'loadImprovements': 'Load (improvements)' };
const suggestionPlaceholderWimWIV1 = 'Enter a suggestion for the page revenue improver improvements';
const openRouterChatTemplatesWimWIV1 = {
  'context': 'You are an expert at improving webpages to increase conversion rates and revenue.\n' +
             'Copy everything from the old HTML to the generated HTML by default unless a change is made.\n' +
             'If Desired changes is empty, devise some improvements on your own while considering the contents of the Undesired changes field if any.\n' +
             'If Desired changes is not empty, do not devise any improvements on your own and only use the Desired changes field while considering the Undesired changes field.\n' +
             'If the User suggestion is empty, ignore it.\n' +
             'For each improvement, create a hash code using the DJB2 algorithm.\n' +
             'Start with the value 5381.\n' +
             'Hash the What value and the Why value together.\n' +
             'Convert the final unsigned hash value to hexadecimal.\n' +
             'Prefix each hash with HDLmClass.\n' +
             'Return each improvement hash code using the key Hash.\n' +
             'Mark changed HTML by adding a class with the exact hash value that includes the HDLmClass prefix.\n' +
             'Return complete improved HTML and a list of improvements.\n',
  'webpageServer': 'Please improve the HTML from the passed URL to increase conversion rates ' +
                   'and revenue.\n' +
                   'Return the complete improved HTML and a list ' +
                   'of improvements made, each with a What field and a Why field and a Hash field.\n' +
                   '\n' +
                   'URL:\n' +
                   '{{url}}\n' +
                   'User suggestion: {{suggest}}\n' +
                   'Desired changes: ({{desired}})\n' +
                   'Undesired changes: ({{undesired}})\n'
};
const openRouterResponseFormatTypeJsonObjectWimWIV1 = { 'type': 'json_object' };
const openRouterResponseJsonSchemaImproverWimWIV1 = {
  'type': 'json_schema',
  'json_schema': {
    'name': 'webpage_improvements_improver_response',
    'description': 'Response containing improved HTML and improvements list',
    'strict': true,
    'schema': {
      'type': 'object',
      'properties': {
        'improvedHtml': { 'type': 'string' },
        'improvements': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'What': { 'type': 'string' },
              'Why': { 'type': 'string' },
              'Hash': { 'type': 'string' }
            },
            'required': ['What', 'Why', 'Hash'],
            'additionalProperties': false
          }
        }
      },
      'required': ['improvedHtml', 'improvements'],
      'additionalProperties': false
    }
  }
};
class HDLmWebpageImpsImprover {
  static addBaseUrl(html, currentUrl) {
    if (html == null || currentUrl == null)
      return html;
    let lowerHtml = html.toLowerCase();
    let headIndex = lowerHtml.indexOf('<head>');
    if (headIndex < 0)
      headIndex = lowerHtml.indexOf('<head ');
    if (headIndex < 0)
      return html;
    let headTagEnd = html.indexOf('>', headIndex);
    if (headTagEnd < 0)
      return html;
    let baseTag = '<base href="' + currentUrl + '">';
    return html.substring(0, headTagEnd + 1) + baseTag + html.substring(headTagEnd + 1);
  }
  static addGoogleAnalyticsTag(html) {
    if (html == null)
      return html;
    let now = new Date();
    let dateGmt = now.getUTCFullYear().toString() + (now.getUTCMonth() + 1).toString().padStart(2, '0') + now.getUTCDate().toString().padStart(2, '0');
    let timeGmt = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0') + now.getUTCSeconds().toString().padStart(2, '0');
    let gaTagValue = 'HDLmGAWimTag-' + dateGmt + '-' + timeGmt;
    let gaScript = '<script>(function(){var tag="' + gaTagValue + '";if(typeof gtag==="function"){gtag("event",tag,{event_category:"HDLmGAWimTag",event_label:tag});}})();</script>';
    let bodyClose = html.toLowerCase().indexOf('</body>');
    if (bodyClose >= 0)
      return html.substring(0, bodyClose) + gaScript + html.substring(bodyClose);
    return html + gaScript;
  }
  static addSpinnerStyle() {
    if (document.getElementById('hdlmWebpageImpsImproverSpinnerStyle') != null)
      return;
    let styleEl = document.createElement('style');
    styleEl.id = 'hdlmWebpageImpsImproverSpinnerStyle';
    styleEl.innerHTML = '@keyframes hdlm-wim-v1-spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
    document.head.appendChild(styleEl);
  }
  static addStylesAndMessageHandler(html, improvements) {
    if (html == null)
      return html;
    if (!Array.isArray(improvements))
      improvements = [];
    let stylesHtml = '';
    for (let improvement of improvements) {
      if (improvement == null)
        continue;
      let hashCode = improvement['Hash'];
      if (typeof(hashCode) != 'string' || hashCode == '')
        continue;
      let animationName = 'hdlm-wim-anim-' + hashCode;
      stylesHtml += '<style id="hdlm-wim-style-' + hashCode + '">';
      stylesHtml += '.' + hashCode + '{animation:' + animationName + ' 0.6s step-start infinite;outline:4px solid orange;}';
      stylesHtml += '@keyframes ' + animationName + '{0%,100%{outline:4px solid orange;background-color:rgba(255,165,0,0.35);}50%{outline:none;background-color:transparent;}}';
      stylesHtml += '</style>';
    }
    let scriptHtml = '<script>';
    scriptHtml += '(function(){';
    scriptHtml += 'document.querySelectorAll("style[id^=\\"hdlm-wim-style-\\"]").forEach(function(styleNode){styleNode.disabled=true;});';
    scriptHtml += 'window.addEventListener("message",function(event){';
    scriptHtml += 'var messageParts=String(event.data).split(" ");if(messageParts.length<2)return;';
    scriptHtml += 'var hashCode=messageParts[0];var command=messageParts[1];';
    scriptHtml += 'var styleNode=document.getElementById("hdlm-wim-style-"+hashCode);if(styleNode==null)return;';
    scriptHtml += 'if(command==="hilite"){styleNode.disabled=false;}else if(command==="normal"){styleNode.disabled=true;}';
    scriptHtml += '});';
    scriptHtml += '})();';
    scriptHtml += '</script>';
    let insertHtml = stylesHtml + scriptHtml;
    let headEndIndex = html.toLowerCase().indexOf('</head>');
    if (headEndIndex < 0)
      return html + insertHtml;
    return html.substring(0, headEndIndex) + insertHtml + html.substring(headEndIndex);
  }
  static buildDesiredChangesString(outerObj) {
    if (outerObj == null || !Array.isArray(outerObj['Improvements']))
      return '';
    let wantedValues = [];
    for (let improvementObj of outerObj['Improvements']) {
      if (improvementObj == null)
        continue;
      if (improvementObj['Wanted'] !== true)
        continue;
      let whatValue = improvementObj['What'];
      if (typeof(whatValue) != 'string')
        continue;
      whatValue = whatValue.trim();
      if (whatValue == '')
        continue;
      wantedValues.push(whatValue);
    }
    return wantedValues.join(';');
  }
  static buildImprovementFileName(improvementNumber) {
    let now = new Date();
    let dateGmt = now.getUTCFullYear().toString() + (now.getUTCMonth() + 1).toString().padStart(2, '0') + now.getUTCDate().toString().padStart(2, '0');
    let timeGmt = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0') + now.getUTCSeconds().toString().padStart(2, '0');
    return 'improvement' + improvementNumber.toString() + '-' + dateGmt + '-' + timeGmt + '.html';
  }
  static buildStoredImprovements(improvementsList) {
    let nowIso = new Date().toISOString();
    let outerObj = { 'Version': 1, 'Created': nowIso, 'Last Modified': nowIso, 'Improvements': [] };
    if (!Array.isArray(improvementsList))
      return outerObj;
    for (let improvement of improvementsList) {
      if (improvement == null)
        continue;
      let whatValue = improvement['What'];
      let whyValue = improvement['Why'];
      let hashValue = improvement['Hash'];
      if (typeof(whatValue) != 'string' && typeof(improvement['what']) == 'string')
        whatValue = improvement['what'];
      if (typeof(whyValue) != 'string' && typeof(improvement['why']) == 'string')
        whyValue = improvement['why'];
      if (typeof(hashValue) != 'string' && typeof(improvement['hash']) == 'string')
        hashValue = improvement['hash'];
      if (typeof(whatValue) != 'string' || typeof(whyValue) != 'string' || typeof(hashValue) != 'string')
        continue;
      outerObj = HDLmImprovements.possiblyAddImprovement(outerObj, whyValue, whatValue, hashValue);
    }
    if (Array.isArray(outerObj['Improvements'])) {
      let nowIsoInner = new Date().toISOString();
      for (let improvementObj of outerObj['Improvements']) {
        if (improvementObj == null)
          continue;
        improvementObj['Wanted'] = true;
        improvementObj['Last Modified'] = nowIsoInner;
      }
      outerObj['Last Modified'] = nowIsoInner;
    }
    return outerObj;
  }
  static buildUndesiredChangesString(outerObj) {
    if (outerObj == null || !Array.isArray(outerObj['Improvements']))
      return '';
    let unwantedValues = [];
    for (let improvementObj of outerObj['Improvements']) {
      if (improvementObj == null)
        continue;
      if (improvementObj['Wanted'] !== false)
        continue;
      let whatValue = improvementObj['What'];
      if (typeof(whatValue) != 'string')
        continue;
      whatValue = whatValue.trim();
      if (whatValue == '')
        continue;
      unwantedValues.push(whatValue);
    }
    return unwantedValues.join(';');
  }
  static buildWebUiElement() {
    const [, setRenderValue] = React.useState(1);
    HDLmWebpageImpsImprover.stateSetFunction = setRenderValue;
    function suggestionChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebpageImpsImprover.suggestionCurrentValue = event.target.value;
    }
    function urlChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebpageImpsImprover.urlInputCurrentValue = event.target.value;
      HDLmWebpageImpsImprover.urlValidated = false;
      HDLmWebpageImpsImprover.urlAccessed = false;
      HDLmWebpageImpsImprover.originalHtml = null;
      HDLmWebpageImpsImprover.originalUrl = null;
      HDLmWebpageImpsImprover.improvedHtml = null;
      HDLmWebpageImpsImprover.improvedImprovements = [];
      HDLmWebpageImpsImprover.forceReRender();
    }
    function urlKeyDown(event) {
      if (event == null || event.key !== 'Enter')
        return;
      handleUrlEnterAsync(event.target.value.trim());
    }
    async function handleUrlEnterAsync(urlStr) {
      HDLmWebpageImpsImprover.urlValidated = false;
      HDLmWebpageImpsImprover.urlAccessed = false;
      HDLmWebpageImpsImprover.originalHtml = null;
      HDLmWebpageImpsImprover.originalUrl = null;
      if (urlStr == '') {
        HDLmWebpageImpsImprover.displayErrorMessage('Please enter a URL to improve');
        HDLmWebpageImpsImprover.forceReRender();
        return;
      }
      let normalizedUrl = HDLmWebpageImpsImprover.getNormalizedWebsiteUrl(urlStr);
      if (normalizedUrl == null) {
        HDLmWebpageImpsImprover.displayErrorMessage('The URL is not valid');
        HDLmWebpageImpsImprover.forceReRender();
        return;
      }
      let errorText = HDLmWebpageImpsImprover.checkUrlValid(normalizedUrl);
      if (errorText != '') {
        HDLmWebpageImpsImprover.displayErrorMessage(errorText);
        HDLmWebpageImpsImprover.forceReRender();
        return;
      }
      try {
        let responseObj = await fetch(normalizedUrl);
        if (responseObj.ok == false) {
          HDLmWebpageImpsImprover.displayErrorMessage('Failed to access webpage URL: ' + responseObj.status + ' ' + responseObj.statusText);
          HDLmWebpageImpsImprover.forceReRender();
          return;
        }
        HDLmWebpageImpsImprover.originalHtml = await responseObj.text();
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebpageImpsImprover.displayErrorMessage('Error accessing webpage URL: ' + errorObj.message);
        HDLmWebpageImpsImprover.forceReRender();
        return;
      }
      HDLmWebpageImpsImprover.originalUrl = normalizedUrl;
      HDLmWebpageImpsImprover.urlInputCurrentValue = urlStr;
      HDLmWebpageImpsImprover.urlValidated = true;
      HDLmWebpageImpsImprover.urlAccessed = true;
      if (HDLmWebpageImpsImprover.secondTab == null || HDLmWebpageImpsImprover.secondTab.closed)
        HDLmWebpageImpsImprover.secondTab = window.open(normalizedUrl, '_blank');
      else
        HDLmWebpageImpsImprover.secondTab.location.href = normalizedUrl;
      window.focus();
      HDLmWebpageImpsImprover.forceReRender();
    }
    function improveButtonClick() {
      if (HDLmWebpageImpsImprover.improvingInProgress)
        return;
      if (HDLmWebpageImpsImprover.urlValidated == false || HDLmWebpageImpsImprover.urlAccessed == false)
        return;
      handleImproveAsync();
    }
    async function handleImproveAsync() {
      HDLmWebpageImpsImprover.improvingInProgress = true;
      HDLmWebpageImpsImprover.forceReRender();
      let showDirectoryPickerFunction = null;
      if (typeof(window.showdirectorypicker) == 'function')
        showDirectoryPickerFunction = window.showdirectorypicker;
      else if (typeof(window.showDirectoryPicker) == 'function')
        showDirectoryPickerFunction = window.showDirectoryPicker;
      if (showDirectoryPickerFunction == null) {
        HDLmWebpageImpsImprover.improvingInProgress = false;
        HDLmWebpageImpsImprover.forceReRender();
        HDLmWebpageImpsImprover.displayErrorMessage('The browser does not support directory selection');
        return;
      }
      let rootDirectoryHandle = null;
      try {
        rootDirectoryHandle = await showDirectoryPickerFunction.call(window, { mode: 'readwrite', startIn: 'documents' });
      }
      catch (errorObj) {
        HDLmWebpageImpsImprover.improvingInProgress = false;
        HDLmWebpageImpsImprover.forceReRender();
        if (errorObj != null && errorObj.name != 'AbortError')
          HDLmWebpageImpsImprover.displayErrorMessage('Unable to select directory: ' + errorObj.message);
        return;
      }
      let suggestionText = HDLmWebpageImpsImprover.suggestionCurrentValue;
      if (typeof(suggestionText) != 'string')
        suggestionText = '';
      suggestionText = suggestionText.trim();
      if (suggestionText == suggestionPlaceholderWimWIV1)
        suggestionText = '';
      let storageSuffix = HDLmWebpageImpsImprover.getModifiedWebsiteUrl(HDLmWebpageImpsImprover.originalUrl);
      let existingOuterObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      let desiredImprovementsStr = HDLmWebpageImpsImprover.buildDesiredChangesString(existingOuterObj);
      let undesiredImprovementsStr = HDLmWebpageImpsImprover.buildUndesiredChangesString(existingOuterObj);
      let aiResult;
      try {
        aiResult = await HDLmAI.openRouterImproveWebpageV1(HDLmWebpageImpsImprover.originalUrl,
                                                           HDLmWebpageImpsImprover.originalHtml,
                                                           suggestionText,
                                                           useAIVersionWimWIV1,
                                                           openRouterChatTemplatesWimWIV1,
                                                           openRouterResponseFormatTypeJsonObjectWimWIV1,
                                                           openRouterResponseJsonSchemaImproverWimWIV1,
                                                           desiredImprovementsStr,
                                                           undesiredImprovementsStr);
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebpageImpsImprover.improvingInProgress = false;
        HDLmWebpageImpsImprover.forceReRender();
        HDLmWebpageImpsImprover.displayErrorMessage('An error occurred while improving the webpage: ' + errorObj.message);
        return;
      }
      let improvedHtml = null;
      let returnedImprovements = [];
      if (aiResult != null) {
        if (typeof(aiResult.improvedHtml) == 'string')
          improvedHtml = aiResult.improvedHtml;
        if (Array.isArray(aiResult.improvements))
          returnedImprovements = aiResult.improvements;
      }
      if (typeof(improvedHtml) != 'string' || improvedHtml == '') {
        HDLmWebpageImpsImprover.improvingInProgress = false;
        HDLmWebpageImpsImprover.forceReRender();
        HDLmWebpageImpsImprover.displayErrorMessage('The improved webpage was not returned by the AI service');
        return;
      }
      improvedHtml = HDLmWebpageImpsImprover.addBaseUrl(improvedHtml, HDLmWebpageImpsImprover.originalUrl);
      improvedHtml = HDLmWebpageImpsImprover.addGoogleAnalyticsTag(improvedHtml);
      let rebuiltOuterObj = HDLmWebpageImpsImprover.buildStoredImprovements(returnedImprovements);
      if (storageSuffix != '')
        HDLmImprovements.putImprovements(rebuiltOuterObj, storageSuffix);
      HDLmWebpageImpsImprover.improvedImprovements = Array.isArray(rebuiltOuterObj['Improvements']) ? rebuiltOuterObj['Improvements'] : [];
      HDLmWebpageImpsImprover.improvedHtml = improvedHtml;
      let displayHtml = HDLmWebpageImpsImprover.addStylesAndMessageHandler(improvedHtml, HDLmWebpageImpsImprover.improvedImprovements);
      if (HDLmWebpageImpsImprover.thirdTab == null || HDLmWebpageImpsImprover.thirdTab.closed)
        HDLmWebpageImpsImprover.thirdTab = window.open('', '_blank');
      if (HDLmWebpageImpsImprover.thirdTab != null) {
        HDLmWebpageImpsImprover.thirdTab.document.open();
        HDLmWebpageImpsImprover.thirdTab.document.write(displayHtml);
        HDLmWebpageImpsImprover.thirdTab.document.close();
      }
      await HDLmWebpageImpsImprover.runPhaseTwo(rootDirectoryHandle,
                                                HDLmWebpageImpsImprover.originalUrl,
                                                HDLmWebpageImpsImprover.originalHtml,
                                                suggestionText,
                                                HDLmWebpageImpsImprover.improvedImprovements);
      HDLmWebpageImpsImprover.improvingInProgress = false;
      HDLmWebpageImpsImprover.forceReRender();
      window.focus();
    }
    function saveHtmlButtonClick() {
      if (HDLmWebpageImpsImprover.improvedHtml == null)
        return;
      HDLmHtml.saveHtml(HDLmWebpageImpsImprover.improvedHtml).then(function(errorMsg) {
        if (errorMsg != null)
          HDLmWebpageImpsImprover.displayErrorMessage(errorMsg);
      });
    }
    function saveImprovementsButtonClick() {
      let storageSuffix = HDLmWebpageImpsImprover.getModifiedWebsiteUrl(HDLmWebpageImpsImprover.originalUrl);
      if (storageSuffix == '') {
        HDLmWebpageImpsImprover.displayErrorMessage('No improvements to save');
        return;
      }
      let outerObj = HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null) {
        HDLmWebpageImpsImprover.displayErrorMessage('No improvements to save');
        return;
      }
      HDLmImprovements.saveImprovements(outerObj).then(function(errorMsg) {
        if (errorMsg != null)
          HDLmWebpageImpsImprover.displayErrorMessage(errorMsg);
      });
    }
    function loadImprovementsButtonClick() {
      handleLoadImprovementsAsync();
    }
    async function handleLoadImprovementsAsync() {
      let loadedObj = await HDLmImprovements.loadImprovements();
      if (loadedObj == null)
        return;
      let storageSuffix = HDLmWebpageImpsImprover.getModifiedWebsiteUrl(HDLmWebpageImpsImprover.originalUrl);
      if (storageSuffix == '') {
        HDLmWebpageImpsImprover.displayErrorMessage('Enter and validate a URL before loading improvements');
        return;
      }
      let existingObj = HDLmImprovements.getImprovements(storageSuffix);
      if (Array.isArray(loadedObj['Improvements'])) {
        for (let improvementObj of loadedObj['Improvements']) {
          if (improvementObj == null)
            continue;
          existingObj = HDLmImprovements.possiblyAddImprovement(existingObj,
                                                                improvementObj['Why'],
                                                                improvementObj['What'],
                                                                improvementObj['Hash']);
        }
      }
      HDLmImprovements.putImprovements(existingObj, storageSuffix);
      HDLmWebpageImpsImprover.forceReRender();
    }
    function handleYesChange(index) {
      let storageSuffix = HDLmWebpageImpsImprover.getModifiedWebsiteUrl(HDLmWebpageImpsImprover.originalUrl);
      let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null || !Array.isArray(outerObj['Improvements']))
        return;
      if (index < 0 || index >= outerObj['Improvements'].length)
        return;
      let nowIso = new Date().toISOString();
      outerObj['Improvements'][index]['Wanted'] = true;
      outerObj['Improvements'][index]['Last Modified'] = nowIso;
      outerObj['Last Modified'] = nowIso;
      HDLmImprovements.putImprovements(outerObj, storageSuffix);
      HDLmWebpageImpsImprover.forceReRender();
    }
    function handleNotChange(index) {
      let storageSuffix = HDLmWebpageImpsImprover.getModifiedWebsiteUrl(HDLmWebpageImpsImprover.originalUrl);
      let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null || !Array.isArray(outerObj['Improvements']))
        return;
      if (index < 0 || index >= outerObj['Improvements'].length)
        return;
      let nowIso = new Date().toISOString();
      outerObj['Improvements'][index]['Wanted'] = false;
      outerObj['Improvements'][index]['Last Modified'] = nowIso;
      outerObj['Last Modified'] = nowIso;
      HDLmImprovements.putImprovements(outerObj, storageSuffix);
      HDLmWebpageImpsImprover.forceReRender();
    }
    function handleDeleteChange(index) {
      let storageSuffix = HDLmWebpageImpsImprover.getModifiedWebsiteUrl(HDLmWebpageImpsImprover.originalUrl);
      let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null)
        return;
      outerObj = HDLmImprovements.deleteImprovement(outerObj, index);
      HDLmImprovements.putImprovements(outerObj, storageSuffix);
      HDLmWebpageImpsImprover.forceReRender();
    }
    function handleDeleteKey(index, event) {
      if (event == null || event.key !== 'Delete')
        return;
      event.preventDefault();
      handleDeleteChange(index);
    }
    function handleRowClick(hashCode) {
      if (HDLmWebpageImpsImprover.thirdTab == null || HDLmWebpageImpsImprover.thirdTab.closed)
        return;
      if (typeof(hashCode) != 'string' || hashCode == '')
        return;
      HDLmWebpageImpsImprover.thirdTab.postMessage(hashCode + ' hilite');
      setTimeout(function() {
        if (HDLmWebpageImpsImprover.thirdTab == null || HDLmWebpageImpsImprover.thirdTab.closed)
          return;
        HDLmWebpageImpsImprover.thirdTab.postMessage(hashCode + ' normal');
      }, 30000);
    }
    let headingElement = React.createElement('h2', null, headingWimWIV1['pageText']);
    let urlInputElement = HDLmReactEight.buildSingleLineInputWLabel(helpTextWimWIV1['url'], 'https://www.example.com', 'urlInputWimWIV1', urlKeyDown, urlChange, HDLmWebpageImpsImprover.urlInputCurrentValue, true, { marginTop: '0px' }, { marginTop: '0px' }, { display: 'block', marginBottom: '0px' });
    let suggestionElement = HDLmReactEight.buildTextAreaWLabel(helpTextWimWIV1['suggestion'], suggestionPlaceholderWimWIV1, 'suggestionInputWimWIV1', suggestionChange, HDLmWebpageImpsImprover.suggestionCurrentValue, 5, { marginTop: '16px' }, { width: '720px', maxWidth: '100%' }, { display: 'block', marginBottom: '4px' });
    let improveDisabled = HDLmWebpageImpsImprover.urlValidated == false || HDLmWebpageImpsImprover.urlAccessed == false || HDLmWebpageImpsImprover.originalHtml == null || HDLmWebpageImpsImprover.improvingInProgress;
    let saveHtmlDisabled = HDLmWebpageImpsImprover.improvedHtml == null || HDLmWebpageImpsImprover.improvedImprovements.length == 0;
    let improveButton = HDLmReactEight.buildButtonElement('improveButtonWimWIV1', 'Improve (generate HTML)', improveButtonClick, improveDisabled, { marginTop: '20px' }, helpTextWimWIV1['improve']);
    let saveHtmlButton = HDLmReactEight.buildButtonElement('saveHtmlButtonWimWIV1', 'Save (generated HTML)', saveHtmlButtonClick, saveHtmlDisabled, { marginTop: '20px' }, helpTextWimWIV1['saveHtml']);
    let saveImprovementsButton = HDLmReactEight.buildButtonElement('saveImprovementsButtonWimWIV1', 'Save (improvements)', saveImprovementsButtonClick, false, { marginTop: '20px' }, helpTextWimWIV1['saveImprovements']);
    let loadImprovementsButton = HDLmReactEight.buildButtonElement('loadImprovementsButtonWimWIV1', 'Load (improvements)', loadImprovementsButtonClick, false, { marginTop: '20px' }, helpTextWimWIV1['loadImprovements']);
    let buttonsRowElement = React.createElement('div', { style: { marginTop: '16px' } }, improveButton, saveHtmlButton, saveImprovementsButton, loadImprovementsButton);
    let directoryHelpElement = React.createElement('div', { style: { marginTop: '12px' } }, helpTextWimWIV1['directory']);
    let spinnerElement = HDLmWebpageImpsImprover.improvingInProgress ? HDLmReactEight.buildSpinnerElement() : null;
    let storageSuffix = HDLmWebpageImpsImprover.getModifiedWebsiteUrl(HDLmWebpageImpsImprover.originalUrl);
    let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
    let improvementsArray = [];
    if (outerObj != null && Array.isArray(outerObj['Improvements']))
      improvementsArray = outerObj['Improvements'];
    let improvementsAreaElement = null;
    if (improvementsArray.length == 0)
      improvementsAreaElement = React.createElement('div', { style: { marginTop: '16px' } }, React.createElement('p', null, 'No improvements so far'));
    else
      improvementsAreaElement = React.createElement('div', { style: { marginTop: '16px' } }, HDLmReactEight.buildImprovementsTable(improvementsArray, handleYesChange, handleNotChange, handleDeleteChange, handleRowClick, handleDeleteKey));
    let elementsArray = [headingElement, urlInputElement, suggestionElement, buttonsRowElement, directoryHelpElement];
    if (spinnerElement != null)
      elementsArray.push(spinnerElement);
    elementsArray.push(improvementsAreaElement);
    return HDLmReactEight.putElementsInFragment(elementsArray);
  }
  static async checkServerStatus() {
    let requestAJAXAsyncTrue = true;
    let requestType = 'URL';
    let serverName = HDLmConfigInfo.getServerName();
    let serverStatusStr = HDLmDefines.getString('HDLMGETSSVALUE');
    let urlStr = 'https://' + serverName + '/' + serverStatusStr;
    let userid = '';
    let password = '';
    let httpType = 'get';
    let extraInfo = '';
    try {
      await HDLmAJAX.runAJAX(requestType,
                             requestAJAXAsyncTrue,
                             urlStr,
                             userid,
                             password,
                             httpType,
                             extraInfo);
      return true;
    }
    catch (errorObj) {
      console.error(errorObj);
      HDLmWebpageImpsImprover.displayErrorMessage('The server status request failed');
      return false;
    }
  }
  static checkUrlValid(urlStr) {
    let errorText = '';
    try {
      new URL(urlStr);
    }
    catch (errorObj) {
      console.error(errorObj);
      return errorObj.message;
    }
    let hostNameStr = HDLmHtml.getHostName(urlStr);
    let typeOfHost = typeof(hostNameStr);
    if (typeOfHost == 'undefined')
      errorText = 'Host name is undefined';
    if (hostNameStr == null)
      errorText = 'Host name is null';
    if (typeOfHost != 'string')
      errorText = 'Host name is not a string';
    if (typeOfHost == 'string' && hostNameStr == '')
      errorText = 'Host name is empty';
    return errorText;
  }
  static displayErrorMessage(errorMessage) {
    alert(String(errorMessage));
  }
  static forceReRender() {
    HDLmWebpageImpsImprover.inputKeyValue++;
    if (HDLmWebpageImpsImprover.stateSetFunction != null)
      HDLmWebpageImpsImprover.stateSetFunction(HDLmWebpageImpsImprover.inputKeyValue);
  }
  static getModifiedWebsiteUrl(urlStr) {
    if (typeof(urlStr) != 'string' || urlStr == '')
      return '';
    let localUrl = urlStr.trim();
    if (localUrl == '')
      return '';
    if (localUrl.toLowerCase().startsWith('http://') == false && localUrl.toLowerCase().startsWith('https://') == false)
      localUrl = 'https://' + localUrl;
    let localUrlObj;
    try {
      localUrlObj = new URL(localUrl);
    }
    catch (errorObj) {
      console.error(errorObj);
      return '';
    }
    localUrlObj.search = '';
    localUrlObj.hash = '';
    let pathPart = localUrlObj.pathname;
    if (pathPart == '/')
      pathPart = '';
    return localUrlObj.host + pathPart;
  }
  static getNormalizedWebsiteUrl(urlValue) {
    if (typeof(urlValue) != 'string')
      return null;
    let localUrl = urlValue.trim();
    if (localUrl == '')
      return null;
    if (localUrl.toLowerCase().startsWith('http://') == false && localUrl.toLowerCase().startsWith('https://') == false)
      localUrl = 'https://' + localUrl;
    try {
      let localUrlObj = new URL(localUrl);
      localUrlObj.hash = '';
      localUrlObj.search = '';
      return localUrlObj.toString();
    }
    catch (errorObj) {
      console.error(errorObj);
      return null;
    }
  }
  static main() {
    if (HDLmWebpageImpsImprover.shouldProgramRun(window.location.pathname) == false)
      return;
    HDLmWebpageImpsImprover.mainAsync();
  }
  static async mainAsync() {
    let configsObj = await HDLmConfig.getConfigs();
    HDLmConfig.addConfigs(configsObj);
    let windowLocationHostName = window.location.hostname;
    let localMode = true;
    if (windowLocationHostName != null && windowLocationHostName !== undefined && windowLocationHostName.indexOf('t') > 0)
      localMode = false;
    HDLmUtility.setProdMode(localMode);
    let stage = HDLmWebpageImpsImproverStageTypes.setTitle;
    HDLmWebpageImpsImprover.nextStage(stage, null);
  }
  static async nextStage(stage, varNext) {
    let nextStageLoop = true;
    while (nextStageLoop) {
      if (HDLmUtility.isVscode())
        console.log('In HDLmWebpageImpsImprover.nextStage while loop ' + stage, varNext);
      switch (stage) {
        case HDLmWebpageImpsImproverStageTypes.setTitle: {
          HDLmWebpageImpsImprover.addSpinnerStyle();
          stage = HDLmWebpageImpsImproverStageTypes.checkServerStatus;
          break;
        }
        case HDLmWebpageImpsImproverStageTypes.checkServerStatus: {
          let serverUp = await HDLmWebpageImpsImprover.checkServerStatus();
          if (serverUp == false) {
            HDLmWebpageImpsImprover.displayErrorMessage('The server is unavailable');
            nextStageLoop = false;
            break;
          }
          stage = HDLmWebpageImpsImproverStageTypes.showWebpageUi;
          break;
        }
        case HDLmWebpageImpsImproverStageTypes.showWebpageUi: {
          let reactRoot = HDLmReactEight.getRootContainer('leftAndRightPage');
          reactRoot.render(React.createElement(HDLmWebpageImpsImprover.buildWebUiElement));
          window.focus();
          setTimeout(function() { window.focus(); }, 0);
          stage = HDLmWebpageImpsImproverStageTypes.visibilityChange;
          break;
        }
        case HDLmWebpageImpsImproverStageTypes.beforeUnload: {
          nextStageLoop = false;
          break;
        }
        case HDLmWebpageImpsImproverStageTypes.visibilityChange: {
          HDLmWebpageImpsImprover.visibilityChangeAdd();
          let visibilityChangeResolveFunction;
          let visibilityChangePromise = new Promise(function(resolve) {
            visibilityChangeResolveFunction = resolve;
          });
          HDLmWebpageImpsImprover.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
          visibilityChangePromise.then(function() { nextStageLoop = false; },
                                       function() { nextStageLoop = false; });
          nextStageLoop = false;
          break;
        }
        default: {
          nextStageLoop = false;
          break;
        }
      }
    }
  }
  static async runPhaseTwo(rootDirectoryHandle, originalUrl, originalHtml, suggestionText, improvementsArray) {
    if (rootDirectoryHandle == null)
      return;
    if (typeof(originalUrl) != 'string' || originalUrl == '')
      return;
    if (typeof(originalHtml) != 'string' || originalHtml == '')
      return;
    if (!Array.isArray(improvementsArray))
      return;
    for (let i = 0; i < improvementsArray.length; i++) {
      let improvementObj = improvementsArray[i];
      if (improvementObj == null)
        continue;
      let desiredWhat = improvementObj['What'];
      if (typeof(desiredWhat) != 'string')
        continue;
      desiredWhat = desiredWhat.trim();
      if (desiredWhat == '')
        continue;
      let aiResult;
      try {
        aiResult = await HDLmAI.openRouterImproveWebpageV1(originalUrl,
                                                           originalHtml,
                                                           suggestionText,
                                                           useAIVersionWimWIV1,
                                                           openRouterChatTemplatesWimWIV1,
                                                           openRouterResponseFormatTypeJsonObjectWimWIV1,
                                                           openRouterResponseJsonSchemaImproverWimWIV1,
                                                           desiredWhat,
                                                           '');
      }
      catch (errorObj) {
        console.error(errorObj);
        continue;
      }
      let phaseTwoHtml = null;
      if (aiResult != null && typeof(aiResult.improvedHtml) == 'string')
        phaseTwoHtml = aiResult.improvedHtml;
      if (typeof(phaseTwoHtml) != 'string' || phaseTwoHtml == '')
        continue;
      phaseTwoHtml = HDLmWebpageImpsImprover.addBaseUrl(phaseTwoHtml, originalUrl);
      phaseTwoHtml = HDLmWebpageImpsImprover.addGoogleAnalyticsTag(phaseTwoHtml);
      let fileName = HDLmWebpageImpsImprover.buildImprovementFileName(i + 1);
      let saveError = await HDLmImprovements.saveGeneratedHtmlFile(rootDirectoryHandle, fileName, phaseTwoHtml);
      if (saveError != null)
        HDLmWebpageImpsImprover.displayErrorMessage(saveError);
    }
  }
  static shouldProgramRun(pathnameValue) {
    if (typeof(pathnameValue) != 'string')
      return false;
    let lowerPathname = pathnameValue.toLowerCase();
    if (lowerPathname.endsWith('index.html'))
      return true;
    if (lowerPathname.indexOf('/webpageimpsimprover') >= 0)
      return true;
    if (lowerPathname.indexOf('/revenueimproverimps') >= 0)
      return true;
    return false;
  }
  static visibilityChangeAdd() {
    window.addEventListener('visibilitychange', function(event) {
      HDLmWebpageImpsImprover.visibilityChangeDone(event);
    });
  }
  static visibilityChangeDone(event) {
    if (event == null)
      return;
    if (document.visibilityState === 'hidden')
      HDLmWebpageImpsImprover.visibilityChangeHiddenCount++;
    if (document.visibilityState === 'visible')
      HDLmWebpageImpsImprover.visibilityChangeVisibleCount++;
    if (document.visibilityState === 'hidden' && HDLmWebpageImpsImprover.visibilityChangeHiddenCount > 1 && HDLmWebpageImpsImprover.visibilityChangeHiddenCount > HDLmWebpageImpsImprover.visibilityChangeVisibleCount) {
      if (HDLmWebpageImpsImprover.visibilityChangeResolveFunction != null)
        HDLmWebpageImpsImprover.visibilityChangeResolveFunction('The visibility of the browser was hidden');
    }
  }
}
HDLmWebpageImpsImprover.improvedHtml = null;
HDLmWebpageImpsImprover.improvedImprovements = [];
HDLmWebpageImpsImprover.originalHtml = null;
HDLmWebpageImpsImprover.originalUrl = null;
HDLmWebpageImpsImprover.urlInputCurrentValue = '';
HDLmWebpageImpsImprover.urlValidated = false;
HDLmWebpageImpsImprover.urlAccessed = false;
HDLmWebpageImpsImprover.suggestionCurrentValue = '';
HDLmWebpageImpsImprover.improvingInProgress = false;
HDLmWebpageImpsImprover.inputKeyValue = 1;
HDLmWebpageImpsImprover.stateSetFunction = null;
HDLmWebpageImpsImprover.secondTab = null;
HDLmWebpageImpsImprover.thirdTab = null;
HDLmWebpageImpsImprover.visibilityChangeResolveFunction = null;
HDLmWebpageImpsImprover.visibilityChangeHiddenCount = 0;
HDLmWebpageImpsImprover.visibilityChangeVisibleCount = 0;
