"use strict";
let useAIVersionWpiWIV1 = 'openRouterWpiWIV1';
let headingWpiWIV1 = 'Page Revenue Improver';
let helpTextWpiWIV1 = { 'url': 'Enter URL to improve', 'suggestion': 'Suggestion (optional)', 'checkbox': 'Create a rule for the updated page', 'improve': 'Improve (generate HTML)', 'saveHtml': 'Save (generated HTML)', 'saveImprovements': 'Save (improvements)', 'loadImprovements': 'Load (improvements)' };
let openRouterChatTemplatesWpiWIV1 = {
  'context': 'You are an expert at improving webpages to increase conversion rates and revenue.' +
             '\nCopy everything from the old HTML to the generated HTML by default unless a change is made.' +
             '\nThe copy must include CSS, links, images, and scripts, if they were present in the original HTML.' +
             '\nReturn the complete improved HTML and a list of improvements made, each with a What field and a Why field and a Hash field.' +
             '\nIf the Desired changes field is empty, devise some improvements on your own while considering the content of the Undesired changes field.' +
             '\nIf the Desired changes field is not empty, do not devise further improvements on your own and instead use only the Desired changes field while considering the Undesired changes field.' +
             '\nIf the User suggestion is empty, ignore it.' +
             '\nFor each improvement, create a hash code using the DJB2 algorithm, starting with 5381, hash the What and Why values together, convert the result to hexadecimal, and include the HDLmClass prefix in the Hash value.' +
             '\nMark changed HTML by adding a class with the exact hash value that includes the HDLmClass prefix.' +
             '\n',
  'webpageServer': 'Please improve the passed HTML to increase conversion rates ' +
                   'and revenue.\n' +
                   'Return the complete improved HTML and a list of improvements made, each with a What field and a Why field and a Hash field.\n' +
                   '\n' +
                   'HTML:\n' +
                   '{{html}}\n' +
                   'User suggestion: {{suggest}}\n' +
                   'Desired changes: ({{desired}})\n' +
                   'Undesired changes: ({{undesired}})\n'
};
let openRouterResponseFormatTypeJsonObjectWpiWIV1 = { 'type': 'json_object' };
let openRouterResponseJsonSchemaImproverWpiWIV1 = {
  'type': 'json_schema',
  'json_schema': {
    'name': 'webpage_improver_response',
    'description': 'Response containing the improved HTML and a list of improvements.',
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
    return html.substring(0, headTagEnd + 1) + baseTag + html.substring(headTagEnd + 1);
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
    styleEl.innerHTML = '@keyframes hdlm-wpi-v1-spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
    document.head.appendChild(styleEl);
  }
  static buildDesiredImprovementsString(outerObj) {
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
  static buildUndesiredImprovementsString(outerObj) {
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
    HDLmWebpageImprover.stateSetFunction = setRenderValue;
    function suggestionChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebpageImprover.suggestionCurrentValue = event.target.value;
    }
    function urlChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebpageImprover.urlInputCurrentValue = event.target.value;
      HDLmWebpageImprover.urlValidated = false;
      HDLmWebpageImprover.urlAccessed = false;
      HDLmWebpageImprover.originalHtml = null;
      HDLmWebpageImprover.originalUrl = null;
      HDLmWebpageImprover.forceReRender();
    }
    function urlKeyDown(event) {
      if (event == null || event.key !== 'Enter')
        return;
      handleUrlEnterAsync(event.target.value.trim());
    }
    async function handleUrlEnterAsync(urlStr) {
      HDLmWebpageImprover.urlValidated = false;
      HDLmWebpageImprover.urlAccessed = false;
      HDLmWebpageImprover.originalHtml = null;
      HDLmWebpageImprover.originalUrl = null;
      if (urlStr == '') {
        HDLmWebpageImprover.displayErrorMessage('Please enter a URL to improve');
        HDLmWebpageImprover.forceReRender();
        return;
      }
      let normalizedUrl = HDLmWebpageImprover.getNormalizedWebsiteUrl(urlStr);
      if (normalizedUrl == null) {
        HDLmWebpageImprover.displayErrorMessage('The URL is not valid');
        HDLmWebpageImprover.forceReRender();
        return;
      }
      let errorText = HDLmWebpageImprover.checkUrlValid(normalizedUrl);
      if (errorText != '') {
        HDLmWebpageImprover.displayErrorMessage(errorText);
        HDLmWebpageImprover.forceReRender();
        return;
      }
      try {
        let responseObj = await fetch(normalizedUrl);
        if (responseObj.ok == false) {
          HDLmWebpageImprover.displayErrorMessage('Failed to access webpage URL: ' + responseObj.status + ' ' + responseObj.statusText);
          HDLmWebpageImprover.forceReRender();
          return;
        }
        let htmlText = await responseObj.text();
        HDLmWebpageImprover.originalUrl = normalizedUrl;
        HDLmWebpageImprover.originalHtml = htmlText;
        HDLmWebpageImprover.urlInputCurrentValue = urlStr;
        HDLmWebpageImprover.urlValidated = true;
        HDLmWebpageImprover.urlAccessed = true;
        if (HDLmWebpageImprover.secondTab == null || HDLmWebpageImprover.secondTab.closed)
          HDLmWebpageImprover.secondTab = window.open(normalizedUrl, '_blank');
        else
          HDLmWebpageImprover.secondTab.location.href = normalizedUrl;
        if (HDLmWebpageImprover.createRuleForUpdatedPage == true)
          HDLmHtml.storeWebpageRule({ urlStr: normalizedUrl, webpageStr: htmlText });
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebpageImprover.displayErrorMessage('Error accessing website URL: ' + errorObj.message);
      }
      HDLmWebpageImprover.forceReRender();
    }
    function checkboxChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebpageImprover.createRuleForUpdatedPage = event.target.checked === true;
      if (HDLmWebpageImprover.createRuleForUpdatedPage == true && HDLmWebpageImprover.originalUrl != null && HDLmWebpageImprover.originalHtml != null)
        HDLmHtml.storeWebpageRule({ urlStr: HDLmWebpageImprover.originalUrl, webpageStr: HDLmWebpageImprover.originalHtml });
      HDLmWebpageImprover.forceReRender();
    }
    async function improveButtonClick() {
      if (HDLmWebpageImprover.improvingInProgress)
        return;
      if (HDLmWebpageImprover.urlValidated == false || HDLmWebpageImprover.urlAccessed == false || HDLmWebpageImprover.originalUrl == null || HDLmWebpageImprover.originalHtml == null)
        return;
      HDLmWebpageImprover.improvingInProgress = true;
      HDLmWebpageImprover.forceReRender();
      try {
        let suggestionText = HDLmWebpageImprover.suggestionCurrentValue;
        if (typeof(suggestionText) != 'string')
          suggestionText = '';
        suggestionText = suggestionText.trim();
        let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
        let existingOuterObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
        let desiredImprovementsStr = HDLmWebpageImprover.buildDesiredImprovementsString(existingOuterObj);
        let undesiredImprovementsStr = HDLmWebpageImprover.buildUndesiredImprovementsString(existingOuterObj);
        let aiResult = await HDLmAI.openRouterImproveWebpageV1(HDLmWebpageImprover.originalUrl,
                                                               HDLmWebpageImprover.originalHtml,
                                                               suggestionText,
                                                               useAIVersionWpiWIV1,
                                                               openRouterChatTemplatesWpiWIV1,
                                                               openRouterResponseFormatTypeJsonObjectWpiWIV1,
                                                               openRouterResponseJsonSchemaImproverWpiWIV1,
                                                               desiredImprovementsStr,
                                                               undesiredImprovementsStr);
        if (aiResult == null || typeof(aiResult.improvedHtml) != 'string' || aiResult.improvedHtml == '') {
          throw new Error('The improved webpage was not returned by the AI service');
        }
        let improvedHtml = HDLmWebpageImprover.addBaseUrl(aiResult.improvedHtml, HDLmWebpageImprover.originalUrl);
        improvedHtml = HDLmWebpageImprover.addGoogleAnalyticsTag(improvedHtml);
        HDLmWebpageImprover.improvedHtml = improvedHtml;
        HDLmWebpageImprover.improvements = Array.isArray(aiResult.improvements) ? aiResult.improvements : [];
        let outerObj = { 'Version': 1, 'Created': new Date().toISOString(), 'Last Modified': new Date().toISOString(), 'Improvements': [] };
        for (let improvementEntry of HDLmWebpageImprover.improvements) {
          if (improvementEntry == null)
            continue;
          if (typeof(improvementEntry['What']) != 'string' || typeof(improvementEntry['Why']) != 'string' || typeof(improvementEntry['Hash']) != 'string')
            continue;
          let improvementObj = { 'Version': 1, 'Created': new Date().toISOString(), 'Last Modified': new Date().toISOString(), 'What': improvementEntry['What'], 'Why': improvementEntry['Why'], 'Wanted': true, 'Hash': improvementEntry['Hash'] };
          outerObj['Improvements'].push(improvementObj);
        }
        if (storageSuffix != '')
          HDLmImprovements.putImprovements(outerObj, storageSuffix);
        if (HDLmWebpageImprover.thirdTab == null || HDLmWebpageImprover.thirdTab.closed)
          HDLmWebpageImprover.thirdTab = window.open('', '_blank');
        if (HDLmWebpageImprover.thirdTab != null) {
          HDLmWebpageImprover.thirdTab.document.open();
          HDLmWebpageImprover.thirdTab.document.write(improvedHtml);
          HDLmWebpageImprover.thirdTab.document.close();
        }
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebpageImprover.displayErrorMessage(errorObj.message);
      }
      HDLmWebpageImprover.improvingInProgress = false;
      HDLmWebpageImprover.forceReRender();
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
    async function loadImprovementsButtonClick() {
      let loadedObj = await HDLmImprovements.loadImprovements();
      if (loadedObj == null)
        return;
      let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
      if (storageSuffix == '') {
        HDLmWebpageImprover.displayErrorMessage('Enter and validate a URL before loading improvements');
        return;
      }
      let existingObj = HDLmImprovements.getImprovements(storageSuffix);
      if (existingObj == null)
        existingObj = { 'Version': 1, 'Created': new Date().toISOString(), 'Last Modified': new Date().toISOString(), 'Improvements': [] };
      if (Array.isArray(loadedObj['Improvements'])) {
        for (let improvementObj of loadedObj['Improvements']) {
          if (improvementObj == null)
            continue;
          existingObj = HDLmImprovements.possiblyAddImprovement(existingObj, improvementObj['Why'], improvementObj['What'], improvementObj['Hash']);
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
      let nowIso = new Date().toISOString();
      outerObj['Improvements'][index]['Wanted'] = true;
      outerObj['Improvements'][index]['Last Modified'] = nowIso;
      outerObj['Last Modified'] = nowIso;
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
      let nowIso = new Date().toISOString();
      outerObj['Improvements'][index]['Wanted'] = false;
      outerObj['Improvements'][index]['Last Modified'] = nowIso;
      outerObj['Last Modified'] = nowIso;
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
    let headingElement = React.createElement('h2', null, headingWpiWIV1);
    let urlInputElement = HDLmReactFive.buildSingleLineInputWLabel(helpTextWpiWIV1['url'], 'https://www.example.com', 'urlInputWpiWIV1', urlKeyDown, urlChange, HDLmWebpageImprover.urlInputCurrentValue, true, { marginTop: '0px' }, { marginTop: '0px' }, { display: 'block', marginBottom: '0px' });
    let suggestionElement = HDLmReactFive.buildTextAreaWLabel(helpTextWpiWIV1['suggestion'], 'Enter a suggestion for the page revenue improver', 'suggestionInputWpiWIV1', suggestionChange, HDLmWebpageImprover.suggestionCurrentValue, 5, { marginTop: '16px' }, { width: '720px', maxWidth: '100%' }, { display: 'block', marginBottom: '4px' });
    let checkboxElement = HDLmReactFive.buildCheckboxElement(helpTextWpiWIV1['checkbox'], HDLmWebpageImprover.createRuleForUpdatedPage, checkboxChange, 'checkboxWpiWIV1');
    let improveDisabled = HDLmWebpageImprover.urlValidated == false || HDLmWebpageImprover.urlAccessed == false || HDLmWebpageImprover.originalHtml == null || HDLmWebpageImprover.improvingInProgress;
    let saveHtmlDisabled = HDLmWebpageImprover.improvedHtml == null || HDLmWebpageImprover.improvingInProgress;
    let improveButton = HDLmReactFive.buildButtonElement('improveButtonWpiWIV1', 'Improve (generate HTML)', improveButtonClick, improveDisabled, { marginTop: '20px' });
    let saveHtmlButton = HDLmReactFive.buildButtonElement('saveHtmlButtonWpiWIV1', 'Save (generated HTML)', saveHtmlButtonClick, saveHtmlDisabled, { marginTop: '20px' });
    let saveImprovementsButton = HDLmReactFive.buildButtonElement('saveImprovementsButtonWpiWIV1', 'Save (improvements)', saveImprovementsButtonClick, false, { marginTop: '20px' });
    let loadImprovementsButton = HDLmReactFive.buildButtonElement('loadImprovementsButtonWpiWIV1', 'Load (improvements)', loadImprovementsButtonClick, false, { marginTop: '20px' });
    let buttonsRowElement = React.createElement('div', { style: { marginTop: '16px' } }, improveButton, saveHtmlButton, saveImprovementsButton, loadImprovementsButton);
    let spinnerElement = HDLmWebpageImprover.improvingInProgress ? HDLmReactFive.buildSpinnerElement() : null;
    let storageSuffix = HDLmWebpageImprover.getModifiedWebsiteUrl(HDLmWebpageImprover.originalUrl);
    let outerObj = storageSuffix == '' ? null : HDLmImprovements.getImprovements(storageSuffix);
    let improvementsArray = [];
    if (outerObj != null && Array.isArray(outerObj['Improvements']))
      improvementsArray = outerObj['Improvements'];
    let improvementsAreaElement = null;
    if (improvementsArray.length == 0)
      improvementsAreaElement = React.createElement('div', { style: { marginTop: '16px' } }, React.createElement('p', null, 'No improvements so far'));
    else
      improvementsAreaElement = React.createElement('div', { style: { marginTop: '16px' } }, HDLmReactEight.buildImprovementsTable(improvementsArray, handleYesChange, handleNotChange, handleDeleteChange, handleRowClick, handleDeleteKey));
    let elementsArray = [headingElement, urlInputElement, suggestionElement, checkboxElement, buttonsRowElement];
    if (spinnerElement != null)
      elementsArray.push(spinnerElement);
    elementsArray.push(improvementsAreaElement);
    return HDLmReactFive.putElementsInFragment(elementsArray);
  }
  static checkServerStatus() {
    let requestAJAXAsyncTrue = true;
    let requestType = 'URL';
    let serverName = HDLmConfigInfo.getServerName();
    let getSSStr = HDLmDefines.getString('HDLMGETSSVALUE');
    let urlStr = 'https://' + serverName + '/' + getSSStr;
    let userid = '';
    let password = '';
    let httpType = 'get';
    let extraInfo = '';
    try {
      return HDLmAJAX.runAJAX(requestType, requestAJAXAsyncTrue, urlStr, userid, password, httpType, extraInfo).then(function() {
        return true;
      }).catch(function(errorObj) {
        console.error(errorObj);
        HDLmWebpageImprover.displayErrorMessage('The server status request failed');
        return false;
      });
    }
    catch (errorObj) {
      console.error(errorObj);
      HDLmWebpageImprover.displayErrorMessage('The server status request failed');
      return Promise.resolve(false);
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
    else if (hostNameStr == null)
      errorText = 'Host name is null';
    else if (typeOfHost != 'string')
      errorText = 'Host name is not a string';
    else if (hostNameStr == '')
      errorText = 'Host name is empty';
    return errorText;
  }
  static displayErrorMessage(errorMessage) {
    alert(String(errorMessage));
  }
  static forceReRender() {
    HDLmWebpageImprover.inputKeyValue++;
    if (HDLmWebpageImprover.stateSetFunction != null)
      HDLmWebpageImprover.stateSetFunction(HDLmWebpageImprover.inputKeyValue);
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
    if (HDLmWebpageImprover.shouldProgramRun(window.location.pathname) == false)
      return;
    HDLmWebpageImprover.mainAsync();
  }
  static async mainAsync() {
    let configsObj = await HDLmConfig.getConfigs();
    HDLmConfig.addConfigs(configsObj);
    let stage = HDLmWebpageImproverStageTypes.setTitle;
    HDLmWebpageImprover.nextStage(stage, null);
  }
  static async nextStage(stage, varNext) {
    let nextStageLoop = true;
    while (nextStageLoop) {
      switch (stage) {
        case HDLmWebpageImproverStageTypes.setTitle: {
          HDLmWebpageImprover.addSpinnerStyle();
          stage = HDLmWebpageImproverStageTypes.checkServerStatus;
          break;
        }
        case HDLmWebpageImproverStageTypes.checkServerStatus: {
          let serverUp = await HDLmWebpageImprover.checkServerStatus();
          if (serverUp == false) {
            HDLmWebpageImprover.displayErrorMessage('The server is down');
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
        case HDLmWebpageImproverStageTypes.visibilityChange: {
          HDLmWebpageImprover.visibilityChangeAdd();
          let visibilityChangeResolveFunction;
          let visibilityChangePromise = new Promise(function(resolve) { visibilityChangeResolveFunction = resolve; });
          HDLmWebpageImprover.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
          visibilityChangePromise.then(function() { nextStageLoop = false; }, function() { nextStageLoop = false; });
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
    if (typeof(pathnameValue) != 'string')
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
HDLmWebpageImprover.createRuleForUpdatedPage = false;
HDLmWebpageImprover.improvedHtml = null;
HDLmWebpageImprover.improvingInProgress = false;
HDLmWebpageImprover.inputKeyValue = 1;
HDLmWebpageImprover.originalHtml = null;
HDLmWebpageImprover.originalUrl = null;
HDLmWebpageImprover.secondTab = null;
HDLmWebpageImprover.stateSetFunction = null;
HDLmWebpageImprover.suggestionCurrentValue = '';
HDLmWebpageImprover.thirdTab = null;
HDLmWebpageImprover.urlAccessed = false;
HDLmWebpageImprover.urlInputCurrentValue = '';
HDLmWebpageImprover.urlValidated = false;
HDLmWebpageImprover.visibilityChangeHiddenCount = 0;
HDLmWebpageImprover.visibilityChangeResolveFunction = null;
HDLmWebpageImprover.visibilityChangeVisibleCount = 0;
HDLmWebpageImprover.improvements = [];
