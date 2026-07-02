"use strict";
let useAIVersionWsiWIV1;
useAIVersionWsiWIV1 = 'openRouterWsiWIV1';
const headingWsiWIV1 = { 'pageText': 'Site Revenue Improver' };
const helpTextWsiWIV1 = { 'url': 'Enter URL (of website) to improve', 'directory': 'Enter a directory where webpages will be saved', 'improve': 'Click to improve and save webpages for the website.' };
const openRouterChatTemplatesWsiWIV1 = {
  'context': 'You are an expert at improving websites to increase conversion rates and revenue.\n' +
             'Copy everything from the old HTML to the generated HTML by default unless a change is made.\n' +
             'Return complete improved webpages.\n' +
             'For each improved webpage, return the path and full HTML.\n',
  'webpageServer': 'Please improve the following URL/website to increase conversion rates ' +
                   'and revenue.\n' +
                   'Return the complete improved website.\n' +
                   '\n' +
                   'URL:\n' +
                   '{{url}}\n'
};
const openRouterResponseFormatTypeJsonObjectWsiWIV1 = { 'type': 'json_object' };
const openRouterResponseJsonSchemaImproverWsiWIV1 = {
  'type': 'json_schema',
  'json_schema': {
    'name': 'website_improver_response',
    'description': 'Response containing improved website files and optional improvements list',
    'strict': true,
    'schema': {
      'type': 'object',
      'properties': {
        'improvedSite': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'path': { 'type': 'string' },
              'html': { 'type': 'string' }
            },
            'required': ['path', 'html'],
            'additionalProperties': false
          }
        },
        'improvements': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'What': { 'type': 'string' },
              'Why': { 'type': 'string' }
            },
            'required': ['What', 'Why'],
            'additionalProperties': false
          }
        }
      },
      'required': ['improvedSite'],
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
    let gaTagValue = 'HDLmGAWsiTag-' + dateGmt + '-' + timeGmt;
    let gaScript = '<script>(function(){var tag="' + gaTagValue + '";if(typeof gtag==="function"){gtag("event",tag,{event_category:"HDLmGAWsiTag",event_label:tag});}})();</script>';
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
    styleEl.innerHTML = '@keyframes hdlm-wsi-v1-spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
    document.head.appendChild(styleEl);
  }
  static buildSaveRelativePath(pathValue) {
    if (typeof(pathValue) != 'string' || pathValue == '')
      return 'index.html';
    let localPath = pathValue.trim();
    if (localPath == '' || localPath == '/')
      return 'index.html';
    if (localPath.startsWith('/'))
      localPath = localPath.substring(1);
    let queryIndex = localPath.indexOf('?');
    if (queryIndex >= 0)
      localPath = localPath.substring(0, queryIndex);
    let hashIndex = localPath.indexOf('#');
    if (hashIndex >= 0)
      localPath = localPath.substring(0, hashIndex);
    if (localPath == '')
      return 'index.html';
    let pathParts = localPath.split('/').filter(function(part) { return part != ''; });
    if (pathParts.length == 0)
      return 'index.html';
    let lastPart = pathParts[pathParts.length - 1];
    let hasExtension = lastPart.indexOf('.') >= 0;
    if (localPath.endsWith('/'))
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
      HDLmWebsiteImprover.urlValidated = false;
      HDLmWebsiteImprover.originalUrl = null;
    }
    function urlKeyDown(event) {
      if (event == null || event.key !== 'Enter')
        return;
      handleUrlEnterAsync(event.target.value.trim());
    }
    async function handleUrlEnterAsync(urlStr) {
      HDLmWebsiteImprover.urlValidated = false;
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
      }
      catch (errorObj) {
        console.error(errorObj);
        HDLmWebsiteImprover.displayErrorMessage('Error accessing website URL: ' + errorObj.message);
        HDLmWebsiteImprover.forceReRender();
        return;
      }
      HDLmWebsiteImprover.originalUrl = normalizedUrl;
      HDLmWebsiteImprover.urlInputCurrentValue = urlStr;
      HDLmWebsiteImprover.urlValidated = true;
      HDLmWebsiteImprover.forceReRender();
    }
    async function improveButtonClick() {
      if (HDLmWebsiteImprover.improvingInProgress)
        return;
      await HDLmWebsiteImprover.improveWebsiteAndSave();
    }
    let headingElement = React.createElement('h2', null, headingWsiWIV1['pageText']);
    let urlInputElement = HDLmReactSeven.buildSingleLineInputWLabel(helpTextWsiWIV1['url'], 'https://www.example.com', 'urlInputWsiWIV1', urlKeyDown, urlChange, HDLmWebsiteImprover.urlInputCurrentValue, true, { marginTop: '0px' }, { marginTop: '0px' }, { display: 'block', marginBottom: '0px' });
    let improveDisabled = HDLmWebsiteImprover.urlValidated == false || HDLmWebsiteImprover.improvingInProgress;
    let improveButton = HDLmReactSeven.buildButtonElement('improveButtonWsiWIV1', 'Improve', improveButtonClick, improveDisabled, { marginTop: '16px' });
    let directoryHelpElement = React.createElement('div', { style: { marginTop: '10px' } }, helpTextWsiWIV1['directory']);
    let spinnerElement = null;
    if (HDLmWebsiteImprover.improvingInProgress)
      spinnerElement = HDLmReactSeven.buildSpinnerElement();
    let elementsArray = [headingElement, urlInputElement, improveButton, directoryHelpElement];
    if (spinnerElement != null)
      elementsArray.push(spinnerElement);
    return HDLmReactSeven.putElementsInFragment(elementsArray);
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
  static async improveWebsiteAndSave() {
    if (HDLmWebsiteImprover.improvingInProgress)
      return;
    if (HDLmWebsiteImprover.urlValidated == false || HDLmWebsiteImprover.originalUrl == null) {
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
      let rootDirectoryHandle = await showDirectoryPickerFunction.call(window, { mode: 'readwrite', startIn: 'documents' });
      let aiResult = await HDLmAI.openRouterImproveWebsiteV1(HDLmWebsiteImprover.originalUrl,
                                                              '',
                                                              useAIVersionWsiWIV1,
                                                              openRouterChatTemplatesWsiWIV1,
                                                              openRouterResponseFormatTypeJsonObjectWsiWIV1,
                                                              openRouterResponseJsonSchemaImproverWsiWIV1);
      let improvedSiteArray = [];
      if (aiResult != null && Array.isArray(aiResult.improvedSite))
        improvedSiteArray = aiResult.improvedSite;
      if (improvedSiteArray.length == 0) {
        HDLmWebsiteImprover.displayErrorMessage('The improved website was not returned by the AI service');
        HDLmWebsiteImprover.improvingInProgress = false;
        HDLmWebsiteImprover.forceReRender();
        return;
      }
      await HDLmWebsiteImprover.saveAllImprovedPages(rootDirectoryHandle, improvedSiteArray);
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
          stage = HDLmWebsiteImproverStageTypes.showWebsiteUi;
          break;
        }
        case HDLmWebsiteImproverStageTypes.showWebsiteUi: {
          let reactRoot = HDLmReactSeven.getRootContainer('leftAndRightPage');
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
          let visibilityChangePromise = new Promise(function(resolve) { visibilityChangeResolveFunction = resolve; });
          HDLmWebsiteImprover.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
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
  static async saveAllImprovedPages(rootDirectoryHandle, improvedSiteArray) {
    for (let i = 0; i < improvedSiteArray.length; i++) {
      let siteEntry = improvedSiteArray[i];
      if (siteEntry == null)
        continue;
      let pathValue = '';
      if (typeof(siteEntry.path) == 'string')
        pathValue = siteEntry.path;
      let htmlText = '';
      if (typeof(siteEntry.html) == 'string')
        htmlText = siteEntry.html;
      if (htmlText == '')
        continue;
      htmlText = HDLmWebsiteImprover.addGoogleAnalyticsTag(htmlText);
      let relativePath = HDLmWebsiteImprover.buildSaveRelativePath(pathValue);
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
    window.addEventListener('visibilitychange', function(event) { HDLmWebsiteImprover.visibilityChangeDone(event); });
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
HDLmWebsiteImprover.originalUrl = null;
HDLmWebsiteImprover.urlInputCurrentValue = '';
HDLmWebsiteImprover.urlValidated = false;
HDLmWebsiteImprover.improvingInProgress = false;
HDLmWebsiteImprover.inputKeyValue = 1;
HDLmWebsiteImprover.stateSetFunction = null;
HDLmWebsiteImprover.visibilityChangeResolveFunction = null;
HDLmWebsiteImprover.visibilityChangeHiddenCount = 0;
HDLmWebsiteImprover.visibilityChangeVisibleCount = 0;