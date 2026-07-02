/**
 * HDLmWebpageImprover short summary.
 * HDLmWebpageImprover description.
 * @version 1.0
 * @author Peter
 */
"use strict";
let useAIVersionWpiWIV1;
useAIVersionWpiWIV1 = 'openRouterWpiWIV1';
const headingWpiWIV1 = { 'pageText': 'Page Revenue Improver' };
const helpTextWpiWIV1 = {
  'url': 'Enter the full URL of the webpage you want to improve. Press Enter to fetch and validate the URL.',
  'suggestion': 'A suggestion is a short phrase describing how you would like the webpage to be improved.',
  'improve': 'Click to generate an improved version of the webpage using AI.',
  'saveHtml': 'Click to save the improved webpage HTML to a local file.',
  'saveImprovements': 'Click to save the list of improvements to a local file.',
  'loadImprovements': 'Click to load a saved list of improvements and merge with existing improvements.'
};
const openRouterChatTemplatesWpiWIV1 = {
  'context': 'You are an expert at improving webpages to increase conversion rates and revenue.\n' +
             'Copy everything from the old HTML to the generated HTML by default unless a change is made.\n' +
             'If Desired changes is empty, devise some improvements on your own while considering the contents of the Undesired changes field.\n' +
             'If Desired changes is not empty, do not devise any improvements on your own.\n' +
             'Instead, use only the contents of the Desired changes field while considering the contents of the Undesired changes field.\n' +
             'If the User suggestion is empty, ignore it.\n' +
             'For each improvement, create a hash code using the DJB2 algorithm.\n' +
             'Start with the value 5381.\n' +
             'Hash the What value and the Why value together.\n' +
             'Convert the final unsigned hash value to hexadecimal.\n' +
             'Prefix the hexadecimal value with HDLmClass.\n' +
             'Return each improvement hash code using the key Hash.\n' +
             'Do not use hash or hashCode.\n' +
             'Mark the changed HTML for each improvement by adding a class with that exact HDLmClass-prefixed hash code.\n' +
             'Return the complete improved HTML and a list of improvements.\n',
  'webpageServer': 'Please improve the following HTML to increase conversion rates ' +
                   'and revenue.\n' +
                   'Return the complete improved HTML and a list ' +
                   'of improvements made, each with a What field and a Why field and a Hash field.\n' +
                   '\n' +
                   'HTML:\n' +
                   '{{html}}\n' +
                   'User suggestion: {{suggest}}\n' +
                   'Desired changes: ({{desired}})\n' +
                   'Undesired changes: ({{undesired}})\n'
};
const openRouterResponseFormatTypeJsonObjectWpiWIV1 = { 'type': 'json_object' };
const openRouterResponseJsonSchemaImproverWpiWIV1 = {
  'type': 'json_schema',
  'json_schema': {
    'name': 'webpage_improver_response',
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
class HDLmWebpageImprover {
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
    let insertPos = headTagEnd + 1;
    return html.substring(0, insertPos) + baseTag + html.substring(insertPos);
  }
  static addGoogleAnalyticsTag(html) {
    if (html == null)
      return html;
    let now = new Date();
    let dateGmt = now.getUTCFullYear().toString() + (now.getUTCMonth() + 1).toString().padStart(2, '0') + now.getUTCDate().toString().padStart(2, '0');
    let timeGmt = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0') + now.getUTCSeconds().toString().padStart(2, '0');
    let gaTagValue = 'HDLmGAWpiTag-' + dateGmt + '-' + timeGmt;
    let gaScript = '<script>(function(){var tag="' + gaTagValue + '";if(typeof gtag==="function"){gtag("event",tag,{event_category:"HDLmGAWpiTag",event_label:tag});}})();</script>';
    let bodyClose = html.toLowerCase().indexOf('</body>');
    if (bodyClose >= 0)
      return html.substring(0, bodyClose) + gaScript + html.substring(bodyClose);
    return html + gaScript;
  }
  static addSpinnerStyle() {
    if (document.getElementById('hdlmWebpageImproverSpinnerStyle') != null)
      return;
    let styleEl = document.createElement('style');
    styleEl.id = 'hdlmWebpageImproverSpinnerStyle';
    styleEl.innerHTML = '@keyframes hdlm-wiv1-spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
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
      let animName = 'hdlm-anim-' + hashCode;
      stylesHtml += '<style id="hdlm-style-' + hashCode + '">';
      stylesHtml += '.' + hashCode + '{animation:' + animName + ' 0.6s step-start infinite;outline:4px solid orange;}';
      stylesHtml += '@keyframes ' + animName + '{0%,100%{outline:4px solid orange;background-color:rgba(255,165,0,0.3);}50%{outline:none;background-color:transparent;}}';
      stylesHtml += '</style>';
    }
    let scriptHtml = '<script>';
    scriptHtml += '(function(){';
    scriptHtml += 'document.querySelectorAll("style[id^=\\"hdlm-style-\\"]").forEach(function(s){s.disabled=true;});';
    scriptHtml += 'window.addEventListener("message",function(event){';
    scriptHtml += 'var parts=String(event.data).split(" ");if(parts.length<2)return;';
    scriptHtml += 'var hashCode=parts[0];var action=parts[1];';
    scriptHtml += 'var styleEl=document.getElementById("hdlm-style-"+hashCode);if(styleEl==null)return;';
    scriptHtml += 'if(action==="hilite"){styleEl.disabled=false;}else if(action==="normal"){styleEl.disabled=true;}';
    scriptHtml += '});';
    scriptHtml += '})();';
    scriptHtml += '</script>';
    let insertHtml = stylesHtml + scriptHtml;
    let headEndIndex = html.toLowerCase().indexOf('</head>');
    if (headEndIndex < 0)
      return html + insertHtml;
    return html.substring(0, headEndIndex) + insertHtml + html.substring(headEndIndex);
  }
  static beforeUnloadAdd() {
    window.addEventListener('beforeunload', function(event) {
      HDLmWebpageImprover.beforeUnloadDone(event);
    });
  }
  static beforeUnloadDone(event) {
    if (event == null)
      return;
    if (HDLmWebpageImprover.beforeUnloadResolveFunction != null)
      HDLmWebpageImprover.beforeUnloadResolveFunction('The browser is about to be closed');
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
      for (let improvementObj of outerObj['Improvements']) {
        if (improvementObj == null)
          continue;
        improvementObj['Wanted'] = true;
      }
    }
    outerObj['Last Modified'] = new Date().toISOString();
    return outerObj;
  }
  static buildWhatChangesString(improvements) {
    if (!Array.isArray(improvements))
      return '';
    let whatValues = [];
    for (let improvement of improvements) {
      if (improvement == null)
        continue;
      let whatValue = improvement['What'];
      if (typeof(whatValue) != 'string')
        continue;
      whatValue = whatValue.trim();
      if (whatValue == '')
        continue;
      whatValues.push(whatValue);
    }
    return whatValues.join(';');
  }
  static buildWebUiElement() {
    const [, setRenderValue] = React.useState(1);
    HDLmWebpageImprover.stateSetFunction = setRenderValue;
    function urlKeyDown(event) {
      if (event.key !== 'Enter')
        return;
      handleUrlEnterAsync(event.target.value.trim());
    }
    async function handleUrlEnterAsync(urlStr) {
      if (urlStr == '') {
        HDLmWebpageImprover.displayErrorMessage('Please enter a URL to improve');
        return;
      }
      HDLmWebpageImprover.urlInputCurrentValue = urlStr;
      let inputUrlOriginal = urlStr;
      if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://'))
        urlStr = 'https://' + urlStr;
      let errorText = HDLmWebpageImprover.checkUrlValid(urlStr);
      if (errorText != '') {
        HDLmWebpageImprover.displayErrorMessage(errorText);
        HDLmWebpageImprover.originalHtml = null;
        HDLmWebpageImprover.originalUrl = null;
        HDLmWebpageImprover.improvedHtml = null;
        HDLmWebpageImprover.improvedImprovements = [];
        HDLmWebpageImprover.forceReRender();
        return;
      }
      let html = null;
      try {
        let response = await fetch(urlStr);
        if (!response.ok) {
          HDLmWebpageImprover.displayErrorMessage('Failed to fetch URL: ' + response.status + ' ' + response.statusText);
          return;
        }
        html = await response.text();
      }
      catch (errorObj) {
        HDLmWebpageImprover.displayErrorMessage('Error fetching URL: ' + errorObj.message);
        return;
      }
      html = HDLmWebpageImprover.addBaseUrl(html, urlStr);
      HDLmWebpageImprover.urlInputCurrentValue = inputUrlOriginal;
      HDLmWebpageImprover.originalHtml = html;
      HDLmWebpageImprover.originalUrl = urlStr;
      HDLmWebpageImprover.improvedHtml = null;
      HDLmWebpageImprover.improvedImprovements = [];
      if (HDLmWebpageImprover.secondTab == null || HDLmWebpageImprover.secondTab.closed)
        HDLmWebpageImprover.secondTab = window.open(urlStr, '_blank');
      else
        HDLmWebpageImprover.secondTab.location.href = urlStr;
      window.focus();
      HDLmWebpageImprover.forceReRender();
    }
    function suggestionKeyDown(event) {
      if (event == null)
        return;
      HDLmWebpageImprover.suggestionCurrentValue = event.target.value;
    }
    function improveButtonClick() {
      if (HDLmWebpageImprover.improvingInProgress)
        return;
      if (HDLmWebpageImprover.originalHtml == null)
        return;
      handleImproveAsync();
    }
    async function handleImproveAsync() {
      HDLmWebpageImprover.improvingInProgress = true;
      HDLmWebpageImprover.forceReRender();
      let urlStr = HDLmWebpageImprover.originalUrl;
      let suggestionInput = document.getElementById('suggestionInputWpiWIV1');
      let suggestionText = '';
      if (suggestionInput != null && typeof(suggestionInput.value) == 'string')
        suggestionText = suggestionInput.value;
      HDLmWebpageImprover.suggestionCurrentValue = suggestionText;
      let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(urlStr);
      let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      let desiredImprovements = [];
      let undesiredImprovements = [];
      if (outerObj != null && Array.isArray(outerObj['Improvements'])) {
        for (let improvement of outerObj['Improvements']) {
          if (improvement == null)
            continue;
          if (improvement['Wanted'] === true)
            desiredImprovements.push(improvement);
          else
            undesiredImprovements.push(improvement);
        }
      }
      let desiredImprovementsStr = HDLmWebpageImprover.buildWhatChangesString(desiredImprovements);
      let undesiredImprovementsStr = HDLmWebpageImprover.buildWhatChangesString(undesiredImprovements);
      try {
        let aiResult = await HDLmAI.openRouterImproveWebpageV1(urlStr,
                                                               HDLmWebpageImprover.originalHtml,
                                                               suggestionText,
                                                               useAIVersionWpiWIV1,
                                                               openRouterChatTemplatesWpiWIV1,
                                                               openRouterResponseFormatTypeJsonObjectWpiWIV1,
                                                               openRouterResponseJsonSchemaImproverWpiWIV1,
                                                               desiredImprovementsStr,
                                                               undesiredImprovementsStr);
        let aiImprovedHtml = null;
        let aiImprovements = [];
        if (aiResult != null) {
          aiImprovedHtml = aiResult.improvedHtml;
          if (Array.isArray(aiResult.improvements))
            aiImprovements = aiResult.improvements;
        }
        if (typeof(aiImprovedHtml) != 'string' || aiImprovedHtml == '') {
          HDLmWebpageImprover.displayErrorMessage('The improved webpage was not returned by the AI service');
          HDLmWebpageImprover.improvingInProgress = false;
          HDLmWebpageImprover.forceReRender();
          return;
        }
        let rebuiltOuterObj = HDLmWebpageImprover.buildStoredImprovements(aiImprovements);
        if (storageSuffix != '')
          HDLmImprovements.putImprovements(rebuiltOuterObj, storageSuffix);
        let currentImprovements = [];
        if (rebuiltOuterObj != null && Array.isArray(rebuiltOuterObj['Improvements']))
          currentImprovements = rebuiltOuterObj['Improvements'];
        HDLmWebpageImprover.improvedImprovements = currentImprovements;
        HDLmWebpageImprover.improvedHtml = HDLmWebpageImprover.addGoogleAnalyticsTag(aiImprovedHtml);
        let displayHtml = HDLmWebpageImprover.addStylesAndMessageHandler(HDLmWebpageImprover.improvedHtml, currentImprovements);
        if (HDLmWebpageImprover.thirdTab == null || HDLmWebpageImprover.thirdTab.closed)
          HDLmWebpageImprover.thirdTab = window.open('', '_blank');
        if (HDLmWebpageImprover.thirdTab != null) {
          HDLmWebpageImprover.thirdTab.document.open();
          HDLmWebpageImprover.thirdTab.document.write(displayHtml);
          HDLmWebpageImprover.thirdTab.document.close();
        }
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebpageImprover.displayErrorMessage('An error occurred while improving the webpage: ' + errorObj.message);
      }
      HDLmWebpageImprover.improvingInProgress = false;
      HDLmWebpageImprover.forceReRender();
      window.focus();
    }
    function saveHtmlButtonClick() {
      if (HDLmWebpageImprover.improvedHtml == null)
        return;
      HDLmHtml.saveHtml(HDLmWebpageImprover.improvedHtml).then(function(errorMsg) {
        if (errorMsg != null)
          HDLmWebpageImprover.displayErrorMessage(errorMsg);
      });
    }
    function saveImprovementsButtonClick() {
      let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
      if (storageSuffix == '') {
        HDLmWebpageImprover.displayErrorMessage('No improvements to save');
        return;
      }
      let outerObj = HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null) {
        HDLmWebpageImprover.displayErrorMessage('No improvements to save');
        return;
      }
      HDLmImprovements.saveImprovements(outerObj).then(function(errorMsg) {
        if (errorMsg != null)
          HDLmWebpageImprover.displayErrorMessage(errorMsg);
      });
    }
    function loadImprovementsButtonClick() {
      handleLoadImprovementsAsync();
    }
    async function handleLoadImprovementsAsync() {
      let loadedObj = await HDLmImprovements.loadImprovements();
      if (loadedObj == null)
        return;
      let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
      if (storageSuffix == '') {
        HDLmWebpageImprover.displayErrorMessage('Enter and validate a URL before loading improvements');
        return;
      }
      let existingObj = HDLmImprovements.getImprovements(storageSuffix);
      if (Array.isArray(loadedObj['Improvements'])) {
        for (let imp of loadedObj['Improvements']) {
          if (imp == null)
            continue;
          existingObj = HDLmImprovements.possiblyAddImprovement(existingObj, imp['Why'], imp['What'], imp['Hash']);
        }
      }
      HDLmImprovements.putImprovements(existingObj, storageSuffix);
      HDLmWebpageImprover.forceReRender();
    }
    function handleYesChange(index) {
      let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
      let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null || !Array.isArray(outerObj['Improvements']))
        return;
      if (index < 0 || index >= outerObj['Improvements'].length)
        return;
      outerObj['Improvements'][index]['Wanted'] = true;
      outerObj['Improvements'][index]['Last Modified'] = new Date().toISOString();
      outerObj['Last Modified'] = new Date().toISOString();
      HDLmImprovements.putImprovements(outerObj, storageSuffix);
      HDLmWebpageImprover.forceReRender();
    }
    function handleNotChange(index) {
      let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
      let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null || !Array.isArray(outerObj['Improvements']))
        return;
      if (index < 0 || index >= outerObj['Improvements'].length)
        return;
      outerObj['Improvements'][index]['Wanted'] = false;
      outerObj['Improvements'][index]['Last Modified'] = new Date().toISOString();
      outerObj['Last Modified'] = new Date().toISOString();
      HDLmImprovements.putImprovements(outerObj, storageSuffix);
      HDLmWebpageImprover.forceReRender();
    }
    function handleDeleteChange(index) {
      let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
      let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
      if (outerObj == null)
        return;
      outerObj = HDLmImprovements.deleteImprovement(outerObj, index);
      HDLmImprovements.putImprovements(outerObj, storageSuffix);
      HDLmWebpageImprover.forceReRender();
    }
    function handleDeleteKey(index, event) {
      if (event == null || event.key !== 'Delete')
        return;
      event.preventDefault();
      handleDeleteChange(index);
    }
    function handleRowClick(hashCode) {
      if (HDLmWebpageImprover.thirdTab == null || HDLmWebpageImprover.thirdTab.closed)
        return;
      if (typeof(hashCode) != 'string' || hashCode == '')
        return;
      HDLmWebpageImprover.thirdTab.postMessage(hashCode + ' hilite');
      setTimeout(function() {
        if (HDLmWebpageImprover.thirdTab == null || HDLmWebpageImprover.thirdTab.closed)
          return;
        HDLmWebpageImprover.thirdTab.postMessage(hashCode + ' normal');
      }, 30000);
    }
    let pageText = headingWpiWIV1['pageText'];
    let headingElement = React.createElement('h2', null, pageText);
    let urlInputElement = HDLmReactFive.buildUrlInputWLabel('Enter URL to improve', 'https://www.example.com', 'urlInputWpiWIV1', urlKeyDown, HDLmWebpageImprover.urlInputCurrentValue, helpTextWpiWIV1['url']);
    let suggestionElement = HDLmReactFive.buildSuggestionAreaWLabel('Suggestion (optional)', 'Enter a suggestion for the page revenue improver', 'suggestionInputWpiWIV1', suggestionKeyDown, HDLmWebpageImprover.suggestionCurrentValue, helpTextWpiWIV1['suggestion']);
    let improveDisabled = HDLmWebpageImprover.originalHtml == null || HDLmWebpageImprover.improvingInProgress;
    let saveHtmlDisabled = HDLmWebpageImprover.improvedHtml == null || HDLmWebpageImprover.improvedImprovements.length == 0;
    let improveButton = HDLmReactFive.buildButtonElement('improveButtonWpiWIV1', 'Improve (generate HTML)', improveButtonClick, improveDisabled, helpTextWpiWIV1['improve']);
    let saveHtmlButton = HDLmReactFive.buildButtonElement('saveHtmlButtonWpiWIV1', 'Save (generated HTML)', saveHtmlButtonClick, saveHtmlDisabled, helpTextWpiWIV1['saveHtml']);
    let saveImprovementsButton = HDLmReactFive.buildButtonElement('saveImprovementsButtonWpiWIV1', 'Save (improvements)', saveImprovementsButtonClick, false, helpTextWpiWIV1['saveImprovements']);
    let loadImprovementsButton = HDLmReactFive.buildButtonElement('loadImprovementsButtonWpiWIV1', 'Load (improvements)', loadImprovementsButtonClick, false, helpTextWpiWIV1['loadImprovements']);
    let buttonsRowStyle = { marginTop: '16px' };
    let buttonsRowElement = React.createElement('div', { style: buttonsRowStyle }, improveButton, saveHtmlButton, saveImprovementsButton, loadImprovementsButton);
    let spinnerElement = null;
    if (HDLmWebpageImprover.improvingInProgress)
      spinnerElement = HDLmReactFive.buildSpinnerElement();
    let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
    let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
    let improvementsArray = [];
    if (outerObj != null && Array.isArray(outerObj['Improvements']))
      improvementsArray = outerObj['Improvements'];
    let improvementsAreaStyle = { marginTop: '16px' };
    let improvementsAreaElement = null;
    if (improvementsArray.length == 0)
      improvementsAreaElement = React.createElement('div', { style: improvementsAreaStyle }, React.createElement('p', null, 'No improvements so far'));
    else
      improvementsAreaElement = React.createElement('div', { style: improvementsAreaStyle }, HDLmReactFive.buildImprovementsTable(improvementsArray, handleYesChange, handleNotChange, handleDeleteChange, handleRowClick, handleDeleteKey));
    let topElements = [headingElement, urlInputElement, suggestionElement, buttonsRowElement];
    if (spinnerElement != null)
      topElements.push(spinnerElement);
    topElements.push(improvementsAreaElement);
    return HDLmReactFive.putElementsInFragment(topElements);
  }
  static async checkServerStatus() {
    let requestAJAXAsyncTrue = true;
    let requestType = 'URL';
    let serverName = HDLmConfigInfo.getServerName();
    let serverStatusStr = HDLmDefines.getString('HDLMSERVERSTATUS');
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
      HDLmWebpageImprover.displayErrorMessage('The server-status request failed');
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
      errorText = errorObj.message;
      return errorText;
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
    alert(errorMessage);
  }
  static forceReRender() {
    HDLmWebpageImprover.inputKeyValue++;
    if (HDLmWebpageImprover.stateSetFunction != null)
      HDLmWebpageImprover.stateSetFunction(HDLmWebpageImprover.inputKeyValue);
  }
  static getModifiedWebsiteUrl(urlStr) {
    if (urlStr == null || urlStr == '')
      return '';
    let workingUrl = String(urlStr).trim();
    let queryIndex = workingUrl.indexOf('?');
    if (queryIndex >= 0)
      workingUrl = workingUrl.substring(0, queryIndex);
    let fragmentIndex = workingUrl.indexOf('#');
    if (fragmentIndex >= 0)
      workingUrl = workingUrl.substring(0, fragmentIndex);
    workingUrl = workingUrl.replace(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//, '');
    workingUrl = workingUrl.replace(/^([a-zA-Z][a-zA-Z0-9+.-]*):/, '');
    let slashIndex = workingUrl.indexOf('/');
    if (slashIndex < 0)
      return workingUrl;
    let hostPart = workingUrl.substring(0, slashIndex);
    let pathPart = workingUrl.substring(slashIndex);
    if (pathPart == '/')
      pathPart = '';
    return hostPart + pathPart;
  }
  static main() {
    if (HDLmWebpageImprover.shouldProgramRun(window.location.pathname) == false)
      return;
    HDLmWebpageImprover.mainAsync();
  }
  static async mainAsync() {
    let configsObj = await HDLmConfig.getConfigs();
    HDLmConfig.addConfigs(configsObj);
    let windowLocationHostName = window.location.hostname;
    let localMode;
    if (windowLocationHostName != null && windowLocationHostName !== undefined && windowLocationHostName.indexOf('t') > 0)
      localMode = false;
    else
      localMode = true;
    HDLmUtility.setProdMode(localMode);
    let stage = HDLmWebpageImproverStageTypes.setTitle;
    HDLmWebpageImprover.nextStage(stage, null);
  }
  static async nextStage(stage, varNext) {
    let nextStageLoop = true;
    while (nextStageLoop) {
      if (HDLmUtility.isVscode())
        console.log('In HDLmWebpageImprover.nextStage while loop ' + stage, varNext);
      switch (stage) {
        case HDLmWebpageImproverStageTypes.setTitle: {
          HDLmWebpageImprover.addSpinnerStyle();
          stage = HDLmWebpageImproverStageTypes.checkServerStatus;
          break;
        }
        case HDLmWebpageImproverStageTypes.checkServerStatus: {
          let serverUp = await HDLmWebpageImprover.checkServerStatus();
          if (serverUp == false) {
            HDLmWebpageImprover.displayErrorMessage('The server is unavailable');
            nextStageLoop = false;
            break;
          }
          stage = HDLmWebpageImproverStageTypes.showWebpageUi;
          break;
        }
        case HDLmWebpageImproverStageTypes.showWebpageUi: {
          let reactRoot = HDLmReactFive.getRootContainer('leftAndRightPage');
          reactRoot.render(React.createElement(HDLmWebpageImprover.buildWebUiElement));
          window.focus();
          setTimeout(function() { window.focus(); }, 0);
          stage = HDLmWebpageImproverStageTypes.visibilityChange;
          break;
        }
        case HDLmWebpageImproverStageTypes.beforeUnload: {
          HDLmWebpageImprover.beforeUnloadAdd();
          let beforeUnloadResolveFunction;
          let beforeUnloadPromise = new Promise(function(resolve) {
            beforeUnloadResolveFunction = resolve;
          });
          HDLmWebpageImprover.beforeUnloadResolveFunction = beforeUnloadResolveFunction;
          beforeUnloadPromise.then(function() {
            nextStageLoop = false;
          },
          function() {
            nextStageLoop = false;
          });
          nextStageLoop = false;
          break;
        }
        case HDLmWebpageImproverStageTypes.visibilityChange: {
          HDLmWebpageImprover.visibilityChangeAdd();
          let visibilityChangeResolveFunction;
          let visibilityChangePromise = new Promise(function(resolve) {
            visibilityChangeResolveFunction = resolve;
          });
          HDLmWebpageImprover.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
          visibilityChangePromise.then(function() {
            nextStageLoop = false;
          },
          function() {
            nextStageLoop = false;
          });
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
  static shouldProgramRun(pathnameValue) {
    if (typeof pathnameValue != 'string')
      return false;
    let lowerPathname = pathnameValue.toLowerCase();
    if (lowerPathname.endsWith('index.html'))
      return true;
    if (lowerPathname.indexOf('/webpageimprover') >= 0)
      return true;
    if (lowerPathname.indexOf('/revenueimprover') >= 0)
      return true;
    return false;
  }
  static visibilityChangeAdd() {
    window.addEventListener('visibilitychange', function(event) {
      HDLmWebpageImprover.visibilityChangeDone(event);
    });
  }
  static visibilityChangeDone(event) {
    if (event == null)
      return;
    if (document.visibilityState === 'hidden')
      HDLmWebpageImprover.visibilityChangeHiddenCount++;
    if (document.visibilityState === 'visible')
      HDLmWebpageImprover.visibilityChangeVisibleCount++;
    if (document.visibilityState === 'hidden' && HDLmWebpageImprover.visibilityChangeHiddenCount > 1 && HDLmWebpageImprover.visibilityChangeHiddenCount > HDLmWebpageImprover.visibilityChangeVisibleCount) {
      if (HDLmWebpageImprover.visibilityChangeResolveFunction != null)
        HDLmWebpageImprover.visibilityChangeResolveFunction('The visibility of the browser was hidden');
    }
  }
}
HDLmWebpageImprover.improvedHtml = null;
HDLmWebpageImprover.improvedImprovements = [];
HDLmWebpageImprover.originalHtml = null;
HDLmWebpageImprover.originalUrl = null;
HDLmWebpageImprover.urlInputCurrentValue = '';
HDLmWebpageImprover.suggestionCurrentValue = '';
HDLmWebpageImprover.improvingInProgress = false;
HDLmWebpageImprover.inputKeyValue = 1;
HDLmWebpageImprover.stateSetFunction = null;
HDLmWebpageImprover.secondTab = null;
HDLmWebpageImprover.thirdTab = null;
HDLmWebpageImprover.visibilityChangeResolveFunction = null;
HDLmWebpageImprover.visibilityChangeHiddenCount = 0;
HDLmWebpageImprover.visibilityChangeVisibleCount = 0;
HDLmWebpageImprover.beforeUnloadResolveFunction = null;