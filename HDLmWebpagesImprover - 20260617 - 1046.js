"use strict";
let useAIVersionWpsWIV1;
useAIVersionWpsWIV1 = 'openRouterWpsWIV1';
const headingWpsWIV1 = { 'pageText': 'Site Revenue Improver' };
const helpTextWpsWIV1 = {
  'url': 'Enter the URL of the website you want to improve. Press Enter to fetch and validate the website URL.',
  'directory': 'Enter a directory where webpages will be saved',
  'improve': 'Click to improve and save all discovered webpages for this website.'
};
const openRouterChatTemplatesWpsWIV1 = {
  'context': 'You are an expert at improving webpages to increase conversion rates and revenue.\n' +
             'Copy everything from the old HTML to the generated HTML by default unless a change is made.\n' +
             'Return complete HTML for each page.\n' +
             'Preserve scripts, styles, metadata, and functional behavior unless a change is needed.\n',
  'webpageServer': 'Please improve the following HTML to increase conversion rates ' +
                   'and revenue.\n' +
                   'Return the complete improved HTML.\n' +
                   '\n' +
                   'HTML:\n' +
                   '{{html}}\n'
};
const openRouterResponseFormatTypeJsonObjectWpsWIV1 = { 'type': 'json_object' };
const openRouterResponseJsonSchemaImproverWpsWIV1 = {
  'type': 'json_schema',
  'json_schema': {
    'name': 'website_improver_response',
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
class HDLmWebsiteImprover {
  static addGoogleAnalyticsTag(html) {
    if (html == null)
      return html;
    let now = new Date();
    let dateGmt = now.getUTCFullYear().toString() + (now.getUTCMonth() + 1).toString().padStart(2, '0') + now.getUTCDate().toString().padStart(2, '0');
    let timeGmt = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0') + now.getUTCSeconds().toString().padStart(2, '0');
    let gaTagValue = 'HDLmGAWpsTag-' + dateGmt + '-' + timeGmt;
    let gaScript = '<script>(function(){var tag="' + gaTagValue + '";if(typeof gtag==="function"){gtag("event",tag,{event_category:"HDLmGAWpsTag",event_label:tag});}})();</script>';
    let bodyClose = html.toLowerCase().indexOf('</body>');
    if (bodyClose >= 0)
      return html.substring(0, bodyClose) + gaScript + html.substring(bodyClose);
    return html + gaScript;
  }
  static addSpinnerStyle() {
    if (document.getElementById('hdlmWebsiteImproverSpinnerStyle') != null)
      return;
    let styleEl = document.createElement('style');
    styleEl.id = 'hdlmWebsiteImproverSpinnerStyle';
    styleEl.innerHTML = '@keyframes hdlm-wps-v1-spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
    document.head.appendChild(styleEl);
  }
  static buildSaveRelativePath(urlStr) {
    let localUrlObj = new URL(urlStr);
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
    HDLmWebsiteImprover.stateSetFunction = setRenderValue;
    function urlChange(event) {
      if (event == null || event.target == null)
        return;
      HDLmWebsiteImprover.urlInputCurrentValue = event.target.value;
    }
    function urlKeyDown(event) {
      if (event == null || event.key !== 'Enter')
        return;
      handleUrlEnterAsync(event.target.value.trim());
    }
    async function handleUrlEnterAsync(urlStr) {
      HDLmWebsiteImprover.urlValidated = false;
      HDLmWebsiteImprover.originalHtml = null;
      HDLmWebsiteImprover.originalUrl = null;
      if (urlStr == '') {
        HDLmWebsiteImprover.displayErrorMessage('Please enter a URL to improve');
        HDLmWebsiteImprover.forceReRender();
        return;
      }
      let normalizedUrl = HDLmWebsiteImprover.getNormalizedWebsiteUrl(urlStr);
      if (normalizedUrl == null) {
        HDLmWebsiteImprover.displayErrorMessage('The URL is not valid');
        HDLmWebsiteImprover.forceReRender();
        return;
      }
      let errorText = HDLmWebsiteImprover.checkUrlValid(normalizedUrl);
      if (errorText != '') {
        HDLmWebsiteImprover.displayErrorMessage(errorText);
        HDLmWebsiteImprover.forceReRender();
        return;
      }
      try {
        let responseObj = await fetch(normalizedUrl);
        if (responseObj.ok == false) {
          HDLmWebsiteImprover.displayErrorMessage('Failed to access website URL: ' + responseObj.status + ' ' + responseObj.statusText);
          HDLmWebsiteImprover.forceReRender();
          return;
        }
        let htmlText = await responseObj.text();
        HDLmWebsiteImprover.originalUrl = normalizedUrl;
        HDLmWebsiteImprover.originalHtml = htmlText;
        HDLmWebsiteImprover.urlValidated = true;
        HDLmWebsiteImprover.urlInputCurrentValue = urlStr;
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebsiteImprover.displayErrorMessage('Error accessing website URL: ' + errorObj.message);
      }
      HDLmWebsiteImprover.forceReRender();
    }
    async function improveButtonClick() {
      if (HDLmWebsiteImprover.improvingInProgress)
        return;
      await HDLmWebsiteImprover.improveWebsiteAndSave();
    }
    let headingElement = React.createElement('h2', null, headingWpsWIV1['pageText']);
    let urlInputElement = HDLmReactSix.buildSingleLineInputWLabel('Enter URL (of website) to improve', 'https://www.example.com', 'urlInputWpsWIV1', urlKeyDown, urlChange, HDLmWebsiteImprover.urlInputCurrentValue, true, { marginTop: '0px' }, { marginTop: '0px' }, { display: 'block', marginBottom: '0px' });
    let directoryHelpElement = React.createElement('div', { style: { marginTop: '10px' } }, helpTextWpsWIV1['directory']);
    let improveDisabled = HDLmWebsiteImprover.urlValidated == false || HDLmWebsiteImprover.improvingInProgress;
    let improveButton = HDLmReactSix.buildButtonElement('improveButtonWpsWIV1', 'Improve', improveButtonClick, improveDisabled, { marginTop: '16px' });
    let spinnerElement = null;
    if (HDLmWebsiteImprover.improvingInProgress)
      spinnerElement = HDLmReactSix.buildSpinnerElement();
    let elementsArray = [headingElement, urlInputElement, directoryHelpElement, improveButton];
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
      HDLmWebsiteImprover.displayErrorMessage('The server-status request failed');
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
    HDLmWebsiteImprover.inputKeyValue++;
    if (HDLmWebsiteImprover.stateSetFunction != null)
      HDLmWebsiteImprover.stateSetFunction(HDLmWebsiteImprover.inputKeyValue);
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
    if (urlStr == null || urlStr == '')
      return '';
    let localUrlObj;
    try {
      localUrlObj = new URL(urlStr);
    }
    catch (errorObj) {
      console.error(errorObj);
      return '';
    }
    let hostPart = localUrlObj.hostname;
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
  static getPathForUrl(urlStr) {
    let localUrlObj = new URL(urlStr);
    let pathNameValue = localUrlObj.pathname;
    if (pathNameValue == null || pathNameValue == '')
      pathNameValue = '/';
    return pathNameValue;
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
    if (HDLmWebsiteImprover.improvingInProgress)
      return;
    if (HDLmWebsiteImprover.urlValidated == false || HDLmWebsiteImprover.originalUrl == null || HDLmWebsiteImprover.originalHtml == null) {
      HDLmWebsiteImprover.displayErrorMessage('Enter and validate a URL before improving');
      return;
    }
    HDLmWebsiteImprover.improvingInProgress = true;
    HDLmWebsiteImprover.forceReRender();
    try {
      let showDirectoryPickerFunction = null;
      if (typeof(window.showDirectoryPicker) == 'function')
        showDirectoryPickerFunction = window.showDirectoryPicker;
      else if (typeof(window.showdirectorypicker) == 'function')
        showDirectoryPickerFunction = window.showdirectorypicker;
      if (showDirectoryPickerFunction == null) {
        HDLmWebsiteImprover.displayErrorMessage('The browser does not support directory selection');
        HDLmWebsiteImprover.improvingInProgress = false;
        HDLmWebsiteImprover.forceReRender();
        return;
      }
      alert('Enter a directory where webpages will be saved');
      let rootDirectoryHandle = await showDirectoryPickerFunction.call(window, { mode: 'readwrite', startIn: 'Documents' });
      let urlsQueue = [HDLmWebsiteImprover.originalUrl];
      let queuedSet = new Set([HDLmWebsiteImprover.originalUrl]);
      let processedSet = new Set();
      let improvedHtmlMap = new Map();
      while (urlsQueue.length > 0) {
        let currentUrl = urlsQueue.shift();
        queuedSet.delete(currentUrl);
        if (processedSet.has(currentUrl))
          continue;
        processedSet.add(currentUrl);
        let currentHtml = null;
        if (currentUrl == HDLmWebsiteImprover.originalUrl)
          currentHtml = HDLmWebsiteImprover.originalHtml;
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
        let aiResult = await HDLmAI.openRouterImproveWebpageV1(currentUrl,
                                                                currentHtml,
                                                                '',
                                                                useAIVersionWpsWIV1,
                                                                openRouterChatTemplatesWpsWIV1,
                                                                openRouterResponseFormatTypeJsonObjectWpsWIV1,
                                                                openRouterResponseJsonSchemaImproverWpsWIV1,
                                                                '',
                                                                '');
        let improvedHtml = HDLmWebsiteImprover.getHtmlFromAiResult(aiResult, currentHtml);
        improvedHtml = HDLmWebsiteImprover.addGoogleAnalyticsTag(improvedHtml);
        improvedHtmlMap.set(currentUrl, improvedHtml);
        let foundUrls = HDLmWebsiteImprover.getUrlsToScanFromHtml(currentUrl, currentHtml);
        for (let i = 0; i < foundUrls.length; i++) {
          let foundUrl = foundUrls[i];
          if (processedSet.has(foundUrl))
            continue;
          if (queuedSet.has(foundUrl))
            continue;
          queuedSet.add(foundUrl);
          urlsQueue.push(foundUrl);
        }
      }
      await HDLmWebsiteImprover.saveAllImprovedPages(rootDirectoryHandle, improvedHtmlMap);
    }
    catch (errorObj) {
      console.error(errorObj);
      HDLmWebsiteImprover.displayErrorMessage('An error occurred while improving the website: ' + errorObj.message);
    }
    HDLmWebsiteImprover.improvingInProgress = false;
    HDLmWebsiteImprover.forceReRender();
  }
  static main() {
    if (HDLmWebsiteImprover.shouldProgramRun(window.location.pathname) == false)
      return;
    HDLmWebsiteImprover.mainAsync();
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
    let stage = HDLmWebsiteImproverStageTypes.setTitle;
    HDLmWebsiteImprover.nextStage(stage, null);
  }
  static async nextStage(stage, varNext) {
    let nextStageLoop = true;
    while (nextStageLoop) {
      if (HDLmUtility.isVscode())
        console.log('In HDLmWebsiteImprover.nextStage while loop ' + stage, varNext);
      switch (stage) {
        case HDLmWebsiteImproverStageTypes.setTitle: {
          HDLmWebsiteImprover.addSpinnerStyle();
          stage = HDLmWebsiteImproverStageTypes.checkServerStatus;
          break;
        }
        case HDLmWebsiteImproverStageTypes.checkServerStatus: {
          let serverUp = await HDLmWebsiteImprover.checkServerStatus();
          if (serverUp == false) {
            HDLmWebsiteImprover.displayErrorMessage('The server is unavailable');
            nextStageLoop = false;
            break;
          }
          stage = HDLmWebsiteImproverStageTypes.showWebpagesUi;
          break;
        }
        case HDLmWebsiteImproverStageTypes.showWebpagesUi: {
          let reactRoot = HDLmReactSix.getRootContainer('leftAndRightPage');
          reactRoot.render(React.createElement(HDLmWebsiteImprover.buildWebUiElement));
          window.focus();
          setTimeout(function() { window.focus(); }, 0);
          stage = HDLmWebsiteImproverStageTypes.visibilityChange;
          break;
        }
        case HDLmWebsiteImproverStageTypes.beforeUnload: {
          nextStageLoop = false;
          break;
        }
        case HDLmWebsiteImproverStageTypes.visibilityChange: {
          HDLmWebsiteImprover.visibilityChangeAdd();
          let visibilityChangeResolveFunction;
          let visibilityChangePromise = new Promise(function(resolve) {
            visibilityChangeResolveFunction = resolve;
          });
          HDLmWebsiteImprover.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
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
  static async saveAllImprovedPages(rootDirectoryHandle, improvedHtmlMap) {
    for (let [urlStr, htmlText] of improvedHtmlMap.entries()) {
      let relativePath = HDLmWebsiteImprover.buildSaveRelativePath(urlStr);
      let pathParts = relativePath.split('/').filter(function(part) { return part != ''; });
      if (pathParts.length == 0)
        continue;
      let fileName = pathParts[pathParts.length - 1];
      let directoryParts = pathParts.slice(0, pathParts.length - 1);
      let targetDirectoryHandle = rootDirectoryHandle;
      if (directoryParts.length > 0)
        targetDirectoryHandle = await HDLmWebsiteImprover.getDirectoryHandleForPath(rootDirectoryHandle, directoryParts);
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
    if (lowerPathname.indexOf('/websiteimprover') >= 0)
      return true;
    return false;
  }
  static visibilityChangeAdd() {
    window.addEventListener('visibilitychange', function(event) {
      HDLmWebsiteImprover.visibilityChangeDone(event);
    });
  }
  static visibilityChangeDone(event) {
    if (event == null)
      return;
    if (document.visibilityState === 'hidden')
      HDLmWebsiteImprover.visibilityChangeHiddenCount++;
    if (document.visibilityState === 'visible')
      HDLmWebsiteImprover.visibilityChangeVisibleCount++;
    if (document.visibilityState === 'hidden' && HDLmWebsiteImprover.visibilityChangeHiddenCount > 1 && HDLmWebsiteImprover.visibilityChangeHiddenCount > HDLmWebsiteImprover.visibilityChangeVisibleCount) {
      if (HDLmWebsiteImprover.visibilityChangeResolveFunction != null)
        HDLmWebsiteImprover.visibilityChangeResolveFunction('The visibility of the browser was hidden');
    }
  }
}
HDLmWebsiteImprover.originalHtml = null;
HDLmWebsiteImprover.originalUrl = null;
HDLmWebsiteImprover.urlInputCurrentValue = '';
HDLmWebsiteImprover.urlValidated = false;
HDLmWebsiteImprover.improvingInProgress = false;
HDLmWebsiteImprover.inputKeyValue = 1;
HDLmWebsiteImprover.stateSetFunction = null;
HDLmWebsiteImprover.visibilityChangeResolveFunction = null;
HDLmWebsiteImprover.visibilityChangeHiddenCount = 0;
HDLmWebsiteImprover.visibilityChangeVisibleCount = 0;