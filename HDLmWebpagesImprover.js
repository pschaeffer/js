"use strict";
let useAIVersionWpsWIV1;
useAIVersionWpsWIV1 = 'openRouterWpsWIV1';
const headingWpsWIV1 = { 'pageText': 'Pages Revenue Improver' };
const helpTextWpsWIV1 = {
  'url': 'Enter URL (of website) to improve',
  'suggestion': 'Suggestion (optional)',
  'directory': 'Enter a directory where webpages will be saved'
};
const suggestionPlaceholderWpsWIV1 = 'Enter a suggestion for the pages revenue improver';
const openRouterChatTemplatesWpsWIV1 = {
  'context': 'You are an expert at improving webpages to increase conversion rates and revenue.\n' +
             'Copy everything from the old HTML to the generated HTML by default unless a change is made.\n' +
             'Return complete HTML for each page.\n',
  'webpageServer': 'Please improve the following HTML to increase conversion rates ' +
                   'and revenue.\n' +
                   'Return the complete improved HTML.\n' +
                   '\n' +
                   'HTML:\n' +
                   '{{html}}\n' +
                   'User suggestion: {{suggest}}\n'
};
const openRouterResponseFormatTypeJsonObjectWpsWIV1 = { 'type': 'json_object' };
const openRouterResponseJsonSchemaImproverWpsWIV1 = {
  'type': 'json_schema',
  'json_schema': {
    'name': 'webpages_improver_response',
    'description': 'Response containing complete improved HTML and optional improvements list',
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
      'required': ['improvedHtml'],
      'additionalProperties': false
    }
  }
};
class HDLmWebpagesImprover {
  static addGoogleAnalyticsTag(html) {
    if (html == null)
      return html;
    let now = new Date();
    let dateGmt = now.getUTCFullYear().toString() +
                  (now.getUTCMonth() + 1).toString().padStart(2, '0') +
                  now.getUTCDate().toString().padStart(2, '0');
    let timeGmt = now.getUTCHours().toString().padStart(2, '0') +
                  now.getUTCMinutes().toString().padStart(2, '0') +
                  now.getUTCSeconds().toString().padStart(2, '0');
    let gaTagValue = 'HDLmGAWpsTag-' + dateGmt + '-' + timeGmt;
    let gaScript = '<script>(function(){var tag="' + gaTagValue +
                   '";if(typeof gtag==="function"){gtag("event",tag,' +
                   '{event_category:"HDLmGAWpsTag",event_label:tag});}})();</script>';
    let bodyClose = html.toLowerCase().indexOf('</body>');
    if (bodyClose >= 0)
      return html.substring(0, bodyClose) + gaScript + html.substring(bodyClose);
    return html + gaScript;
  }
  static addSpinnerStyle() {
    if (document.getElementById('hdlmWebpagesImproverSpinnerStyle') != null)
      return;
    let styleEl = document.createElement('style');
    styleEl.id = 'hdlmWebpagesImproverSpinnerStyle';
    styleEl.innerHTML = '@keyframes hdlm-wps-v1-spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
    document.head.appendChild(styleEl);
  }
  static buildSaveRelativePath(urlStr) {
    let localUrlObj;
    try {
      localUrlObj = new URL(urlStr);
    }
    catch (errorObj) {
      console.error(errorObj);
      return 'index.html';
    }
    let pathNameValue = localUrlObj.pathname;
    if (typeof(pathNameValue) != 'string' || pathNameValue == '' || pathNameValue == '/')
      return 'index.html';
    let pathParts = pathNameValue.split('/').filter(function(part) { return part != ''; });
    if (pathParts.length == 0)
      return 'index.html';
    let lastPart = pathParts[pathParts.length - 1];
    let hasExtension = lastPart.indexOf('.') >= 0;
    if (pathNameValue.endsWith('/'))
      pathParts.push('index.html');
    else if (hasExtension == false)
      pathParts.push('index.html');
    return pathParts.join('/');
  }
  static buildWebUiElement() {
    const [, setRenderValue] = React.useState(1);
    HDLmWebpagesImprover.stateSetFunction = setRenderValue;
    function suggestionChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebpagesImprover.suggestionCurrentValue = event.target.value;
    }
    function urlChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebpagesImprover.urlInputCurrentValue = event.target.value;
      HDLmWebpagesImprover.urlValidated = false;
      HDLmWebpagesImprover.urlAccessed = false;
      HDLmWebpagesImprover.originalHtml = null;
      HDLmWebpagesImprover.originalUrl = null;
    }
    function urlKeyDown(event) {
      if (event == null || event.key !== 'Enter')
        return;
      handleUrlEnterAsync(event.target.value.trim());
    }
    async function handleUrlEnterAsync(urlStr) {
      HDLmWebpagesImprover.urlValidated = false;
      HDLmWebpagesImprover.urlAccessed = false;
      HDLmWebpagesImprover.originalHtml = null;
      HDLmWebpagesImprover.originalUrl = null;
      if (urlStr == '') {
        HDLmWebpagesImprover.displayErrorMessage('Please enter a URL to improve');
        HDLmWebpagesImprover.forceReRender();
        return;
      }
      let normalizedUrl = HDLmWebpagesImprover.getNormalizedWebsiteUrl(urlStr);
      if (normalizedUrl == null) {
        HDLmWebpagesImprover.displayErrorMessage('The URL is not valid');
        HDLmWebpagesImprover.forceReRender();
        return;
      }
      let errorText = HDLmWebpagesImprover.checkUrlValid(normalizedUrl);
      if (errorText != '') {
        HDLmWebpagesImprover.displayErrorMessage(errorText);
        HDLmWebpagesImprover.forceReRender();
        return;
      }
      try {
        let responseObj = await fetch(normalizedUrl);
        if (responseObj.ok == false) {
          HDLmWebpagesImprover.displayErrorMessage('Failed to access website URL: ' + responseObj.status + ' ' + responseObj.statusText);
          HDLmWebpagesImprover.forceReRender();
          return;
        }
        let htmlText = await responseObj.text();
        HDLmWebpagesImprover.originalUrl = normalizedUrl;
        HDLmWebpagesImprover.originalHtml = htmlText;
        HDLmWebpagesImprover.urlInputCurrentValue = urlStr;
        HDLmWebpagesImprover.urlValidated = true;
        HDLmWebpagesImprover.urlAccessed = true;
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebpagesImprover.displayErrorMessage('Error accessing website URL: ' + errorObj.message);
      }
      HDLmWebpagesImprover.forceReRender();
    }
    async function improveButtonClick() {
      if (HDLmWebpagesImprover.improvingInProgress)
        return;
      await HDLmWebpagesImprover.improveWebsiteAndSave();
    }
    let headingElement = React.createElement('h2', null, headingWpsWIV1['pageText']);
    let urlInputElement = HDLmReactSix.buildSingleLineInputWLabel(
      helpTextWpsWIV1['url'],
      'https://www.example.com',
      'urlInputWpsWIV1',
      urlKeyDown,
      urlChange,
      HDLmWebpagesImprover.urlInputCurrentValue,
      true,
      { marginTop: '0px' },
      { marginTop: '0px' },
      { display: 'block', marginBottom: '0px' });
    let suggestionElement = HDLmReactSix.buildTextAreaWLabel(
      helpTextWpsWIV1['suggestion'],
      suggestionPlaceholderWpsWIV1,
      'suggestionInputWpsWIV1',
      suggestionChange,
      HDLmWebpagesImprover.suggestionCurrentValue,
      5,
      { marginTop: '16px' },
      { width: '720px', maxWidth: '100%' },
      { display: 'block', marginBottom: '4px' });
    let improveDisabled = HDLmWebpagesImprover.urlValidated == false ||
                          HDLmWebpagesImprover.urlAccessed == false ||
                          HDLmWebpagesImprover.improvingInProgress;
    let improveButton = HDLmReactSix.buildButtonElement(
      'improveButtonWpsWIV1',
      'Improve',
      improveButtonClick,
      improveDisabled,
      { marginTop: '20px' });
    let directoryHelpElement = React.createElement('div',
                                                   { style: { marginTop: '12px' } },
                                                   helpTextWpsWIV1['directory']);
    let spinnerElement = null;
    if (HDLmWebpagesImprover.improvingInProgress)
      spinnerElement = HDLmReactSix.buildSpinnerElement();
    let elementsArray = [headingElement, urlInputElement, suggestionElement,
                         improveButton, directoryHelpElement];
    if (spinnerElement != null)
      elementsArray.push(spinnerElement);
    return HDLmReactSix.putElementsInFragment(elementsArray);
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
      HDLmWebpagesImprover.displayErrorMessage('The server-status request failed');
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
    alert(String(errorMessage));
  }
  static forceReRender() {
    HDLmWebpagesImprover.inputKeyValue++;
    if (HDLmWebpagesImprover.stateSetFunction != null)
      HDLmWebpagesImprover.stateSetFunction(HDLmWebpagesImprover.inputKeyValue);
  }
  static async getDirectoryHandleForPath(rootDirectoryHandle, pathParts) {
    let directoryHandle = rootDirectoryHandle;
    for (let i = 0; i < pathParts.length; i++)
      directoryHandle = await directoryHandle.getDirectoryHandle(pathParts[i], { create: true });
    return directoryHandle;
  }
  static getHtmlFromAiResult(aiResult, fallbackHtml) {
    if (aiResult == null)
      return fallbackHtml;
    if (typeof(aiResult) == 'string' && aiResult != '')
      return aiResult;
    if (typeof(aiResult.improvedHtml) == 'string' && aiResult.improvedHtml != '')
      return aiResult.improvedHtml;
    if (typeof(aiResult.improvedWebpage) == 'string' && aiResult.improvedWebpage != '')
      return aiResult.improvedWebpage;
    if (typeof(aiResult.html) == 'string' && aiResult.html != '')
      return aiResult.html;
    return fallbackHtml;
  }
  static getModifiedWebsiteUrl(urlStr) {
    if (typeof(urlStr) != 'string' || urlStr == '')
      return '';
    let localUrl = urlStr.trim();
    if (localUrl == '')
      return '';
    if (localUrl.toLowerCase().startsWith('http://') == false &&
        localUrl.toLowerCase().startsWith('https://') == false)
      localUrl = 'https://' + localUrl;
    let localUrlObj;
    try {
      localUrlObj = new URL(localUrl);
    }
    catch (errorObj) {
      console.error(errorObj);
      return '';
    }
    let hostPart = localUrlObj.host;
    let pathPart = localUrlObj.pathname;
    if (pathPart == '/')
      pathPart = '';
    return hostPart + pathPart;
  }
  static getNormalizedWebsiteUrl(urlValue) {
    if (typeof(urlValue) != 'string')
      return null;
    let localUrl = urlValue.trim();
    if (localUrl == '')
      return null;
    if (localUrl.toLowerCase().startsWith('http://') == false &&
        localUrl.toLowerCase().startsWith('https://') == false)
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
  static getUrlsToScanFromHtml(currentUrl, htmlText) {
    if (typeof(htmlText) != 'string' || htmlText == '')
      return [];
    let parser = new DOMParser();
    let docObj = parser.parseFromString(htmlText, 'text/html');
    let anchorElements = Array.from(docObj.querySelectorAll('a[href]'));
    let currentUrlObj = new URL(currentUrl);
    let foundUrls = [];
    let foundSet = new Set();
    for (let i = 0; i < anchorElements.length; i++) {
      let hrefValue = anchorElements[i].getAttribute('href');
      if (typeof(hrefValue) != 'string' || hrefValue.trim() == '')
        continue;
      try {
        let linkUrlObj = new URL(hrefValue, currentUrl);
        let protocolLower = linkUrlObj.protocol.toLowerCase();
        if (protocolLower != 'http:' && protocolLower != 'https:')
          continue;
        if (linkUrlObj.hostname.toLowerCase() != currentUrlObj.hostname.toLowerCase())
          continue;
        linkUrlObj.hash = '';
        linkUrlObj.search = '';
        let linkUrlStr = linkUrlObj.toString();
        if (foundSet.has(linkUrlStr))
          continue;
        foundSet.add(linkUrlStr);
        foundUrls.push(linkUrlStr);
      }
      catch (errorObj) {
        console.error(errorObj);
      }
    }
    return foundUrls;
  }
  static async improveWebsiteAndSave() {
    if (HDLmWebpagesImprover.improvingInProgress)
      return;
    if (HDLmWebpagesImprover.urlValidated == false ||
        HDLmWebpagesImprover.urlAccessed == false ||
        HDLmWebpagesImprover.originalUrl == null ||
        HDLmWebpagesImprover.originalHtml == null) {
      HDLmWebpagesImprover.displayErrorMessage('Enter and validate a URL before improving');
      return;
    }
    HDLmWebpagesImprover.improvingInProgress = true;
    HDLmWebpagesImprover.forceReRender();
    try {
      let showDirectoryPickerFunction = null;
      if (typeof(window.showdirectorypicker) == 'function')
        showDirectoryPickerFunction = window.showdirectorypicker;
      else if (typeof(window.showDirectoryPicker) == 'function')
        showDirectoryPickerFunction = window.showDirectoryPicker;
      if (showDirectoryPickerFunction == null) {
        HDLmWebpagesImprover.displayErrorMessage('The browser does not support directory selection');
        HDLmWebpagesImprover.improvingInProgress = false;
        HDLmWebpagesImprover.forceReRender();
        return;
      }
      let rootDirectoryHandle = await showDirectoryPickerFunction.call(window,
                                                                       { mode: 'readwrite',
                                                                         startIn: 'documents' });
      let suggestionText = HDLmWebpagesImprover.suggestionCurrentValue;
      if (typeof(suggestionText) != 'string')
        suggestionText = '';
      suggestionText = suggestionText.trim();
      if (suggestionText == suggestionPlaceholderWpsWIV1)
        suggestionText = '';
      let urlsQueue = [HDLmWebpagesImprover.originalUrl];
      let queuedSet = new Set([HDLmWebpagesImprover.originalUrl]);
      let processedSet = new Set();
      let improvedHtmlMap = new Map();
      while (urlsQueue.length > 0) {
        let currentUrl = urlsQueue.shift();
        queuedSet.delete(currentUrl);
        if (processedSet.has(currentUrl))
          continue;
        processedSet.add(currentUrl);
        let currentHtml = null;
        if (currentUrl == HDLmWebpagesImprover.originalUrl)
          currentHtml = HDLmWebpagesImprover.originalHtml;
        else {
          try {
            let responseObj = await fetch(currentUrl);
            if (responseObj.ok == false)
              continue;
            currentHtml = await responseObj.text();
          }
          catch (errorObj) {
            console.error(errorObj);
            continue;
          }
        }
        if (typeof(currentHtml) != 'string' || currentHtml == '')
          continue;
        let aiResult;
        let improvedHtml;
        try {
          aiResult = await HDLmAI.openRouterImproveWebpageV1(currentUrl,
                                                             currentHtml,
                                                             suggestionText,
                                                             useAIVersionWpsWIV1,
                                                             openRouterChatTemplatesWpsWIV1,
                                                             openRouterResponseFormatTypeJsonObjectWpsWIV1,
                                                             openRouterResponseJsonSchemaImproverWpsWIV1,
                                                             '',
                                                             '');
          improvedHtml = HDLmWebpagesImprover.getHtmlFromAiResult(aiResult, currentHtml);
        }
        catch (errorObj) {
          console.error(errorObj);
          improvedHtml = currentHtml;
        }
        improvedHtml = HDLmWebpagesImprover.addGoogleAnalyticsTag(improvedHtml);
        improvedHtmlMap.set(currentUrl, improvedHtml);
        let foundUrls = HDLmWebpagesImprover.getUrlsToScanFromHtml(currentUrl, currentHtml);
        for (let i = 0; i < foundUrls.length; i++) {
          let foundUrl = foundUrls[i];
          console.log('Found URL to possibly queue:', foundUrl);
          if (processedSet.has(foundUrl)) {
            console.log('URL already processed:', foundUrl);
            continue;
          }
          if (queuedSet.has(foundUrl)) {
            console.log('URL already queued:', foundUrl);
            continue;
          }
          queuedSet.add(foundUrl);
          urlsQueue.push(foundUrl);
        }
      }
      await HDLmWebpagesImprover.saveAllImprovedPages(rootDirectoryHandle, improvedHtmlMap);
    }
    catch (errorObj) {
      console.error(errorObj);
      HDLmWebpagesImprover.displayErrorMessage('An error occurred while improving the website: ' +
                                               errorObj.message);
    }
    HDLmWebpagesImprover.improvingInProgress = false;
    HDLmWebpagesImprover.forceReRender();
  }
  static main() {
    if (HDLmWebpagesImprover.shouldProgramRun(window.location.pathname) == false)
      return;
    HDLmWebpagesImprover.mainAsync();
  }
  static async mainAsync() {
    let configsObj = await HDLmConfig.getConfigs();
    HDLmConfig.addConfigs(configsObj);
    let windowLocationHostName = window.location.hostname;
    let localMode;
    if (windowLocationHostName != null &&
        windowLocationHostName !== undefined &&
        windowLocationHostName.indexOf('t') > 0)
      localMode = false;
    else
      localMode = true;
    HDLmUtility.setProdMode(localMode);
    let stage = HDLmWebpagesImproverStageTypes.setTitle;
    HDLmWebpagesImprover.nextStage(stage, null);
  }
  static async nextStage(stage, varNext) {
    let nextStageLoop = true;
    while (nextStageLoop) {
      if (HDLmUtility.isVscode())
        console.log('In HDLmWebpagesImprover.nextStage while loop ' + stage, varNext);
      switch (stage) {
        case HDLmWebpagesImproverStageTypes.setTitle: {
          HDLmWebpagesImprover.addSpinnerStyle();
          stage = HDLmWebpagesImproverStageTypes.checkServerStatus;
          break;
        }
        case HDLmWebpagesImproverStageTypes.checkServerStatus: {
          let serverUp = await HDLmWebpagesImprover.checkServerStatus();
          if (serverUp == false) {
            HDLmWebpagesImprover.displayErrorMessage('The server is unavailable');
            nextStageLoop = false;
            break;
          }
          stage = HDLmWebpagesImproverStageTypes.showWebpagesUi;
          break;
        }
        case HDLmWebpagesImproverStageTypes.showWebpagesUi: {
          let reactRoot = HDLmReactSix.getRootContainer('leftAndRightPage');
          reactRoot.render(React.createElement(HDLmWebpagesImprover.buildWebUiElement));
          window.focus();
          setTimeout(function() { window.focus(); }, 0);
          stage = HDLmWebpagesImproverStageTypes.visibilityChange;
          break;
        }
        case HDLmWebpagesImproverStageTypes.beforeUnload: {
          nextStageLoop = false;
          break;
        }
        case HDLmWebpagesImproverStageTypes.visibilityChange: {
          HDLmWebpagesImprover.visibilityChangeAdd();
          let visibilityChangeResolveFunction;
          let visibilityChangePromise = new Promise(function(resolve) {
            visibilityChangeResolveFunction = resolve;
          });
          HDLmWebpagesImprover.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
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
  static async saveAllImprovedPages(rootDirectoryHandle, improvedHtmlMap) {
    for (let [urlStr, htmlText] of improvedHtmlMap.entries()) {
      let relativePath = HDLmWebpagesImprover.buildSaveRelativePath(urlStr);
      let pathParts = relativePath.split('/').filter(function(part) { return part != ''; });
      if (pathParts.length == 0)
        continue;
      let fileName = pathParts[pathParts.length - 1];
      let directoryParts = pathParts.slice(0, pathParts.length - 1);
      let targetDirectoryHandle = rootDirectoryHandle;
      if (directoryParts.length > 0)
        targetDirectoryHandle = await HDLmWebpagesImprover.getDirectoryHandleForPath(rootDirectoryHandle,
                                                                                      directoryParts);
      let fileHandle = await targetDirectoryHandle.getFileHandle(fileName, { create: true });
      let writableHandle = await fileHandle.createWritable();
      await writableHandle.write(htmlText);
      await writableHandle.close();
    }
  }
  static shouldProgramRun(pathnameValue) {
    if (typeof(pathnameValue) != 'string')
      return false;
    let lowerPathname = pathnameValue.toLowerCase();
    if (lowerPathname.endsWith('index.html'))
      return true;
    if (lowerPathname.indexOf('/webpagesimprover') >= 0)
      return true;
    return false;
  }
  static visibilityChangeAdd() {
    window.addEventListener('visibilitychange',
                            function(event) { HDLmWebpagesImprover.visibilityChangeDone(event); });
  }
  static visibilityChangeDone(event) {
    if (event == null)
      return;
    if (document.visibilityState === 'hidden')
      HDLmWebpagesImprover.visibilityChangeHiddenCount++;
    if (document.visibilityState === 'visible')
      HDLmWebpagesImprover.visibilityChangeVisibleCount++;
    if (document.visibilityState === 'hidden' &&
        HDLmWebpagesImprover.visibilityChangeHiddenCount > 1 &&
        HDLmWebpagesImprover.visibilityChangeHiddenCount > HDLmWebpagesImprover.visibilityChangeVisibleCount) {
      if (HDLmWebpagesImprover.visibilityChangeResolveFunction != null)
        HDLmWebpagesImprover.visibilityChangeResolveFunction('The visibility of the browser was hidden');
    }
  }
}
HDLmWebpagesImprover.originalHtml = null;
HDLmWebpagesImprover.originalUrl = null;
HDLmWebpagesImprover.urlInputCurrentValue = '';
HDLmWebpagesImprover.urlValidated = false;
HDLmWebpagesImprover.urlAccessed = false;
HDLmWebpagesImprover.suggestionCurrentValue = '';
HDLmWebpagesImprover.improvingInProgress = false;
HDLmWebpagesImprover.inputKeyValue = 1;
HDLmWebpagesImprover.stateSetFunction = null;
HDLmWebpagesImprover.visibilityChangeResolveFunction = null;
HDLmWebpagesImprover.visibilityChangeHiddenCount = 0;
HDLmWebpagesImprover.visibilityChangeVisibleCount = 0;